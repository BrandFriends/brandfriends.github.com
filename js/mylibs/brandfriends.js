// Remove the id's from the pages
//  so page does not scroll down
//  when a link is clicked.
//  From this point on the navigation
//  is controlled by JavaScript.
$(".page").attr("id", null);

window.onhashchange = function () {
	var location = window.location.hash.substr(1) || "news";
	console.log("location: " + location);

	if (location.indexOf("page") === 0) {
		// reset the current page in projects section in the beginning
		$(".button").removeClass("current");

		var pageNumber = location.substr(4);

		$(".button").each(function () {
			if ($(this).text() === pageNumber) {

				//console.log("Targeted button: " + pageNumber);
				$(this).addClass("current");
			}
		});

		var number = parseInt(pageNumber) - 1;
		$("#bottom .pages").css("left", (number * -100) + "%");
		return;
	}

	console.log(".peojects.position.top: " + $(".projects").position().top);

	var indexOfProject = location.indexOf("project");
	console.log("indexOfProject: " + indexOfProject);
	if (indexOfProject > 0) {

		var prevNextProject = location.substr(0, indexOfProject);

		// set this project to its first (leftmost) page
		$("#bottom .pages").css("left", 0);

		if ($(".projects").position().top < 0) {
			$(".projects").css("top", 0);
			$(".projects .project").removeClass("current").first().addClass("current");
			$(".button").removeClass("current");

			$(".projects .project.current .button").each(function () {
				if ($(this).text() === "1") {
					console.log("Add class current to button!");
					$(this).addClass("current");
				}
			});
		} else {
			$(".projects").css("top", -$(".projects").height());
			$(".projects .project").removeClass("current").last().addClass("current");
			$(".button").removeClass("current");

			$(".projects .project.current .button").each(function () {
				if ($(this).text() === "1") {
					console.log("Add class current to button!");
					$(this).addClass("current");
				}
			});
		}

		window.location.hash = "#done";
		return;
	}

	/*
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
	 */
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