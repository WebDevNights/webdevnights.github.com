var Slideshow = function (_container, _slideData, _opt) {


	// Properties
	var self	= this,
	   	$rail	= $(_container),
		$slider	= $("<div id='slider'></div>").appendTo($rail),

		slides	= [],	// actual slide objects
		ww		= 0,	// current window width

		currentIx = 0,	// ref to current slide
		sectionIx = 0,	// ref to current section

		currentSlide	= null,
		currentSection	= null;


	// Config options
	var options = $.extend({

		clickToChange	: true,
		globalOnShow	: null,
		globalOnClose	: null,
		transitionSpeed : 1000

	}, _opt);



	/*
	 * Init
	 *
	 */

	function init () {

		// Build structure
		for (var i in _slideData) {

			// Get this slide
			var thisSlide	 = _slideData[i],
				$thisSlide	 = $("<div class='slide'></div>"),
				$thisContent = $(thisSlide.content);

			// Find sections
			var $sections = $thisContent.find('section, li');
			if ($sections.length) {
				thisSlide.sections = [];
				$sections.each(function () {
					thisSlide.sections.push($(this));
				});
			}

			// Add new styles
			$thisContent.addClass('inner');
			$thisSlide.width( (100 / _slideData.length) + "%" );

			// Add slide cutsom styles
			if (thisSlide.bgcolor) {
				$thisSlide.css('background', thisSlide.bgcolor);
			}

			// Store
			thisSlide.$jq = $thisSlide;
			slides.push(thisSlide);

			// Add to slider
			$slider.append($thisSlide.append($thisContent));

		}

		// Trigger manual resize
		resize();

		// Get saved state
		var hash = window.location.hash;

		currentSlide = slides[0]

		if (hash) {

			hash = hash.replace(/#/, '');
			self.to(hash);

		} else {

			// Go to first slide
			self.to(0);

		}

	}




	//
	// Private Methods
	//


	/*
	 * limit
	 *
	 */

	function limit (_x) {

		var y = slides.length - 1;

		var z = (_x < 0) ? 0 :
				(_x > y) ? y :
				 _x;

		return z;
	}


	/*
	 * resize
	 *
	 * resize handler for keeping slides correct size
	 *
	 */

	function resize (_event) {

		ww = $(window).width();

		$slider.css({
			'left'  : - ww * currentIx,
			'width' : ww * slides.length
		});

	}




	//
	// Event Listeners
	//


	/*
	 * Window resize
	 *
	 */

	$(window).resize(resize);



	/*
	 * Click to change
	 *
	 */

	if (options.clickToChange) {

		$rail.click(function (_event) {

			self.next();

		});

	}


	/*
	 * Keybindings
	 *
	 */

	$(document).bind('keydown', function (_key) {

		switch (_key.keyCode) {

			// Left arrow
			case 37:
				self.prev();
				break;

			// Right arrow
			case 39:
				self.next();
				break;

			default:
				// Nope

		}

		return _key;

	});




	//
	// Public Methods
	//


	/*
	 * .to()
	 *
	 * swtich to a specific slide
	 *
	 */

	this.to = function (_ix) {

		// Sanitise index number
		_ix = limit(Number(_ix));

		var nextSlide = slides[_ix];

		// Do callbacks
		if (options.globalOnShow)  { options.globalOnShow.apply (nextSlide,	   [_ix, currentIx]); }
		if (options.globalOnClose) { options.globalOnClose.apply(currentSlide, [_ix, currentIx]); }

		if (currentSlide.onClose)  { currentSlide.onClose(); }
		if (nextSlide.onShow)      { nextSlide.onShow(); }

		// Init subsections of this slide
		if (nextSlide.sections) {

			currentSection	= nextSlide.sections[0];
			sectionIx		= -1;

			$(nextSlide.content).find('section, li').hide();

		}

		// Move Slides
		$slider.css('left', - ww * _ix);

		// Update hash
		window.location.hash = _ix;

		// Update references
		currentIx    = _ix;
		currentSlide = nextSlide;

	};


	/*
	 * .next() and .prev()
	 *
	 * Navigation functions
	 *
	 */

	this.next = function next () {

		if (currentSlide.sections) {

			self.nextSection();

		} else {

			self.to(limit(currentIx + 1));

		}

	};

	this.prev = function prev () {

		self.to(limit(currentIx - 1));

	};

	this.nextSection = function nextSection () {

		if (sectionIx + 1 < currentSlide.sections.length) {

			if (currentSection.hasClass('clear')) {
				$.each(currentSlide.sections, function () {
					this.hide();
				});
			}

			currentSection = currentSlide.sections[++sectionIx];
			currentSection.show();

		} else {

			self.to(limit(currentIx + 1));
			sectionIx = -1;

		}

	}


	this.prevSection = function prevSection () {

		if (sectionIx - 1 > -1) {

			if (currentSection.hasClass('clear')) {
				$.each(currentSlide.sections, function () {
					this.hide();
				});
			}

			currentSection = currentSlide.sections[--sectionIx];
			currentSection.show();

		} else if (sectionIx - 1 === -1) {

			$.each(currentSlide.sections, function () {
				this.hide();
			});

			sectionIx--;

		} else {

			self.to(limit(currentIx - 1));
			sectionIx = -1;

		}

	}

	//
	// Start
	//

	init();

};
