game.MiniMap = me.Entity.extend({
	init: function(x, y, settings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: "1014",
h			height: "262",
			spritewidth: "1014",
			spriteheight: "262",
			getShape: function(){
				return (new me.Rect(0, 0, 1014, 262)).toPolygon();
			}
		}]);
		this.floating = true;
	}
});

