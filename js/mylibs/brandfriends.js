// Remove the id's from the pages
//  so page does not scroll down
//  when a link is clicked.
//  From this point on the navigation
//  is controlled by JavaScript.
$(".page").attr("id", null);

window.onhashchange = function () {
	var location = window.location.hash.substr(1) || "news";
	console.log(location);
	//$(".page").addClass("hidden");
	var page$ = $("." + location + ".page");

	if (!page$.length) {
		page$ = $(".news.page");
	}

	var pageTop = page$.position().top;
	console.log("pageTop", pageTop);
	$(".pages").css("top", pageTop * -1);
	
	page$.removeClass("hidden");

	window.scrollTo(0, 0);
};

window.onhashchange();