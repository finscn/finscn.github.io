
var Item = function(cfg){  
    for (var property in cfg ){
        this[property]=cfg[property];
    }
};

Item.prototype= {

    constructor : Item ,

    x : 0,
    y : 0,
    vx : 0,
    vy : 0,
    w : 0,
    h : 0,
    ox : 0,
    oy :0,
    img : null,
    aabb : null,
 
    init: function(game) {
        this.game=game;
        this.img=ResourcePool.get(this.img)||this.img;
        
        this.w=this.iw=this.img.width;
        this.h=this.ih=this.img.height;

        if (this.type===2){
            this.w-=18;
            this.ox=-4;
            this.h-=22;
            this.oy=22;
        }
        this.aabb={};
        this.updateAABB();
      
    },

    update: function(timeStep) {
        var dx=this.vx*timeStep;
        var dy=this.vy*timeStep;
        this.x+=dx;
        this.y+=dy;

        this.updateAABB();
    }, 

    updateAABB : function(){
        this.aabb.x1 = this.x-this.w/2;
        this.aabb.x2 = this.x+this.w/2;
        this.aabb.y1 = this.y-this.h/2;
        this.aabb.y2 = this.y+this.h/2;

    },
    render: function(context, timeStep) {

        context.drawImage(this.img, this.aabb.x1-this.ox,this.aabb.y1-this.oy);
        
        // this.renderAABB(context);

    },

    renderAABB : function(context){
        context.lineWidth=4;
        context.strokeStyle="red"
        context.strokeRect(
            this.aabb.x1,this.aabb.y1,
            this.aabb.x2-this.aabb.x1,
            this.aabb.y2-this.aabb.y1
            );
        context.strokeRect(this.x-4,this.y-4,8,8);

    },

    handleInput: function(game) {
        // console.log("handleInput")
    },


    pause : function(){
        this.started = true ;
    },
    resume : function(){
        this.started = true ;
    },

    gameover : function(){
        this.started=false;
 
    },
    finished : function(){
        this.started=false;
 
    },
    destroy: function(game) {
        console.log("destroy")
    }

};



