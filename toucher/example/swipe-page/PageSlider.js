function PageSlider(options) {
    for (var p in options) {
        this[p] = options[p];
    }
    this.pageList = this.pageList || [];
}

PageSlider.prototype = {

    constructor: PageSlider,

    pageClassName: null,
    swipeHolder: null,

    pageList: null,
    currentPage: 0,

    init: function() {
        this.swipeHolder = document.getElementById(this.swipeHolder) || this.swipeHolder;
        this.swipeHolder.x = this.swipeHolder.offsetLeft;
        this.swipeHolder.y = this.swipeHolder.offsetTop;

        if (this.pageClassName) {
            var pages = document.querySelectorAll("." + this.pageClassName);
            this.setPageList(pages);
        }
    },
    setPageList: function(pageList) {
        this.pageList = Array.prototype.slice.call(pageList, 0);
    },
    setDomPos: function(dom, x, y) {
        dom.style.webkitTransform = "translate3d(" + x + "," + y + ",0)";
        dom.style.transform = "translate3d(" + x + "," + y + ",0)";
    },
    nextPage: function() {
        var p = this.pageList[this.currentPage + 1];
        if (p) {
            this.currentPage++;
            this.setDomPos(p, 0, 0);
        } else {
            var Me = this;
            this.setDomPos(Me.swipeHolder, 0, "-10%");
            setTimeout(function() {
                Me.setDomPos(Me.swipeHolder, 0, 0);
            }, 250);
        }
    },
    prevPage: function() {
        if (this.currentPage > 0) {
            var p = this.pageList[this.currentPage];
            this.setDomPos(p, 0, "100%");
            this.currentPage--;
        } else {
            var Me = this;
            this.setDomPos(Me.swipeHolder, 0, "10%");
            setTimeout(function() {
                Me.setDomPos(Me.swipeHolder, 0, 0);
            }, 250);
        }
    }
}
