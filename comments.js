// Create web server
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import comments from comments.json
const comments = require('./comments.json');

// Create a route for comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Create a route for posting comments
app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  if (username && comment) {
    const id = comments.length + 1;
    comments.push({ id, username, comment });
    res.json({ id, username, comment });
  } else {
    res.status(400).json({ message: 'Please enter username and comment!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});