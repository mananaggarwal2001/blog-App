const mongoose = require('mongoose');
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

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    googleid: {
        type: String
    },
    imagePath: {
        type: String
    },
    email: {
        type: String
    }
});

const User = mongoose.model("loginDetails", userSchema);

module.exports = User;