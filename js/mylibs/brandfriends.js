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
	if (location === "page1") {
		$("#bottom .pages").css("left", 0);
		return;
	} else if (location === "page2") {
		$("#bottom .pages").css("left", "-100%");
		return;
	}
	console.log($(".projects").position().top);
	if (location === "previousproject") {
		$("#bottom .pages").css("left", 0);
		if ($(".projects").position().top < 0) {
			$(".projects").css("top", 0);
		} else {
			$(".projects").css("top", -$(".projects").height());
		}
		window.location.hash = "#done";
		return;
	} else if (location === "nextproject") {
		$("#bottom .pages").css("left", 0);
		if ($(".projects").position().top < 0) {
			$(".projects").css("top", 0);
		} else {
			$(".projects").css("top", -$(".projects").height());
		}
		window.location.hash = "#done";
		return;
	}



	var page$ = $("#top ." + location + ".page");

	if (!page$.length) {
		page$ = $("#top .news.page");
	}

	var pageTop = page$.position().top;
	console.log("pageTop", pageTop);
	$("#top .pages").css("top", pageTop * -1);
	
	page$.removeClass("hidden");

	window.scrollTo(0, 0);
};

window.onhashchange();