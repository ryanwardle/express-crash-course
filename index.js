const express = require('express');
const path = require('path');
const members = require('./Members.js');
const logger = require('./middleware/logger.js')
const app = express();


// Init middleware
app.use(logger);

// gets all members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// get single members
app.get('/api/members/:id', (req, res) => {
  res.json(members.filter(member => member.id === parseInt(req.params.id)))
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`)
});
