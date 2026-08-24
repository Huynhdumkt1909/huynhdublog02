CREATE TABLE registrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  serial TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);