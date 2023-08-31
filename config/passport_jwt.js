const passport = require('passport');
const jwtStategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const { ExtractJwt } = require('passport-jwt');


let opts ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey : 'social',
}

passport.use(new jwtStategy(opts,async function(jwtPayLoad,done){
    try {
        const user = await User.findById(jwtPayLoad._id)
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    } catch (error) {
        console.log("Error while finding user in passport jwt",error);
    }
}))

module.exports = passport;