// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Create an Express application
const app = express();
const port = 5000;

// Enable CORS to allow requests from the React app
app.use(cors());

// Define a route for fetching data from a public API
app.get('/api/posts', async (req, res) => {
  try {
    // Make a GET request to the public API (replace with your API URL)
    const response = await axios.get(' https://jsonplaceholder.typicode.com/users');

    // Send the API response data to the client
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    res.status(500).json({ error: 'Failed to fetch data from the API.' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
