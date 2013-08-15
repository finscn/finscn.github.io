var BFSearch = function(cfg) {

		for (var key in cfg) {
			this[key] = cfg[key];
		}

	};

BFSearch.prototype = {

	constructor: BFSearch,


	init: function() {

	},
	reset: function(startNode,endNode) {

	},
	isSolution: function(node, endNode) {
		return false;
	},

	findSuccessors: function(node, openList, closedKeys) {
		return [];
	},

	beforeSearch: function(startNode, endNode) {

	},
	search: function(startNode, endNode) {

		this.reset(startNode, endNode);

		this.beforeSearch(startNode, endNode);

		if (this.isSolution(startNode, endNode)) {
			return [startNode, endNode];
		}
		var openList = [];
		var closedKeys = {};

		var prevCache = {};
	
		openList.push(startNode);


		while (openList.length) {
			var node = openList.shift();
			closedKeys[node.id] = node;
			var successors = this.findSuccessors(node, openList, closedKeys);

			for (var i = 0, len = successors.length; i < len; i++) {
				var successor = successors[i];
				if (!closedKeys[successor.id]) {
					closedKeys[successor.id] = successor;

					prevCache[successor.id] = node;

					if (this.isSolution(successor, endNode)) {
						node = endNode;
						var path = [node];
						while ((node = prevCache[node.id])) {
							path.push(node);
						}
						return path;
					}
					openList.push(successor);
				}
			}
		}
		return false;

	}

};


var AStarSearch = function(cfg) {

		for (var key in cfg) {
			this[key] = cfg[key];
		}

	};

AStarSearch.prototype = {
	constructor: AStarSearch,


	init: function() {

	},
	reset: function() {

	},
	isSolution: function(node, endNode) {
		return false;
	},

	findSuccessors: function(node, openList, closedKeys) {
		return [];
	},

	beforeSearch: function(startNode, endNode) {

	},

	insertToOpenList: function(node, openList, cost) {
		return openList.push(node);
	},

	pickFromOpenList: function(openList) {
		var min = Infinity;
		var idx = 0;
		for (var i = 0, len = openList.length; i < len; i++) {
			var current = openList[i];
			var currentCost = current.f;
			if (currentCost < min) {
				idx = i;
				min = currentCost;
			}
		}
		return openList.splice(idx, 1)[0];
	},

	//    diagonal : function (fromNode, toNode) {
	//        return Math.max(Math.abs(fromNode.col - toNode.col), Math.abs(fromNode.row - toNode.row));
	//    },
	//    euclidean : function(fromNode, toNode) {
	//        return Math.sqrt(Math.pow(fromNode.col - toNode.col, 2) + Math.pow(fromNode.row - toNode.row, 2));
	//    },
	//    manhattan : function (fromNode, toNode) {
	//        return Math.abs(fromNode.col - toNode.col) + Math.abs(fromNode.row - toNode.row);
	//    },

    getCostH : function(node,endNode){
        return 1;//this.euclidean(fromNode, toNode);
    },

    getStepCost : function(fromNode, toNode){
    	return 1;//this.euclidean(fromNode, toNode);
    },

	search: function(startNode, endNode ,openList) {

		this.debugInfo ={};

		this.reset(startNode, endNode);
		startNode.g=endNode.h=0;
		endNode.f=endNode.g=Infinity;
		startNode.f=startNode.h=this.getCostH(startNode,endNode);
		
		this.beforeSearch(startNode, endNode);

		var closedKeys = [];
		closedKeys = {};

		var visitedCache = {};
		var prevCache = {};
		
		openList = openList||[];
		openList.push(startNode);
		visitedCache[startNode.id]=true;
		visitedCache[endNode.id]=true;		
		
		// var openList=new BinaryHeap(function(node){return node.f;});
		while (openList.length) {

			// var node = openList.pop(); 
			var node = this.pickFromOpenList(openList);
			closedKeys[node.id] = node;
			
			if (this.isSolution(node, endNode)) {
				var path = [endNode];
				while ((node = prevCache[node.id])) {
					path.unshift(node);
				}
				return path;
			}

			var successors = this.findSuccessors(node, openList, closedKeys);
			for (var i = 0, len = successors.length; i < len; i++) {
				var successor = successors[i];
				if (successor.length){
					debugger;
				}
				var id=successor.id;
				if (!closedKeys[id]) {
					if (!visitedCache[id]){
						visitedCache[id]=true;
						successor.f=0;
						successor.g=Infinity;
						successor.h=this.getCostH(successor,endNode);
					}
					var costG = node.g+this.getStepCost(node, successor); 
				    if(costG < successor.g) {
				    	openList.push(successor);
						prevCache[id] = node;

					    successor.g = costG;
					    successor.f = successor.g + successor.h;

					    this.debugInfo[successor.id]={
						    	x :  successor.x ,
						    	y :  successor.y ,
						    	g :  successor.g ,
						    	h :  successor.h
						    }	      		
				    }
				}
			}
		}
		
		return [];

	}

};




