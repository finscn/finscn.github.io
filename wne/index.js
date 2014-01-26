window.App = window.Ejecta;
window.app = window.ejecta;

window.rootPath = "./";


if (Ejecta.AppUtils) {

    window.appUtils = new Ejecta.AppUtils();

    window.systemLocal = appUtils.systemLocal;

    console.log("ver", appUtils.ver);
    console.log("udid", appUtils.udid);
    console.log("uuid", appUtils.uuid);
    console.log("systemLocal", appUtils.systemLocal);
}


app.loadFont("game/res/DINCondensed-Bold.ttf");

// appUtils.include(window.rootPath+"test.js");
// app.include(window.rootPath+"/test/test.js");

app.include(window.rootPath + "base/config.js");
app.include(window.rootPath + "base/base.js");
app.include(window.rootPath + "base/init-app.js");

// for (var idx = 0; idx < Config.sceneCount; idx++) {
//     app.include("../../Documents/user-" + idx + ".js");
// }

app.include(window.rootPath + "boot.js");


if (Ejecta.GameCenter) {
    window.gameCenter = new Ejecta.GameCenter();
}
