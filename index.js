const express = require('express');
const path = require('path');
const logger = require('./middleware/logger.js')

const app = express();


// Init middleware
// app.use(logger);

// Body Parser Middleware, parses body as json
app.use(express.json());

// Form submission, url encoded data
app.use(express.urlencoded({extended: false}))



// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// All routers that start /api/members will use this route
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`)
});
