
function Block(cfg){
	merger(this, cfg);
}

Block.prototype={
	
	constructor : Block ,

	x : 0 ,
	y : 0 ,
	w : 0 ,
	h : 0 ,
	// fix : 0.00001 ,
	fix : 0.005 ,
	
	img : "block",

	init : function(scene){
		this.scene=scene;
		this.img=ResourcePool.get(this.img+"-"+(this.type||0))||this.img;

		this.hitBox={
			x1 : this.x ,
			y1 : this.y ,
			x2 : this.x+this.w ,
			y2 : this.y+this.h
		};

		this.hitBox.width=this.w;
		this.hitBox.height=this.h;

	},
	setType : function(type){
		this.type=type;
		this.img=ResourcePool.get(this.img+"-"+(this.type||0));

	},

	getHitBox : function(){
		return this.hitBox;
	},

	update : function(timeStep){
		return;
		var dx=0.3;
		this.x+=dx;
		this.hitBox.x1+=dx;
		this.hitBox.x2+=dx;

		var dy=-0.3;
		this.y+=dy;
		this.hitBox.y1+=dy;
		this.hitBox.y2+=dy;
	
	},

	isCollidedPoint : function(x,y){
		var hitBox=this.hitBox;

		return x>=hitBox.x1 && x<=hitBox.x2
			&& y>=hitBox.y1 && y<=hitBox.y2;
	},

	render : function(context){


		var box=this.getHitBox();
		context.drawImage(this.img,0,0,
			Math.min(box.width,this.img.width),
			Math.min(box.height,this.img.height),
			box.x1,box.y1,box.width,box.height );
		// context.drawImage(this.img,
		// 	0,0,box.width,box.height,
		// 	box.x1,box.y1,box.width,box.height);
		// context.strokeRect( box.x1,box.y1,box.width,box.height);
	
		// context.fillStyle="#291909";
		// context.fillRect( box.x1,box.y1,box.width,box.height);

	}
}



