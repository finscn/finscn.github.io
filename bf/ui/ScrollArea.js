
"use strict";

var ScrollArea=function(cfg) {

	for (var key in cfg) {
		this[key] = cfg[key];
	}
}

ScrollArea.displayed=[];

ScrollArea.prototype={

	init : function(){
		this.dom=$id(this.id);
		this.sn=UICtrl.SN++;

		this.slider=new Slider();

		this.reset();

		this.scrollBy(0,0);
		// test
		ScrollArea.displayed[this.sn]=this;
	},
	reset : function(){
		this.x=0;
		this.y=0;
		this.maxX=0;
		this.maxY=0;

		this.resetRect();
		this.slider.reset();
	},

	resetRect : function(){
		this.rect=this.dom.getBoundingClientRect();
		this.parentRect=this.dom.parentNode.getBoundingClientRect();
		this.minX=Math.min(0,this.parentRect.width-this.rect.width);
		this.minY=Math.min(0,this.parentRect.height-this.rect.height);
	},

	setPosition : function(x,y){
		this.dom.style.left=x+"px";
		this.dom.style.top=y+"px";
	},
	setTranslate : function(x,y){
		this.dom.style.webkitTransform="translate("+x+"px,"+y+"px) translateZ(0)"
	},

	destructor : function(){

	},


	scrollBy : function(dx,dy){
		if (this.anim){
			this.dom.classList.remove("slide");
			this.anim=false;
		}
		this.x+=dx||0;
		this.y+=dy||0;
		this.setTranslate(this.x,this.y);

		this.slider.sliding=true;
	},


	stopScroll : function(){
		delete UICtrl.task[this.sn];
		this.dom.classList.remove("slide");
		this.anim=false;

		this.resetRect();
		this.slider.stop();
	},

	startScroll : function(vx,vy){

		this.slider.start(vx,vy);

		this.finished=false;
		UICtrl.task[this.sn]=this;
	},

	update : function(timeStep){

		if (this.x<this.minX || this.x>this.maxX
			|| this.y<this.minY || this.y>this.maxY ){
			delete UICtrl.task[this.sn];
			this.dom.classList.add("slide");
			this.anim=true;
			this.x=Math.min(this.maxX, Math.max(this.minX,this.x));
			this.y=Math.min(this.maxY, Math.max(this.minY,this.y));
			this.setTranslate(this.x,this.y)
			return;
		}

		if (this.finished){
			delete UICtrl.task[this.sn];
			return;
		}
		var slide=this.slider.update(timeStep);
		if (slide){
			this.scrollBy(this.slider.dx, this.slider.dy)
		}else{
			this.finished=true;
		}

	}

};

