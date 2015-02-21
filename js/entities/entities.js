game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this._super(me.Entity, "init", [x, y, {
			image: "player",
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function() {
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
		this.type ="PlayerEntity";
		this.health = game.data.playerHealth;
		//this shows how mush health we have
		//the health can be changed
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		//Keeps track of which direction your charcter is going
		this.facing = "right";
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.dead = false;
		//this.dead will show us if if its false that the player is dead(only shows up if its false)
		this.lastAttack = new Date().getTime();
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);


		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta) {
		this.now = new Date().getTime();
		//this will show up in the inspect element to see if the player is losing health
		if (this.health <= 0) {
			this.dead = true;
			this.pos.x = 10;
			this.pos.y = 1;
			this.health = game.data.playerHealth;
		}
		if(me.input.isKeyPressed("right")){
			//adds to the position or my x by the velocity defined above in
			//setsVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			//used when interacting with the enemy base 
			this.flipX(true);
		}
		else if (me.input.isKeyPressed("left")){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing = "left";
			this.flipX(false);
		}

		else{
			this.body.vel.x = 0;
		}

	if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
		this.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
		//this will make the player jump.
		me.audio.play("jump");
	}

	if(me.input.isKeyPressed("attack")) {
			if(!this.renderable.isCurrentAnimation("attack")) {
				console.log(!this.renderable.isCurrentAnimation("attack"));
				//Sets the current animation to attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//Makes it so that the next we start this sequence we bgin
				//form the first animation, not wherever we left off when we
				//switched to another animation
				this.renderable.setAnimationFrame();
			}
		}
		if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
		}
	}else if(!this.renderable.isCurrentAnimation("attack")){
		this.renderable.setCurrentAnimation("idle");
	}

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//used to check for collisions
		this.body.update(delta);
		
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
		console.log(this.health);
		//the console will show in inspect element if the player is being damaged
		//the this.health - damage will make the creep damage the player
	},

	collideHandler: function(response) {
		if(response.b.type==='EnemyBaseEntity') {
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			if(ydif<-40 && xdif<70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
				//used so we dont fall from the enemy base
				//the -40 is used to block the character
			}

			else if(xdif>-35 && this.facing==='right' && (xdif<0) && (xdif<0) && ydif>-50) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}else if(xdif<70 && this==='left' && xdif>0) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x +1;
				//used to block him from the left and the right
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				//1000 = equals number of times to end enemy base
				console.log("tower Hit");
				//will show in inspect element to see if the enemy base is actually getting hit
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
		}else if (response.b.type==='EnemyCreep'){
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			if (xdif>0) {
				this.pos.x = this.pos.x + 1;
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}else {
				this.pos.x = this.pos.x - 1;
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
			//the 1000 is about the same to 10 
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
					 && (Math.abs(ydif) <=40) && 
					 ((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				//this will allow the player to kill the enemy creep from both left and right.
					 	{
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
				//this number shows the amount of times it will take to kill the enemy

			}
		}
	}
});
//The game.PlayerBaseEntity
game.PlayerBaseEntity = me.Entity.extend({
	init : function(x, y, settings) {
		this._super(me.Entity, 'init', [x, x, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = game.data.playerBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);
		
		this.type = "PlayerBase";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle"); 
	},

	update:function(delta){
		if(this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	onCollision: function() {

	}

});
//The game.EnemyBaseEntity will create the enemy base
game.EnemyBaseEntity = me.Entity.extend({
	init : function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			image: "tower",
			width: 100,
			height: 100,
			spritewidth: "100",
			spriteheight: "100",
			getShape: function(){
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = game.data.enemyBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},

	update:function(delta){
		if(this.health<=0) {
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function() {

	},

	loseHealth: function() {
		this.health--;
	}

});

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
			this.health = enemyCreepHealth;
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

		game.GameManager = Object.extend({
			init: function(x, y, settings){
				this.now = new Date().getTime();
				this.lastCreep = new Date().getTime();

				this.alwaysUpdate = true;
			},

			update: function() {
				this.now = new Date().getTime();

				if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
					this.lastCreep = this.now;
					var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
					me.game.world.addChild(creepe, 5);
				}

				return true;
			}
		});