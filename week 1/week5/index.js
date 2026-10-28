const express = require('express');
const fs= require('fs')
const app = express();
// Built-in middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Home route
app.get('/', (req, res) => {
 res.send('Hello! This is my first Express application.');
});
// Start server
const PORT = 5000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});