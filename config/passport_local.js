const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
}, async function(req, email, password, done) {
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            req.flash('error', 'Invalid username or password');
            return done(null, false);
        } 
        return done(null, user);
    } catch (error) {
        console.log("Error while find user --> passport local", error);
        return done(error, false);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (error) {
        console.log("Error while finding user in deserializeUser", error);
        return done(error, null);
    }
});

passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please log in to access this page'); // Flash message for unauthenticated users
    return res.redirect('/users/sign-in');
};

passport.setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
