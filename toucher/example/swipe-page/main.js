    function $id(id) {
        return document.getElementById(id);
    }

    var info;

    var pageSlider = new PageSlider({
        pageClassName: "page",
        swipeHolder: "swipeArea",
    });


    var controller = new Toucher.Controller({
        preventDefaultMove: true,
        moveInterval: 18,
        beforeInit: function() {
            this.dom = document.body;
        }
    });

    //创建一个tap listener的实例
    var swipe = new Toucher.Swipe({

        filterWrapper: function(type, wrapper, event, controller) {
            // 只有点击了 id==tapArea 的dom对象,才会触发这个事件
            // 条件可以是任意,不仅仅局限于dom的判断, 例如可以是点击的区域坐标 时间等等,
            // 甚至可以和点击事件无关
            return pageSlider.swipeHolder.contains(wrapper.target);
        },
        start: function(){
            var cl=pageSlider.pageContainer.classList;
            cl.remove("page-tween");
            cl.remove("end-tween");
        },
        move: function(wrappers, event, controller) {
            var t0 = wrappers[0];
            var dy=t0.deltaY;
            pageSlider.scrollBy(0,dy);
        },
        onTouchEnd: function() {
            pageSlider.align();
        },
        onSwipe: function(disX, disY, time, wrappers, event, controller) {
            // tap事件要执行的动作
            var wrapper = wrappers[0];
            var dom = wrapper.target;
            // dom.x+=dx;
            // dom.y+=dy;
            // dom.style.left=dom.x+"px";
            // dom.style.top=dom.y+"px";
            var vx = disX / time,
                vy = disY / time;
            info.innerHTML = "Swipe vel:  " + vx.toFixed(4) + ", " + vy.toFixed(4) + "";
            if (vy < -0.2) {
                pageSlider.nextPage();
            } else if (vy > 0.2) {
                pageSlider.prevPage();
            } else {
                this.onTouchEnd(disX, disY, wrappers, event, controller);
            }
        }
    });


    window.onload = function() {
        info = $id("info");
        pageSlider.init();

        controller.init();
        controller.addListener(swipe);

    }