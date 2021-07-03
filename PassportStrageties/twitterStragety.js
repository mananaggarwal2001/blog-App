const twitterStragety = require('passport-twitter').Strategy;
const passport = require('passport');
const User = require('../models/model').AuthRoute;
require('dotenv').config();

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
}); // for creating the user cookie

passport.deserializeUser((user, done) => {
    User.find({ id: user.id }).then((user) => {
        done(null, user);
    });
});


passport.use(new twitterStragety({
        consumerKey: process.env.T_ApiKey,
        consumerSecret: process.env.T_ApiSecretKey,
        callbackURL: "http://localhost:3000/auth/TwittercallBack"
    },
    (token, tokenSecret, profile, done) => {
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