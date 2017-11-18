function loadImages(fileList, callback) {
    // src, id, onLoad(img, $next)
    var count = fileList.length;
    var imagePool = {};
    var idx = -1;
    var $next = function() {
        idx++;
        if (idx >= count) {
            callback(imagePool);
            return;
        }
        var cfg = fileList[idx];
        var img = new Image();
        var src = cfg.src || cfg.url || cfg;
        var id = cfg.id || src;
        img.src = src;
        img.id = id;
        img.onload = function(event) {
            imagePool[img.id] = img;
            if (cfg.onLoad) {
                cfg.onLoad.call(img, img);
            }
            $next();
        };
        img.onerror = function() {
            $next();
        };
    }
    $next();
    return imagePool;
}


function randomInt(min, max) {
    return ((max - min + 1) * Math.random() + min) >> 0;
}
