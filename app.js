const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
let objectArray = [];

function blogFunction(bloggerName, catergorySelection, topicName, blogDetails) {
    const object = {
        blogName: bloggerName,
        catergorySelection: catergorySelection,
        topicName: topicName,
        blogDetails: blogDetails
    };
    objectArray.push(object);
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.get("/", function(req, res) {
    res.render("index", { blogArray: objectArray });
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
    console.log(fileDestination);

    blogFunction(bloggerName, catergorySelection, topicName, blogDetails);
    res.render("successfulPage");
})
app.get("/particularBlog/:UserHeading", (req, res) => {
    const HeadingLink = _.lowerCase(req.params.UserHeading);
    objectArray.forEach(element => {
        const BlogHeading = _.lowerCase(element.topicName);
        if (BlogHeading === HeadingLink) {
            res.render("ParticularBlog", {
                ParticularBlogHeading: element.topicName,
                particularBlogParagraph: element.blogDetails

            });
        }

    });
});
app.post("/searchForBlog", (req, res) => {
    const blogName = _.lowerCase(req.body.blogHeadingName);
    objectArray.forEach(element => {
        const blogHeadingName = _.lowerCase(element.topicName);

        if (blogHeadingName === blogName) {
            res.render("ParticularBlog", {
                ParticularBlogHeading: element.topicName,
                particularBlogParagraph: element.blogDetails

            });
        }
    })

});

app.listen("3000", function() {
    console.log("Server is listning to the port 3000");
});