const localRoutes = require('express').Router();
const localModel = require('../models/model').LocalRoute;
const authroute = require('../models/model').AuthRoute;
const passport = require('passport');
const PassportStrageties = require('../PassportStrageties/localStragety');
const md5 = require('md5');

localRoutes.get('/home', (req, res) => {
    let userDetails = req.user;

    res.render('index', {
        username: userDetails[0].username,
        email: userDetails[0].email,
        imagedisplay: userDetails[0].imagePath,
    });

});

// const userDetailsSchema = new mongoose.Schema({
//     firstName: {
//         type: String
//     },
//     lastName: {
//         type: String
//     },
//     username: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     password: {
//         type: String
//     }
// });



// for the login details
// const authenticationSchema = new mongoose.Schema({
//     username: {
//         type: String
//     },
//     id: {
//         type: String
//     },
//     imagePath: {
//         type: String
//     },
//     email: {
//         type: String
//     }
// });
localRoutes.post('/register', (req, res) => {
    let detailsVariable = req.body;
    localModel.findOne({ email: detailsVariable.email }).then((currentUser) => {
        if (currentUser) {
            res.render('register', {
                text: 'Email Already Exist ',
                flag: false,
            });
            return false;
        } else {
            new localModel({
                firstName: detailsVariable.firstName,
                lastName: detailsVariable.lastName,
                username: detailsVariable.Username,
                email: detailsVariable.email,
                password: md5(detailsVariable.password)
            }).save().then((newUser) => {
                console.log(newUser);
            });

            new authroute({
                username: detailsVariable.Username,
                id: detailsVariable.id,
                imagePath: "https://i.pinimg.com/originals/96/5d/82/965d8295b27119eb6d129c116de9ead0.jpg",
                email: detailsVariable.email
            }).save().then((currentUser) => {
                console.log(currentUser);
            });

            res.redirect('/login');
        }
    });
});

const loginverification = (req, res, next) => {
    hashPassword = md5(req.body.password);
    Email = req.body.username;
    authroute.findOne({ email: Email }).then((currentUser) => {
        if (!currentUser) {
            console.log(false);
            res.render('login', {
                Link: "register",
                flag: false,
                text: "Email Does Not Exist"
            });
        } else if (currentUser) {
            localModel.findOne({ email: currentUser.email }).then((existingUser) => {
                if (existingUser.password === hashPassword) {
                    next();
                } else {
                    res.render('login', {
                        Link: "register",
                        flag: false,
                        text: "Incorrect Password !!!!!!!!!!!!!!!!!!!!"
                    });
                }
            })
        }
    });
}

localRoutes.post('/login', loginverification, passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

module.exports = localRoutes;

// new local modules for creating the modules.


// new localModel({
//     firstName: details.firstName,
//     lastName: details.lastName,
//     username: details.Username,
//     email: details.email,
//     password: details.password
// }).save().then((newUser) => {
//     console.log(newUser);
// });

// new authroute({
//     username: details.Username,
//     id: details.id,
//     imagePath: "null",
//     email: details.email
// }).save().then((currentUser) => {
//     console.log(currentUser);
// });