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
// Body parsing for form data
app.use(express.urlencoded({ extended: true }));

// Cookie parsing
app.use(cookieParser());

// Static assets and layout setup
app.use(express.static('./assets'));
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// EJS view engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

 
app.use(session({
    name:'socialSphere',
    //Todo change the secret before deployment 
    secret:'blahsomething',
    saveUninitialized:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/socialSphere_development',
        autoRemove:'disabled'
    },function(error){
        console.log(error || "connected to mongstore")
    })
}))
app.use(passport.initialize()); 
app.use(passport.session());

app.use(passportLocal.setAuthenticatedUser)
// Routing
app.use('/', Router);
 
// Start server
app.listen(port, function(error) {
    if (error) console.log(`Error: ${error}`);
    console.log(`Server is up on port ${port}`);
});
