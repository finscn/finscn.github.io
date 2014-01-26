
var Config = {
    width: window.innerWidth,
    height: window.innerHeight,
    FPS : 60,
    timeStep : 30,
    renderScale : 30,
    touchPixelRatio:1,
    sceneCount: 60,

    MSAAEnabled:false,
    MSAASamples:2,


    blockTiles: [7,10,12,13,14,15,16,17,18,19,20],

    playerVelocity: 0.20,
    playerAccVel: 0.002,
    dogEnemyVelocity: 0.07,
    catEnemyVelocity: 0.10,
    enemyVelocity: 0.15,
    deadLineVelocity: -0.04,
    playerWidth: 40,
    playerHeight: 60,

    // webview: "index-web.html",
};

Config.timeStep=1000/Config.FPS|0;

