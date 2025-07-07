// Import the Express library
const express = require('express');

// Create an Express app
const app = express();

// Set the port
const port = 3000;

// Middleware to parse JSON data in requests
app.use(express.json());

// Allow requests from the browser (CORS headers)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// In-memory storage for itineraries
let itineraries = [];

// POST endpoint to receive new itineraries
app.post('/api/itineraries', (req, res) => {
  const itinerary = req.body;
  itineraries.push(itinerary);
  console.log('Itinerary received:', itinerary);
  res.status(201).send({ message: 'Itinerary saved!' });
});

// GET endpoint to return all itineraries
app.get('/api/itineraries', (req, res) => {
  res.send(itineraries);
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
