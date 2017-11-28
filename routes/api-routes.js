// Requiring the models
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {

	// GET route for getting all of the users data
	app.get("/api/players", function(req, res) {

		db.Players.findAll({}).then(function(dbPlayers) {

			res.json(dbPlayers);


		});
	});

	// GET route for getting all of the users
	app.get("/api/users", function(req, res) {
		console.log(req.query.name);
		db.Users.findAll({
			where:{
				name :{
					ne:req.query.name
				}
			},
			limit : 3,

		}).then(function(dbUsers) {

			res.json(dbUsers);


		});
	});





	// POST route for saving a new user
	app.post("/api/users", function(req, res) {
		randomTeam(function(teamMembers) {
			writeUser(req.body.username, req.body.email, req.body.password, teamMembers);

		});

		res.redirect("/login");

	});


	// PUT route for updating users teams.
	app.put("/api/users", function(req, res) {
		console.log("Hello", req.body.team, req.body.userName,req.body.score);
		db.Users.update({
			teamMembers: req.body.team,
			score: req.body.score
		}, {
			where: {
				name: req.body.userName
			}
		}).then(function(dbusers) {
			res.json(dbusers);
		});
	});



	app.get("/api/team/:name", function(req,res){
		console.log("====name====" + req.params.name);
		db.Users.findOne({
			where: {
				name: req.params.name
			}
		}).then(function(data){
			res.json(data);
		});
	})


	app.get("/api/stats", function(req,res){

		db.Players.findAll({}).then(function(dbPlayers) {

			getPerformance(dbPlayers)
			res.json(true);

		});

		db.Users.findAll({}).then(function(dbUsers) {

			for(var i =0; i < dbUsers.length; i++){
				getScore(dbUsers[i])
			}

		});

	})


	app.get("/api/leader", function(req,res){

		db.Users.findAll({
			order: [
				['score', 'DESC'],
			],
			limit: 5
		}).then(function(dbUsers) {

			res.json(dbUsers);

		});

	})


	function randomTeam(cb){
		db.Players.findAll({
			where: {
				value: 0
			}
		}).then(function(dbPlayers) {
			var numbersGenerated = [];
			var teamMembers = [];
			while (teamMembers.length < 7){

				var randomID = Math.floor(Math.random() * dbPlayers.length);

				if (numbersGenerated.indexOf(randomID) == -1){

					teamMembers.push(dbPlayers[randomID].id);
					numbersGenerated.push(randomID);
				}

			}
			console.log(teamMembers.toString());
			cb(teamMembers);
			//return teamMembers.toString();
		});
	};




	function writeUser(username, email, password, teamMembers) {
		db.Users.create({
			name: username,
			email: email,
			password: password,
			teamName: username + " Team",
			teamMembers : teamMembers.toString()
		})
			.then(function(dbUser) {
			return dbUser;

		});
	};



	function getPerformance(dbPlayers){
		for( var i = 0;i< dbPlayers.length; i++){
			var range = dbPlayers[i].range.split(",");
			var id = dbPlayers[i].id;
			var randomNum = Math.floor(Math.random() * range.length);
			var randomPerformance = range[randomNum];

			//			console.log("range", range.length,"randomPerformance",randomPerformance);

			db.Players.update({
				current_score: randomPerformance
			}, {
				where: {
					id: id
				}
			}).then(function(dbPlayers) {


			});
		}
	}

	function getScore(data){
		var team = data.teamMembers.split(",");
		var score = data.score;
		var points = 0;
		var userID;
		for (var i = 0; i< team.length;i++){
			userID = team[i];
			db.Players.findOne({

				where:{
					id:userID
				}
			}).then(function(res){
				points += res.current_score;
				console.log(points);

				db.Users.update({
					score: points + score,
					latestScore: points
				}, {
					where: {
						id: data.id
					}
				}).then(function(dbPlayers) {


				});
			})
		}
	}


};




