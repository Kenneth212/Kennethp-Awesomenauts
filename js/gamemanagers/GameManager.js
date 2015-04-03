game.GameTimerManager = Object.extend({
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
					game.data.gold += (game.data.exp1 + 1);
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
		this.gameover = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameover){
			this.gameOver(true);
		}else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
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

	}
});				
	game.SpendGold = Object.extend({
		init: function(x, y, setting){
			this.now = new Date().getTime();
			this.lastBuy = new Date().getTime();
			this.paused = false;
			this.alwaysUpdate = true;
			this.updateWhenPaused = true;
			this.buying = false;
		},

		update: function(){
			this.now = new Date().getTime();

			if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
				this.lastBuy = this.now;
				if(!this.buying){
					this.startBuying();
				}else{
					this.stopBuying();
				}

			}

			this.checkBuyKeys();

			return true;
		},

		startBuying: function(){
			this.buying = true;
			game.data.pausedPos = me.game.viewport.localToWorld(0, 0);
			game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
			game.data.buyscreen.updateWhenPaused = true;
			game.data.buyscreen.setOpacity(0,8)
			me.game.world.addChild(game.data.buyscreen, 34);
			game.data.player.body.setVelocity(0, 0);
			me.state.pause(me.state.PLAY);
			me.input.bindKey(me.input.KEY.F1, "F1", true);
			me.input.bindKey(me.input.KEY.F2, "F2", true);
			me.input.bindKey(me.input.KEY.F3, "F3", true);
			me.input.bindKey(me.input.KEY.F4, "F4", true);
			me.input.bindKey(me.input.KEY.F5, "F5", true);
			me.input.bindKey(me.input.KEY.F6, "F6", true);
			this.setBuyText();
		},

		setBuyText: function(){
			game.data.buytext = new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},
			//The code here will make an enter button show up and to make the game functional.
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10),this.pos.x, this.pos.y + 40);
				this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: "  + game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level " + game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
				this.font.draw(renderer.getContext(), "O Ability " + game.data.ability1 + " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "W Ability " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "E Ability " + game.data.ability3 + " Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y);
				//these will create more buttons in the game and I am going to fix it later, not going to do it now because it is not mandatory.
				//these are power-ups that will be very helpful in the game.
				//In the game the players will be able to buy the power-ups to make the game more enjoyable.
			},
	

		}));
	me.game.world.addChild(game.data.buytext, 35);
		},

		stopBuying: function(){	
			this.buying = false;
			me.state.resume(me.state.PLAY);
			game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
			me.game.world.removeChild(game.data.buyscreen, 34);
			me.input.unbindKey(me.input.KEY.F1, "F1", true);
			me.input.unbindKey(me.input.KEY.F2, "F2", true);
			me.input.unbindKey(me.input.KEY.F3, "F3", true);
			me.input.unbindKey(me.input.KEY.F4, "F4", true);
			me.input.unbindKey(me.input.KEY.F5, "F5", true);
			me.input.unbindKey(me.input.KEY.F6, "F6", true);
			me.game.world.removeChild(game.data.buytext);
			//this code connects to the to other code above, so if you press like F5 you can buy a power-up

		},

		checkBuyKeys: function() {
			if(me.input.isKeyPressed("F1")){
				if (this.checkCost(1)){
					this.makePurchase(1);
				} 
			}else if(me.input.isKeyPressed("F2")){
				if (this.checkCost(2)){
					this.makePurchase(2);
				} 
			}else if(me.input.isKeyPressed("F3")){
				if (this.checkCost(3)){
					this.makePurchase(3);
				} 
			}else if(me.input.isKeyPressed("F4")){
				if (this.checkCost(4)){
					this.makePurchase(4);
				} 
			}else if(me.input.isKeyPressed("F5")){
				if (this.checkCost(5)){
					this.makePurchase(5);
				} 
			}else if(me.input.isKeyPressed("F6")){
				if (this.checkCost(6)){
					this.makePurchase(6);
				} 
			}
		},

		checkCost: function(skill){
			if(skill===1 && (game.data.gold >= (( game.data.skill1+1)*10))){
				return true;
			}else if(skill===2 && (game.data.gold >= (( game.data.skill2+1)*10))){
				return true;
			}else if(skill===3 && (game.data.gold >= (( game.data.skill3+1)*10))){
				return true;
			}else if(skill===4 && (game.data.gold >= (( game.data.ability1+1*10))){
				return true;
			}else if(skill===5 && (game.data.gold >= (( game.data.ability2+1)*10))){
				return true;
			}else if(skill===6 && (game.data.gold >= (( game.data.ability3+1)*10))){
				return true;
			}else{
				return false;
			}
		},

		makePurchase: function(skill){
			if(skill1 === 1)
			game.data.gold -= ((game.data.ability1 +1)* 10);
			game.data.skill1 += 1;
			game.data.player.attack += 1;
		}else if (skill === 2){
			game.data.gold -= ((game.data.skill2 +1)* 10);
			game.data.skill2 += 1;		
		}else if (skill === 3){
			game.data.gold -= ((game.data.skill3 +1)* 10);
			game.data.skill3 += 1;
		}else if (skill === 4){
			game.data.gold -= ((game.data.ability1 +1)* 10);
			game.data.ability1 += 1;
		}else if (skill === 5){
			game.data.gold -= ((game.data.ability2 +1)* 10);
			game.data.ability2 += 1;
		}else if (skill === 6){
			game.data.gold -= ((game.data.ability3 +1)* 10);
			game.data.ability3 += 1;
		}

	});		

