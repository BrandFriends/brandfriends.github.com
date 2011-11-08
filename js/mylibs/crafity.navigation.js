/*jslint bitwise: true, unparam: true, maxerr: 50, white: true */
/*globals require, module, document, HTMLAnchorElement */

"use strict";

var core = require('crafity.core')
	, navigation = {}
	, window$ = $(window);

function HashInfo() {
	"use strict";
	var self = this;

	this.onChange = new core.Event();
	this.previousValues = {};
	this.values = {};
	this.hashString = undefined;

	this.update = function (hashString) {
		var member, keyValuePairs;
		self.previousValues = {};
		for (member in self.values) {
			if (self.values.hasOwnProperty(member)) {
				self.previousValues[member] = self.values[member];
				delete self.values[member];
			}
		}
		if (typeof hashString === "string" && hashString.length > 0) {
			keyValuePairs = hashString.split("&");
			$(keyValuePairs).each(function (index, keyValuePair) {
				var keyValue = keyValuePair.split("=");
				if (keyValue.length === 2) {
					self.values[keyValue[0]] = keyValue[1];
				} else if (keyValue.length === 1 && keyValuePair[0] === "!") {
					self.values["href"] = keyValuePair.substr(1);
				} else {
					throw new Error("Invalid hash '" + keyValuePair + "'")
				}
			});
		}
	};

	this.toString = function () {
		var result = self.values.href ? "!" + self.values.href : "", member;
		for (member in self.values) {
			if (self.values.hasOwnProperty(member) && member !== 'href') {
				result += (result.length > 0 ? "&" : "") + member + "=" + self.values[member];
			}
		}
		return result;
	};

	this.change = function (options) {
		//var temp = core.objects.clone(self.values), member, hashTag;
		var currentHash = window$.get(0).location.hash
			, hashTag;

		core.objects.forEach(options, function (value, member) {
			if (typeof value !== "undefined") {
				self.values[member] = value;
			} else {
				delete self.values[member];
			}
		});

		hashTag = self.toString();

		window$.get(0).location.hash = hashTag ? "#" + hashTag : "";
	};

	window$.bind("hashchange", function () {
		self.hashString = window$.get(0).location.hash.substring(1);
		self.update(self.hashString);

		self.onChange.raise(self.toString());
	});
}

navigation.hashInfo = new HashInfo();

$(function () {
	"use strict";
	window$.trigger("hashchange");

});