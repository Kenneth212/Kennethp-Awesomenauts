game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameover = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameover){
			this.gameOver(true);
			alert("YOU WIN BY DEFAULT!");
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
			alert("YOU DECIDED TO LOSE!")
		}		
			
		return true;
	},
	//this will be used to having a game over.
	gameOver: function(win){
		if(win){
			game.data.exp += 10;
		}else{
			game.data.exp += 1;
		}
		console.log(game.data.exp);
		this.gameover = true;
		me.save.exp = game.data.exp;


		$.ajax({
			type: "POST",
			url: "php/controller/save-user.php",
			data: {
				exp: game.data.exp,
				exp1: game.data.exp1,
				exp2: game.data.exp2,
				exp3: game.data.exp3,
				exp4: game.data.exp4,
			},
			dataType:"text"
		})
				//This will allow the game to save other profiles in the game
				//This will also allow the game to send the player back into the game and see how much
				//experience the player has gotten and see the level and the amount of gold the player might or not have.
				.success(function(response){
					if(response==="true"){
					me.state.change(me.state.MENU);
				} else {
					alert(response);
				}
			})
			.fail(function(response){
				alert("Fail");
			});	

	}


});				
	
