
var PathFinder = function(cfg) {
		for (var key in cfg) {
			this[key] = cfg[key];
		}
	};
(function(){
	PathFinder.prototype=new AStarSearch();
	
	var PT= {
		polyList : null,
		vertexMap : null ,

		nodes : null,
		tempNodes : null,
		tempConnLines : null,
		

		init : function(){
			this.nodes=[];
			var nodesMap={};
			for (var key in this.vertexMap){
				var info=this.vertexMap[key];
				var node={
					id : key ,
					x : info.x,
					y : info.y,
					conn : {},
					connDis : {}
				};
				this.nodes.push(node);
				nodesMap[key]=node;				
			}
			for (var i=0,len=this.nodes.length;i<len;i++){
				var node=this.nodes[i];
				var info=this.vertexMap[node.id];
				for (var _id in info.conn){
					node.conn[_id]=nodesMap[_id];
					node.connDis[_id]=info.connDis[_id];
				}
			}

		},

		reset : function(startNode, endNode){
			if (this.tempNodes){
				for (var i=0;i<this.tempNodes.length;i++ ){
					var node=this.tempNodes[i];
					var id=node.id;
					for (var _id in node.conn){
						var _node=node.conn[_id];
						delete _node.conn[id];
						delete _node.connDis[id];
					}
				}
			}
			this.tempNodes=[];
			this.tempConnLines={};

			this.addTempNode(startNode);
			this.addTempNode(endNode);

		},
		addTempNode : function(tmpNode){
			var nodes=this.nodes;
			var second=false;
			var polyManager=Game.polyManager;
			do{
				for (var i=0,len=nodes.length;i<len;i++){
					var node=nodes[i];
					var _p1=[tmpNode.x,tmpNode.y], _p2=[node.x,node.y];
					var line=[ _p1,_p2  ];
					line.aabb=GeomUtils.calLineAABB(_p1,_p2);
					var intersect=false;
					for (var j=0,count=this.polyList.length;j<count;j++){
						var poly=this.polyList[j];
						intersect=polyManager.checkPolyCollide(poly, line,true );
						if (intersect){
							break;
						}
					}
					if (!intersect){
						var dx=node.x- tmpNode.x , dy=node.y- tmpNode.y;
						var dis= Math.sqrt(dx*dx+dy*dy);
						node.conn[tmpNode.id]=tmpNode;
						tmpNode.conn[node.id]=node;
						node.connDis[tmpNode.id]=dis;
						tmpNode.connDis[node.id]=dis;
						if (!this.tempConnLines[node.id+"-"+tmpNode.id]
							&& !this.tempConnLines[tmpNode.id+"-"+node.id]
							){
							this.tempConnLines[tmpNode.id+"-"+node.id]=line;
						}
					}
				}
				if (second){
					break;
				}
				second=true;
				nodes=this.tempNodes;
			}while(true);
			this.tempNodes.push(tmpNode);
		},

		createNode : function(x,y,id){
			var node={
				id : id||Math.random()*10000>>1 ,
				x : x,
				y : y,
				conn : {},
				connDis : {}
			};
			return node;
		},


			getStepCost : function(fromNode,toNode){
	    		return fromNode.connDis[toNode.id];
	    	},

			getCostH : function(node,endNode){
				var dx=node.x-endNode.x;
				var dy=node.y-endNode.y;
				return  Math.sqrt(dx*dx+dy*dy);
			},
			isSolution : function(node , endNode){
				//return node === endNode ;
				return node.x==endNode.x && node.y==endNode.y;
			},

			findSuccessors : function(node,openList,closeList){
		
				var successors = [];	
				var f = node.f ;
		       	var nns=node.conn;
		      	for (var key in nns){
		      		var nn=nns[key];
		      		if (nn.x>=0 && nn.x<=WIDTH && nn.y>=0 && nn.y<=HEIGHT){
			      		successors.push(nns[key]);
		      		}
		      	}
        		return successors; 
				
			},

			drawConnLines : function(context){
				for (var key in this.tempConnLines){
					if (key!="size"){
						var line=this.tempConnLines[key];
						drawLine(context,line[0],line[1],"#999999");
					}
				}
			}
		};

		for (var key in PT) {
			PathFinder.prototype[key] = PT[key];
		}

})();
