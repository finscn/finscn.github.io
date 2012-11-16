var LoopVisualizer = (function() {

	var RINGCOUNT = 160;
	var SEPARATION = 30;
	var INIT_RADIUS = 50;
	var SEGMENTS = 256;
	var VOL_SENS = 2;

	var rings = [];
	var geoms = [];
	var materials = [];
	var levels = [];
	var waves = [];
	var colors = [];
	var loopHolder = new THREE.Object3D();
	var perlin = new ImprovedNoise();
	var noisePos = 0;
	var freqByteData;
	var timeByteData;


	function init() {

		rings = [];
		geoms = [];
		materials = [];
		levels = [];
		waves = [];
		colors = [];

		////////INIT audio in
		freqByteData = new Uint8Array(analyser.frequencyBinCount);
		timeByteData = new Uint8Array(analyser.frequencyBinCount);

		scene.add(loopHolder);

		var scale = 1;
		var alt = 0;

		var emptyBinData = [];
		for(var j = 0; j < SEGMENTS; j++) {
			emptyBinData.push(0);
		}

		var arcShape = new THREE.Shape();
		arcShape.moveTo( 0, 0 );
		arcShape.arc( 0, 0, INIT_RADIUS, 0, Math.PI*2, false );

		//create rings
		for(var i = 0; i < RINGCOUNT; i++) {

			var m = new THREE.LineBasicMaterial( { color: 0xffffff,
				linewidth: 1 ,
				opacity : 0.7,
				blending : THREE.AdditiveBlending,
				depthTest : false,
				transparent : true

			});
			var circlePoints = arcShape.createPointsGeometry(128);
			var line = new THREE.Line( circlePoints, m);

			rings.push(line);
			geoms.push(circlePoints);
			materials.push(m);
			scale *= 1.05;
			line.scale.x = scale;
			line.scale.y = scale;

			loopHolder.add(line);

			levels.push(0);
			waves.push(emptyBinData);
			colors.push(0);

		}

	}

	function remove() {

		if (loopHolder){
			for(var i = 0; i < RINGCOUNT; i++) {
				loopHolder.remove(rings[i]);
			}

		}
	}

	function update() {

		analyser.smoothingTimeConstant = 0.1;
		analyser.getByteFrequencyData(freqByteData);
		analyser.getByteTimeDomainData(timeByteData);

		//get average level
		var length = freqByteData.length;
		var sum = 0;
		for(var j = 0; j < length; ++j) {
			sum += freqByteData[j];
		}
		var aveLevel = sum / length;
		var scaled_average = (aveLevel / 256) * VOL_SENS; //256 the highest a level can be?

		//get noise color posn
		noisePos += 0.005;
		var n = Math.abs(perlin.noise(noisePos, 0, 0));

		levels.push(scaled_average);
		//levels.push(binData);
		waves.push(timeByteData);
		colors.push(n);

		levels.shift(1);
		waves.shift(1);
		colors.shift(1);

		for(var ii = 0; ii < RINGCOUNT ; ii++) {

			var ringId = RINGCOUNT - ii - 1;

			for(var jj = 0; jj < SEGMENTS; jj++) {
				geoms[ii].vertices[jj].position.z = (waves[ringId][jj])*2;
			}

			//link up last segment
			geoms[ii].vertices[SEGMENTS].position.z = geoms[ii].vertices[0].position.z;

			var normLevel = levels[ringId];
			var hue = colors[ringId];

			materials[ii].color.setHSV(hue, 1, normLevel);
			materials[ii].linewidth =normLevel*3;
			materials[ii].opacity = normLevel ;
			geoms[ii].__dirtyVertices = true;
			geoms[ii].__dirtyColors = true;
			rings[ii].scale.z = normLevel;
		}

	}

	return {
		init:init,
		update:update,
		remove:remove,
		loopHolder:loopHolder
	};
	}());