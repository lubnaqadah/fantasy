window.onload = function() {
alert(team);
	$.get("/api/players", function(data){

		for (var i =0; i< data.length; i++){	
			for(var j = 0; j< team.length; j++){
				if(team[j] == data[i].id){
					console.log(j, data[i].id)

					createNewPlayer(data[i]);
					$(".userTeam").append(player);
				}
			}
		}
	});
}
