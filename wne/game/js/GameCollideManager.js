(function(exports, undefined) {

    function GameCollideManager(options) {
        for (var key in options) {
            this[key] = options[key];
        }
    }


    exports.GameCollideManager = Class.create(GameCollideManager, {

        init: function(world) {
            this.world = world;
            this.scene = world.parent;

            this.penetrated = {};
            this.arbiters = [];
            this.arbiterCount = 0;

        },


        collide: function(timeStep) {


            var scene = this.scene;
            var waves = scene.waves;
            scene.waveTargets = [scene.player];


            var waveTargets = scene.waveTargets;
            var waveTargetCount = waveTargets.length;

            var dynamics = scene.dynamics;
            var dynamicCount = dynamics.length;

            var statics = scene.statics;
            var staticCount = statics.length;


            for (var i = 0; i < dynamicCount; i++) {
                var shape = dynamics[i].shape;

                for (var j = 0; j < staticCount; j++) {
                    var staticShape = statics[j].shape;
                    this.collideTowBodies(staticShape, shape, timeStep);
                }

                for (var j = i + 1; j < dynamicCount; j++) {
                    this.collideTowBodies(shape, dynamics[j].shape, timeStep);
                }
            }
            for (var i = 0, len = waves.length; i < len; i++) {
                var wave = waves[i];
                if (wave.disabled) {
                    continue;
                }
                for (var j = 0; j < waveTargetCount; j++) {
                    var target = waveTargets[j];
                    if (wave.kicked[target.id]) {
                        continue;
                    }
                    var arbiter = this.collideTowBodies(wave.shape, target.shape, timeStep);
                    if (arbiter) {
                        wave.kickEntity(target, arbiter)
                        break;
                    }
                }
            }

        },

        onCollided: function(bodyA, bodyB, arbiter, timeStep) {
            if (bodyA.isPlayer && bodyB.isBlock) {
                bodyA.owner.hurt(bodyB.owner);
            } else if (bodyB.isPlayer && bodyA.isBlock) {
                bodyB.owner.hurt(bodyA.owner);
            } else if (bodyA.isBlock && bodyB.isBlock) {
                if (bodyA.owner.alpha==0) {
                    bodyA.owner.startFlash(false,0, 0.5,0.01)
                }
                if (bodyA.owner.alpha==0) {
                    bodyB.owner.startFlash(false,0, 0.5,0.01)
                }
            }
        }

    }, CollideManager);


}(exports));
