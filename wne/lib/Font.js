var FontMapping = FontMapping || {};
var Font = {

    getStyle: function(size, name, style) {
        size = size || 12;
        if (style == "normal") {
            style = null;
        }
        if (window.Ejecta) {
            name = FontMapping[style ? name + " " + style : name];
            if (!name) {
                name = FontMapping["default"];
            }
            return size + "px " + name;
        }
        style = style ? style + " " : "";
        return style + size + "px " + name;
    }

};
