const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Allow API requests from this frontend (optional CORS support)
app.use(cors());

// Serve static frontend files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for SPA behavior (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the frontend server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🌐 Frontend hosted at http://localhost:${PORT}`);
});
