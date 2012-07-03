

var WIDTH = 1000,
	HEIGHT = 500;

var currentWidth = WIDTH / 4 ,
	currentIndex = -1 ,
	lastCurrentIndex=-1,
	coverMargin = 70,
	rotation = 60,
	perspective = 900;


var container, covers, images ,shadows ;
var coverCount;

window.onload = function(event) {
	$id("loading").style.display="none";

	container = $id("container");
	var style = container.style;
	style.visibility="visible";
	style.width = WIDTH + "px";
	style.height = HEIGHT + "px";
	style.left = -WIDTH / 2 + "px";
	style.webkitPerspective = perspective + "px";
	style.webkitPerspectiveOrigin = "50% 50%";


	covers = container.getElementsByTagName("div");
	covers=Array.prototype.slice.call(covers,0);
	images = container.getElementsByTagName("img");
	coverCount = images.length;

	initCovers();

	initEvent();

}

function initCovers() {
	var idx=0;
	shadows=[];
	covers.forEach(function(c,idx){
		var img = images[idx];
		var s=c.style;
		s.top = (HEIGHT - img.height) / 2 + "px";
		s.left = (WIDTH - img.width) / 2 + "px";
		s.height = img.height * 2 - 2 + "px";
		s.width=img.width+"px";
		s.webkitTransformOrigin = "50% 20%";

		var shd=document.createElement("div");
		shd.style.width=img.width+"px";
		shd.style.top=img.height+"px";
		c.appendChild(shd);

		shadows.push(shd);
	});

	setCurrentCover(0);

	setTimeout(function() {
		covers.forEach(function(c, idx) {
			c.style.webkitTransition = "-webkit-transform 0.4s ease-out";
		});
	}, 10)

}



function setCurrentCover(idx) {
	idx = Math.min(coverCount - 1, Math.max(idx, 0));

	if (currentIndex === idx) {
		return;
	}
	lastCurrentIndex=currentIndex;
	currentIndex = idx;

	for (var i = 0; i < idx; i++) {
		moveToLeft(i);
	}

	for (var i = idx + 1; i < coverCount; i++) {
		moveToRight(i);
	}

	var cover = covers[currentIndex];
	cover.style.webkitTransform = "translateX(0px) translateZ(0px) scale(0.5) rotateY(0deg) ";
	shadows[currentIndex].style.opacity=1;

}


function moveToLeft(idx) {
	var cover = covers[idx];
	var offsetX = (idx - currentIndex) * coverMargin - currentWidth;
	cover.style.webkitTransform = " translateX(" + offsetX + "px) translateZ(-300px) scale(0.5) rotateY(" + rotation + "deg) ";
	if (idx===lastCurrentIndex){
		shadows[idx].style.opacity=0;
	}
}

function moveToRight(idx) {

	var cover = covers[idx];
	var offsetX = (idx - currentIndex) * coverMargin + currentWidth;
	cover.style.webkitTransform = " translateX(" + offsetX + "px) translateZ(-300px) scale(0.5) rotateY(-" + rotation + "deg) ";
	if (idx===lastCurrentIndex){
		shadows[idx].style.opacity=0;
	}

}

function initEvent() {

	var down = "mousedown";
	var up = "mouseup";
	var move = "mousemove";

	if ("ontouchstart" in document) {
		down = "touchstart";
		up = "touchend";
		move = "touchmove";
	}

	var touched = false;
	var startX = null,
		currentX = null;

	var coldDown = false;
	document.addEventListener(down, function(event) {
		touched = true;
		startX = "pageX" in event ? event.pageX : event.touches[0].pageX;
		event.preventDefault()
	}, true)

	document.addEventListener(move, function(event) {
		currentX = "pageX" in event ? event.pageX : event.touches[0].pageX;
		if (!coldDown && startX !== null && currentX !== startX) {
			var f = 100;
			var delta = currentX - startX;
			var step = Math.abs(Math.round(delta / f));
			if (delta < -f) {
				setCurrentCover(currentIndex + step);
				startX = currentX;
				coldDown = true;
			} else if (delta > f) {
				setCurrentCover(currentIndex - step);
				startX = currentX;
				coldDown = true;
			}
			if (coldDown) {
				setTimeout(function() {
					coldDown = false;
				}, 100);
			}
			event.preventDefault()
		}
		
	}, true)

	document.addEventListener(up, function(event) {
		touched = false;
		startX = currentX = null;
		event.preventDefault()
	}, true)
}



function $id(id) {
	return document.getElementById(id);
}

