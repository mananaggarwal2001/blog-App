require('dotenv').config();
const githubStragety = require('passport-github2').Strategy;
const passport = require('passport');
const User = require('../models/model').AuthRoute;

passport.serializeUser((user, done) => {
    done(null, user);
}); // for creating the user cookie


passport.deserializeUser((user, done) => {
    User.find({ id: user.id }).then((user) => {
        console.log(user);
        done(null, user);
    });
});


passport.use(new githubStragety({
        clientID: process.env.ClientSecret,
        clientSecret: process.env.clientId,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({ id: profile.id }).then((currentUser) => {
            if (currentUser) {
                done(null, currentUser);
            } else {
                new User({
                    username: profile.displayName,
                    id: profile.id,
                    imagePath: profile.photos[0].value,
                    email: profile.username,
                }).save().then((user) => {
                    done(null, user);
                });
            }
        });
    }
));