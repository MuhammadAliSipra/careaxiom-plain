const express = require('express');
const app = express();

// Import routes
const titleRoutes = require('./routes/index');

// Use routes
app.use('/I/want/title', titleRoutes);

// Handle all other routes with a 404
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
