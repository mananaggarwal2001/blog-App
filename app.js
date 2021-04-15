const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/blogDetailDB", { useUnifiedTopology: true });


const mainDetailsSchema = mongoose.Schema({
    blogName: {
        type: String,
        reqired: true
    },
    catergorySelection: {
        type: String,
        required: true
    },
    topicName: {
        type: String,
        required: true
    },
    blogDetails: {
        type: String,
        required: true
    }
});
const blogModel = mongoose.model("bloginformation", mainDetailsSchema);


function blogFunction(bloggerName, catergorySelection, topicName, blogDetails) {
    let newBlog = new blogModel({
        blogName: bloggerName,
        catergorySelection: catergorySelection,
        topicName: topicName,
        blogDetails: blogDetails
    });
    blogArray.push(newBlog);
    newBlog.save(); // Saving in the blog model
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    blogModel.find({}, (err, results) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("index", {
                blogArray: results,
            });
        }
    })
});

app.get("/successfulPage", function(req, res) {
    res.redirect("/");
})

app.post("/blogDetails", function(req, res) {
    let bloggerName = req.body.bloggerName;
    let catergorySelection = req.body.catergorySelection;
    let topicName = req.body.topicName;
    let blogDetails = req.body.blogDetails;
    let fileDestination = __dirname + "/" + req.body.fileDestination;

    blogFunction(bloggerName, catergorySelection, topicName, blogDetails);
    res.render("successfulPage");
});
app.get("/particularBlog/:UserID", (req, res) => {
    const HeadingLink = req.params.UserID;
    blogModel.find({ _id: HeadingLink }, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            results.forEach(resultElement => {
                res.render("ParticularBlog", {
                    ParticularBlogHeading: resultElement.topicName,
                    particularBlogParagraph: resultElement.blogDetails
                });
            });
        }
    });
})

app.post("/searchForBlog", (req, res) => {
    const blogHeadingName = _.lowerCase(req.body.blogHeadingName);
    blogModel.find({}, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            results.forEach(resultElement => {
                let blogTopicName = _.lowerCase(resultElement.topicName);
                if (blogTopicName === blogHeadingName) {
                    res.render("ParticularBlog", {
                        ParticularBlogHeading: resultElement.topicName,
                        particularBlogParagraph: resultElement.blogDetails
                    });
                }
            })
        }
    })
});
app.post("/", (req, res) => {
    let catergoryVariable = req.body.catergory;
    blogModel.find({}, (err, results) => {
        if (err) {
            console.log(err);
        } else {

            res.render('catergoryPage', {
                blogArray: results,
                chosenCatergory: catergoryVariable
            });


        }
    });

});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listning to the port 3000");
});