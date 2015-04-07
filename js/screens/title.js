game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	
		game.data.option1 = new (me.Renderable.extend({
		//this line of code will make the enter button be pressed and show up the game.
		
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
				me.input.releasePointerEvent('pointerdown', game.data.option2);
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				me.save.add({exp: 0,exp: 1,exp: 2,exp: 3,exp: 4,})
				me.state.change(me.state.NEW);
				//so the option1 and option2 will give us the control of the game to press and on the game and
				//nothing horrible will happen to the controls.
			}	
		}));

		//this line of code will make the enter button be pressed and show up the game
		//this code was copyed and some code was removed
		me.game.world.addChild = new (me.Renderable.extend({

		game.data.option2 = new (me.Renderable.extend({
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
				me.input.releasePointerEvent('pointerdown', game.data.option1);
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.LOAD);
			//so this will make the continue button be pressed and head over to the spend page
			//the option1 and option2 will be very helpful to the game.
			//and alo the pointer events with option1 and option2 will take the player off from going to the menu screen and 
			//leave the screen as is.
			}	
		}));

	
		me.game.world.addChild(game.data.option2);
	},

	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
