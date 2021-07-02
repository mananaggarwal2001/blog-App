require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyparser = require('body-parser');
const app = express();
let session = require('express-session');
const passport = require('passport');
const routes = require('./Routes/auth-googleroutes');
const profileRoutes = require('./Routes/profile-Routes');
const CookieSession = require('cookie-session');
const twitterAuthRoutes = require('./Routes/auth-twitterRoutes');
const githubRoutes = require('./Routes/auth-githubRoutes');
const register = require('./Routes/auth-localRoute');
const User = require('./models/model').AuthRoute;
const cookieSession = require('cookie-session');


app.use(bodyparser.urlencoded({ extended: true })); // for accessing the part of the html code.
app.set('view engine', 'ejs'); // for the ejs scripting
app.use(express.static("public")); // for accessing the static pages
app.post("/", (req, res) => {
    let ButtonName = req.body.formButton;
    if (ButtonName == "Login") {
        res.redirect("/login");
    } else if (ButtonName == "Register") {
        res.redirect("/register");
    }
    console.log(ButtonName);
});
// google oAuth2.0 Security Implementation
app.use(cookieSession({
    secret: process.env.localKey,
    maxAge: 1000 * 60 * 60 * 24,

}));


// for initilization of the cookie session which was saved in the browser.
app.use(passport.initialize());
app.use(passport.session());


// for using the routes folder in the app.
app.use(routes);
app.use(profileRoutes);
app.use(twitterAuthRoutes);
app.use(githubRoutes);
app.use(register);

const port = process.env.PORT || 3000;
app.set('port', port);
app.listen(port, () => {
    console.log("app is listening to the port 3000");
});