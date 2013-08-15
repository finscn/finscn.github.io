
function Block(id, x,y,poly){
	this.id=id;
	this.x=x||0;
	this.y=y||0;
	this.intX=Math.round(this.x);
	this.intY=Math.round(this.y);
	
	if (!poly){
		poly= getRandomPoly(0,0, 
				10*Config.blockScale, 20*Config.blockScale, 
				Config.minSide, Config.maxSide );
		GeomUtils.rotatePoly(poly, genRandom(-90,90) );
		GeomUtils.roundPolyVertex(poly);		
	}
	GeomUtils.translatePoly(poly,this.intX,this.intY);
	this.poly=poly;
	
	this.boundPoly=GeomUtils.polyOffsetting(poly,Player.radius,1.2 );
	GeomUtils.roundPolyVertex(this.boundPoly);

	this.init();
}


Block.prototype={
	constructor : Block ,

	id : null ,

	x : 0,
	y : 0,


	init : function(){

		
	},

	draw : function(context){
		if (this.wall){
			console.log(this.poly);
		}
		drawPoly(context, this.poly, "#444444" ,true);
		//drawPoly(context, this.boundPoly,"rgba(100,100,100,0.5)");
		context.fillStyle="#66ff99"
		context.fillText(this.id, this.x-20,this.y);
		// context.fillText(this.boundPoly.id, this.x-20,this.y);
	}
};

function createWalls(){
	var wall, i=0;

	var w=WIDTH, h=10;
	wall=new Block( "wall"+i++, 
		WIDTH/2, 0,
		[
			[-w/2, -h/2],
			[w/2, -h/2],
			[w/2, h/2],
			[-w/2, h/2]
		]
			 );
	wall.wall=true;
	Game.blocks.push( wall  );
	Game.polyManager.addPoly(wall.boundPoly);

	wall=new Block( "wall"+i++, 
		WIDTH/2, HEIGHT,
		[
			[-w/2, -h/2],
			[w/2, -h/2],
			[w/2, h/2],
			[-w/2, h/2]
		]
			 );
	wall.wall=true;
	Game.blocks.push( wall  );
	Game.polyManager.addPoly(wall.boundPoly);


	w=10, h=HEIGHT;

	wall=new Block( "wall"+i++, 
		0, HEIGHT/2,
		[
			[-w/2, -h/2],
			[w/2, -h/2],
			[w/2, h/2],
			[-w/2, h/2]
		]
			 );
	wall.wall=true;
	Game.blocks.push( wall  );
	Game.polyManager.addPoly(wall.boundPoly);

	wall=new Block( "wall"+i++, 
		WIDTH, HEIGHT/2,
		[
			[-w/2, -h/2],
			[w/2, -h/2],
			[w/2, h/2],
			[-w/2, h/2]
		]
			 );
	wall.wall=true;
	Game.blocks.push( wall  );
	Game.polyManager.addPoly(wall.boundPoly);
}

function createBlocks(num){
	num = num||2;	
	for (var i=0;i<num+1;i++){	
		var len=Game.blocks.length;
		var block;
		var idx=0;
		do{
			var x = genRandom(Game.player.radius,WIDTH-Game.player.radius);
			var y = genRandom(Game.player.radius,HEIGHT-Game.player.radius);
			var coll=false;
			block=new Block( "block"+i, x, y );
			
			for (var s=0;s < len ;s++){
				if ( checkPolyCollide(block.boundPoly, Game.blocks[s].poly) ){
					coll=true;
					break;
				}
			}
			idx++;
		}while(coll && idx<100)
		if (i<num){
			Game.blocks.push( block  );
			Game.polyManager.addPoly(block.boundPoly);
		}else{
			Game.player.x=block.x;
			Game.player.y=block.y;
			Game.player.workable=true;
		}
		
	}


	var t=Date.now();
	Game.polyManager.calConnectivity();
	console.log(Date.now()-t);


}

