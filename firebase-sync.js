// ==================== FIREBASE DATA SYNC ====================
// All Firebase Realtime Database operations for rounds, group play, and migration.

// ==================== USER ROUNDS (per-user cloud storage) ====================

// Load all saved rounds for a user from Firebase
function fbLoadRounds(uid) {
  return db.ref('users/' + uid + '/rounds').once('value').then(snap => {
    const data = snap.val();
    if (!data) return [];
    return Object.keys(data).map(key => ({ ...data[key], id: key }));
  });
}

// Save a completed round to Firebase under user's account
function fbSaveRound(uid, round) {
  const roundId = round.id || Date.now().toString();
  return db.ref('users/' + uid + '/rounds/' + roundId).set({
    ...round,
    id: roundId
  });
}

// Delete a round from Firebase
function fbDeleteRound(uid, roundId) {
  return db.ref('users/' + uid + '/rounds/' + roundId).remove();
}

// ==================== LOCAL → FIREBASE MIGRATION ====================

// One-time migration of localStorage rounds to Firebase
function migrateLocalRounds(uid) {
  return db.ref('users/' + uid + '/rounds').once('value').then(snap => {
    const fbData = snap.val();
    const localRounds = loadRounds(); // from shared.js (localStorage)

    if (!localRounds.length) return Promise.resolve(); // nothing to migrate

    // If Firebase already has rounds, skip migration (user already migrated)
    if (fbData && Object.keys(fbData).length > 0) return Promise.resolve();

    // Batch write all local rounds to Firebase
    const updates = {};
    localRounds.forEach(r => {
      const id = r.id || Date.now().toString() + Math.random().toString(36).slice(2, 5);
      updates[id] = { ...r, id };
    });
    return db.ref('users/' + uid + '/rounds').update(updates);
  });
}

// ==================== GROUP ROUNDS (real-time shared play) ====================

// Generate a random 6-character round code
function generateRoundCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no O/0/1/I for readability
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Create a new group round in Firebase
function createGroupRound(uid, displayName, courseId, tee, teeLabel, date) {
  const code = generateRoundCode();
  return createGroupRoundWithCode(uid, displayName, courseId, tee, teeLabel, date, code);
}

// Create a group round with a specific code
function createGroupRoundWithCode(uid, displayName, courseId, tee, teeLabel, date, code) {
  return new Promise((resolve, reject) => {
    const roundRef = db.ref('activeRounds/' + code);

    roundRef.once('value').then(snap => {
      if (snap.exists()) {
        var existing = snap.val();
        var status = existing.meta && existing.meta.status;
        if (status !== 'finished' && status !== 'ended') {
          reject(new Error('That code is already in use. Try a different one.'));
          return;
        }
        // Round is finished/ended — remove old data and reuse the code
      }

      const roundData = {
        meta: {
          courseId: courseId,
          tee: tee,
          teeLabel: teeLabel,
          date: date,
          createdBy: uid,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          status: 'active'
        },
        players: {
          [uid]: {
            name: displayName,
            joinedAt: firebase.database.ServerValue.TIMESTAMP
          }
        },
        scores: {
          [uid]: arrayToObj(new Array(18).fill(0))
        },
        tracking: {
          [uid]: trackingToObj(createPlayerTracking())
        },
        currentHole: {
          [uid]: 0
        }
      };

      return roundRef.set(roundData).then(() => resolve(code));
    }).catch(reject);
  });
}

// Join an existing group round
function joinGroupRound(uid, displayName, code) {
  const roundRef = db.ref('activeRounds/' + code);

  return roundRef.once('value').then(function(snap) {
    if (!snap.exists() || !snap.val()) {
      throw new Error('Round not found. Make sure you have the correct code.');
    }
    var roundData = snap.val();
    var meta = roundData.meta;
    if (!meta) throw new Error('Round data is corrupted. Please create a new round.');
    if (meta.status !== 'active') throw new Error('This round has already finished');

    // Check if this player already finished this round
    if (roundData.finishedPlayers && roundData.finishedPlayers[uid]) {
      throw new Error('You already finished this round. Your scores have been saved.');
    }

    // Check if player is already in the round
    if (roundData.players && roundData.players[uid]) {
      return Promise.resolve();
    }

    // Add player
    var updates = {};
    updates['players/' + uid] = {
      name: displayName,
      joinedAt: firebase.database.ServerValue.TIMESTAMP
    };
    updates['scores/' + uid] = arrayToObj(new Array(18).fill(0));
    updates['tracking/' + uid] = trackingToObj(createPlayerTracking());
    updates['currentHole/' + uid] = 0;

    return roundRef.update(updates);
  });
}

// Listen to an active group round in real-time
// Returns an unsubscribe function
function listenToGroupRound(code, callback) {
  const ref = db.ref('activeRounds/' + code);
  const handler = ref.on('value', snap => {
    const data = snap.val();
    callback(data); // pass null through so listeners can handle round deletion
  });
  return () => ref.off('value', handler);
}

// Update a single hole score for the current user
function updateGroupScore(code, uid, holeIndex, score) {
  return db.ref('activeRounds/' + code + '/scores/' + uid + '/' + holeIndex).set(score);
}

// Update tracking data for the current user on a specific hole
function updateGroupTracking(code, uid, trackType, holeIndex, value) {
  return db.ref('activeRounds/' + code + '/tracking/' + uid + '/' + trackType + '/' + holeIndex).set(value);
}

