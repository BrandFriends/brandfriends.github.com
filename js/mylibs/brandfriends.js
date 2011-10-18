window.onhashchange = function () {
	var location = window.location.hash.substr(1) || "news";
	console.log(location);
	$(".page").addClass("hidden");
	var page$ = $("." + location + ".page");
	
	if (!page$.length) {
		page$ = $(".news.page");
	}
	page$.removeClass("hidden");
};

window.onhashchange();