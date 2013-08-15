

var WIDTH=800, HEIGHT=400;
var FPS=60;

var Y_SCALE=1;
var DEBUG={
	count : 0
}
var Config={

	// 多边形数量
	blockNum : 20 , //16,
	minSide : 3  , // 3
 	maxSide : 8 , // 8
	blockScale :　2
}


function init(){

	var bgcanvas=document.getElementById("bgcanvas");
	var canvas=document.getElementById("canvas");

	var container=bgcanvas.parentNode;
	container.style.width=WIDTH+"px";
	container.style.height=HEIGHT+"px";

	bgcanvas.width=canvas.width=WIDTH;
	bgcanvas.height=canvas.height=HEIGHT;
	bgcanvas.style.backgroundColor="white";
	canvas.style.zIndex=10;

	var bgcontext=bgcanvas.getContext("2d");
	bgcontext.lineWidth=1;
	bgcontext.strokeStyle="black";
	bgcontext.fillStyle="#666666";

	var context=canvas.getContext("2d");
	context.lineWidth=1;
	context.strokeStyle="black";
	context.fillStyle="white";

	Game.canvas=canvas;
	Game.context=context;
	Game.bgcontext=bgcontext;

	var pos=getDomOffset(canvas);
	canvas.pageX=pos.left;
	canvas.pageY=pos.top;
	
	Game.initEvent();

	Game.start();
}


