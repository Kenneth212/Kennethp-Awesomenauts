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
//The enities.js file is made for the objects in the game that move.
	}
})