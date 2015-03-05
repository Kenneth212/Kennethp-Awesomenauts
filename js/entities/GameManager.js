game.GameManager = Object.extend({
			init: function(x, y, settings){
				this.now = new Date().getTime();
				this.lastCreep = new Date().getTime();
				this.paused = false;
				this.alwaysUpdate = true;
			},

			update: function() {
				this.now = new Date().getTime();
				this.goldTimerCheck();
				this.creepTimerCheck();
				//so some of the code had to be taken off because some update
				//this code is the replacement or plan b

				return true;
			},
			//this is a function to contain the gold timer check

			goldTimerCheck: function(){
					if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
					game.data.gold += 1;
					console.log("Current gold : " + game.data.gold);
				}
			},
			//this is a function to contain the creep timer check
			creepTimerCheck: function(){
					if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
					this.lastCreep = this.now;
					var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
					me.game.world.addChild(creepe, 5);
				}
			}
		});

game.HeroDeathManager =  Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;

	},

	update: function(){
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}

		return true;
	}
});
//this function was created in video 36 and it is used to check the experience
game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameOver = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameOver){
			game.data.exp += 10;
			this.gameOver = true;
		}else if(game.data.win === false && !this.gameOver){
			game.data.exp += 1;
			this.gameOver = true;
		}		
		console.log("game.data.exp");

		return true;
	}			
});						

