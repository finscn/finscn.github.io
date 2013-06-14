
"use strict";

var Panel=function(cfg) {

	for (var key in cfg) {
		this[key] = cfg[key];
	}
	this.init();
}

Panel.stack=[];
Panel.getParent=function(element){
	var panel=Panel.stack[0];
	return panel&&panel.dom.contains(element)?panel:false;
};

(function(exports) {

    var PT = {

    stack : Panel.stack,

    mask : true,

	init : function(){
		this.dom=UI[this.id];
		this.titleDom=this.dom.querySelector(".panel-title");
		this.headDom=this.dom.querySelector(".panel-head");
		this.bodyDom=this.dom.querySelector(".panel-body");
		this.footDom=this.dom.querySelector(".panel-foot");
		this.closeDom=this.dom.querySelector(".head-right");
		this.backDom=this.dom.querySelector(".head-left");


		this.bodyItemDoms={};
		var items=this.bodyDom.querySelectorAll("*[key]");
		for (var i=0;i<items.length;i++){
			var item=items[i];
			var key=item.getAttribute("key");
			this.bodyItemDoms[key]=item;
		}

		this.footItemDoms={};
		var items=this.footDom.querySelectorAll("*[key]");
		for (var i=0;i<items.length;i++){
			var item=items[i];
			var key=item.getAttribute("key");
			this.bodyItemDoms[key]=item;
		}

		var Me=this;
		// var _bodyItemOntap=function(event){
		// 	Me.bodyItemOntap(this,event);
		// }
		// this.buttonDoms={};
		// var items=this.bodyDom.querySelectorAll(".btn");
		// for (var i=0;i<items.length;i++){
		// 	var item=items[i];
		// 	this.buttonDoms[key]=item;
		// }

		this.closeDom.ontap=function(event){
			Me.close(event);
		}
		this.backDom.ontap=function(event){
			Me.back(event);
		}
		if (this.onInit){
			this.onInit();
		}
	},

	display : function(){
		this.dom.style.display="-webkit-box";
		this.dom.style.visibility="visible";
		if (this.dom.parentNode==UI.modal){
			UI.modal.style.display="block";
		}
	},
	back : function(){
		this.close();
		var last=Panel.stack[0];
		if (last){
			last.open();
		}
	},

	displayClose : function(show){
		this.closeDom.style.visibility=show===false?"hidden":"visible";
	},

	displayBack : function(show){
		this.backDom.style.visibility=show===false?"hidden":"visible";
	},

	setTitle : function(title){
		this.titleDom.innerHTML=title;
	},

	setBody : function(data){
		for (var key in data){
			if (this.bodyItemDoms[key]){
				this.setBodyItem(this.bodyItemDoms[key],data[key]);
			}
		}
	},

	setBodyItem : function(itemDom,value){
		itemDom.innerHTML=value;
	},

	setFoot : function(data){
		for (var key in data){
			if (this.footItemDoms[key]){
				this.setFootItem(this.footItemDoms[key],data[key]);
			}
		}
	},

	setFootItem : function(itemDom,value){
		itemDom.innerHTML=value;
	},

	bodyItemOntap : function(itemDom,event){
		var key=itemDom.key||0;
		// addBuilding(key);
		this.close();
	}

};


    for (var key in Component.prototype) {
        Panel.prototype[key] = Component.prototype[key];
    }
    for (var key in PT) {
        Panel.prototype[key] = PT[key];
    }

}());

