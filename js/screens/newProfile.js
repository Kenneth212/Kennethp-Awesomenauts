game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	 //so this file will create an area in the game to make a new profile
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO
		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";


		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);

		//this line of code will make the enter button be pressed and show up the game.
		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},
			//The code here will make an enter button show up and to make the game functional.
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "PICK YOUR USERNAME AND PASSWORD", this.pos.x, this.pos.y);
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
		})));

	},
	//this will make the title show up, unfortunately it will not go into your game so you wont 
	//be able to use the game till the title is functional
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {	
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register").style.visibility = "hidden";
	}
});