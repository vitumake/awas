const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Enable CORS for frontend on localhost:3000
app.use(cors());

// 

app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const messageRoutes = require('./routes/messages');
const profileRoutes = require('./routes/profile');
const resetRoutes = require('./routes/reset');

// Mount routes
app.use('/login', authRoutes);
app.use('/admin', adminRoutes);
app.use('/messages', messageRoutes);
app.use('/profile', profileRoutes);
app.use('/reset', resetRoutes);

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🔌 Backend API running at http://localhost:${PORT}`);
});
