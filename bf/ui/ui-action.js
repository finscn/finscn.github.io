
;(function(exports){

"use strict";


var UIAction={

    connect : function(host,port){
        connectServer(host,port);
    },

    checkServerInfo : function(info){
        if (!info){
            Config.servers=testServerList.servers;
             loadAllResources();
             return;
        }
        var appver=info.appver,
            gamever=info.ver;

        Config.servers=info.servers;

        loadAllResources();

        // if (info==1){
        //     $TODO("应用更新, 提示 & 跳转到app store");
        // }else if (info==2){
        //     $TODO("自更新, 自动更新");
        // }else{
        //     loadAllResources();
        // }
    },

    imagesLoaded : function(){
        window.uiLoaded=true;
        console.log("imagesLoaded")
    },

    signUp : function(nickName,heroName){
        game.signUp(nickName,heroName);
    },
    startSlideView : function(vx,vy){
        game.currentScene&&game.currentScene.startSlide(vx,vy);
    },

    stopSlideView : function(){
        game.currentScene&&game.currentScene.stopSlide();
    },

    touchStartOnView : function(x, y) {
        if (!game.currentScene){
            return;
        }
        x = x - game.pos.left;
        y = y - game.pos.top;
        game.currentScene.onTouchStart(x, y);
        // beforeScale();
    },

    tapOnView : function(x, y) {
        if (!game.currentScene){
            return;
        }
        x = x - game.pos.left;
        y = y - game.pos.top;
        game.currentScene.onTouchTap(x, y);
    },

    touchEndOnView : function(x, y) {
        if (!game.currentScene){
            return;
        }
        x = x - game.pos.left;
        y = y - game.pos.top;
        game.currentScene.onTouchEnd(x, y);
        // beforeScale();
    },

    touchMoveOnView : function(dx, dy, x, y, sx, sy) {
        if (!game.currentScene){
            return;
        }
        x = x - game.pos.left;
        y = y - game.pos.top;
        sx = sx - game.pos.left;
        sy = sy - game.pos.top;
        game.currentScene.onTouchMove(x, y, dx, dy, sx, sy);
    },
    _proxy_touchMoveOnView : function(dx, dy, x, y, sx, sy) {
        ViewBridge.evalRemote("UIAction.touchMoveOnView("+dx+","+dy+","+x+","+y+","+sx+","+sy+")");
    },
    
    beforeScale : function() {
        if (!game.currentScene){
            return;
        }
        Config.scale = game.currentScene.map.scale;
    },

    scaleView : function(scale, cx, cy) {
        if (!game.currentScene){
            return;
        }
        var map = game.currentScene.map;
        map.setToScale( Config.scale * scale,cx,cy);
    },
    _proxy_scaleView : function(scale,cx,cy) {
        ViewBridge.evalRemote("UIAction.scaleView("+scale+","+cx+","+cy+")");
    },


///////////////////////
///////////////////////
///////////////////////

    goBattle : function(){
        UICtrl.showFinding();
        game.to_goBattle=true;
         // game.goBattle();
    },

    goHome : function(){
        UICtrl.showFinding();
        game.to_goHome=true;
        // game.goHome();
    },

    endBattle : function(){
        if (!game.currentScene){
            return;
        }
        game.currentScene.toFinish=true;
    },



    upgradeAction : function(){
        game.currentScene&&game.currentScene.startUpgrade()
    },

    trainAction : function(){
        if (!game.currentScene){
            return;
        }
        var ab=game.currentScene.activeBuilding;
        UICtrl.openTrainPanel(ab.getTrainingInfo());
    },

    researchAction : function(){
        game.currentScene&&game.currentScene.research();
    },

    collectAction : function(){
        game.currentScene&&game.currentScene.collect();
    },

    buyGoods : function(key){
        game.currentScene&&game.currentScene.buyGoods(key);
    },

    selectSoldier : function(name,isHero){
        if (!game.currentScene){
            return;
        }
        game.currentScene.selectSoldier(name,isHero);      
        UICtrl.highLightSoldier(name)            
    },


    updateTrainPanel : function(){
        if (!game.currentScene){
            return;
        }
        var ab=game.currentScene.activeBuilding;
        UICtrl.updateTrainPanel(ab.getTrainingInfo());
    },

    upgradeSkill : function(heroId,skillName){
        game.currentScene.upgradeSkill(heroId,skillName);
    },

///////////////////////
///////////////////////
///////////////////////


    startBuild : function(key) {
        game.currentScene&&game.currentScene.readyToBuild(key);
    },

    startProduce : function(name){
        game.currentScene&&game.currentScene.startProduce(name)
    },

    cancelProduce : function(name){
        game.currentScene&&game.currentScene.cancelProduce(name)
    },

    finishProduce : function(){
        game.currentScene&&game.currentScene.finishProduce()
    },

    finishNowAction : function(){
        game.currentScene&&game.currentScene.finishNow()
    },

}

exports.UIAction=UIAction;

}(exports));

