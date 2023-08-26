const passport = require('passport')
const User = require('../models/user');
const LocalStrategy = require('passport-local');


passport.use(new LocalStrategy({
    usernameField:'email'
},async function(email,password,done){
    try {
        const user = await User.findOne({email});
        if(!user || user.password !== password){
            console.log("User not found");
            return done(null,false);
        }
        return done(null,user);
    } catch (error) {
        console.log("Error while find user --> passport local",error);
    }
}))


passport.serializeUser(function(user,done){
    done(null,user.id);
})


passport.deserializeUser(async function(id,done){
    try {
        const user = await User.findById(id);
        return done(null,user);
    } catch (error) {
        console.log("Error while finding user in deserializeUser",error);
    }
})

passport.checkAuthentication = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;