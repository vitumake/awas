const sqlite3 = require('sqlite3').verbose();

function initDatabase() {
  const db = new sqlite3.Database('./application.db');

  db.serialize(() => {
    db.run("DROP TABLE IF EXISTS users");
    db.run("DROP TABLE IF EXISTS messages");

    db.run(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        payment_info TEXT
      )
    `);

    db.run(`
      CREATE TABLE messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )
    `);

    const users = [
      ['alice', 'password123', 'user', '4111-1111-1111-1111'],
      ['bob', 'hunter2', 'admin', '5555-4444-3333-2222'],
      ['charlie', 'letmein', 'user', '1234-5678-9876-5432'],
      ['diana', 'qwerty', 'user', ''],
      ['eve', 'trustno1', 'user', '']
    ];
    const userStmt = db.prepare("INSERT INTO users (username, password, role, payment_info) VALUES (?, ?, ?, ?)");
    users.forEach(user => userStmt.run(user));
    userStmt.finalize();

    const messages = [
      [1, 'Hi everyone! Looking forward to chatting.'],
      [2, 'Admin here — please keep it respectful.'],
      [3, '<script>alert("XSS attempt by charlie")</script>'],
      [4, 'Anyone here use the new payment portal yet?'],
      [1, 'Just tested it — looks shady tbh.'],
      [5, 'What kind of coffee do you all like?']
    ];
    const msgStmt = db.prepare("INSERT INTO messages (user_id, content) VALUES (?, ?)");
    messages.forEach(msg => msgStmt.run(msg));
    msgStmt.finalize();
  });

  db.close();

  console.log('Database initialized with default values.');
}

module.exports = initDatabase;
