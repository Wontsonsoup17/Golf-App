// ==================== LOCAL AUTH SYSTEM ====================
// Drop-in replacement for Firebase Auth using localStorage.
// When you're ready for a real server, swap this file with Firebase config.

const LOCAL_USERS_KEY = 'wg-users';      // { username: { uid, username, passwordHash, createdAt } }
const LOCAL_SESSION_KEY = 'wg-session';   // { uid, username }

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

// ==================== AUTH API (matches Firebase interface used by other pages) ====================

// Fake auth object that mimics firebase.auth()
const auth = {
  currentUser: null,

  _listeners: [],

  onAuthStateChanged(callback) {
    this._listeners.push(callback);
    // Fire immediately with current state
    const session = getSession();
    if (session) {
      this.currentUser = { uid: session.uid, displayName: session.username, email: session.username + '@local' };
      setTimeout(() => callback(this.currentUser), 0);
    } else {
      this.currentUser = null;
      setTimeout(() => callback(null), 0);
    }
    // Return unsubscribe function
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

  // Sign up
  createUserWithEmailAndPassword(email, password) {
    const username = email.split('@')[0].toLowerCase();
    const users = getLocalUsers();

    if (users[username]) {
      return Promise.reject({ code: 'auth/email-already-in-use', message: 'Username already taken.' });
    }

    const uid = 'local_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    users[username] = {
      uid: uid,
      username: username,
      passwordHash: simpleHash(password),
      createdAt: Date.now()
    };
    saveLocalUsers(users);

    const user = { uid: uid, displayName: username, email: email };
    user.updateProfile = function(profile) {
      if (profile.displayName) {
        user.displayName = profile.displayName;
        // Update stored user
        const u = getLocalUsers();
        if (u[username]) { u[username].displayName = profile.displayName; saveLocalUsers(u); }
      }
      return Promise.resolve();
    };

    this.currentUser = user;
    setSession({ uid: uid, username: user.displayName || username });
    this._notifyListeners();

    return Promise.resolve({ user: user });
  },

  // Sign in
  signInWithEmailAndPassword(email, password) {
    const username = email.split('@')[0].toLowerCase();
    const users = getLocalUsers();

    const stored = users[username];
    if (!stored || stored.passwordHash !== simpleHash(password)) {
      return Promise.reject({ code: 'auth/invalid-credential', message: 'Invalid username or password.' });
    }

    const user = {
      uid: stored.uid,
      displayName: stored.displayName || stored.username,
      email: email
    };

    this.currentUser = user;
    setSession({ uid: stored.uid, username: user.displayName });
    this._notifyListeners();

    return Promise.resolve({ user: user });
  },

  // Sign out
  signOut() {
    this.currentUser = null;
    clearSession();
    this._notifyListeners();
    return Promise.resolve();
  }
};

// ==================== LOCAL DATABASE (mimics firebase.database()) ====================
// A simple in-memory + localStorage key-value store that supports the paths used by the app.

const LOCAL_DB_KEY = 'wg-db';

function getLocalDB() {
  try { return JSON.parse(localStorage.getItem(LOCAL_DB_KEY)) || {}; } catch(e) { return {}; }
}

function saveLocalDB(data) {
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(data));
}

// Set a value at a dot/slash path in a nested object
function setAtPath(obj, path, value) {
  const parts = path.split('/').filter(Boolean);
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (current[parts[i]] === undefined || current[parts[i]] === null || typeof current[parts[i]] !== 'object') {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  if (value === null) {
    delete current[parts[parts.length - 1]];
  } else {
    current[parts[parts.length - 1]] = value;
  }
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

// Real-time listeners registry
const _dbListeners = {}; // { path: [ { callback, id } ] }
let _listenerIdCounter = 0;

function _notifyPathListeners(path) {
  // Notify exact path and parent paths
  const data = getLocalDB();
  Object.keys(_dbListeners).forEach(listenPath => {
    if (path.startsWith(listenPath) || listenPath.startsWith(path)) {
      const val = getAtPath(data, listenPath);
      _dbListeners[listenPath].forEach(entry => {
        entry.callback({ val: () => val, exists: () => val !== undefined && val !== null });
      });
    }
  });
}

const db = {
  ref(path) {
    path = path || '';
    return {
      _path: path,

      set(value) {
        const data = getLocalDB();
        if (path === '') {
          // Setting root — merge
          Object.assign(data, value);
        } else {
          setAtPath(data, path, value);
        }
        saveLocalDB(data);
        _notifyPathListeners(path);
        return Promise.resolve();
      },

      update(updates) {
        const data = getLocalDB();
        Object.keys(updates).forEach(key => {
          const fullPath = path ? path + '/' + key : key;
          setAtPath(data, fullPath, updates[key]);
        });
        saveLocalDB(data);
        _notifyPathListeners(path);
        return Promise.resolve();
      },

      remove() {
        const data = getLocalDB();
        setAtPath(data, path, null);
        saveLocalDB(data);
        _notifyPathListeners(path);
        return Promise.resolve();
      },

      once(eventType) {
        const data = getLocalDB();
        const val = getAtPath(data, path);
        return Promise.resolve({
          val: () => val,
          exists: () => val !== undefined && val !== null
        });
      },

      on(eventType, callback) {
        if (!_dbListeners[path]) _dbListeners[path] = [];
        const id = ++_listenerIdCounter;
        _dbListeners[path].push({ callback, id });

        // Fire immediately with current data
        const data = getLocalDB();
        const val = getAtPath(data, path);
        setTimeout(() => {
          callback({ val: () => val, exists: () => val !== undefined && val !== null });
        }, 0);

        return callback; // return the callback as the handler reference for off()
      },

      off(eventType, callback) {
        if (_dbListeners[path]) {
          _dbListeners[path] = _dbListeners[path].filter(e => e.callback !== callback);
          if (_dbListeners[path].length === 0) delete _dbListeners[path];
        }
      },

      child(childPath) {
        return db.ref(path ? path + '/' + childPath : childPath);
      },

      keepSynced() { /* no-op for local */ }
    };
  }
};

// Fake firebase.database.ServerValue for timestamps
// Uses a getter so each access returns the current time (like real Firebase)
const firebase = {
  database: {
    ServerValue: {
      get TIMESTAMP() { return Date.now(); }
    }
  }
};

// ==================== AUTH HELPERS (same as before) ====================

function onAuthReady(callback) {
  const unsubscribe = auth.onAuthStateChanged(user => {
    unsubscribe();
    callback(user);
  });
}

function requireAuth(callback) {
  onAuthReady(user => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      callback(user);
    }
  });
}

function getCurrentUser() {
  return auth.currentUser;
}

function signOut() {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
}

function deleteAccount() {
  const user = auth.currentUser;
  if (!user) return;

  const username = (user.displayName || user.email.split('@')[0]).toLowerCase();
  const uid = user.uid;

  // Remove user from local users registry
  const users = getLocalUsers();
  delete users[username];
  saveLocalUsers(users);

  // Remove user data from local database (usernames reservation, user profile, user rounds)
  const dbData = getLocalDB();
  if (dbData.usernames) delete dbData.usernames[username];
  if (dbData.users) delete dbData.users[uid];
  if (dbData.rounds) delete dbData.rounds[uid];
  saveLocalDB(dbData);

  // Clear rounds and avatar from localStorage
  localStorage.removeItem('westchester-golf-v2');
  localStorage.removeItem('active-round-v2');
  localStorage.removeItem('active-group-code');
  removeUserAvatar(uid);

  // Sign out and redirect
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
}
