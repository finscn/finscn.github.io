var StageConfig = {
    groundCount: 200,
    groundSize: 24,

    "global": {

    },
};

(function() {
    var base = {
        removeRequire: 2,
        finishRequire: 7,

        cardCount: 15,
        threeCount: 2,
        doubleCount: 1,

        timeCount: 16 * 1000 * 1, //+ Infinity,
        flip: 0, //0.15,
        rotate: 0, //0.10,

        cardStart: 0,
        cardEnd: 12,

        freezeToolRate: 0,
        eraserToolRate: 0,
    };

    var between = function(v, min, max) {
        return Math.max(min, Math.min(max, v));
    };

    for (var i = 0; i < StageConfig.groundCount; i++) {
        var cfg = JSON.parse(JSON.stringify(base));
        StageConfig[i] = cfg;

        cfg.groundIndex = i;
        cfg.finishRequire = Math.floor(cfg.finishRequire);
        cfg.cardCount = Math.floor(cfg.cardCount);
        cfg.threeCount = Math.ceil(cfg.threeCount);
        cfg.doubleCount = Math.floor(cfg.doubleCount);

        cfg.cardStart = Math.floor(cfg.cardStart);
        cfg.cardEnd = Math.floor(cfg.cardEnd);
        cfg.timeCount = Math.ceil(cfg.timeCount);

        // console.log(i, cfg.timeCount, cfg.cardCount, cfg.cardStart, cfg.cardEnd);

        ////////////////////////////////////////////

        // base.finishRequire = between(base.finishRequire + 0.3, 1, 9);
        base.cardCount = between(base.cardCount + 0.25, 0, 24);
        base.doubleCount = between(base.doubleCount + 0.1, 0, 3);
        base.threeCount = between(base.threeCount - 0.2, 0, 3);

        base.cardStart = between(base.cardStart + 0.07, 0, 5);
        base.cardEnd = between(base.cardEnd + 0.23, 0, 30);
        base.timeCount = between(base.timeCount - Math.pow(base.timeCount, 0.51), 7 * 1000, 25 * 1000);

        base.flip = between(base.flip + 0.004, 0, 0.3);
        base.rotate = between(base.rotate + 0.003, 0, 0.2);

    }

}());
