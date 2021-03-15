$(".submitButtonClass").on("click", function() {
    let blogName = $(".bloggerNameClass").val();
    let blogHeading = $(".bloggerHeadingClass").val();
    let blogDetails = $(".textAreaClass").val();
    if (blogName === "") {
        alert("Blogger Name is missing....");
        return false;
    } else if (blogHeading === "") {
        alert("Blog Heading is missing....");
        return false;
    } else if (blogDetails === "") {
        alert("Blog Details is missing");
        return false;
    } else {
        return true;
    }
})