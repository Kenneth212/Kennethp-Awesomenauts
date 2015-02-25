game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
	

		me.input.bindKey(me.input.KEY.ENTER, "start");
		//this line of code will make the enter button be pressed and show up the game.
		me.game.world.addChild(new (me.Renderable.extend({
			init: function() {
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				this.font = new me.Font("Arial", 46, "white");
			},
			//The code here will make an enter button show up and to make the game functional.
			draw: function(renderer) {
				this.font.draw(renderer.getContext(), "Awesomenauts!", 450, 130);
				this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
			}
		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
			if(action === "start"){
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
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		me.event.unsubscribe(this.handler);
	}
});
