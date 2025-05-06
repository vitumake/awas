const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/jwt');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  db.get(
    "SELECT id, username, role, payment_info FROM users WHERE username = ?",
    [req.user.username],
    (err, row) => {
      if (err) return res.status(500).send('DB error');
      if (!row) return res.status(404).send('User not found');
      res.json(row);
    }
  );
});

module.exports = router;
