

function Player(cfg){
	EntityTemplate.movable(this);
	EntityTemplate.collidable(this);
	merger(this, cfg);
}

Player.prototype={
	
	constructor : Player ,

	hp : 5 ,
	power : 0 ,
	score : 0 ,
	killed : 0 ,
	combo : 0 ,
	firing : 0 ,

	dappedOnce : 0,
	jumpVelY : 0,
	
	flip : false ,
	inputQueue : null ,
	imgDown : "player-down" ,
	imgUp : "player-up" ,

	offsetX : 0,
	offsetY : 0,

	boming : 0,

	init : function(scene){
		this.scene=scene;
		this.imgDown=ResourcePool.get(this.imgDown)||this.imgDown;
		this.imgUp=ResourcePool.get(this.imgUp)||this.imgUp;
		

		this.width=80;
		this.height=90;

		this.goDown();

		this.hitBox={};
		this.hitBox.width = this.width;
		this.hitBox.height = this.height;
		this.hitBox.left = -this.hitBox.width/2;
		this.hitBox.top = -this.hitBox.height;

		this.minX=0-this.hitBox.left;
		this.maxX=scene.width-(this.hitBox.width+this.hitBox.left);

		// this.computeVelX(280,600);
		// this.computeVelY(-405,600);
		this.computeVelX(250,500);
		this.computeVelY(-500,600);
		this.maxVelY=-1.25*this.defaultVelY;
		this.jumpVelY=this.defaultVelY;

		this.initHitBox();
		this.updateHitBox();
		this.inputQueue=[];
	},

	goDown : function(){
		if (this.img!=this.imgDown){
			this.img=this.imgDown;
			this.frameWidth=this.img.width;
			this.frameHeight=this.img.height;
			this.offsetX=this.frameWidth/2;
			this.offsetY=this.frameHeight-40;
		}
		
	},
	goUp : function(){
		if (this.img!=this.imgUp){
			this.img=this.imgUp;
			this.frameWidth=this.img.width;
			this.frameHeight=this.img.height;
			this.offsetX=this.frameWidth/2;
			this.offsetY=this.frameHeight-40;
		}
	},

	reset : function(){
		this.starCount=0;
	},

	update : function(timeStep){

		this.boming-=timeStep;
		
		this.lastX=this.x;
		this.lastY=this.y;

		// if (this.toFire){
		// 	this.velY=this.jumpVelY;
		// 	this.toFire=false;
		// 	this.firing=1000;
		// }
		// if (this.firing>0){
		// 	this.firing-=timeStep;
		// }

		this.updateMovement(timeStep);

		if (this.velY<0){
			this.goUp();
			this.dappedOnce=0;
		}else{
			this.goDown();
		}
	},
		
	collBlock : function(collInfo){
		if (collInfo.x>0){
			this.deltaX=collInfo.dx;
			this.velX=0;
		}
		if (collInfo.y>0){
			this.deltaY=collInfo.dy;
			this.velY=this.velY>0?this.jumpVelY:-0.6*this.velY;	
		}
	},

	addInput : function(code){
		this.inputQueue.push(code);
		if (this.inputQueue.length<3){
			return null;
		}
		return this.inputQueue.shift();
	},

	fire : function(){
		this.fireable=false;
	},
    hitTest : function(item){
        if (this.boming<=0 && checkBoxCollide(this.hitBox, item.aabb)
            // || checkBoxCollide(this.aabb2, item.aabb)
            ){
            item.destroyed=true;
            this.hp-=1;
            this.boming=1000;
            return true
        }
    },
	freemove : false,
	handleInput : function(timeStep){

		var left=KeyState[Key.LEFT]||KeyState[Key.A];
		var right=KeyState[Key.RIGHT]||KeyState[Key.D];
		var up=KeyState[Key.UP]||KeyState[Key.W];
		var down=KeyState[Key.DOWN]||KeyState[Key.S];
		var fire=KeyState[Key.SPACE]||KeyState[Key.F]||KeyState[Key.J];

		var dirY=0,dirX=0;
		
		var now=Date.now();


		if (left && !right){
			if (!this.keyHold){
				this.addInput(-now);
			}
			dirX=-1;
			this.keyHold+=timeStep;
		}else if (right && !left){
			if (!this.keyHold){
				this.addInput(now);
			}
			dirX=1;
			this.keyHold+=timeStep;
		}else{
			if (this.keyHold>0){

			}
			dirX=0;
			this.keyHold=0;
		}
		if (fire){
			if (!this.fireHold && this.firing<=0
			 // && this.power>0 
			 ){
				// this.power--;
				this.toFire=true;
				UICtrl.updatePower(this.power)
			}
			this.fireHold+=timeStep;
		}else{
			this.fireHold=0;
		}

		this.velX=dirX*this.defaultVelX;

		if (this.velX<0){
			this.flip=true;
		}else if(this.velX>0){
			this.flip=false;
		}
	},

	render : function(context){

		var img = this.img;
		var x=this.x,
			y=this.y;

		var box=this.getHitBox();

		var flip=1;
		if (this.flip){
			context.scale(-1,1);
			flip=-1;
		}

		context.drawImage(this.img,
			0,0,this.frameWidth,this.frameHeight,
			x*flip-this.offsetX,y-this.offsetY,
			this.frameWidth,this.frameHeight);

		if (this.flip){
			context.scale(-1,1);
		}

		// context.strokeStyle="#ff0000";
		// context.strokeRect(box.x1,box.y1,box.width,box.height)
		// context.strokeRect(this.x,this.y,5,5)

	},


};
