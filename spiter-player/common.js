function $id(id) {
    return document.getElementById(id);
}

function getBaseName(file) {
    var name = file.substring(file.lastIndexOf("/") + 1);
    name = name.substring(0, name.lastIndexOf("."));
    // console.log(name)
    return name;
}

function loadImage(srcList, callback) {
    var imgs = {};
    var totalCount = srcList.length;
    var loadedCount = 0;
    for (var i = 0; i < totalCount; i++) {
        var img = srcList[i];
        var image = imgs[img.id] = new Image();
        image.src = img.src;
        image.onload = function(event) {
            loadedCount++;
        }
    }
    if (typeof callback == "function") {

        function check() {
            if (loadedCount >= totalCount) {
                if (callback) {
                    callback(imgs, srcList);
                }
            } else {
                setTimeout(check, 100);
            }
        }
        check();
    }
    return imgs;
}

function loadFile(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url, false);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            callback(xmlhttp.responseText)
        }
    }
    xmlhttp.send(null);
}
