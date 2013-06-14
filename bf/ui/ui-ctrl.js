

;(function(exports){


"use strict";


var UI={}
var UINode={};
var UICmp={};

/*



 */



var UICtrl={
	

	images : [
		"./res/ui/title.png",
	],

	now : 0,

	init : function(){

		UICtrl.task={};
		UICtrl.taskTimeStep=33;
		UICtrl.SN=1;
		UICtrl.interval=setInterval(function(){
				UICtrl.now+=UICtrl.taskTimeStep;
				for (var id in UICtrl.task){
					var t=UICtrl.task[id];
					t.update(UICtrl.taskTimeStep,UICtrl.now);
				}
			},Math.floor(1000/UICtrl.taskTimeStep));
	},

	setNow : function(now){
		UICtrl.now=now
	},

	noop : function(){},
	
    hide : function(domId){
    	var dom=UI[domId];
        dom.style.display="none";
        // dom.style.visibility="hidden";
    },
    show : function(domId){
    	var dom=UI[domId];
        dom.style.display="block";
        dom.style.visibility="visible";
    },
    showSome : function(map){
    	for (var id in UINode){
			var e=UINode[id];
			if (id[0]=="_"){
				continue;
			}
			if (map[id]){
				e.style.display="block";
		        e.style.visibility="visible";
			}else{
				e.style.display="none";
		        e.style.visibility="hidden";
			}
		}
    },
    openPanel : function(id){
    	UICmp[id].open();
    },

    preloadImages : function(){
    	preloadImages(UICtrl.images,function(){
    		UIAction.imagesLoaded();
    	});

    },

////////////////////////////////
////////////////////////////////
////////////////////////////////
////////////////////////////////

// showMainScreen
// hideMainScreen
// showLoading
// hideLoading
// updateLoading
// initGameUI
// preloadImages

	initContainer : function(w,h){
		UI.container=$id("container");
		UI.container.style.width=w+"px";
		UI.container.style.height=h+"px";

	},


    initAllUI : function(){

		var container=UI.container;
		var modal=UI.modal;
		var uiElement=container.querySelectorAll("*[id]");
		for (var i=0;i<uiElement.length;i++){
			var e=uiElement[i];
			var id=e.id;
			UI[id]=e;
			if (e!=modal && e.tagName=="DIV" 
				&& ( e.parentNode==container || e.parentNode==modal)  ){
				console.log(id)
				UICtrl.hide(id);
				UINode[id]=e;
			}
		}

		UI.playBtn.ontap=function(){
			UICtrl.hideMainScreen();
			game.start();
		}
		UI.pauseBtn.ontap=function(){
			if (!game.paused){
				game.pause();
				UICtrl.show("mask");
				UICtrl.show("pausePanel")
			}
		}
		UI.resume.ontap=function(){
			if (game.paused){
				game.resume();
				UICtrl.hide("mask");
				UICtrl.hide("pausePanel")
			}
		}

		UI.restart.ontap=UI.restart2.ontap=function(){
			UICtrl.hideMainScreen();
			UICtrl.hide("mask");
			UICtrl.hide("pausePanel");
			UICtrl.hide("gameoverPanel");
			game.restart()
		}
		// UI.quitBtn.ontap=UI.quitBtn2.ontap=function(){
		// 	game.exit()
		// }

    },
    initEvent : function(){
		initTouchController();
    	initTouchListener();
    },


	showSplash : function(){

		UI.splash=$id("splash");
		UICtrl.show("splash");

		UI.loading=$id("loading");
		UI.loadBar=$id("loadBar");

		UI.canvas=$id("canvas");
		UI.modal=$id("modal");
		UI.mask=$id("mask");

		UI.splash.showing=true;
	},
	hideSplash : function(){
		UICtrl.hide("splash");
	},

    showMainScreen : function(){
    	UICtrl.show("mainScreen");
    },
    hideMainScreen : function(){
    	UICtrl.hide("mainScreen");

    },
    showLoading : function(){
    	UICtrl.show("loading");
    },
    hideLoading : function(){
    	UICtrl.hide("loading");
    },
    updateLoading : function(value){
    	UI.loadBar.style.width=value+"%"; 
	},

	showHUD : function(){
		UICtrl.show("hud");
	},

	showCombo : function(){
		console.log("showCombo")
		if (!UI.comboBar.displayed){
			UI.comboBar.classList.add("display-combo");
			UI.comboBar.displayed=true;
		}
	},
	hideCombo : function(){
				console.log("hideCombo")

		if (UI.comboBar.displayed){
			UI.comboBar.classList.remove("display-combo");
			UI.comboBar.displayed=false;
		}
	},
	updateCombo : function(combo){
		UI.comboValue.innerHTML=combo;
		UI.comboBar.classList.add("update-combo");
		setTimeout(function(){
			UI.comboBar.classList.remove("update-combo");
		},200)
	},

	showGameover : function(){
		UICtrl.show("mask");
		UICtrl.show("gameoverPanel");

	},
	hiScore : 0,
	loadHiScore : function(){
		UICtrl.hiScore=window.localStorage.getItem("hi")||0;
		if (!UICtrl.hiScore){
			window.localStorage.setItem("hi",0)
		}
		UI.hiScoreValue.innerHTML=UICtrl.hiScore;
	},
	updateScore : function(score){
		console.log("updateScore",score)
		UI.score.innerHTML=score;
		if (score>=UICtrl.hiScore){
			window.localStorage.setItem("hi",score);

			UICtrl.hiScore=score;
			UI.hiScoreValue.innerHTML=UICtrl.hiScore;
		}
	},
	updateHP : function(hp){
		console.log("updateHP",hp)
		// UI.hpBar.innerHTML=hp;
		UI.hpValue.style.width=hp/5*100+"%";
	},
	updatePower : function(power){
		// console.log("updatePower",power)
		// UI.powerBar.innerHTML=power;
	},	
	updateTime : function(startTime){
		var time=Date.now()-startTime;
		time=Math.floor(time/100);
		var s=time/10;
		if (s>>0===s){
			s=s+".0";
		}
		// console.log("updateTime",s);
		UI.time.innerHTML=s;
	},
	updateKilled : function(killed){
		console.log("updateKilled",killed);
		UI.killed.innerHTML=killed;

	},

	updateNextKilled : function(nextKilled){
		UI.nextKilled.innerHTML=nextKilled;
	},



	showError : function(err){
		var msg=ConstKey[err]||err;
		console.error?console.error("Error : "+err+":"+msg):console.log("Error : "+err+":"+msg);
	},
};


exports.UI=UI;
exports.UINode=UINode;
exports.UICmp=UICmp;
exports.UICtrl=UICtrl;

}(exports));

