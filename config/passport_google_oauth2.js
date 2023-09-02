const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: '389802254139-5q6clpt87b9qovp9eed9oln2ft1obesk.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
            return done(null, user);
        } else {
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, newUser);
        }
    } catch (error) {
        console.log('Error in Google strategy-passport:', error);
        return done(error, null);
    }
}));

module.exports = passport;
