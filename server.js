// Setup Libraries
const dotenv = require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Setup App
const app = express();
app.use(express.static('public'));
app.use(cookieParser());

// Setup Middleware
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup DB
require('./data/reddit-db');

// Require controllers
require('./controllers/posts')(app)
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

app.get('/', (req, res) => {
    res.render('home');
});

// Render the new post form
app.get('/posts/new', (req, res) => {
    res.render('posts-new');
});

// Render the login form
app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(4000);

module.exports = app;