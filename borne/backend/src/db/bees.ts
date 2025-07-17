import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./src/db/bees.db');
db.run(`CREATE TABLE IF NOT EXISTS bees (id INTEGER PRIMARY KEY, name TEXT)`);

export default db;