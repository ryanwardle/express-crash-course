const express = require('express');
const path = require('path');
const members = require('./Members.js')
const app = express();



// gets all members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`)
});
