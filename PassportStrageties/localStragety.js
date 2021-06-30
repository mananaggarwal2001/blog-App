const localStragety = require('passport-local').Strategy;
const passport = require('passport');


passport.use(new localStragety((username, password, done) => {

}))