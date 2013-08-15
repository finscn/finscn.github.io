


function checkPolyOutLineCollide(poly, p1, p2){
		var len = poly.length;
		var point, lastPoint = poly[len - 1];
		for (var i = 0; i < len; i++) {
			point = poly[i];
			var thick=true;       
			var t=checkSegmentIntersect( p1, p2 ,lastPoint, point,thick);
			if (t){
				return true;
			}
			lastPoint = point;
		}
		return false
}



function checkSegmentIntersect(start1, end1 ,start2, end2, thick) {
		
	var side1=getSideThin(op1[0]+nx*t,op1[1]+ny*t, nx,ny,np)
	var side2=getSideThin(op2[0]+nx*t,op2[1]+ny*t, nx,ny,np)
	

		  console.log(op1Side,op2Side)
        return op1Side*op2Side<0;
}

   function getSideThin(x,y, nx,ny,ndet) {
    	 var  side = x *nx + y *ny-ndet;
        return side>0?1:side<0?-1:0;
    }
Game.beforeStart=function(){
	return;

	var p1=[10,10];
	var p2=[190,200];
	var n=GeomUtils.unitNormal(p1,p2);
	var nx=n[0], ny=n[1], np=n[2];

	var op1=[18,20];
	var op2=[220,220];
	var on=GeomUtils.unitNormal(op1,op2);

	drawLine(Game.context, p1,p2,"red")

	drawLine(Game.context, op1,op2,"blue")



	return false;
}

function mainInput(event) {
event=event.changedTouches?event.changedTouches[0]:event;
	var x = event.offsetX || (event.pageX - Game.canvas.offsetLeft),
		y = event.offsetY || (event.pageY - Game.canvas.offsetTop);
//alert([event.offsetX,event.pageX , Game.canvas.pageX])
	y=y/Y_SCALE;

	var player = Game.player;
	// player.lastX=player.x;
	// player.lastY=player.y;
	player.lastWorkable = player.workable;
	//player.x=x;
	//player.y=y;


	var endPos=movePointInPolys(x,y,Game.polyManager.polyList);
	if (endPos===false){
		endPos=[x,y]
	}

	//player.color=ind?"red":"green";
	player.workable = endPos ? true : false;
	Game.redraw = true;
	if (player.workable && player.lastWorkable) {
		var finder=player.pathFinder;
		var t = Date.now();

	var startPos=movePointInPolys(player.x,player.y,Game.polyManager.polyList);
	if (startPos===false){
		startPos=[player.x,player.y]
	}
// console.log(startPos,endPos);
		var startNode = finder.createNode(startPos[0], startPos[1],"__start");
		var endNode= finder.createNode( endPos[0], endPos[1],"___end" );
		var path = finder.search(startNode, endNode);

		player.setPath(path);
		player.pathForDraw = path.slice();

		console.log(Date.now() - t);

		Game.drawBg();
		finder.drawConnLines(Game.bgcontext);
		Game.polyManager.drawConnLines(Game.bgcontext);
		drawCircle(Game.bgcontext,endPos[0],endPos[1],player.radius-3,
			path.length>0?"green":"red");
		// 
	} else if (player.workable) {
		//player.x=x;
		//player.y=y;
	}

}
