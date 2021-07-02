const Twitterroutes = require('express').Router();
const passport = require('passport');
const passportSetup = require('../PassportStrageties/twitterStragety');

Twitterroutes.get('/home', (req, res) => {
    let userDetails = req.user;

    res.render('index', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });

});

Twitterroutes.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});
Twitterroutes.get("/login", (req, res) => {
    res.render("login", {
        Link: "register",
        flag: null,
        text: ""
    });
});

Twitterroutes.get('/auth/twitter',
    passport.authenticate('twitter', {
        scope: ['profile', 'email']
    })
);

Twitterroutes.get('/auth/TwittercallBack', passport.authenticate('twitter'), (req, res) => {
    res.redirect('/home');
});

module.exports = Twitterroutes;