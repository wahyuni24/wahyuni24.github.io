const dbPromised = idb.open("wcsbola", 1, function(upgradeDb) {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("post_title", "post_title", { unique: false });
});

function saveInfoTeam(team) {
  dbPromised
  .then(function(db) {
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    console.log(team);
    store.put(team);
    return tx.complete;
  })
  .then(function() {
    console.log("Info Team Berhasil Disimpan.");
  });
}

function deleteSavedTeam(id) {
  dbPromised
  .then(function(db) {
    const tx = db.transaction("teams", "readwrite");
    const store = tx.objectStore("teams");
    store.delete(id);
    return tx.complete;
  })
  .then(function() {
    console.log("Artikel Team Berhasil dihapus");
  });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      const tx = db.transaction("teams", "readonly");
      const store = tx.objectStore("teams");
      return store.getAll();
    })
    .then(function(teams) {
      resolve(teams);
    });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      const tx  = db.transaction("teams", "readonly");
      const store = tx.objectStore("teams");
      return store.get(id);
    })
    .then(function(team) {
      resolve(team);
    });
  });
}
