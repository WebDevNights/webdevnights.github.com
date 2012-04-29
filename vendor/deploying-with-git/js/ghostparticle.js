// Animation Shim by Paul Irish
window.requestAnimFrame = (function () {
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function (callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
})();


function toRGB (_vec4) {

	return rgbastring = "rgba(" + _vec4[0] + "," + _vec4[1] + "," + _vec4[2] + "," + _vec4[3] + ")";
	
}

function randomRange(min, max) {

    return ((Math.random()*(max-min)) + min); 

}



/*
 * Particle Class
 *
 * With closure for counting the particles
 * 
 */
var countParticles = 0;

var Particle = function (_graphic) {

	// Self
	var self 		= this;

	// Management
	this.myAge		= 0;
	this.live		= true;
	this.span		= 100;
	this.id			= countParticles++;

	// Position and movement
	this.pos		= [0, 0];
	this.vel		= [0, 0];
	this.acc		= [0, 0];

	// Display Properties
	this.size		= 0;
	this.theta		= 0;
	this.alpha		= 1;

	// Delta values
	this.dsize		= 1;
	this.dtheta		= 0;
	this.dalpha		= 0;

	// Render function - whichever is required
	this.mode		= 'source-over';
	this.graphic	= _graphic;
	this.draw		= (this.graphic) ? this.drawGraphic : this.drawPlain;

}


Particle.prototype = {

	d			: {},

	age			: function () {

		if (!this.live) { return; }

		this.myAge += 1;

		if (this.myAge > this.span) { this.live = false; return; }

		this.size		*= this.dsize;
		
		this.alpha		+= this.dalpha;
		if(this.alpha < 0) { this.alpha = 0; }

		var p = this.myAge / this.span * Math.PI * 2;

		this.theta		+= this.dtheta;

		this.vel[0]		*= this.acc[0];
		this.vel[1]		*= this.acc[1];

		this.pos[0]		+= this.vel[0];
		this.pos[1]		+= this.vel[1];

	},

	drawPlain	: function (_cx) {

		if (!this.live) { return; }

		_cx.fillStyle = toRGB(this.alpha);

		_cx.beginPath();
		_cx.arc(this.pos[0], this.pos[1], this.size, 0, Math.PI * 2, true);
		_cx.closePath();
		_cx.fill();
		
	},

	drawGraphic	: function (_cx) {

		if (!this.live) { return; }

        _cx.save();  
	         
        _cx.translate(		this.pos[0],	this.pos[1]		);
        _cx.scale(			this.size, 		this.size		);
		_cx.rotate(			this.theta						);
        _cx.translate(this.graphic.width / -2, this.graphic.width / -2 );

        _cx.globalAlpha				 = this.alpha; 
        _cx.globalCompositeOperation = this.mode;

        _cx.drawImage(this.graphic, 0, 0);

        _cx.restore();

	}


};


/* 
 * Particle Emitter Class
 *
 */

var ParticleEmitter = function (_canvas, _positionX, _positionY, _emitterWidth, _emitterHeight, _emitterSpeed, _particleConfig) {

	var disable = false;

	function stop () { 
		disable = true; 
	}


	/* 
	 * Fallbacks
	 *
	 */

	var $canvas	= $(_canvas),
		canvas	= $canvas.get(0);

	// if !canvas {
	//
	// 		flashcanvas here
	//
	// } 

	var cx = canvas.getContext('2d');
		cx.globalCompositeOperation = 'source-over';

	/*
	 * Properties
	 *
	 */

	var allParticles 		= [],									// All particles in the system
		framesElapsed 		= 0,									// Track number of frames processed
	
		emitter				= {
			pos				: [_positionX, _positionY ], 			// Position of the emitter on screen	
			dim				: [_emitterWidth, _emitterHeight], 		// Emission zone	
		},

		// Emitter config
		opt = {

			showEmitter		:	false,								// Draw the emitter visibly on the screen
			emissionRate	:	2,									// How many new particles per frame
			particleLimit	:	300,								// Limit number of particles at once
			gravity			:	0.01								// Gravity multiplier
			
		},
		
		particleConfig_size			=	1,							// Radius of blob (in units)
		particleConfig_theta		=	0,							// Initial rotation
		particleConfig_alpha		=	1,							// Opacity
		particleConfig_jitter		=	0.2,						// Randomness of aging
		particleConfig_life			=	250,						// Total lifespan in frames
		particleConfig_graphic		=	false,						// Images reference, if false, just draw a circle
		particleConfig_composite	=	'source-over',				// Global compositing mode
		particleConfig_init			=	null,						// Function run at particle birth

		particleConfig_dsize		=	1,							// Scale multiplier
		particleConfig_dtheta		=	0,							// Rotation (additive)
		particleConfig_dalpha		=	0,							// Additive opacity delta
		particleConfig_custom		=	null;						// Function run on particle aging
		



	/* 
	 * Methods
	 *
	 */

	// Draw emitter on screen
	function showEmitter () {

		opt.showEmitter = true;

	}

	// Change compositing mode
	function setCompositing (_compMode) {

		particleConfig_composite = _compMode;

	}

	// Bind custom birth configuration function
	function setParticleCustomInit (_initFunc) {

		particleConfig_init = _initFunc;

	}

	// Bind custom aging function 
	function setParticleCustomAge (_ageFunc) {

		particleConfig_custom = _ageFunc;

	}


	// Create Particle
	function newParticle (_pos, _vel, _acc) {

		// apply default values
		var thisParticle = new Particle (particleConfig_graphic);

		thisParticle.pos		= (_pos) ? _pos : [
			randomRange(emitter.pos[0] - emitter.dim[0] / 2, emitter.pos[0] + emitter.dim[0] / 2),	
			randomRange(emitter.pos[1] - emitter.dim[1] / 2, emitter.pos[1] + emitter.dim[1] / 2)
		];

		// Lifecycle
		thisParticle.span		= particleConfig_life;

		// Display Properties
		thisParticle.theta		= particleConfig_theta;
		thisParticle.alpha		= particleConfig_alpha;
		thisParticle.size 		= particleConfig_size;

		// Delta values
		thisParticle.dsize		= particleConfig_dsize;
		thisParticle.dtheta		= particleConfig_dtheta;
		thisParticle.dalpha		= particleConfig_dalpha;

		// Render function - whichever is required
		thisParticle.mode		= particleConfig_composite;

		// Run custom initialiser
		if (particleConfig_init !== null) {

			particleConfig_init.apply(thisParticle);

		}

		// Save new particle to scene
		allParticles.push(thisParticle);
	}

	// Draw everything
	function drawAllParticles() {

		var currentParticle;

		for (var i = 0; i < allParticles.length; i++) {

			currentParticle = allParticles[i];

			currentParticle.age();

			if (particleConfig_custom) {

				particleConfig_custom.apply(currentParticle);

			}

			currentParticle.draw(cx);
		}

	}


	/*
	 * Render loop
	 *
	 */

	function renderFrame() {

		// Emit new particles
		for (var i = 0; i < opt.emissionRate; i++) {

			newParticle();

		}

		// Clear
		cx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw emitter itself if required
		if (opt.showEmitter) {

			cx.fillStyle = "rgba(50, 200, 200, 0.5)";
			cx.fillRect(
					emitter.pos[0] - emitter.dim[0] / 2, 
					emitter.pos[1] - emitter.dim[1] / 2,
					emitter.dim[0], 
					emitter.dim[1]
				);

		}

		// Draw live particles
		drawAllParticles();

		// Cull particles above the emmitter limit
		while (allParticles.length > opt.particleLimit) { 

			allParticles.shift(); 

		}
		
		// Count frame
		framesElapsed++;

		// Next frames
		if (!disable) {
			requestAnimFrame(renderFrame, canvas);
		}

	}

	function start(_graphic) {

		if (_graphic) {

			var img = new Image();

			img.onload = function () {

				// Set graphic for use
				particleConfig_graphic = img;

				// scale '1' to be one real unit, not one multiple of the image's size
				particleConfig_size = particleConfig_size / img.width;
				renderFrame();
			}

			img.src = _graphic; 

		} else {

			renderFrame();

		}

		disable = false;
	
	}


	/*
	 * Expose public methods
	 *
	 */

	return {

		start			:	start,
		stop			:	stop,

		newParticle		:	newParticle,

		setCompositing	: 	setCompositing,
		setCustomInit	:	setParticleCustomInit,
		setCustomAge	:	setParticleCustomAge,

		showEmitter		:	showEmitter

	};

}


var emitter = new ParticleEmitter("#smoke", 60, 60, 80, 20);
var haze = {

		init : function () {

			this.size		= randomRange(0.1, 0.3);
			this.span		= 150;

			this.vel		= [randomRange(-0.05,  0.05),	randomRange(-0.3, 0)];
			this.acc		= [1, 1];

			this.gravity	= 0.002;

			this.theta		= randomRange(-Math.PI, Math.PI);
			this.basealpha	= randomRange(  0.025,  0.05);
			
			this.dtheta 	= randomRange(-0.01, 0.01);
			this.dsize		= 1.001;

			this.period		= 150 / (Math.PI * 2);

		},

		age : function () {

			var p = this.myAge / this.period;

			this.vel[1]		+= this.gravity;
			this.alpha		= (1 - Math.cos(p)) * this.basealpha;

			if (this.alpha < 0) { this.alpha = 0; }

		}
			   
	};
										
emitter.setCustomInit(haze.init);
emitter.setCustomAge (haze.age);
	
var preload = new Image();
	preload.src = "img/particle-smoke.png";
	

function gs_smoke_start () {   
	emitter.start('img/particle-smoke.png');
};

function gs_smoke_stop () {
	emitter.stop();
}





