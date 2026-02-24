// ==================== LOCAL AUTH SYSTEM ====================
// Drop-in replacement for Firebase Auth using localStorage.
// Auth is always local. Group rounds (activeRounds) use real Firebase.

const LOCAL_USERS_KEY = 'wg-users';
const LOCAL_SESSION_KEY = 'wg-session';

// Simple hash for passwords (NOT cryptographically secure — fine for local demo)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + c;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

function getLocalUsers() {
  try { return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY)) || {}; } catch(e) { return {}; }
}
function saveLocalUsers(users) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}
function getSession() {
  try { return JSON.parse(localStorage.getItem(LOCAL_SESSION_KEY)); } catch(e) { return null; }
}
function setSession(user) {
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(LOCAL_SESSION_KEY);
}

// ==================== AVATAR STORAGE ====================
function getUserAvatar(uid) {
  try { return localStorage.getItem('wg-avatar-' + uid) || null; } catch(e) { return null; }
}
function setUserAvatar(uid, dataUrl) {
  localStorage.setItem('wg-avatar-' + uid, dataUrl);
}
function removeUserAvatar(uid) {
  localStorage.removeItem('wg-avatar-' + uid);
}

// ==================== AUTH API ====================
const auth = {
  currentUser: null,
  _listeners: [],

  onAuthStateChanged(callback) {
    this._listeners.push(callback);
    const session = getSession();
    if (session) {
      this.currentUser = { uid: session.uid, displayName: session.username, email: session.username + '@local' };
      setTimeout(() => callback(this.currentUser), 0);
    } else {
      this.currentUser = null;
      setTimeout(() => callback(null), 0);
    }
    const listeners = this._listeners;
    const cb = callback;
    return function() {
      const idx = listeners.indexOf(cb);
      if (idx > -1) listeners.splice(idx, 1);
    };
  },

  _notifyListeners() {
    this._listeners.forEach(cb => cb(this.currentUser));
  },

  createUserWithEmailAndPassword(email, password) {
    const username = email.split('@')[0].toLowerCase();
    const users = getLocalUsers();
    if (users[username]) {
      return Promise.reject({ code: 'auth/email-already-in-use', message: 'Username already taken.' });
    }
    const uid = 'local_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    users[username] = { uid, username, passwordHash: simpleHash(password), createdAt: Date.now() };
    saveLocalUsers(users);

    const user = { uid, displayName: username, email };
    user.updateProfile = function(profile) {
      if (profile.displayName) {
        user.displayName = profile.displayName;
        const u = getLocalUsers();
        if (u[username]) { u[username].displayName = profile.displayName; saveLocalUsers(u); }
        setSession({ uid, username: profile.displayName });
      }
      return Promise.resolve();
    };

    this.currentUser = user;
    setSession({ uid, username: user.displayName || username });
    this._notifyListeners();
    return Promise.resolve({ user });
  },

  signInWithEmailAndPassword(email, password) {
    const username = email.split('@')[0].toLowerCase();
    const users = getLocalUsers();
    const stored = users[username];
    if (!stored || stored.passwordHash !== simpleHash(password)) {
      return Promise.reject({ code: 'auth/invalid-credential', message: 'Invalid username or password.' });
    }
    const user = { uid: stored.uid, displayName: stored.displayName || stored.username, email };
    this.currentUser = user;
    setSession({ uid: stored.uid, username: user.displayName });
    this._notifyListeners();
    return Promise.resolve({ user });
  },

  signOut() {
    this.currentUser = null;
    clearSession();
    this._notifyListeners();
    return Promise.resolve();
  }
};

// ==================== REAL FIREBASE FOR GROUP ROUNDS ====================
// Loads Firebase SDK dynamically. Only activeRounds paths use real Firebase.
// Everything else (auth, user data, stats) stays in localStorage.

var _firebaseDB = null;
var _firebaseReady = false;

// *** FIREBASE CONFIG — Replace with your own Firebase project config ***
var FIREBASE_CONFIG = {
  databaseURL: "https://westchester-golf-app-default-rtdb.firebaseio.com"
};

(function loadFirebaseSDK() {
  var s1 = document.createElement('script');
  s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  s1.onload = function() {
    // Save real firebase SDK before our const firebase overwrites window.firebase
    window._fbSDK = window.firebase;
    var s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
    s2.onload = function() {
      try {
        window._fbSDK.initializeApp(FIREBASE_CONFIG);
        _firebaseDB = window._fbSDK.database();
        _firebaseReady = true;
        console.log('[Firebase] Connected to real-time database');
      } catch(e) {
        console.warn('[Firebase] Init failed:', e.message);
      }
    };
    s2.onerror = function() { console.warn('[Firebase] DB SDK load failed'); };
    document.head.appendChild(s2);
  };
  s1.onerror = function() { console.warn('[Firebase] App SDK load failed'); };
  document.head.appendChild(s1);
})();

// ==================== LOCAL DATABASE ====================
const LOCAL_DB_KEY = 'wg-db';

function getLocalDB() {
  try { return JSON.parse(localStorage.getItem(LOCAL_DB_KEY)) || {}; } catch(e) { return {}; }
}
function saveLocalDB(data) {
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(data));
}

function setAtPath(obj, path, value) {
  const parts = path.split('/').filter(Boolean);
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] === undefined || current[parts[i]] === null || typeof current[parts[i]] !== 'object') {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  if (value === null) { delete current[parts[parts.length - 1]]; }
  else { current[parts[parts.length - 1]] = value; }
}

