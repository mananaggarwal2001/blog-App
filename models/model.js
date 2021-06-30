const mongoose = require('mongoose');
const feildEncrypt = require('mongoose-field-encryption').fieldEncryption;
const key = require('../Keys/key');


let mongooseError = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect("mongodb://localhost:27017/BlogInformation", mongooseError, (err) => {
    if (err) {
        console.log("MongoDB Session is not able to connect");
    } else {
        console.log("Session Connected Successfully");
    }
});

const authenticationSchema = new mongoose.Schema({
    username: {
        type: String
    },
    id: {
        type: String
    },
    imagePath: {
        type: String
    },
    email: {
        type: String
    }
});
const userDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String
    }
});

userDetailsSchema.plugin(feildEncrypt, { fields: ['password'], secret: key.localKey });
const User = mongoose.model("loginDetails", authenticationSchema);
const localDetails = mongoose.model("localDetails", userDetailsSchema);


module.exports = {
    AuthRoute: User,
    LocalRoute: localDetails

};