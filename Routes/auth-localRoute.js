const localRoutes = require('express').Router();
const localModel = require('../models/model').LocalRoute;
const authroute = require('../models/model').AuthRoute;
var dataArray = [];
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
    localModel.find({}).then((currentUser) => {
        console.log(currentUser);
    });

});


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