function getAtPath(obj, path) {
  const parts = path.split('/').filter(Boolean);
  let current = obj;
  for (const p of parts) {
    if (current === undefined || current === null) return undefined;
    current = current[p];
  }
  return current;
}

const _dbListeners = {};
let _listenerIdCounter = 0;

function _notifyPathListeners(path) {
  const data = getLocalDB();
  Object.keys(_dbListeners).forEach(function(listenPath) {
    if (path.startsWith(listenPath) || listenPath.startsWith(path)) {
      const val = getAtPath(data, listenPath);
      _dbListeners[listenPath].forEach(function(entry) {
        entry.callback({ val: function() { return val; }, exists: function() { return val !== undefined && val !== null; } });
      });
    }
  });
}

// ==================== HYBRID DB (Firebase for shared, localStorage for private) ====================

function isSharedPath(path) {
  return path && (path === 'activeRounds' || path.startsWith('activeRounds/'));
}

function makeLocalRef(path) {
  return {
    _path: path,
    set: function(value) {
      var data = getLocalDB();
      if (path === '') { Object.assign(data, value); } else { setAtPath(data, path, value); }
      saveLocalDB(data);
      _notifyPathListeners(path);
      return Promise.resolve();
    },
    update: function(updates) {
      var data = getLocalDB();
      Object.keys(updates).forEach(function(key) {
        var fullPath = path ? path + '/' + key : key;
        setAtPath(data, fullPath, updates[key]);
      });
      saveLocalDB(data);
      _notifyPathListeners(path);
      return Promise.resolve();
    },
    remove: function() {
      var data = getLocalDB();
      setAtPath(data, path, null);
      saveLocalDB(data);
      _notifyPathListeners(path);
      return Promise.resolve();
    },
    once: function() {
      var data = getLocalDB();
      var val = getAtPath(data, path);
      return Promise.resolve({ val: function() { return val; }, exists: function() { return val !== undefined && val !== null; } });
    },
    on: function(eventType, callback) {
      if (!_dbListeners[path]) _dbListeners[path] = [];
      _dbListeners[path].push({ callback: callback, id: ++_listenerIdCounter });
      var data = getLocalDB();
      var val = getAtPath(data, path);
      setTimeout(function() {
        callback({ val: function() { return val; }, exists: function() { return val !== undefined && val !== null; } });
      }, 0);
      return callback;
    },
    off: function(eventType, callback) {
      if (_dbListeners[path]) {
        _dbListeners[path] = _dbListeners[path].filter(function(e) { return e.callback !== callback; });
        if (_dbListeners[path].length === 0) delete _dbListeners[path];
      }
    },
    child: function(childPath) { return db.ref(path ? path + '/' + childPath : childPath); },
    keepSynced: function() {}
  };
}

function makeFirebaseRef(path) {
  return {
    _path: path,
    set: function(value) {
      if (!_firebaseReady) return makeLocalRef(path).set(value);
      return _firebaseDB.ref(path).set(value);
    },
    update: function(updates) {
      if (!_firebaseReady) return makeLocalRef(path).update(updates);
      return _firebaseDB.ref(path).update(updates);
    },
    remove: function() {
      if (!_firebaseReady) return makeLocalRef(path).remove();
      return _firebaseDB.ref(path).remove();
    },
    once: function(eventType) {
      if (!_firebaseReady) return makeLocalRef(path).once(eventType);
      return _firebaseDB.ref(path).once(eventType);
    },
    on: function(eventType, callback) {
      if (!_firebaseReady) return makeLocalRef(path).on(eventType, callback);
      return _firebaseDB.ref(path).on(eventType, callback);
    },
    off: function(eventType, callback) {
      if (!_firebaseReady) return makeLocalRef(path).off(eventType, callback);
      _firebaseDB.ref(path).off(eventType, callback);
    },
    child: function(childPath) { return db.ref(path ? path + '/' + childPath : childPath); },
    keepSynced: function() {}
  };
}

const db = {
  ref: function(path) {
    path = path || '';
    if (isSharedPath(path)) return makeFirebaseRef(path);
    return makeLocalRef(path);
  }
};

// ServerValue.TIMESTAMP — getter returns current time
const firebase = {
  database: { ServerValue: { get TIMESTAMP() { return Date.now(); } } }
};

// ==================== AUTH HELPERS ====================
function onAuthReady(callback) {
  const unsubscribe = auth.onAuthStateChanged(function(user) { unsubscribe(); callback(user); });
}
function requireAuth(callback) {
  onAuthReady(function(user) {
    if (!user) { window.location.href = 'login.html'; } else { callback(user); }
  });
}
function getCurrentUser() { return auth.currentUser; }
function signOut() { auth.signOut().then(function() { window.location.href = 'login.html'; }); }

function deleteAccount() {
  const user = auth.currentUser;
  if (!user) return;
  const username = (user.displayName || user.email.split('@')[0]).toLowerCase();
  const uid = user.uid;

  const users = getLocalUsers();
  delete users[username];
  saveLocalUsers(users);

  const dbData = getLocalDB();
  if (dbData.usernames) delete dbData.usernames[username];
  if (dbData.users) delete dbData.users[uid];
  if (dbData.rounds) delete dbData.rounds[uid];
  saveLocalDB(dbData);

  localStorage.removeItem('westchester-golf-v2');
  localStorage.removeItem('active-round-v2');
  localStorage.removeItem('active-group-code');
  removeUserAvatar(uid);

  auth.signOut().then(function() { window.location.href = 'login.html'; });
}
