
var DEG_TO_RAD= Math.PI / 180;
var RAD_TO_DEG=  180 / Math.PI ;

var GeomUtils = {


	roundPolyVertex : function(poly){
		var len=poly.length;
		for(var i = 0; i < len; i++){
			poly[i][0]=Math.round(poly[i][0]);
			poly[i][1]=Math.round(poly[i][1]);
		}
	},
	translatePoly : function(poly,x,y){
		var len=poly.length;
		for(var i = 0; i < len; i++){
			poly[i][0]+=x;
			poly[i][1]+=y;
		}
		return poly;
	},


	rotatePoly : function(poly,deg){
		var rad=deg*DEG_TO_RAD;
		var cos=Math.cos(rad), sin=Math.sin(rad);

		var len=poly.length;
		for(var i = 0; i < len; i++){
			var p=poly[i];
			var x= p[0]*cos- p[1]*sin;
			var y= p[0]*sin+ p[1]*cos;
			p[0]=x;
			p[1]=y;
		}
		return poly;
	},
	calLineAABB : function(p1,p2){
		var minX,minY,maxX,maxY;
		if (p1[0]<=p2[0]){
			minX=p1[0];
			maxX=p2[0];
		}else{
			minX=p2[0];
			maxX=p1[0];
		}
		if (p1[1]<=p2[1]){
			minY=p1[1];
			maxY=p2[1];
		}else{
			minY=p2[1];
			maxY=p1[1];
		}
		return [minX,minY, maxX,maxY];
	},
	calPolyAABB : function (poly){
		var minX=Infinity, minY=Infinity;
		var maxX=-minX, maxY=-minY;
		var len=poly.length;
		for(var i = 0; i < len; i++){
			var p=poly[i];
			if (p[0]<minX){
				minX=p[0];
			}
			if (p[0]>maxX){
				maxX=p[0];
			}
			if (p[1]<minY){
				minY=p[1];
			}
			if (p[1]>maxY){
				maxY=p[1];
			}
		}
		return [minX,minY, maxX,maxY];
	},

	unitNormal: function(p1, p2) {

		var nx = p2[1] - p1[1];
		var ny = p1[0] - p2[0];

		var length = Math.sqrt(nx * nx + ny * ny);
		nx /= length;
		ny /= length;
		var np=nx*p1[0]+ny*p1[1];
		return [nx, ny , np];
	},
	calPolyNormal : function(poly){
		var len = poly.length;
		var normals=[] , normal ;
		var point, lastPoint = poly[len - 1];
		for (var i = 0; i < len; i++) {
			point = poly[i];
			var nx = point[1] - lastPoint[1];
			var ny = lastPoint[0] - point[0];
			var np=nx*lastPoint[0]+ny*lastPoint[1];
			normal=[nx, ny , np];
			normals.push(normal);
			lastPoint = point;
		}
		normals.push( normals.shift() );
		return 	normals;	
	},
	calPolyUnitNormal : function(poly){
		var len = poly.length;
		var normals=[] , normal ;
		var point, lastPoint = poly[len - 1];
		for (var i = 0; i < len; i++) {
			point = poly[i];
			normal=GeomUtils.unitNormal(lastPoint, point);
			normals.push(normal);
			lastPoint = point;
		}
		normals.push( normals.shift() );
		return 	normals;	
	},

	polyOffsetting: function(poly, delta, miterLimit , disLimit) {
		
		var len = poly.length;
		var newPoly = [];
		var normal ;
		var normals = poly.normals||GeomUtils.calPolyUnitNormal(poly);

		disLimit=disLimit||Infinity;
		miterLimit=miterLimit||1;
        var cOffset=0, cOffsetMin = 2/(miterLimit*miterLimit);

		
		function _doSquare(mul){
			var _p1 = [
				point[0] + lastNormal[0] * delta, 
				point[1] + lastNormal[1] * delta
			];
			var _p2 = [
				point[0] + normal[0] * delta, 
				point[1] + normal[1] * delta
			];
			if ((lastNormal[0] * normal[1] - normal[0] * lastNormal[1]) * delta >= 0 ) {

				var a1 = Math.atan2(lastNormal[1], lastNormal[0]);
				var a2 = Math.atan2(-normal[1], -normal[0]);
				a1 = Math.abs(a2 - a1);
				if (a1 > Math.PI) {
					a1 = Math.PI * 2 - a1;
				}
				var dx = Math.tan((Math.PI - a1) / 4) * Math.abs(delta * mul);
				_p1 = [
						_p1[0] - lastNormal[1] * dx, 
						_p1[1] + lastNormal[0] * dx
					];
				_p2 = [
						_p2[0] + normal[1] * dx ,
						_p2[1] - normal[0] * dx
					];
				newPoly.push(_p1);
				newPoly.push(_p2);
			} else {
				newPoly.push(_p1);
				newPoly.push(point);
				newPoly.push(_p2);
			}

		}

		function _doMiter(){
			if ((lastNormal[0] * normal[1] - normal[0] * lastNormal[1]) * delta >= 0) {
				var q = delta / cOffset;
				newPoly.push([
					point[0] + (lastNormal[0] + normal[0]) * q, 
					point[1] + (lastNormal[1] + normal[1]) * q
				]);
			} else {
				var _p1 = [
					point[0] + lastNormal[0] * delta, 
					point[1] + lastNormal[1] * delta
				];
				var _p2 = [
					point[0] + normal[0] * delta, 
					point[1] + normal[1] * delta
				];
				newPoly.push(_p1);
				newPoly.push(point);
				newPoly.push(_p2);
			}
		}

		
		lastPoint=poly[len - 1] ;
		var lastNormal=normals[len - 1] ;
		for (var i = 0; i < len; i++) {
			point=poly[i];
			normal=normals[i];
			
			if (miterLimit<=1){
				_doSquare(1);
			}else{
				cOffset = 1+(normal[0]*lastNormal[0]+normal[1]*lastNormal[1]);
				if (cOffset >= cOffsetMin){
					_doMiter();
				}else{
					_doSquare(miterLimit);
				} 
			}
			lastPoint=point;
			lastNormal=normal;
		}

		return newPoly;

	}

}





