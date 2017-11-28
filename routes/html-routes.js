// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

	// Each of the below routes just handles the HTML page that the user gets sent to.

	var path = require("path");

	// Routes
	// =============================================================
	module.exports = function(app) {

		// Each of the below routes just handles the HTML page that the user gets sent to.

		// index route loads index.html
		app.get("/", function(req, res) {
			res.sendFile(path.join(__dirname, "../index.html"));
		});

		// login route loads login.html
		app.get("/login", function(req, res) {
			res.sendFile(path.join(__dirname, "../dashboaed.html"));
		});


		// dashboard route loads dashboard.html
		app.get("/dashboard", function(req, res) {
			res.sendFile(path.join(__dirname, "../dashboard.html"));
		});

		// game route loads game.html
		app.get("/game/:name", function(req, res) {
			res.sendFile(path.join(__dirname, "../game.html"));

		});

	};














};
