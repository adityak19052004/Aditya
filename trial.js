const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies

// In-memory storage for grocery lists
let groceryLists = [];

// Endpoint to save grocery list
app.post('/api/grocery', (req, res) => {
    const newList = req.body;

    // You can add logic here to handle updating or storing lists uniquely
    groceryLists = newList; // Replace or save the list

    res.status(200).json({ message: 'Grocery list saved!', data: groceryLists });
});

// Endpoint to get grocery list
app.get('/api/grocery', (req, res) => {
    res.status(200).json(groceryLists);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
