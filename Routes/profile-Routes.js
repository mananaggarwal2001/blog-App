const profileRoutes = require('express').Router();
const passportStragety = require('../PassportStrageties/googleStragety');
const passport = require('passport');
const authRout = require('./auth-googleroutes');
const authCheck = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
profileRoutes.get("/home", authCheck, (req, res) => {
    res.render('index');
});

profileRoutes.get("/contactme", authCheck, (req, res) => {
    let userDetails = req.user;
    res.render('contactme', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });
});

profileRoutes.get("/About", authCheck, (req, res) => {
    let userDetails = req.user;
    res.render('about', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });
});

profileRoutes.get("/catergories", authCheck, (req, res) => {
    let userDetails = req.user;
    res.render('catergories', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });
});

profileRoutes.get("/createBlog", authCheck, (req, res) => {
    let userDetails = req.user;
    res.render('createBlog', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });
});

module.exports = profileRoutes;