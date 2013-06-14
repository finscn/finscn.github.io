

function Enemy(cfg){
	EntityTemplate.movable(this);
	EntityTemplate.collidable(this);
	merger(this, cfg);
}

Enemy.prototype={
	
	constructor : Enemy ,
		
	flip : false ,

	coming : false,
	
	img : "enemy",

	init : function(scene){
		this.scene=scene;
		this.img=ResourcePool.get(this.img+"-"+(this.type||0))||this.img;

		this.currentAnim=new Animation({
			loop : true,
			img :this.img,
			frames : [
				{x:1,y:1,w:78,h:78,d:250},
				{x:81,y:1,w:78,h:78,d:250},
				{x:161,y:1,w:78,h:78,d:250},
			]
		});

		this.frameWidth=78;
		this.frameHeight=78;
		
		this.offsetX=this.frameWidth/2;
		this.offsetY=this.frameHeight-10;

		this.width=64;
		this.height=64;
		this.hitBox={};
		this.hitBox.width = this.width;
		this.hitBox.height = this.height;
		this.hitBox.left = -this.hitBox.width/2;
		this.hitBox.top = -this.hitBox.height;

		this.minX=0;
		this.maxX=scene.width;
		this.computeVelX(420,600);
		this.oy=this.y;

		this.initHitBox();
		this.updateHitBox();
		this.initPieces();

		this.coming=true;
		this.ch=0;

	},

	initPieces : function(){
		var row=2, col=3;
		this.pieceCount=row*col;
		var sw=Math.floor(this.frameWidth/col), 
			sh=Math.floor(this.frameHeight/row);
		this.pieces=this.pieces||[];
		this.pieceAX=0.0016;

		var hc=col/2;
		var i=0;
		for (var r=0;r<row;r++){
			for (var c=0;c<col;c++){
				var p=this.pieces[i]=this.pieces[i]||{};
				p.ix=sw*c;
				p.iy=sh*r;
				p.w=sw>>1 ;
				p.h=sh>>1 ;
				p.left=c<hc;
				i++;
			}

		}
		this.resetPieces();
		this._pieceCount=0;
	},

	reset : function(x,y){		
		this.dead=false;
		this.exploding=false;
		this.x=x||0;
		this.y=y||this.oy;
		this.resetPieces();
		this.coming=true;
		this.ch=0;
		// this.currentAnim=this.anims.stand;
	},

	resetPieces : function(){
		for (var i=0,len=this.pieces.length;i<len;i++){
			var p=this.pieces[i];
			p.d=false;
			p.x=null;
			p.y=null;
			p.vx=p.left?random(-0.11,0.01):random(-0.01,0.11);
			p.vy=random(-0.8,-0.5);
		}
		this._pieceCount=this.pieceCount;
	},


	explode : function(){
		this.exploding=true;	
		this.explodingCount=0;	
	},

	update : function(timeStep){
		if (this.exploding){
			this.explodingCount++;
			// if (this.explodingCount%2===0){
				this.updatePieces(timeStep);
			// }
			return;
		}
		this.lastX=this.x;
		this.lastY=this.y;

		if (this.coming){
			this.ch+=2;
			if (this.ch>=this.frameHeight){
				this.coming=false;
				// this.currentAnim=this.anims.walk;
			}
			// console.log(this.x,this.y,this.hitBox.x1,this.hitBox.y1)
			this.updateMovement(0);

		}else{
			this.updateMovement(timeStep);
		}


		if (this.x>=this.maxX){
			this.x=this.maxX;
			this.velX=-Math.abs(this.velX);
		}else if (this.x<=this.minX){
			this.x=this.minX;
			this.velX=Math.abs(this.velX);
		}

		this.updatePosition();
		this.updateHitBox();

		if (this.velX<0){
			this.flip=true;
		}else if(this.velX>0){
			this.flip=false;
		}
		this.currentAnim.update(timeStep);
	},


	render : function(context){
		if (this.exploding){
			this.renderPieces(context);
			return;
		}
		
		var img = this.img;
		var x=this.x,
			y=this.y;
		var f=this.currentAnim.currentFrame;

		var box=this.getHitBox();
		if (this.coming){
			context.globalAlpha=0.2;
			context.drawImage(
			img,
			f.x,f.y,f.w,f.h,
			x-this.offsetX,y-this.offsetY+(this.frameHeight-this.ch) ,this.frameWidth,this.ch);
			context.globalAlpha=1;
			return;
		}

		context.drawImage(img, 
					f.x,f.y,f.w,f.h,
					x-this.offsetX, y-this.offsetY, this.frameWidth,this.frameHeight);  
		
	},
		
	updatePieces : function(timeStep){
		var Me=this;
		var scene=this.scene;
		var dv=this.pieceAX*timeStep;

		var len=this.pieces.length;
		for (var i=0;i<len;i++){
			var p=this.pieces[i];

			if (p.d){
				continue;
			}
			if (p.x===null){
				p.x=Me.x+p.ix-Me.width/2;
				p.y=Me.y+p.iy-Me.height/2;
				p.deadLine=p.y+100;
				// return;
			}

			var vy=p.vy+dv; 
			var dy=(p.vy + vy)/2 * timeStep;
			p.vy=vy;

			p.x+=p.vx * timeStep;
			p.y+=dy;

			if (p.y>p.deadLine){
				p.d=true;
				p.x=p.y=null;
				Me._pieceCount--;
			}
		}
	},

	renderPieces : function(context){
		context.fillStyle=this.type==1?"#ccaa66":"#8899aa";
		var img=this.img;
		var len=this.pieces.length;
		for (var i=0;i<len;i++){
			var p=this.pieces[i];
			if (p.d){
				return;
			}
			context.fillRect(p.x,p.y,p.w,p.h);
			// context.drawImage(img,p.ix,p.iy,p.w,p.h,p.x,p.y,p.w,p.h);
		}
	}


};
