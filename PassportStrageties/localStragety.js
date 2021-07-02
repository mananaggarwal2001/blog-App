const localStragety = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../models/model').AuthRoute;
const LocalModel = require('../models/model').LocalRoute;
const md5 = require('md5');
passport.serializeUser((user, done) => {
    done(null, user);
}); // for creating the user cookie


passport.deserializeUser((user, done) => {
    User.find({ id: user.id }).then((user) => {
        console.log(user);
        done(null, user);
    });
});

passport.use(new localStragety((username, password, done) => {
    let hashPassword = md5(password);

    if (username == null || password == null) {
        done(null, false);
    } else {
        LocalModel.findOne({
            email: username
        }).then((currentResult) => {
            if (currentResult.email !== username) {
                done(null, false);
            } else if (currentResult.password !== hashPassword) {
                done(null, false, { message: "Incorrect Password" });
            } else if (currentResult.password === hashPassword && currentResult.email === username) {
                User.findOne({
                    email: currentResult.email
                }).then((user) => {
                    console.log(user);
                    done(null, user);
                });
            }
        })
    }
}));