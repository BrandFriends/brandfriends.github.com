$(document).ready(function () {

	// Remove the id's from the pages
	//  so page does not scroll down
	//  when a link is clicked.
	//  From this point on the navigation
	//  is controlled by JavaScript.
	$(".page").attr("id", null);

	$(".buttons.panel").delegate(".button", "click", function onclick() {
		console.log("href", this.getAttribute("href"));
		return false;
	});

	window.onhashchange = function () {

		var hash = window.location.hash.substr(1) || "";//news";
		(function navigateThroughProjectTabs() {
			if (hash.indexOf("page") === 0) {
				// reset the current page in projects section in the beginning
				$(".button").removeClass("current");

				var pageNumber = hash.substr(4);

				$(".button").each(function () {
					if ($(this).text() === pageNumber) {

						$(this).addClass("current");
					}
				});

				var number = parseInt(pageNumber) - 1;
				$("#bottom .pages").css("left", (number * -100) + "%");
				return;
			}
		}());

		(function navigateThroughProjects() {

			var indexOfProject = hash.indexOf("project");

			if (indexOfProject > 0) {

				var prevNextProject = hash.substr(0, indexOfProject);

				// set this project to its first (leftmost) page
				$("#bottom .pages").css("left", 0);

				if ($(".projects").position().top < 0) {
					$(".projects").css("top", 0);
					$(".projects .project").removeClass("current").first().addClass("current");
					$(".button").removeClass("current");

					$(".projects .project.current .button").each(function () {
						if ($(this).text() === "1") {
							$(this).addClass("current");
						}
					});
				} else {

					$(".projects").css("top", -$(".projects").height());
					$(".projects .project").removeClass("current").last().addClass("current");
					$(".button").removeClass("current");

					$(".projects .project.current .button").each(function () {
						if ($(this).text() === "1") {
							$(this).addClass("current");
						}
					});
				}

				window.location.hash = "#done";
				return;
			}

		}());

		(function navigateThroughPages() {
			var requestedPage$ = $("#top .page." + hash);
			if (requestedPage$.length) {
				var pageTop = requestedPage$.position().top;
				$("#top .pages").css("top", pageTop * -1);

				window.scrollTo(0, 0);
			}
		}());

	};

	window.onhashchange();
});