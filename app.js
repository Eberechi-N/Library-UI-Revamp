const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./js/User');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/project_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

//More Middlewire
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle sign-up form data
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Save user data in the database
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
