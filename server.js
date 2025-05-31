const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Route for the homepage
app.get('/', (req, res) => {
    res.render('index', { profile: null, error: null });
});

// Route to handle form submission
app.post('/search', async (req, res) => {
    const username = req.body.username?.trim();
    if (!username) {
        return res.render('index', { profile: null, error: 'Please enter a username' });
    }

    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/stalk/instagram?username=${username}`);
        const data = response.data;

        if (data.status && data.data) {
            res.render('index', { profile: data.data, error: null });
        } else {
            res.render('index', { profile: null, error: 'Invalid username or no data found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.render('index', { profile: null, error: 'Failed to fetch profile data. Please try again.' });
    }
});

// Export the app for Vercel
module.exports = app;