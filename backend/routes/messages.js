const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/jwt');

const router = express.Router();

// GET all messages
router.get('/', (req, res) => {
    db.all(
      "SELECT messages.id, users.username, messages.content, messages.created_at FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC",
      (err, rows) => {
        if (err) return res.status(500).send('DB error');
        res.json(rows);
      }
    );
  });

// POST a new message
router.post('/', authenticate, (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).send('Message content required');

  db.get("SELECT id FROM users WHERE username = ?", [req.user.username], (err, user) => {
    if (err || !user) return res.status(500).send('User lookup failed');

    db.run("INSERT INTO messages (user_id, content) VALUES (?, ?)", [user.id, content], function (err) {
      if (err) return res.status(500).send('Failed to post message');
      res.status(201).send('Message posted');
    });
  });
});

module.exports = router;
