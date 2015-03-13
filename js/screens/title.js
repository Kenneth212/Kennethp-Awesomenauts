game.TitleScreen = me.ScreenObject.extend({
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
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},
			//The code here will make an enter button show up and to make the game functional.
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},
			//the new game function contains some specific parts for
			//the experience
			newGame: function(){
				game.data.exp = me.save.exp;
				game.data.exp1 = me.save.exp1;
				game.data.exp2 = me.save.exp2;
				game.data.exp3 = me.save.exp3;
				game.data.exp4 = me.save.exp4;
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.SPENDEXP);
			//so this will make the continue button be pressed and head over to the spend page
			}	
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
