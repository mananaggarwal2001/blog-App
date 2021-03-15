$(".toggleSearchForm").hide();

$(".searchBulb").on('click', function() {
    $(".toggleSearchForm").slideToggle();
    $("input[type='text']").focus();
});

$(".activeimageComponentContainer").toggleClass("showContent", "true");
$(".read-more").on('click', function() {
    $(".activeimageComponentContainer").toggleClass("showContent");
})