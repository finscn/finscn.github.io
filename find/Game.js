



var Game={
	container : null ,
	player : null ,
	blocks : null,
	bgcanvas : null ,
	bgcontext : null ,
	canvas : null ,
	context : null ,
	sleep : 1000,

	initEvent : function(){
		var tap= "ontouchstart" in window ? "touchstart" : "click";
		Game.canvas.addEventListener(tap, mainInput 	);
	},


	update : function(deltaTime){

		Game.player.update(deltaTime);
	},
	redraw : false ,
	draw : function(){
		//if (Game.redraw){
			Game.context.clearRect(0,0,WIDTH,HEIGHT);
			Game.player.draw(Game.context);
			Game.redraw=false;
		//}

	},

	drawBg :　function(){
		Game.bgcontext.clearRect(0,0,WIDTH,HEIGHT);
		for (var i=0;i<Game.blocks.length;i++){
			Game.blocks[i].draw(Game.bgcontext);
		}

	},
	lastTime : null ,
	currentTime : null ,

	polyManager : new PolyManager(),
	
	beforeStart : function(){},

	start : function (){
		Game.sleep = Math.floor(1000/FPS);
		Game.blocks=[];
		
		if (this.beforeStart()===false){
			return ;
		}
		Game.player=new Player(-100,-100);

		createBlocks( Config.blockNum );
		
		Game.player.pathFinder=new PathFinder({
			polyList : Game.polyManager.polyList ,
			vertexMap : Game.polyManager.vertexMap
		});
		Game.player.pathFinder.init();

		setTimeout(function(){
			Game.currentTime=Date.now();	
			showFPS(Game);

			
			Game.drawBg();
			


			Game.run();			
		})

	},
	run : function (){	

		setTimeout( Game.run, Game.sleep);
		Game.logger.frameCount++;
		
		Game.lastTime=Game.currentTime;
		Game.currentTime=Date.now();
		var deltaTime=Game.currentTime-Game.lastTime;

		if (deltaTime>1){
			Game.update(deltaTime);
			Game.draw();
		}

	}
}

