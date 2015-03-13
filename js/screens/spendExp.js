game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	

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
				this.font = new me.Font("Arial", 46, "white");
			},
			//The code here will make an enter button show up and to make the game functional.
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.fond.draw(renderer.detContext(), "CURRENT EXP: " + game.data.exp. toString(), this.pos.x + 100, this.pos.y + 50);
				this.fond.draw(renderer.detContext(), "CURRENT EXP: " + game.data.exp. toString(), this.pos.x + 200, this.pos.y + 100);
				this.fond.draw(renderer.detContext(), "CURRENT EXP: " + game.data.exp. toString(), this.pos.x + 200, this.pos.y + 150);
				this.fond.draw(renderer.detContext(), "CURRENT EXP: " + game.data.exp. toString(), this.pos.x + 200, this.pos.y + 200);
				this.fond.draw(renderer.detContext(), "CURRENT EXP: " + game.data.exp. toString(), this.pos.x + 200, this.pos.y + 250);
			},
	
		})));

	},
	//this will make the title show up, unfortunately it will not go into your game so you wont 
	//be able to use the game till the title is functional
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});