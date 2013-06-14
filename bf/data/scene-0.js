
;(function(){


var s0=	{
	width: 768 ,
	height:1280,
	player : {
		x:768>>1,
		y:700
	},

	enemyScoreInfo : {
		0 : 10,
		1 : 20,
		2 : 30,
		3 : 40,
	},

	nextStageKilled : [
		5,		// 10
		10,		// 40
		20,	// 150
		50,	// 800
		Number.MAX_VALUE
	],

	// nextStageKilled : [
	// 	10,		// 10
	// 	50,		// 40
	// 	200,	// 150
	// 	1000,	// 800
	// 	Number.MAX_VALUE
	// ],


	background : {},

	stageBlocks : [
		[
			{ } , 
			{ type : 1 } , 
			{ } ,
			{ } , 
			{ } ,
			{ } ,
			{  type : 1  } ,
			{ }
		],

		[
			{ } , 
			{ type : 1 } , 
			{ type : 1 } , 
			{ } ,
			{ } ,
			{ type : 1 } , 
			{ type : 1 } ,
			{ }
		],

		[
			{ } , 
			{ type : 1 } , 
			{ type : 1 } , 
			{ type : 1 } , 
			{ } ,
			{  type : 1  } ,
			{  type : 1  } ,
			{ }
		],

		[
			{ type : 1 } , 
			{ type : 1 } , 
			{ type : 1 } , 
			{ type : 1 } , 
			{ type : 1 } , 
			{ type : 1 } ,
			{ type : 1 } ,
			{ type : 1 } ,
		],
	],


	enemies : [
		{hp : 1},
		{hp : 1},
		{hp : 1},
		{hp : 1},

		{hp : 1, type:1},
		{hp : 1, type:1},
	],

	spawns : [
		{ x:80*1,w:32,h:32 } , 
		{ x:80*3,w:32,h:32 } , 
		{ x:80*5,w:32,h:32 } , 
		{ x:80*7,w:32,h:32 } , 
		{ x:80*9,w:32,h:32 } , 
	]

};

registerScene(0,s0);


}());


