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
    x: 0,
    y: 0,
    width: null,
    height: null,
    init: function() {
        this.swipeHolder = document.getElementById(this.swipeHolder) || this.swipeHolder;
        this.swipeHolder.x = this.swipeHolder.offsetLeft;
        this.swipeHolder.y = this.swipeHolder.offsetTop;


        this.width = this.swipeHolder.clientWidth;
        this.height = this.swipeHolder.clientHeight;
        if (this.pageClassName) {
            var pages = document.querySelectorAll("." + this.pageClassName);
            this.setPageList(pages);
        }
        this.pageContainer = document.querySelector(".page-container");
        this.maxY=0;
        this.minY = -this.height * (this.pageList.length - 1);
    },

    setPageList: function(pageList) {
        var height = this.height;
        this.pageList = Array.prototype.slice.call(pageList, 0);
        this.pageList.forEach(function(p) {
            p.style.height = height + "px";
        });
        this.pageCount=this.pageList.length;
    },
    scrollBy: function(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.setDomPos(this.pageContainer,0,this.y+"px")
    },
    align: function() {
        var p=Math.round(-this.y/this.height);
        document.title=[0,this.y];
        this.gotoPage(p);
    },
    setDomPos: function(dom, x, y) {
        dom.style.webkitTransform = "translate3d(" + x + "," + y + ",0)";
        dom.style.transform = "translate3d(" + x + "," + y + ",0)";
    },
    gotoPage: function(idx){
        if (idx<0){
            this.gotoPage(0);
        }else if (idx>=this.pageCount-1){ 
            this.gotoPage(this.pageCount-1);
        }else{
            this.currentPage = idx;
            var p = this.pageList[idx];
            this.y=-this.currentPage * this.height;
            this.setDomPos(this.pageContainer, 0, this.y + "px");

        }
    },
    nextPage: function() {
        if (this.currentPage<this.pageCount-1) {
            this.currentPage++;
            var p = this.pageList[this.currentPage];
            this.y=-this.currentPage * this.height;
            this.setDomPos(this.pageContainer, 0, this.y + "px");
        } else {
            this.y=this.minY;
            var Me = this;
            this.setDomPos(Me.pageContainer, 0, Me.minY-100+"px");
            setTimeout(function() {
                Me.setDomPos(Me.pageContainer, 0, Me.minY+"px");
            }, 250);
        }
    },
    prevPage: function() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.y=-this.currentPage * this.height;
            this.setDomPos(this.pageContainer, 0, this.y+"px");
        } else {
            this.y=this.maxY;
            var Me = this;
            this.setDomPos(Me.pageContainer, 0, Me.maxY+100+"px");
            setTimeout(function() {
                Me.setDomPos(Me.pageContainer, 0, Me.maxY+"px");
            }, 250);
        }
    }
}
