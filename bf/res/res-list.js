
"use strict";

Config.resList = [];

(function() {
	var list = [
	
	{ id : "bg" , src : "res/image/bg.png" },
	{ id : "player-up" , src : "res/image/1.png" },
	{ id : "player-down" , src : "res/image/2.png" },
	{ id : "enemy-0" , src : "res/image/enemy-0.png" },
	{ id : "enemy-1" , src : "res/image/enemy-1.png" },
	{ id : "block-0" , src : "res/image/block-0.png" },
	{ id : "block-1" , src : "res/image/block-1.png" },
	{ id : "bomb" , src : "res/image/bomb.png" },
	// {id : "crack", type : "media", src : "res/sound/crack.mp3"},


	];

	list.forEach(function(r) {
		Config.resList.push(r);
	});


}());