// Update current hole view for a user
function updateGroupCurrentHole(code, uid, holeIndex) {
  return db.ref('activeRounds/' + code + '/currentHole/' + uid).set(holeIndex);
}

// Finish a group round (only creator should call this)
function finishGroupRound(code) {
  return db.ref('activeRounds/' + code + '/meta/status').set('finished');
}

// Mark a player as finished in the active round
function markPlayerFinished(code, uid) {
  return db.ref('activeRounds/' + code + '/finishedPlayers/' + uid).set(true);
}

// Check if a specific player has already finished this round
function isPlayerFinished(code, uid) {
  return db.ref('activeRounds/' + code + '/finishedPlayers/' + uid).once('value').then(function(snap) {
    return snap.val() === true;
  });
}

// Check if all players have finished — if so, mark round as finished (keep data for live view)
function checkAndCleanupRound(code) {
  return db.ref('activeRounds/' + code).once('value').then(function(snap) {
    if (!snap.exists()) return;
    var data = snap.val();
    var players = data.players || {};
    var finished = data.finishedPlayers || {};
    var allUids = Object.keys(players);
    var allDone = allUids.length > 0 && allUids.every(function(uid) {
      return finished[uid] === true;
    });
    if (allDone) {
      // Everyone finished — mark as finished so live view can show final results
      return db.ref('activeRounds/' + code + '/meta').update({
        status: 'finished',
        finishedAt: firebase.database.ServerValue.TIMESTAMP
      }).then(function() {
        // Clean up after 5 minutes so the code can eventually be reused
        setTimeout(function() {
          db.ref('activeRounds/' + code).remove().catch(function() {});
        }, 300000);
      });
    }
  });
}

// Admin ends the round for all players — sets status to 'ended', keeps data for live view
function endGroupRoundForAll(code) {
  return db.ref('activeRounds/' + code + '/meta').update({
    status: 'ended',
    finishedAt: firebase.database.ServerValue.TIMESTAMP
  }).then(function() {
    // Clean up after 5 minutes so spectators can still see final results
    setTimeout(function() {
      db.ref('activeRounds/' + code).remove().catch(function() {});
    }, 300000);
  });
}

// Clean up: remove a finished group round from Firebase
function removeGroupRound(code) {
  return db.ref('activeRounds/' + code).remove();
}

// ==================== DATA CONVERSION HELPERS ====================
// Firebase doesn't store arrays natively; convert between array and indexed object

function arrayToObj(arr) {
  const obj = {};
  arr.forEach((v, i) => { obj[i] = v; });
  return obj;
}

function objToArray(obj, length) {
  if (!obj) return new Array(length || 18).fill(0);
  const arr = [];
  for (let i = 0; i < (length || 18); i++) {
    arr.push(obj[i] !== undefined ? obj[i] : 0);
  }
  return arr;
}

function trackingToObj(tracking) {
  return {
    putts: arrayToObj(tracking.putts),
    fairway: arrayToObj(tracking.fairway),
    gir: arrayToObj(tracking.gir),
    mulligans: arrayToObj(tracking.mulligans),
    penalties: arrayToObj(tracking.penalties)
  };
}

function objToTracking(obj) {
  if (!obj) return createPlayerTracking();
  return {
    putts: objToArray(obj.putts, 18),
    fairway: objToArray(obj.fairway, 18).map(v => !!v),
    gir: objToArray(obj.gir, 18).map(v => !!v),
    mulligans: objToArray(obj.mulligans, 18),
    penalties: objToArray(obj.penalties, 18)
  };
}

// Convert a Firebase group round snapshot into the same shape as the existing R object
// so the render functions can work with either solo or group data
function groupDataToRound(data, code) {
  const meta = data.meta;
  const players = data.players || {};
  const playerUids = Object.keys(players);
  const playerNames = playerUids.map(uid => players[uid].name);

  // Build scores and tracking keyed by player NAME (for display)
  // but also keep a UID→name map
  const scores = {};
  const tracking = {};
  const uidToName = {};
  const nameToUid = {};

  playerUids.forEach(uid => {
    const name = players[uid].name;
    uidToName[uid] = name;
    nameToUid[name] = uid;
    scores[name] = objToArray(data.scores ? data.scores[uid] : null, 18);
    tracking[name] = objToTracking(data.tracking ? data.tracking[uid] : null);
  });

  return {
    courseId: meta.courseId,
    tee: meta.tee,
    teeLabel: meta.teeLabel,
    date: meta.date,
    players: playerNames,
    scores: scores,
    tracking: tracking,
    currentHole: 0, // each player tracks their own
    // Group-specific metadata
    _groupCode: code,
    _createdBy: meta.createdBy,
    _status: meta.status,
    _uidToName: uidToName,
    _nameToUid: nameToUid,
    _playerUids: playerUids
  };
}

// ==================== CONNECTION STATUS ====================

function listenConnectionStatus(callback) {
  // Check if real Firebase is connected
  if (_firebaseReady && _firebaseDB) {
    var connRef = _firebaseDB.ref('.info/connected');
    connRef.on('value', function(snap) {
      callback(snap.val() === true);
    });
    return function() { connRef.off(); };
  }
  // Fallback: always connected for local mode
  setTimeout(function() { callback(true); }, 0);
  return function() {};
}
