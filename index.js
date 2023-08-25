const express = require('express');
const port = 8000;
const Router = require('./routes/index');
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// Body parsing for form data
app.use(express.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser());

// Static assets and layout setup
app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Routing
app.use('/', Router);

// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Start server
app.listen(port, function(error) {
    if (error) console.log(`Error: ${error}`);
    console.log(`Server is up on port ${port}`);
});
