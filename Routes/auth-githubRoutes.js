const githubRoutes = require('express').Router();
const passport = require('passport');
const passportSetup = require('../PassportStrageties/githubStragety');
githubRoutes.get('/', (req, res) => {
    res.render('loginCoverPage');
});

githubRoutes.get('/register', (req, res) => {
    res.render('register', {
        Email: []
    });
});

githubRoutes.get('/home', (req, res) => {
    let userDetails = req.user;
    res.render('index', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });

});

githubRoutes.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});


githubRoutes.get("/login", (req, res) => {
    res.render("login", { Link: "register" });
});

githubRoutes.get('/auth/github',
    passport.authenticate('github', {
        scope: ['profile']
    })
);

githubRoutes.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect('/home');
});

module.exports = githubRoutes;