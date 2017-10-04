var Tiled = Tiled || {};

(function(exports) {

    exports.Utils = {

        getMinEven: function(n) {
            return n + (n % 2);
        },

        getMaxEven: function(n) {
            return n - (n % 2);
        },

        arrayTo2D: function(arr, cols) {
            cols = cols || 1;
            var arr2 = [];
            var rows = Math.floor((arr.length + cols) / cols) - 1;
            var r = 0,
                c = 0,
                i = 0;
            for (r = 0; r < rows; r++) {
                arr2[r] = [];
                for (c = 0; c < cols; c++) {
                    arr2[r][c] = arr[i++];
                }
            }
            return arr2;
        },
    }

}(Tiled));