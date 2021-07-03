 const instagramStrategy = require('passport-instagram').Strategy;
 const googleStragety = require('passport-google-oauth').OAuth2Strategy;
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

 // for destroying the cookie  and retreaving the information


 passport.use(new instagramStrategy({
     clientID: process.env.I_AppId,
     clientSecret: process.env.I_AppSecret,
     callbackURL: "https://git.heroku.com/blogapp-manan.git/instagram/blogVerification",
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