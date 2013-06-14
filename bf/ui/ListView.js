
"use strict";

var ListView=function(cfg) {

	for (var key in cfg) {
		this[key] = cfg[key];
	}
	this.init();
};

(function(exports) {

    var PT = {

	init : function(){
		this.dom=this.dom||document.getElementById(this.id);
		this.wrapDom=this.dom.querySelector("div");
		if (!this.tmplItemDom){
			this.tmplItemDom=this.wrapDom.querySelector("div");
			if (this.tmplItemDom){
				this.tmplItemDom=this.tmplItemDom.cloneNode(true);
			}
		}

		this.dom.classList.add("list-view");
		this.wrapDom.classList.add("scroll");
		this.tmplItemDom.classList.add("list-item");

		this.wrapDom.innerHTML="";
		this.wrapDom.id=this.wrapDom.id||this.id+"_wrap";
		
		this.scrollArea=new ScrollArea({
    		id : this.wrapDom.id
    	});
	    this.scrollArea.init();

		var Me=this;

		if (this.onInit){
			this.onInit();
		}
	},
	
	handleTap : function(event){
		var row=this.getEventTargetRow(event);
		if (row){
			this.rowOnTap(row,event);
			return true;
		}
		return false;
	},

	getEventTargetRow : function(event){
		var t=event.target;
		if (this.wrapDom.contains(t)){
			return this.getParentRow(t);
		}
		return null;
	},
	getParentRow : function(dom){
		while (dom && !dom.classList.contains("list-item")){
			dom=dom.parentNode;
		}
		return dom;
	},

	removeAllRows : function(){
		this.wrapDom.innerHTML="";
	},
	removeRowByIndex : function(index){
		var rows=this.wrapDom.querySelectorAll(".list-item");
		var row=rows[index];
		this.wrapDom.removeChild(row);
	},

	setData : function(data){
		this.removeAllRows();
		var Me=this;
		data.forEach(function(item,idx){
			Me.addRow(item,idx);
		})
	},

	addRow : function(itemData,idx){
		var row=this.tmplItemDom.cloneNode(true);
		this.renderRow(row,itemData,idx);
		this.wrapDom.appendChild(row);
	},

	renderRow : function(itemDom,itemData,idx){
		itemDom.innerHTML=itemData;
	},

	rowOnTap : function(rowDom,event){
		
	},

};


    for (var key in PT) {
        ListView.prototype[key] = PT[key];
    }

}());

