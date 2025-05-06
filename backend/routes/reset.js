const express = require('express');
const initDatabase = require('../utils/initDb');

const router = express.Router();

router.post('/', (req, res) => {
  initDatabase();
  res.status(200).send('Database reset to default state.');
});

module.exports = router;
