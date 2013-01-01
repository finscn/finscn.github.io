
var Config = {
	width : 900,
	height : 500,
	FPS : 55
};


window.onload = function() {
	
	start();

};

var background;
var sprites=[];

function start(){
	var canvas=document.getElementById("canvas");
	canvas.width=Config.width;
	canvas.height=Config.height;


	background=new Background();

	Game.init(canvas);
	
	Game.tick(function(dt, frame) {
		
		background.update(dt);

		sprites.forEach(function(s){
			s.update(dt);
		})
	});
	
	Game.render(function(context) {
		
		background.render(context);
		context.globalAlpha=0.8;
		sprites.forEach(function(s){
			s.render(context);
		})
	});
	
	Game.input(function(type, e) {
		if (type=="Up"){
			var point = e.point;
			createSprites(point.x,point.y,16);
		}
	});

	Game.start();

}


var colors=["#ff2211","#ff9911","#ffff11","#11ff11","#11ffff","#1122ff","#ff33ff"]
function createSprites(x, y,n){
	n=n||1;
	for (var i=0;i<n;i++){
		if (background.nodes.length<1){
			return;
		}
		var sprite=new Sprite({
			x : x+randomInt(-5,5),
			y : y+randomInt(-5,5),
			color : colors[randomInt(0,6)]
		});
		sprites.push(sprite);		
	}
}

function randomInt(lower, higher) {
	return ((higher - lower + 1) * Math.random() + lower)>>0;
}




