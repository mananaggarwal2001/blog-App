require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const _ = require("lodash");
const app = express();
const mongoose = require('mongoose');
let googleStragety = require("passport-google-oauth").OAuth2Strategy;
let session = require('express-session');
const passport = require('passport');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');


app.use(bodyparser.urlencoded({ extended: true })); // for accessing the part of the html code.
app.use(express.static("public")); // for accessing the static pages
app.set('view engine', 'ejs'); // for the ejs scripting
app.get("/", (req, res) => {
    res.render("loginCoverPage");
});



app.post("/", (req, res) => {
    let ButtonName = req.body.formButton;
    if (ButtonName == "Login") {
        res.redirect("/login");
    } else if (ButtonName == "Register") {
        res.redirect("/register");
    }
    console.log(ButtonName);
});
// for getting  the google oauth passport authentication
// for opening the registration form and the login form.

app.get("/login", (req, res) => {
    res.render("login", { Link: "register" });
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.listen(3000, () => {
    console.log("app is listening to the port 3000");
});

// google oAuth2.0 Security Implementation
app.use(session({
    secret: process.env.CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 24 * 60
    }
}));
// for initilization of the cookie session which was saved in the browser.
app.use(passport.initialize());
app.use(passport.session());

// for the mongodb connection to the local computer dataBase.



let mongooseError = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect("mongodb://localhost:27017/BlogDetails", mongooseError, (err) => {
    if (err) {
        console.log("MongoDB Session is not able to connect");
    } else {
        console.log("Session Connected Successfully");
    }
});
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    googleid: {
        type: String
    }
});
userSchema.plugin(findOrCreate); // findorcreate is not available in the mongoose directory.
userSchema.plugin(passportLocalMongoose); // for using the passport create Stragety.
const userModel = mongoose.model("loginDetails", userSchema);
passport.use(userModel.createStrategy());

passport.use(new googleStragety({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/BlogVerification",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return done(err, user); // to pass the middle ware to the next MiddleWare.
        });
    }
));