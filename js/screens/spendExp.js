game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	
		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");
		var exp1cost = ((game.data.exp1 + 1 * 10));

		//this line of code will make the enter button be pressed and show up the game.
		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},
			//The code here will make an enter button show up and to make the game functional.
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "START NEW GAME", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},
			//the experince is used to upgrade to new levels and upgrade the character
			//the new game function contains some specific parts for
			//the experience
			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				me.state.change(me.state.PLAY);
			}	
		})));

		//this line of code will make the enter button be pressed and show up the game
		//this code was copyed and some code was removed
		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				this.font = new me.Font("Arial", 26, "white");
			},
			//The code here will make an enter button show up and to make the game functional.
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.fond.draw(renderer.detContext(), "CURRENT EXP: " +  game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				this.fond.draw(renderer.detContext(), "F1: INCREASE GOLD PRODUCTION CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + exp1cost, this.pos.x , this.pos.y + 100);
				this.fond.draw(renderer.detContext(), "F2: ", this.pos.x , this.pos.y + 150);
				this.fond.draw(renderer.detContext(), "F3: ", this.pos.x , this.pos.y + 200);
				this.fond.draw(renderer.detContext(), "F4: ", this.pos.x , this.pos.y + 250);
				//these will create more buttons in the game and I am going to fix it later, not going to do it now because it is not mandatory.
			},
	

		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
			if(action === "F1"){
				if(game.data.exp >= exp1cost){
					game.data.exp1 += 1;
					game.data.exp -= exp1cost;
					game.data.exp -= ((game.data.exp1 + 1 * 10));
					me.state.change(me.state.PLAY);
				}else{
					console.log("not enough experience");
				}
			}else if(action === "F2"){

			}else if(action === "F3"){
				
			}else if(action === "F4"){
				
			}else if(action === "F5"){
				me.state.change(me.state.PLAY);
			}
		}); 

	},
	//this will make the title show up, unfortunately it will not go into your game so you wont 
	//be able to use the game till the title is functional
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		me.input.unbindKey(me.input.KEY.F1, "F1");
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.F5, "F5");
		me.event.unsubscribe(this.handler);
	}
});