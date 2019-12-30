const express = require('express');
const path = require('path');
const members = require('./Members.js');

// Seperate way to do things, server side template rendering
const exphbs = require('express-handlebars');

const logger = require('./middleware/logger.js');

const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware for server side, to render templates
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware, parses body as json
app.use(express.json());

// Form submission, url encoded data
app.use(express.urlencoded({extended: false}));

// Homepage route, handlebars
app.get('/', (req, res) => res.render('index', {
  title: 'Member App',
  members
 })
);

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// All routers that start /api/members will use this route
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`console started on port ${PORT}`);
});
