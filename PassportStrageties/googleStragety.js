require('dotenv').config();
let googleStragety = require("passport-google-oauth").OAuth2Strategy;
const passport = require('passport');
const User = require('../models/model').AuthRoute;
const key = require('../Keys/key');

passport.serializeUser((user, done) => {
    done(null, user);
}); // for creating the user cookie


passport.deserializeUser((user, done) => {
    User.find({ id: user.id }).then((user) => {
        done(null, user);
    });
});

// for destroying the cookie  and retreaving the information


passport.use(new googleStragety({
    clientID: key.google.CLIENT_ID,
    clientSecret: key.google.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/blogVerification",
}, (request, accessToken, refreshToken, profile, done) => {
    User.findOne({ id: profile.id }).then((currentUser) => {
        if (currentUser) {
            done(null, currentUser);
        } else {
            new User({
                username: profile.displayName,
                id: profile.id,
                imagePath: profile.photos[0].value,
                email: profile.emails[0].value,
            }).save().then((user) => {
                done(null, user);
            });
        }
    });
}));