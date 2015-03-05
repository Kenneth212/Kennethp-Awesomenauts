	game.EnemyCreep = me.Entity.extend({
		init: function(x, y, settings){
			this._super(me.Entity, 'init', [x, y, {
				image: "creep1",
				width: 32,
				height: 64,
				spritewidth: "32",
				spriteheight: "64",
				getShape: function(){
					return (new me.Rect(0, 0, 32, 64)).toPolygon();
				}
			}]);
			this.health = game.data.EnemyCreepHealth;
			this.now = new Date().getTime();
			this.alwaysUpdate = true;
			//this.attacking lets us know if the enemy is currently attacking
			this.attacking = false;
			//keeps track of when our creep last attacked anything
			this.lastAttacking = new Date().getTime();
			//keeps trackof the last time our creep hit anything
			this.lastHit = new Date().getTime();
			this.body.setVelocity(3, 20);
			this. type = "EnemyCreep";

			this.renderable.addAnimation("walk", [3, 4, 5],  80);
			this.renderable.setCurrentAnimation('walk');
			//this EnemyCreep thing is used so there would be enemies in the game.
		},
		//this is too make the creep to lose health.
		loseHealth: function(damage){
			console.log(this.health);
			this.health = this.health - damage;
		},

		update: function(delta) {
			console.log(this.health);
			if(this.health <= 0) {
				me.game.world.removeChild(this);
			}
			//so this area of code will make the creep do what we want it to do
		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		//so this will the creep move left just like the player
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);
		
		this._super(me.Entity, "update", [delta]);


			return true;
		},

		collideHandler: function(response) {
			if(response.b.type==='PlayerBase') {
				this.attacking=true;
				//this.lastAttacking=this.now;
				this.body.vel.x = 0;
				//keeps moving the creep to the right to maintain its position
				this.pos.x = this.pos.x + 1;
				//checks that it has been at least 1 second since this creep hit a base
				if((this.now-this.lastHit >=1000)){
					//updates th lastHit timer 
					this.lastHit = this.now;
					//makes the player base call its loseHealth function and passes it a 
					//damage of 1 
					response.b.loseHealth(game.data.enemyCreepAttack);
				}
			}else if (response.b.type==='PlayerEntity'){
				var xdif = this.pos.x - response.b.pos.x;

				this.attacking=true;
				//this.lastAttacking=this.now;
				this.body.vel.x = 0;
				//keeps moving the creep to the right to maintain its position
				if(xdif>0){
					this.pos.x = this.pos.x + 1;
					this.body.vel.x = 0;
				}
				//checks that it has been at least 1 second since this creep hit a base
				if((this.now-this.lastHit >=1000) && xdif>0){
					//updates th lastHit timer 
					this.lastHit = this.now;
					//makes the player base call its loseHealth function and passes it a 
					//damage of 1 
					response.b.loseHealth(game.data.enemyCreepAttack);
				}
			}
		}
	});