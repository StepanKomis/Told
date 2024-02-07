// Express setup
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  store: new session.MemoryStore(),
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false
}));

// Setting essentials
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// importing routes
const mainRoute = require('./src/routes/mainRoute');
const authRoute = require('./src/routes/authRoute');
const profileRoute = require('./src/routes/profileRoute');
const comunityRoute = require('./src/routes/comunityRoute');
// setting up routes
app.use('/', mainRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/comunity', comunityRoute);
// Starting server
const port = 3000;
app.listen(port, () => {
  console.log('listening on port: ' + port);
});