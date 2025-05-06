const express = require('express');
const db = require('../db');
const authenticate = require('../middleware/jwt');

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Admins only');

  db.all("SELECT username, role, payment_info FROM users", (err, rows) => {
    if (err) return res.status(500).send('DB error');
    res.json(rows);
  });
});

// Promote/Demote a user
router.put('/role', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Admins only');

  const { username, newRole } = req.body;
  db.run("UPDATE users SET role = ? WHERE username = ?", [newRole, username], function (err) {
    if (err) return res.status(500).send('Failed to update role');
    res.send('User role updated');
  });
});

// Delete a user
router.delete('/:username', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Admins only');

  db.run("DELETE FROM users WHERE username = ?", [req.params.username], function (err) {
    if (err) return res.status(500).send('Failed to delete user');
    res.send('User deleted');
  });
});


module.exports = router;
