(function(exports, undefined) {

    function GameWorld(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }


    exports.GameWorld = Class.create(GameWorld, {

        solveIterations: 6,
        gravityY: 0,
        allowSleep: true,

        initCollideManager : function(){
            var cm = this.collideManager = new GameCollideManager();

            // cm.onCollided = this.onCollided || cm.onCollided;
            // cm.onSeparated = this.onSeparated || cm.onSeparated;
            // cm.onCollideSolve = this.onCollideSolve || cm.onCollideSolve;
            cm.init(this);

        },
        
    }, World);


}(exports));