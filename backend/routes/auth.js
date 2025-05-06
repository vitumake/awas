const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
    if (err) return res.status(500).send('DB error');
    if (!user) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  });
});

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Missing fields');
  
    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
      if (err) {
        console.error(err);
        return res.status(500).send('DB error');
      }
      if (user) return res.status(409).send('User already exists');
  
      db.run(
        "INSERT INTO users (username, password, role, payment_info) VALUES (?, ?, 'user', '')",
        [username, password],
        function (err) {
          if (err) return res.status(500).send('Could not register user');
          res.status(201).send('User registered');
        }
      );
    });
  });

module.exports = router;
