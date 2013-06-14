
function Scene(cfg){
	merger(this, cfg);
}

Scene.prototype={
	
	constructor : Scene ,

	x : 0,
	y : 0,
	width : 320,
	height : 320,

	player : null ,
	background : null ,

	maxEnemyCount : Infinity,
	enemyCount : 0,

	enemies : null ,
	blocks : null ,
	items : null ,
	ui : null ,

	bgImg : "bg",

	init: function(game) {
		this.game=game;

		this.bgImg=ResourcePool.get(this.bgImg)||this.bgImg;


		this.viewWidth=game.viewWidth;
		this.viewHeight=game.viewHeight;

		// this.trigger=new Trigger({
		// 	game : game,
		// 	scene : this
		// });
	
		this.tempBox=[];
		this._collInfo={collidedX:[],collidedY:[]};

		this.camera=new Camera({
			x : 0,
			y : 0,
			width : this.viewWidth,
			height : this.viewHeight,
			minX : 0,
			minY : 0,//-Infinity,
			maxX : this.width-this.viewWidth,
			maxY : this.height-this.viewHeight+2
		});
		this.camera.setPadding(0, 128, 800, 128);

		this.background=this.createBackground();
		this.stageBlocks=this.stageBlocks||[];
		this.items=this.items||[];
		this.player=this.createPlayer();
		this.enemies=this.createEnemies();
		this.particles=[];

		this.camera.focus(this.player);
		this.x=this.camera.x;
		this.y=this.camera.y;
		

		this.message=$id("message");
		this.fireButton=$id("fire");

		this.onInit();

	},

	onInit : function(){

	},

	beforeRun : function(){


		this.bgm=ResourcePool.get("bgm");
		if (this.bgm){
			this.bgm.volume=0;
			this.bgm.play();
		}
		this.crack=ResourcePool.get("crack");
		if (this.crack){
			this.crack=new Sound({
				size : 5,
				audio : this.crack
			});
			// this.crack.volume=0;
			this.crack.init();
		}
		this.frameCount=0;

		this.playStartTime=Date.now();

		UICtrl.loadHiScore();

		UICtrl.updateHP(this.player.hp);
		UICtrl.updateScore(this.player.score);
		UICtrl.updatePower(this.player.power);
		UICtrl.updateKilled(this.player.killed);

		this.stage=-1;
		this.nextStage();

		this.showHUD();
	},

	showHUD : function(){
		UICtrl.showHUD();
	},

	cd : 0,
	update: function(timeStep) {
		this.frameCount++;

        if (this.stage>1 && this.cd<0&&this.items.length<3){
            this.cd=5000;
            this.addItem();
        }else{
            this.cd-=timeStep;
        }

		if (this.frameCount%16===0){
			// UICtrl.updateTime(this.playStartTime);
		}

		var game=this.game;
		timeStep=game.timeStep;
		timeStep=Math.min(timeStep,game.maxTimeStep);
       
		// this.trigger.update(timeStep);
		var player=this.player;
		var blocks=this.blocks;
		var enemies=this.enemies;
		var particles=this.particles;
		var Me=this;

		this.background.update(timeStep);
		this.blocks.forEach(function(e){
			e.update(timeStep);
		})

		var scene=this;
		enemies.forEach(function(e){
			if (e._pieceCount===0){
				var p=scene.getNextPos();
				e.reset(p.x,p.y);
			}
			e.update(timeStep);
		})

		particles.forEach(function(e){
			e.update(timeStep);
		});

		var down=player.velY>0;
		player.update(timeStep);
		var coll=this.checkBlockY(player,player.deltaX,player.deltaY);
		player.updatePosition();
		player.updateHitBox();

		var hurt2=false;
        this.items.forEach(function(item){
            if (item.destroyed){
                return;
            }
            item.update(timeStep);
            if (Me.player.hitTest(item)){
            	hurt2=true;
            }else if (item.y>scene.y+scene.viewHeight+10){
            	item.destroyed=true;
            }
        });

		if (this.lastHP!==player.hp){
			this.lastHP=player.hp;
			UICtrl.updateHP(player.hp);
		}

		if (down){

			var box=player.getHitBox();
			var dapped=0;
			var Me=this;
			this.enemies.forEach(function(e){
				if (e.dead){
					return;
				}
				if (!e.coming 
					&& player.lastY<=e.y-e.hitBox.height+2 
					&& checkBoxCollide(box, e.getHitBox()) ){
					var coll=true;
					if (coll){
						e.explode();
						e.dead=true;
						dapped++;
						player.dappedOnce++;
						player.combo++;
						player.killed++;
						player.score+=Me.enemyScoreInfo[e.type||0];
						
					}
				}
				
			});

			if (dapped>0){
				if (this.crack){
					this.crack.play();
				}
				player.velY=player.jumpVelY;

				UICtrl.updateScore(player.score);
				UICtrl.updateKilled(player.killed);

				if (player.combo>1){
					player.power+=dapped;
					player.power=Math.min(player.power,5);
					UICtrl.updatePower(player.power);
				}
			}
		}

		if (coll && player.dappedOnce<1){
			player.combo=0;
			player.dappedOnce=0;
		}

		this.camera.focus(player);

		this.x=this.camera.x;
		this.y=this.camera.y;

		this.cleanDestoryedEntity(this.items);
	},
    cleanDestoryedEntity : function (list){
        var last=list.length-1;
        for (var i = last ; i >=0; i--) {
            if (list[i].destroyed) {
                list[i]=list[last];
                last--;
            }
        }
        list.length=last+1;
        return list;
    },

	clear : function(context, timeStep){
		context.clearRect(0,0,this.viewWidth,this.viewHeight);
	},

	render: function(context, timeStep) {

		// return;

		this.clear(context, timeStep);

		this.background.render(context,timeStep);
		
		context.save();
		context.translate(-this.x,-this.y);
		// context.drawImage(this.bgImg,0,0);

        this.items.forEach(function(item){
            item.render(context,timeStep);
        })

		this.blocks.forEach(function(e){
			if (e.hp===0){
				return;
			}
			e.render(context,timeStep);
		});

		this.enemies.forEach(function(e){
			e.render(context,timeStep);
		});

		this.player.render(context,timeStep);

		this.particles.forEach(function(e){
			e.render(context,timeStep);
		});

		context.restore();
	


		if (this.lastCombo!==this.player.combo){
			if (this.player.combo>1){
				UICtrl.showCombo();
			}else{
				UICtrl.hideCombo();
			}
			UICtrl.updateCombo(this.player.combo);

			this.lastCombo=this.player.combo;
		}
		// if (this.player.fireable){
		// 	this.fireButton.style.backgroundColor="#ff0000";
		// }else{
		// 	this.fireButton.style.backgroundColor="#999999";
		// }
	},
	
	afterLoop : function(timeStep){
		
		if (this.player.hp<=0){
			this.over=true;
			game.stop();
			UICtrl.showGameover();
			return
		}

		if (this.player.killed>=this.nextKilled){
			this.nextStage();
		}
	},



	createBackground : function(){
		var obj=newInstance( this.background, Background );
		obj.init(this);
		return obj;
	},
	createPlayer : function(){
		var obj=newInstance( this.player, Player );
		obj.init(this);
		return obj;
	},

	createBlocks : function(stageIdx){
		var scene=this;
		var list=[];
		var blocks=this.stageBlocks[stageIdx];
		blocks.forEach(function(e,idx){
			e.x=96*idx;
			e.y=1130;
			e.w=96;
			e.h=150;
			var obj=newInstance(e, Block) ;
			obj.init(scene);
			list.push(obj);
		});
		return list;
	},

	createEnemies : function(){		
		var scene=this;
		var list=[];
		this.enemies=this.enemies||[];
		this.enemies.forEach(function(e,idx){
			e=e||{};
			scene.enemies[idx]=e;

			var p=scene.getNextPos();
			e.x=p.x;
			e.y=p.y;
			
			e.velX=randomInt(4,9)/100* ([-1,1][randomInt(0,1)]);
			var obj=newInstance(e, Enemy) ;
			obj.init(scene);
			list.push( obj);
		})
		console.log(list)
		return list;
	},

	nextStage : function(){
		this.stage++;

		this.blocks=this.createBlocks(this.stage);

		var Me=this;

		this.nextKilled=this.nextStageKilled[this.stage];
		if (this.nextKilled===Number.MAX_VALUE){
			this.nextKilled=Infinity;
			UICtrl.updateNextKilled("Infinity");
		}else{
			UICtrl.updateNextKilled(this.nextKilled);
		}

	},

    addItem : function(){
        var item=new Item({
            type : 2,
            img : "bomb",
            y : this.y-20,
            x : randomInt(0,7)*70+30,
            vy : randomInt(15,20)/100
        })
        item.init(this)
        this.items.push(item);
    },

	handleInput : function(timeStep){
		if (this.over){
			return;
		}
		this.player.handleInput(timeStep);
	},


	getNextPos : function(){
		this.spawnsIndex=this.spawnsIndex||0;
		this.spawnsIndex=this.spawnsIndex%this.spawns.length;
		var spawn=this.spawns[this.spawnsIndex++];
		this.enemyCount++;
		return {
			x : spawn.x+randomInt(-2,8)*10,
			y : 1130
		};
	},

	checkBlockY : function(entity, dx, dy){
		var blocks=this.blocks;

		var x=entity.x,y=entity.y;
		var newX=x+dx;
		var newY=y+dy;

		var coll=false;
		for (var i=0,len=blocks.length;i<len;i++){
			var block=blocks[i];
			var blockBox=block.getHitBox();
			if (blockBox.x1<= newX && newX<blockBox.x2
				&& newY >= blockBox.y1
				){
				coll=true;
				dy=blockBox.y1-y;
				if (block.type==1 ){
					entity.hp--;
				}
				entity.deltaY=dy;
				// entity.velY=entity.velY>0?0:-entity.velY;
				entity.velY=entity.velY>0?entity.jumpVelY:-0.6*entity.velY;	
				break;
			}
		}
		return coll;

	},


}





