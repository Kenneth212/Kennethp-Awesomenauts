game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings) {
		this.setSuper();
		this.setPlayerTimers();
		this.setAttributes();
		this.type ="PlayerEntity";
		this.setFlags();
		//this shows how mush health we have
		//the health can be changed
		//this.dead will show us if if its false that the player is dead(only shows up if its false)
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.addAnimation():

		this.renderable.setCurrentAnimation("idle");
	},
	//this function will contain player main code
	setSuper: function () {
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
	},
	//this function will contain all the timers
	setPlayerTimers: function() {
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
	},
	//this function will contain attributes
	setAttributes: function(){
		this.health = game.data.playerHealth;
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.attack = game.data.playerAttack;
	},
	//this function wil contain flags
	setFlags: function() {
		//Keeps track of which direction your charcter is going
		this.facing = "right";
		this.dead = false;
		this.attacking = false;
	},

	addAnimation: function() {
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	},

	update: function(delta) {
		this.now = new Date().getTime();
		this.dead = checkIfDead();
		this.checkKeyPressedAndMove();
		this.setAnimation();
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//used to check for collisions
		this.body.update(delta);		
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function() {
		//this will show up in the inspect element to see if the player is losing health
		if (this.health <= 0) {
			this.dead = true;
		}
		return false;
	},

	checkKeyPressedAndMove: function() {
		if(me.input.isKeyPressed("right")){
			this.moveRight();
		}else if (me.input.isKeyPressed("left")){
			this.move:Left();
		}else{
			this.body.vel.x = 0;
		}

		if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
			this.jump();
			me.audio.play("jump");
		}

		this.attacking = me.input.isKeyPressed("attack");
	},

	moveRight: function(){
			//adds to the position or my x by the velocity defined above in
			//setsVelocity() and multiplying it by me.timer.tick.
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			//used when interacting with the enemy base 
			this.flipX(true);
	},

	moveLeft: function(){
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.facing = "left";
			this.flipX(false);
	},

	jump: function(){
		this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			//this will make the player jump.
	},

	setAnimation: function(){
			if(this.attacking) {
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
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
		console.log(this.health);
		//the console will show in inspect element if the player is being damaged
		//the this.health - damage will make the creep damage the player
	},

	collideHandler: function(response) {
		if(response.b.type==='EnemyBaseEntity') {
			this.collideWithEnemyBase(response);
		}else if (response.b.type==='EnemyCreep'){
			this.collideWithEnemyCreep(response);
		}
	},

	collideWithEnemyBase: function(response){
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
				//this.pos.x = this.pos.x -1;
			}else if(xdif<70 && this==='left' && xdif>0) {
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x +1;
				//used to block him from the left and the right
			}
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				//1000 = equals number of times to end enemy base
				//will show in inspect element to see if the enemy base is actually getting hit
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
	},
	//this will contain the code for the colliding with enemy
	collideWithEnemyCreep: function(response){

			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;
			
			this.stopMovement(xdif);

			if(this.checkAttack(xdif, ydif)){
				this.hitCreep(response);
			};


	},

	stopMovement: function(xdif){
		if (xdif>0) {
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}else {
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
	},

	checkAttack: function(xdif, ydif){
		//the 1000 is about the same to 10 
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
					 && (Math.abs(ydif) <=40) && 
					 ((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
				//this will allow the player to kill the enemy creep from both left and right.
					 	{
				this.lastHit = this.now;
				//if the creep health is less than our attack, execute code in if statement
				return true;
			}
			return false; 
	},
	//this new functions will contain the attacking/ animation for the character code.
	hitCreep: function(){
						if(response.b.health <= game.data.playerAttack) {
					//adds one gold for a creep kill
					game.data.gold += 1;
					console.log("Current gold: " + game.data.gold);
				}

				response.b.loseHealth(game.data.playerAttack);
				//this number shows the amount of times it will take to kill the enemy
	}
});





		