function movePointInPolys(x,y,polys){
	for (var i=0;i<polys.length;i++){
		var p=movePointInPoly(x,y, polys[i]);
		if ( p ){
			return p;
		}
	}
	return false;
}

function movePointInPoly( x, y, poly){
	var len = poly.length;
	//var p=poly[len - 1] , px = p[0] , py = p[1];
	var closed=-Infinity , closedN=-1;

	for (var i = 0; i < len; i++) {
		var n=poly.normals[i];
		var nx=n[0], ny=n[1], np=n[2];

		var det = nx*x+ny*y-np;
		if (det >= 0) {
			return false;
		}

		if (det>closed){
			closed=det;
			closedN=n;
		}
	}
	var outP=null;
	if (closed>-Player.radius){
		outP=[ x-closedN[0]*(closed-1), y-closedN[1]*(closed-1)];
	}

	return outP;
}



function checkPolyLineCollide(poly, p1, p2){
	return checkPolyCollide( poly, [ p1, p2 ]);
}

function checkPolyCollide(poly1, poly2) {
	var len1 = poly1.length,
		len2 = poly2.length;

	var p,q,v;

	var second=false;
	do{
		p=poly1[len1 - 1];
		var px = p[0];
		var py = p[1];
		for (var i = 0; i < len1; i++) {
			q=poly1[i];
			var qx = q[0];
			var qy = q[1];
			var nx = qy - py;
			var ny = px - qx;
			var NdotP = nx * px + ny * py;
			var allOutside = true;
			for (var j = 0; j < len2; j++) {
				v=poly2[j];
				var vx = v[0];
				var vy = v[1];
				var det = nx * vx + ny * vy - NdotP;
				if (det < 0) {
					allOutside = false;
					break;
				}
			}

			if (allOutside){
				return false;
			}

			px = qx;
			py = qy;
		}
		if (len2<2){
			return true;
		}
		if (second){
			break;
		}
		second=true;

		len1=len1^len2;
		len2=len1^len2;
		len1=len1^len2;
		var _t=poly1;
		poly1=poly2;
		poly2=_t;
	}while(true);

	return true;
}



function checkAABBCollide( aabb1, aabb2){

	return  aabb1[0]<aabb2[2] && aabb1[1]<aabb2[3] 
			&& aabb2[0]<aabb1[2] && aabb2[1]<aabb1[3] ;
}






