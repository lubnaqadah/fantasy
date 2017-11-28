module.exports = function(sequelize, DataType){
	var Players = sequelize.define("Players", {
		name: DataType.STRING,
		current_score:DataType.INTEGER,
		club: DataType.STRING,
		position: DataType.STRING,
		value : DataType.INTEGER,
		image: {
			type: DataType.STRING,
			defaultValue: "./images/defaultAvatar.png",
		},
		range: DataType.STRING

	});
	return Players;
}