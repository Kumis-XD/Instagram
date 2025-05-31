const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch Instagram profile data
app.get('/api/profile/:username', async (req, res) => {
  const username = req.params.username?.trim();
  if (!username) {
    return res.status(400).json({ error: 'Please provide a username' });
  }

  try {
    const response = await axios.get(`https://api.siputzx.my.id/api/stalk/instagram?username=${username}`);
    const data = response.data;

    if (data.status && data.data) {
      res.json(data.data);
    } else {
      res.status(404).json({ error: 'Invalid username or no data found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch profile data. Please try again.' });
  }
});

// Export the app for Vercel
module.exports = app;
