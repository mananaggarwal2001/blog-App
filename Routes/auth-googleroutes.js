const routes = require('express').Router();
const passport = require('passport');
const passportSetup = require('../PassportStrageties/googleStragety');

routes.get('/', (req, res) => {
    res.render('loginCoverPage');
});

routes.get('/home', (req, res) => {
    let userDetails = req.user;
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
    res.render("login", { Link: "register" });
});

routes.get("/register", (req, res) => {
    res.render("register");
});

routes.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

routes.get('/google/Blogverification', passport.authenticate('google'), (req, res) => {
    res.redirect('/home');
});

module.exports = routes;