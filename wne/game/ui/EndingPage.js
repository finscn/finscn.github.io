"use strict";


(function(exports, undefined) {

    function EndingPage(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }
    EndingPage.prototype.xclass = "EndingPage";
    UIClass["EndingPage"] = EndingPage;

    exports.EndingPage = Class.create(EndingPage, {

        id: "EndingPage",
        modal: true,
        visible: false,
        relative: false,
        disabled: false,


        onInit: function(game) {
            this.setSize(game.viewWidth, game.viewHeight);
            this.initBack(game);

            this.textImg1=ResourcePool.get("end1");
            this.textX1 = (game.viewWidth - this.textImg1.width) / 2
            this.textY1 = (game.viewHeight - this.textImg1.height) / 2 - 90;

            this.textImg2=ResourcePool.get("end2");
            this.textX2 = (game.viewWidth - this.textImg2.width) / 2
            this.textY2 = (game.viewHeight - this.textImg2.height) / 2 - 90;

            this.textImg3=ResourcePool.get("end3");
            this.textX3 = (game.viewWidth - this.textImg3.width) / 2
            this.textY3 = (game.viewHeight - this.textImg3.height) / 2 - 90;

            this.textImg4=ResourcePool.get("end4");
            this.textX4 = (game.viewWidth - this.textImg4.width) / 2
            this.textY4 = (game.viewHeight - this.textImg4.height) / 2 - 90;



        },

        initBack: function(game) {

            var width = 120;
            var height = 70;
            var y = (game.viewHeight - height) / 2 + 200;

            var btn = new Button({
                relative: true,
                y: y,
                width: width,
                height: height,
                centerX: true,
                parent: this,
                render: function(context) {
                    var oy = 0;
                    if (this.down) {
                        context.globalAlpha = 0.4;
                        oy = 4;
                    } else {
                        context.globalAlpha = 1;
                    }
                    context.font = "40px DINCondensed-Bold";
                    context.fillStyle = "#333333";
                    context.fillText("Back", this.ax + 24, this.ay + 60 + oy);
                    // context.strokeStyle = "#ffffff";
                    // context.strokeRect(this.ax, this.ay, this.width, this.height)
                    context.globalAlpha = 1;

                },
                onTap: function() {
                    UIAction.backHome();
                }
            });
            btn.init(game);
            this.backBtn=btn;

        },
        onShow: function(cb) {
            this.reset();
        },
        
        reset: function(){
            this.alpha=0;
            this.alpha2=0;
            this.centerX=game.viewWidth/2;
            this.centerY=game.viewHeight/2;
            this.playerImg=ResourcePool.get("p-2");
            this.playerHX=this.playerImg.width/2;
            this.playerHY=this.playerImg.height/2;
            this.playerScale=1;
            this.scaleSeed=0;
            this.initMusic();
        },

        touchStart: function(x, y, id, list) {
            return this.checkTouch("touchStart", x, y, id, this.children);
        },
        touchEnd: function(x, y, id, list) {
            return this.checkTouch("touchEnd", x, y, id, this.children);
        },
        tap: function(x, y, id, list) {
            var rs = this.checkTouch("tap", x, y, id, this.children);
        },

        update: function(timeStep, now) {
            // TODO
        },

        initMusic: function(){
            this.musicIndex=0;
            this.musicSleep=600;
            this._musicSleep=0;
            this.music=Music[0];
            this.musicCount=this.music.length;
        },
        playMusic: function(timeStep){
            if (this._musicSleep>=this.musicSleep){
                Note.play(this.music[this.musicIndex]);
                this._musicSleep=0;
                this.musicIndex++;
                this.musicIndex=this.musicIndex%this.musicCount;
            }else{
                this._musicSleep+=timeStep;
            }
        },

        time:0,
        render: function(context, timeStep, now) {

            context.globalAlpha=Math.min(1,this.alpha);
            context.fillStyle = "rgba(0,0,0,0.4)";
            context.fillRect(0,0,game.viewWidth,game.viewHeight);

            context.drawImage(this.textImg1, this.textX1, this.textY1-50)
            context.drawImage(this.textImg2, this.textX2, this.textY2+100)

            context.font = "30px DINCondensed-Bold";
            context.fillStyle = "#ffffff";
            context.fillText("Total Time: "+(game.totalTime*0.001).toFixed(2), this.ax + 24, this.ay + 60);
            context.fillText("Total Hurt: "+game.totalHurt, this.ax + 24, this.ay + 120);

            this.alpha+=0.01;

            if (this.alpha>=1){
                if (this.time>3000){
                    this.playMusic(timeStep);
                    this.scaleSeed=this.scaleSeed%314;
                    if (this.scaleSeed>157){
                        this.scaleSeed+=5;
                    }else{
                        this.scaleSeed+=10
                    }

                    context.globalAlpha=Math.min(1,this.alpha2);
                    context.fillStyle="#ffffff";
                    context.fillRect(0,0,game.viewWidth,game.viewHeight);

                    context.drawImage(this.textImg3, this.textX3, this.textY3-110)
                    context.drawImage(this.textImg4, this.textX4, this.textY3-30)

                    context.save();
                    context.translate(this.centerX,this.centerY+30);
                    context.scale(this.playerScale,this.playerScale);
                    context.drawImage(this.playerImg,-this.playerHX,-this.playerHY);
                    context.restore();

                    this.playerScale=1.2+Math.abs(Math.sin(this.scaleSeed/100))*0.1;

                    this.backBtn.render(context,timeStep);

                    this.alpha2+=0.01;
                }
                this.time+=timeStep;
            }
            // TODO
            context.globalAlpha=1;
        },
        onRender: function(context, timeStep, now) {
            // TODO
        },

    }, Component);


}(exports));
