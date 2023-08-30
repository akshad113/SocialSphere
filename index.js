const express = require('express');
const port = 8000;
const Router = require('./routes/index');
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport_local')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash')
const customMiddleware = require('./config/middleware')
// Body parsing for form data
app.use(express.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser());

// Static assets and layout setup
app.use(express.static('./assets'));
// make the upload path available to browser
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'socialSphere',
    //Todo change the secret before deployment 
    secret: 'blahsomething',
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/socialSphere_development',
        autoRemove: 'disabled'
    }, function (error) {
        console.log(error || "connected to mongstore")
    })
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passportLocal.setAuthenticatedUser)

app.use(flash());
app.use(customMiddleware.setflash)

// Routing
app.use('/', Router);
// Start server
app.listen(port, function (error) {
    if (error) console.log(`Error: ${error}`);
    console.log(`Server is up on port ${port}`);
});
