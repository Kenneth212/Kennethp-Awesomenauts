game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		//so the numbers below are the numbers that correspond to the numbers that are the size of the minimap.
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 701,
			height: 119,
			spritewidth: "701",
			spriteheight: "119",
			getShape: function(){
				return (new me.Rect(0, 0, 701, 119)).toPolygon();
			}
		}]);
		this.floating = true;
	}
});

