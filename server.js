// Setup Libraries
const Post = require('./data/reddit-db');
const express = require('express');
const handlebars = require('express-handlebars');

// Setup App
const app = express();
app.use(express.static('public'));

// Setup DB
require('./data/reddit-db');

// Setup Middleware
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Require controllers
require('./controllers/posts')(app)

app.listen(4000);