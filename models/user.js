module.exports = function(sequelize, DataType){
	var Users = sequelize.define("Users", {
		name: DataType.STRING,
		email:DataType.STRING,
		password:DataType.STRING,
		image: {
			type: DataType.STRING,
			defaultValue: "images/defaultAvatar.png",
		},
		teamName: DataType.STRING,
		teamMembers: DataType.STRING,
		score: {
			type:DataType.INTEGER,
			defaultValue:0
		},
		latestScore: {
			type:DataType.INTEGER,
			defaultValue:0
		}
	});
	return Users;
};




//var User = module.exports = mongoose.model('User', UserSchema);
//
//module.exports.createUser = function(newUser, callback){
//	bcrypt.genSalt(10, function(err, salt) {
//	    bcrypt.hash(newUser.password, salt, function(err, hash) {
//	        newUser.password = hash;
//	        newUser.save(callback);
//	    });
//	});
//}
//
//module.exports.getUserByUsername = function(username, callback){
//	var query = {username: username};
//	User.findOne(query, callback);
//}
//
//module.exports.getUserById = function(id, callback){
//	User.findById(id, callback);
//}
//
//module.exports.comparePassword = function(candidatePassword, hash, callback){
//	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//    	if(err) throw err;
//    	callback(null, isMatch);
//	});
//}