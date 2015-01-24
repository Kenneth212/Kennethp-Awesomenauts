game.PlayerEntity = me.PlayerEntity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y,{
			image:"player",
			width: 64,
			height: 64,
			spritewitdh: "64",
			spriteheight: "64",
			//Both of the sprites will mostly always be the same
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
			//The numbers shown on the return line like 64 are numbers of witdh and height.
			}]);
	};

	update:function(){
		if (me.input.isKeyPressed("right")) {
			//adds to the position of my x by adding the velocity defind above in
			//setVelocity() and multiplying it me.timer.tick.
			//me.timer.tick makes the movement look smooth

			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}else{
			this.body.vel.x = 0;
		}

		this.body.update(delta);
		return true;
		//delta is the time.
//The enities.js file is made for the objects in the game that move.
	}
});