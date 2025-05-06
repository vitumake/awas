const sqlite3 = require('sqlite3').verbose(); 
const fs = require('fs');
const initDb = require('./utils/initDb'); // Import the initialization script

// Check if the database file exists, if not run the initialization script
if (!fs.existsSync('./application.db')) {
  console.log('Database file not found. Initializing database...');
  initDb(); // Initialize the database with default values
} else {
  console.log('Existing database found. Skipping initialization.');
}

const db = new sqlite3.Database('./application.db'); 

module.exports = db;