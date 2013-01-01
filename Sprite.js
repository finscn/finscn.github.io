(function(){


function Sprite(cfg){
	for (var key in cfg){
		this[key]=cfg[key];
	}
	this.size+=randomInt(-2,2);
}

Sprite.prototype={
	color : null,
	rotation : 0,
	vr : 0.001,
	size : 18,
	x : 0,
	y : 0,
	v : 0,
	vx : 0,
	vy : 0 ,

	tx : null,
	ty : null,	
	findTarget : function(){
		var nodes=background.nodes;

		var index=randomInt(0,nodes.length-1);
		var node=nodes[index];
		this.tx=node.x+randomInt(-2,2);
		this.ty=node.y+randomInt(-2,2);
		node.f++;

		this.v=randomInt(1,2)/16;
		var dx=this.tx-this.x;
		var dy=this.ty-this.y;

		var rad=Math.atan2(dy, dx);
		this.cos=Math.cos(rad);
		this.sin=Math.sin(rad);
		this.vx=this.v*this.cos;
		this.vy=this.v*this.sin;
	},

	
	update : function(dt){

		if ( this.tx===null || this.ty===null){
			this.findTarget();
		}else{

			var dx=this.vx*dt;
			var dy=this.vy*dt;

			var dxR=Math.abs(this.tx-this.x);
			var dyR=Math.abs(this.ty-this.y);
			var dxA=Math.abs(dx);
			var dyA=Math.abs(dy);

			if (dxR<dxA){
				dx=0;
			}
			if (dyR<dyA){
				dy=0;
			}
			this.x=this.x+dx;
			this.y=this.y+dy;

			this.rotation+=this.vr*dt;

			if (dx===0 && dy===0){
				this.finished=true;
				this.vx=0;
				this.vy=0;
			}		
		}
	},

	render : function(context){

		context.save();
		context.translate(this.x,this.y);
		context.rotate(this.rotation);

		context.fillStyle=this.color;
		var s=this.size;
		context.fillRect( -s>>1,-s>>1,s,s);

		context.restore()

	}

};

window.Sprite=Sprite;


}());

