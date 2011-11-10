/*jslint bitwise: true, unparam: true, maxerr: 50, white: true */
/*globals window, setTimeout, jQuery*/
/*!
 * crafity.arrays
 * Copyright(c) 2011 Crafity
 * Copyright(c) 2011 Bart Riemens
 * Copyright(c) 2011 Galina Slavova
 * MIT Licensed
 */

(function (crafity, $) {
	"use strict";

	if (!crafity.navigation) {
		throw new Error("Missing dependency 'crafity.navigation'");
	}

	var hashInfo = crafity.navigation.hashInfo;

	// Remove the id's from the pages
	//  so page does not scroll down
	//  when a link is clicked.
	//  From this point on the navigation
	//  is controlled by JavaScript.
	$(".page").attr("id", null);

	$(".project.buttons.panel").delegate(".button", "click", function onclick() {
		var currentProject$ = $(".projects .current.project")
			, project = "", nextProject$, previousProject$;
		if (this.getAttribute("href") === "#next") {
			nextProject$ = currentProject$.next();
			// If there is no next project,
			//  then check the first project
			if (nextProject$.length === 0) {
				nextProject$ = $(".projects .project:first");
			}
			// If there is still no project,
			//  then there is something wrong
			if (nextProject$.length === 0) {
				throw new Error("Unable to find a project");
			}
			project = nextProject$.attr("id");
		} else if (this.getAttribute("href") === "#previous") {
			previousProject$ = currentProject$.prev();
			// If there is no previous project,
			//  then check the last project
			if (previousProject$.length === 0) {
				previousProject$ = $(".projects .project:last");
			}
			// If there is still no project,
			//  then there is something wrong
			if (previousProject$.length === 0) {
				throw new Error("Unable to find a project");
			}
			project = previousProject$.attr("id");
		} else {
			throw new Error("Unknown command");
		}
		hashInfo.change({ project: project, tab: 1 });
		return false;
	});
	$(".tab.buttons.panel").delegate(".button", "click", function onclick() {
		hashInfo.change({ tab: this.getAttribute("href").substr(4) });
		return false;
	});
	$(".main.menu").delegate(".item a", "click", function onclick() {
		hashInfo.change({ page: this.getAttribute("href").substr(1) });
		return false;
	});

	hashInfo.onChange.subscribe(function (hashString, values, previousValues) {
		(function navigateThroughProjects() {

			// If there is no project specified or the project didn't change
			//  then don't do anything with the project
			if ((!values.project && !previousValues.project) ||
				values.project === previousValues.project) {
				return;

			} else {

				var project$ = $("#bottom .projects .project#" + values.project)
					, lastShownTabs = $("#bottom .current.project .tabs");

				if (project$.hasClass("current")) {
					return;
				}

				if (values.project !== previousValues.project) {
					setTimeout(function () {
						lastShownTabs.css("left", "0%");
					}, 400);
				}

				$("#bottom .projects .current.project").removeClass("current");
				project$.addClass("current");
				$(".projects").css("top", -project$.position().top);
				$(".tab.panel .current", project$).removeClass("current");
				$(".tab.panel .button[href=#tab" + 1 + "]", project$).addClass("current");
			}
		}());

		(function navigateThroughProjectTabs() {
			// If there is no tab specified or the tab didn't change
			//  then don't do anything with the tab
			if ((!values.tab && !previousValues.tab) ||
				values.tab === previousValues.tab) {
				return;
			}

			// reset the current page in projects section in the beginning
			var buttons$ = $(".tab .button").removeClass("current")
				, number = parseInt(values.tab, 10) - 1;

			buttons$.each(function () {
				if ($(this).text() === values.tab) {
					$(this).addClass("current");
				}
			});

			$("#bottom .current.project .tabs")
				.css("left", (number * -100) + "%");

		}());

		(function navigateThroughPages() {
			// If there is no page specified or the page didn't change
			//  then don't do anything with the page
			if ((!values.page && !previousValues.page) ||
				values.page === previousValues.page) {
				return;
			}
			// See if there is a page with the specified name
			var requestedPage$ = $("#top .page." + hashInfo.values.page)
				, pageTop = requestedPage$.position().top;

			// If there is, then scroll the page into view
			if (requestedPage$.length) {
				$("#top .pages").css("top", pageTop * -1);
				window.scrollTo(0, 0);
			}
		}());

	});

}(window.crafity = window.crafity || {}, jQuery));