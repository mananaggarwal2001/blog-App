const routes = require('express').Router();
const passport = require('passport');
const passportSetup = require('../PassportStrageties/googleStragety');


routes.get('/home', (req, res) => {
    let userDetails = req.user;
    console.log(req.user);
    res.render('index', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });

});

routes.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});
routes.get("/login", (req, res) => {
    res.render("login", {
        Link: "register",
        flag: null,
        text: ""
    });
});
routes.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.google.com/m8/feeds']
    })
);

routes.get('/google/Blogverification', passport.authenticate('google'), (req, res) => {
    res.redirect('/home');
});

module.exports = routes;