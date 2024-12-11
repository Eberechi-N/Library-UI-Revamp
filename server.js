const express = require('express');
const axios = require('axios');
const cors = require('cors'); 


const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json()); // Parse JSON bodies

const PORT = 5001;

// Route to handle book search
app.get('/api/search', async (req, res) => {
    const query = req.query.q; // Get the query from the frontend
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        // Make the request to Open Library API
        const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        res.json(response.data); // Send the data back to the frontend
    } catch (error) {
        console.error('Error fetching books:', error.message);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
