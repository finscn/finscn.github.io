
"use strict";


var controller;
function initTouchController(){
	controller=new Toucher.Controller({
		beforeInit : function(){
			this.dom=window;
		},
		preventDefaultMove :true
	});
	controller.init();
}



function initTouchListener(){
	var modal=$id("modal");
	var isTouchingView=function(element){
		if (modal && modal.contains(element)){
			return false;
		}
		return element.id=="canvas" 
				|| element.getAttribute("ui")===null
				|| element.getAttribute("not-ui")!==null;
	}


	var tap=new Toucher.Tap({	
			maxTimeLag : 1200 ,
			maxDistance : 15,
			touchStartTime : 0,
			start : function(wrappers, event, controller){
				this.enabled=true;
				this.touchStartTime=wrappers[0].startTime;

				var x=wrappers[0].pageX;
				var y=wrappers[0].pageY;

				var element=event.target;
				if (isTouchingView(element)){

				}else{

				}
			},

			trigger : function(x, y, wrappers,event, controller){
				var element=event.target;
				// console.log(["tap.trigger",element])
				if (isTouchingView(element)){

				}else{
					setTimeout(function(){
						console.log(element,element.ontap)
						if (element.ontap){
							element.ontap(event);
						}else{

						}
					},4);
				}
			},

			onTouchEnd : function(x,y, wrappers,event, controller){
				var element=event.target;
				this.touchStartTime=0;
			}
		}
	);


	var pan=new Toucher.Pan({
			trigger : function(dx,dy,sx,sy,x,y,wrappers,event,controller){
				var t0=wrappers[0];
				var time= (t0.moveTime - t0.startTime);
				var mx=t0.moveAmountX, my=t0.moveAmountY;

				var element=event.target;
				if (isTouchingView(element)){

				}else{

				}
			}
		}
	);

    var swipe=new Toucher.Swipe({
        minDistance : 50,
        maxTime : 2000,
        filterWrappers : function(type,wrappers,event,controller){
           return wrappers.length==1;
           // return true;
        },
		trigger : function(disX,disY,time,wrappers,event,controller){
            var vx=disX/time, vy=disY/time;
            var element=event.target;


            if (Math.abs(vx)>0.12 || Math.abs(vy)>0.12){
				
	            if (isTouchingView(element)){

	            }else{

	            }
            }

        }
    })




	controller.addListener(tap);
	controller.addListener(pan);
	controller.addListener(swipe);


	/* element.classList.contains(className); */

}


