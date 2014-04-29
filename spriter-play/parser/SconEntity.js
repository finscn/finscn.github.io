function SconEntity(options) {
    for (var p in options) {
        this[p] = options[p];
    }
}

SconEntity.prototype = {
    name: null,
    scon: null,
    animations: null,
    objects: null,

    init: function() {
        this.parseAnimations(this.animation);
    },

    parseAnimations: function(animations) {

        this.animationMap = {};
        var Me = this;
        animations.forEach(function(animation) {
            Me.animationMap[animation.name] = Me.parseAnimation(animation);
        });
    },

    parseAnimation: function(animation) {
        animation = new SconAnimation(animation);
        animation.parent = this;
        animation.init();
        return animation;
    },
}
