import { sqlite } from "./db.js";

// Project create table
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    owner_id INTEGER NOT NULL
  )
`);

console.log("Projects table created");
sqlite.close();
