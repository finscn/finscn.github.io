

function Player(x,y){
	this.x=x||0;
	this.y=y||0;
	

	this.init();
}

Player.radius=15;

Player.prototype={
	constructor : Player ,

	color : "#3366FF",

	rotation : 0,
	radius : Player.radius ,

	workable : false ,
	lastX : -100,
	lastY : -100,
	lastWorkable : false,

			vx : 0,
			vy : 0,
			ax : 0,
			ay : 0,
			dx : 0,
			dy : 0,

	speed : 0.08 ,
	init : function(){

		this.path=this.path||[];
		var last=this.last={
			vx : 0,
			vy : 0,
			ax : 0,
			ay : 0,
			dx : 0,
			dy : 0
		};

	},
	update : function(deltaTime){
		this.lastX=this.x;
		this.lastY=this.y;
		this.updateMotion(deltaTime);	
		this.updatePath(deltaTime);
		if (this.target){
			this.updatePos();
		}
		this.checkPoint();
	},

	getNextPoint : function(){
		return this.path[0];
	},

	updateMotion : function(deltaTime){
		var last=this.last;
		last.vx=this.vx;
		last.vy=this.vy;

		this.vx=this.vx + this.ax * deltaTime;
		this.vy=this.vy + this.ay * deltaTime;

		last.dx=this.dx;
		last.dy=this.dy;

		this.dx=(last.vx + this.vx) * deltaTime / 2 ; 
		this.dy=(last.vy + this.vy) * deltaTime / 2 ;	
		
	},

	updatePos : function(){
		this.x+=this.dx;
		this.y+=this.dy;
	},
	updateVelocity : function(targetX, targetY){
		var dx=targetX-this.x;
		var dy=targetY-this.y;


		var rad=Math.atan2( dy , dx );
		var vx= this.speed * Math.cos(rad);
		var vy= this.speed * Math.sin(rad);

		this.vx=vx;
		this.vy=vy;
		if (dy || dx){
			this.rotation=rad*RAD_TO_DEG;
		}
	},
	checkPoint : function(){
		var pos=this.getNextPoint();
		if ( pos && this.target==null){							
			var x=pos.x,
				y=pos.y;
			this.target=pos;
			this.updateVelocity(pos.x,pos.y);
		}
	},

	getNextPoint : function(){
		return this.path[0];
	},
	setPath : function(path){
		this.path=path;
		this.target==null;
		this.vx=0;
		this.vy=0;
		this.dx=0;
		this.dy=0;
	},
	updatePath : function(deltaTime){
		
		if (this.target!=null){
			
			var dx=this.target.x-this.x,
				dy=this.target.y-this.y;
			

			if (dx*this.dx >=0){
				if (Math.abs(this.dx)>Math.abs(dx) ){
					this.dx=0//dx;
					this.x=this.target.x;
					this.vx=0;
				}
			}
			if (dy*this.dy >=0){
				if (Math.abs(this.dy)>Math.abs(dy) ){
					this.dy=0//dy;
					this.y=this.target.y;
					this.vy=0;
				}
			}
			if (!this.vx && !this.vy){	
				if (this.target===this.path[0]){
					this.path.shift();
				}		
				this.target=null;
			}
		}

		return !this.target;
	},


	draw : function(context){

		if (this.path.length){
			drawNodeList(context,this.pathForDraw,"#cc0000");
			// PathFinder.debugInfo=null;
			
		}else{
			//Game.drawBg();
		}

		drawCircle(context,this.x,this.y,this.radius+3,this.color ,true );
		drawPoint(context,this.x,this.y-0.5, this.color);
		context.save();
		context.scale(1,1*Y_SCALE)
		context.translate(this.x,this.y);
		context.rotate(this.rotation*DEG_TO_RAD);
		//context.strokeRect(0,-1,this.radius+10,2);
		context.moveTo(this.radius/2,-this.radius);
		context.lineTo(this.radius*2,0);
		context.lineTo(this.radius/2,this.radius);
		context.lineTo(this.radius/2,-this.radius);
		context.fill();
		context.restore();
	}
};

function debug1(){

			var info=Game.player.pathFinder.debugInfo;
			if (info){
				Game.drawBg();
			}
			for (var key in info){
				var s=info[key];
					Game.bgcontext.fillStyle="red"
		      		//Game.bgcontext.clearRect(s.x,s.y,30,-15);
		      		Game.bgcontext.fillText( Math.round(s.g)+","+
		      			Math.round(s.h),s.x,s.y);

			}
			PathFinder.debugInfo={}
}