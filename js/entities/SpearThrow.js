game.SpearThrow = me.Entity.extend({
	//this will be made for the player to have new abilities
	//This will only work if the player as killed the enemy at least once to get 10 gold and to buy the ability.
	init: function(x, y, settings, facing){
		this._super(me.Entity, 'init', [x, y, {
				image: "spear",
				width: 48,
				height: 48,
				spritewidth: "48",
				spriteheight: "48",
				getShape: function(){
					return (new me.Rect(0, 0, 48, 48)).toPolygon();
				}
			}]);
			this.alwaysUpdate = true;
			this.body.setVelocity(8, 0);
			this.attack = game.data.ability3*3;
			this.type = "spear";
			this.facing = facing;
	},
	//the code below here will activate the arrow to move both left and right.
	//also the code will work when the palyer buys the ability from the "shop".
	update: function(delta){
		if(this.facing === "left"){
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
	}else {
		this.body.vel.x += this.body.accel.x * me.timer.tick;
	}

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);
		
		this._super(me.Entity, "update", [delta]);
			return true;
	},
	//this code below is used to make the arrow hit the enemy or enemy base and kill.
	collideHandler: function(response) {
			if(response.b.type==='EnemyBase' || response.b.type==='EnemyCreep') {
				response.b.loseHealth(this.attack);	
				me.game.world.removeChild(this);
			}		
		}	
});
