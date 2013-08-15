


function genRandom(lower, higher) {
	lower = (lower||lower===0)?lower : 0;
	higher = (higher||higher===0)?higher : 9999;
	return Math.floor( (higher - lower + 1) * Math.random() ) + lower;
}


function $id(id){
	return document.getElementById(id);
}



function getDomOffset(dom){
			if (dom.getBoundingClientRect){
				//{left:left, top:top}
				return dom.getBoundingClientRect();
			}
			var left = dom.offsetLeft, top = dom.offsetTop;
			while((dom = dom.parentNode) && dom != document.body && dom != document){
				left += dom.offsetLeft;
				top += dom.offsetTop;
			}
			return {left:left, top:top};
		};

function drawPoint(context,px,py,color){
	var bak=context.fillStyle;
	context.fillStyle=color||bak;
	context.fillRect(px-1,(py-1)*Y_SCALE,3,3*Y_SCALE);
	context.fillStyle=bak;
}

function drawLine(context,p1,p2, color){
	var bak=context.strokeStyle;
	context.strokeStyle=color||bak;
	context.beginPath();
	context.moveTo( p1[0] ,p1[1]*Y_SCALE );
	context.lineTo( p2[0] ,p2[1]*Y_SCALE );
	context.stroke();
	context.closePath();
	// context.strokeStyle=bak;	
}
function drawPoly(context,poly, color ,fill){
	var bak=context.strokeStyle;
	context.strokeStyle=color||bak;	
	context.beginPath();
	context.moveTo( poly[0][0] ,poly[0][1]*Y_SCALE );
	for (var i=0,len=poly.length;i<len;i++){
		var idx=(i+1)%len;	      		
		context.lineTo( poly[idx][0] ,poly[idx][1]*Y_SCALE );
	}
	if (fill){
		context.fillStyle=color||bak;	
		context.fill();
	}else{
		context.stroke();
	}	
	context.closePath();

	// context.strokeStyle=bak;	
}
function drawNodeList(context,nodes, color ,fill){
	if (!nodes || !nodes.length){
		return;
	}

	var bak=context.strokeStyle;
	context.strokeStyle=color||bak;	
	context.beginPath();

	context.moveTo( nodes[0].x ,nodes[0].y*Y_SCALE );
	for (var i=0,len=nodes.length;i<len;i++){
			      		
		context.lineTo( nodes[i].x ,nodes[i].y*Y_SCALE );
	}
	if (fill){
		context.fillStyle=color||bak;		
		context.fill();
	}else{
		context.stroke();
	}	
	context.closePath();

	// context.strokeStyle=bak;	
}

function drawCircle(context,x,y,r ,color,fill){
	var bak=context.strokeStyle;
	context.strokeStyle=color||bak;
 	context.beginPath();
    context.arc(x, y*Y_SCALE, r, 0, 2 * Math.PI, false);
	if (fill){
		context.fillStyle=color||bak;	
		context.fill();
	}else{
		context.stroke();
	}
    context.closePath();
    // context.strokeStyle=bak;
}


//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////


function createPoly(x,y,R, n,scaleX,scaleY){
	if (!R){
		return [ [x,y] ];
	}
	n=n||4;
		
	scaleX=scaleX||1 , scaleY=scaleY||1;
	var p1=[];
	var perAng=Math.PI*2/n;
	for (var i=0;i<n;i++ ){
		var ang=perAng*i;
		var _x= x+R*Math.cos(ang)*scaleX;
		var _y= y+R*Math.sin(ang)*scaleY;
		p1.push( [_x,_y]);
	}
	return p1;
}

function getRandomPoly(x,y,minR,maxR,minSide,maxSide){
	minR=minR||10;
	maxR=maxR||30;
	minSide=minSide||3, maxSide=maxSide||9;
	var scaleX= genRandom(10,20)/10;
	var scaleY= genRandom(10,20)/10;

	var radius= genRandom(minR,maxR);
	var n= genRandom(minSide,maxSide);

	var poly=createPoly(x,y,radius, n,scaleX,scaleY)

	return poly;	
}



