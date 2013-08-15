
var PolyManager = function(cfg) {
		for (var key in cfg) {
			this[key] = cfg[key];
		}
		this.reset();
	};

PolyManager.ID_SEED=0;
PolyManager.prototype={
	constructor : PolyManager ,

	polyList : null,
	polyMap : null ,

	vertexMap : null ,

	id : null ,

	clear : function(){
		this.polyList=[];
		this.polyMap={};
		this.vertexMap={};
	},
	reset : function(){
		var polyList=this.polyList;
		this.clear();
		if (polyList!=null){
			for (var i=0,len=polyList.length;i<len;i++){
				this.addPoly(polyList[i]);
			}
		}
	},
	addPoly : function(poly){
		poly.normals=GeomUtils.calPolyUnitNormal(poly);
		poly.aabb=GeomUtils.calPolyAABB(poly);
		poly.id="Poly_"+(++PolyManager.ID_SEED);
		this.initVertex(poly);
		this.polyList.push(poly);
		this.polyMap[poly.id]=poly;
		
	},
	updatePolyAABB : function(id){
		var poly=this.polyMap[id];
		poly.aabb=GeomUtils.calPolyAABB(poly);
	},
	removePoly : function(poly){
		poly = this.polyMap[poly.id];
		delete this.polyMap[poly.id];
		var idx=this.polyList.indexOf(poly);
		this.polyList.splice(idx,0);		
	},

	initVertex : function(poly){
		for(var i = 0,len=poly.length; i < len; i++){
			poly[i].id=poly.id+"_"+i
		}
	},

	polyToString : function(){
		return JSON.stringify( this.polyList );
	},

	setVertexInfo : function(point, op,dis){
		var id=point.id;
		var info=this.vertexMap[id]=this.vertexMap[id]||{
			x : point[0],
			y : point[1],
			conn : {},
			connDis : {}
		};
		info.conn[op.id]=op;
		info.connDis[op.id]=dis;
		return info;
	},
	checkPolyCollide : function(poly1, poly2, checkAABB){
		if (checkAABB){
			var coll=checkAABBCollide(poly1.aabb, poly2.aabb);
			if (!coll){
				return false;
			}
		}
		return checkPolyCollide( poly1, poly2 );

	},
	checkPolyLineCollide : function(poly1, p1, p2, checkAABB){
		var line=[p1,p2];
		if (checkAABB){			
			line.aabb=GeomUtils.calLineAABB(p1,p2);
		}
		return this.checkPolyCollide( poly1, line ,checkAABB );
	},

	pointConnectivity : function(point,op){
		var intersect=false;
		for(var i = 0,count=this.polyList.length; i < count; i++){
			var poly=this.polyList[i];	

			intersect=this.checkPolyLineCollide( poly, point, op );

			if (intersect){
				break;
			}
		}
		if (!intersect ){
			var dx=point[0]-op[0] , dy=point[1]-op[1];
			var dis= Math.sqrt(dx*dx+dy*dy);
			this.setVertexInfo(point, op,dis);
			this.setVertexInfo(op, point,dis);

			if (!this.connLines[point.id+"-"+op.id]
				&& !this.connLines[op.id+"-"+point.id]){
				this.connLines[point.id+"-"+op.id]=[point , op];
				this.connLines.size++;
			}
		}
		return intersect;
	},

	pointConnPoly : function(point,poly){
		for (var p=0,len=poly.length;p<len;p++){
			var op=poly[p];
			if (op!=point 
				&& !this.connLines[op.id+"-"+point.id]
				 ){
				this.pointConnectivity(point,op);
			}
		}
	},

	calConnectivity : function(){
		this.connLines={};
		this.connLines.size=0;	
		for(var i = 0,count=this.polyList.length; i < count; i++){
			var poly=this.polyList[i];
			for (var p=0,len=poly.length;p<len;p++){
				var point=poly[p];

				for (var i2=0;i2<count;i2++){
					var poly2=this.polyList[i2];
					this.pointConnPoly(point,poly2);
				}

			}
		}
		return this.connLines.size;
	},

	connLines : null ,  //for debug ,
	drawConnLines : function(context){
		for (var key in this.connLines){
			if (key!="size"){
				var line=this.connLines[key];
				drawLine(context,line[0],line[1],"#999999");
			}
		}
	}


}