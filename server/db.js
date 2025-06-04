const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./cashmeal.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error('❌ Failed to connect to DB:', err.message);
  else console.log('✅ Connected to SQLite database.');
});

// This ensures serialized access — critical for avoiding `SQLITE_BUSY`
db.serialize();

module.exports = db;
