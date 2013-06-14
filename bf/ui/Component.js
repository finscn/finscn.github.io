
"use strict";

var Component=function(cfg) {

	for (var key in cfg) {
		this[key] = cfg[key];
	}
	this.init();
}


Component.prototype={

	id : null,
	dom : null,
	opened : false,
	mask : false ,
	stack : null,
	init : function(){
		
	},
	destructor : function(){

	},
	update : function(timeStep,now){

	},

	setPos : function(x,y){
		this.dom.style.left=x+"px";
		this.dom.style.top=y+"px";
	},
	display : function(){
		this.dom.style.display="block";
		this.dom.style.visibility="visible";
		if (this.dom.parentNode==UI.modal){
			UI.modal.style.display="block";
		}
	},
	hide : function(){
		this.dom.style.display="none";
		this.dom.style.visibility="hidden";
		if (this.dom.parentNode==UI.modal){
			UI.modal.style.display="none";
		}
	},
	open : function(){
		if (this.mask){
			UI.modal.classList.add("mask");
		}
		this.opened=true;
		UICtrl.task[this.id]=this;
		this.addToStack();
		this.display();
	},

	close : function(){
		if (this.mask){
			UI.modal.classList.remove("mask");
		}
		this.hide();
		this.opened=false;
		delete UICtrl.task[this.id];
		this.removeFromeStack();
		if (this.mask){
			UICtrl.hide("mask");
		}
	},
	addToStack : function(){
		if (this.stack){
			this.stack.unshift(this);
		}
	},
	removeFromeStack : function(){
		if (this.stack){
			var idx=this.stack.indexOf(this);
			if (idx!=-1){
				this.stack.splice(idx,1);
			}
		}
	}

};

