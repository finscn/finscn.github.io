
function Block(id, x,y){
	this.id=id;
	this.x=x||0;
	this.y=y||0;
	this.intX=Math.round(this.x);
	this.intY=Math.round(this.y);
	
	var poly= getRandomPoly(0,0, 
			10*Config.blockScale, 20*Config.blockScale, 
			Config.minSide, Config.maxSide );
	GeomUtils.rotatePoly(poly, genRandom(-90,90) );
	GeomUtils.translatePoly(poly,this.intX,this.intY);
	GeomUtils.roundPolyVertex(poly);
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
		drawPoly(context, this.poly, "#444444" ,true);
		//drawPoly(context, this.boundPoly,"rgba(100,100,100,0.5)");
		context.fillStyle="#66ff99"
		context.fillText(this.boundPoly.id, this.x-20,this.y);
	}
};

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

	// Game.polyManager.clear();
	// for (var i=0;i<testPolyList.length;i++){
	// 	var p=testPolyList[i];
	// 	Game.polyManager.addPoly(p);
	// }

	var t=Date.now();
	Game.polyManager.calConnectivity();
	console.log(Date.now()-t);

		//Game.polyManager.drawConnLines(Game.bgcontext);
		//console.log( Game.polyManager.polyToString() )

}



var testPolyList=[[[644,446],[590,459],[540,430],[525,374],[552,326],[606,313],[656,342],[671,398]],[[749,67],[719,83],[684,75],[657,53],[651,19],[681,3],[716,11],[743,33]],[[62,183],[6,189],[-38,151],[-48,95],[-16,49],[40,43],[84,81],[94,137]],[[375,384],[411,430],[404,485],[356,510],[299,494],[263,448],[270,393],[318,368]],
[[311,162],[268,160],[241,130],[252,91],[289,70],[332,72],[359,102],[348,141]],[[123,277],[84,321],[22,324],[-27,287],[-35,229],[4,185],[66,182],[115,219]],[[821,427],[852,474],[842,525],[794,544],[741,521],[710,474],[720,423],[768,404]],[[249,350],[236,400],[190,425],[140,412],[115,366],[128,316],[174,291],[224,304]],
[[346,260],[366,311],[344,362],[293,382],[242,360],[222,309],[244,258],[295,238]],[[789,153],[778,192],[744,213],[708,198],[691,159],[702,120],[736,99],[772,114]],[[834,308],[813,354],[763,376],[710,363],[682,320],[703,274],[753,252],[806,265]],[[549,100],[541,155],[497,188],[443,178],[411,132],[419,77],[463,44],[517,54]],
[[121,440],[85,470],[40,464],[12,428],[19,382],[55,352],[100,358],[128,394]],[[217,202],[182,213],[150,200],[152,165],[179,140],[214,129],[246,142],[244,177]],[[590,280],[555,272],[534,239],[540,202],[570,180],[605,188],[626,221],[620,258]],[[134,15],[112,46],[73,52],[42,30],[36,-9],[58,-40],[97,-46],[128,-24]],
[[526,416],[555,455],[552,498],[511,511],[466,490],[437,451],[440,408],[481,395]],[[852,18],[830,46],[794,52],[758,42],[740,12],[762,-16],[798,-22],[834,-12]],[[594,7],[591,58],[558,93],[514,75],[490,29],[493,-22],[526,-57],[570,-39]],[[502,307],[454,325],[406,307],[388,259],[406,211],[454,193],[502,211],[520,259]]];