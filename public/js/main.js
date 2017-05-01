/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2016, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';

	// some helper functions
	/**
	 * from https://davidwalsh.name/javascript-debounce-function
	 */
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	// some vars
	var bodyEl = document.body,
		// window sizes
		winsize = { width : window.innerWidth, height : window.innerHeight },
		// support for animations
		support = { animations : Modernizr.cssanimations },
		// animationend event function
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		onEndAnimation = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.animations ) {
					if( ev.target != this ) return;
					this.removeEventListener( animEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(); }
			};
			if( support.animations ) {
				el.addEventListener( animEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		};

	/**
	 * Revealer obj
	 */
	function Revealer(options) {
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	/**
	 * Revealer default options
	 */
	Revealer.prototype.options = {
		// total number of revealing layers (min is 1)
		nmbLayers : 1,
		// bg color for the revealing layers
		bgcolor : '#fff',
		// effect classname
		effect : 'anim--effect-1',
		// callback
		onStart : function(direction) { return false; },
		// callback
		onEnd : function(direction) { return false; }
	};

	/**
	 * build layer structure
	 * add effect class
	 * init/bind events
	 */
	Revealer.prototype._init = function() {
		// add revealer layers
		this._addLayers();
		// now we have access to the layers
		this.layers = [].slice.call(this.revealerWrapper.children);
		// init/bind events
		this._initEvents();
	};

	/**
	 * init/bind events
	 */
	Revealer.prototype._initEvents = function() {
		// window resize: recalculate window sizes
		this.debounceResize = debounce(function(ev) {
			winsize = {width: window.innerWidth, height: window.innerHeight};
		}, 10);
		window.addEventListener('resize', this.debounceResize);
	};

	/**
	 * build layer structure and append it to the body
	 * add effect class
	 */
	Revealer.prototype._addLayers = function() {
		this.revealerWrapper = document.createElement('div');
		this.revealerWrapper.className = 'revealer';
		classie.add(bodyEl, this.options.effect);
		var  strHTML = '';
		for(var i = 0; i < this.options.nmbLayers; ++i) {
			var bgcolor = typeof this.options.bgcolor === 'string' ? this.options.bgcolor : (this.options.bgcolor instanceof Array && this.options.bgcolor[i] ? this.options.bgcolor[i] : '#fff');
			strHTML += '<div style="background:' + bgcolor + '" class="revealer__layer"></div>';
		}
		this.revealerWrapper.innerHTML = strHTML;
		bodyEl.appendChild(this.revealerWrapper);
	};

	/**
	 * reveal the layers
	 * direction: right || left || top || bottom || cornertopleft || cornertopright || cornerbottomleft || cornerbottomright
	 */
	Revealer.prototype.reveal = function(direction, callbacktime, callback) {
		// if animating return
		if( this.isAnimating ) {
			return false;
		}
		this.isAnimating = true;
		// current direction
		this.direction = direction;
		// onStart callback
		this.options.onStart(this.direction);

		// set the initial position for the layers´ parent
		var widthVal, heightVal, transform;
		if( direction === 'cornertopleft' || direction === 'cornertopright' || direction === 'cornerbottomleft' || direction === 'cornerbottomright' ) {
			var pageDiagonal = Math.sqrt(Math.pow(winsize.width, 2) + Math.pow(winsize.height, 2));
			widthVal = heightVal = pageDiagonal + 'px';
			
			if( direction === 'cornertopleft' ) {
				transform = 'translate3d(-50%,-50%,0) rotate3d(0,0,1,135deg) translate3d(0,' + pageDiagonal + 'px,0)';
			}
			else if( direction === 'cornertopright' ) {
				transform = 'translate3d(-50%,-50%,0) rotate3d(0,0,1,-135deg) translate3d(0,' + pageDiagonal + 'px,0)';
			}
			else if( direction === 'cornerbottomleft' ) {
				transform = 'translate3d(-50%,-50%,0) rotate3d(0,0,1,45deg) translate3d(0,' + pageDiagonal + 'px,0)';
			}
			else if( direction === 'cornerbottomright' ) {
				transform = 'translate3d(-50%,-50%,0) rotate3d(0,0,1,-45deg) translate3d(0,' + pageDiagonal + 'px,0)';
			}
		}
		else if( direction === 'left' || direction === 'right' ) {
			widthVal = '100vh'
			heightVal = '100vw';
			transform = 'translate3d(-50%,-50%,0) rotate3d(0,0,1,' + (direction === 'left' ? 90 : -90) + 'deg) translate3d(0,100%,0)';
		}
		else if( direction === 'top' || direction === 'bottom' ) {
			widthVal = '100vw';
			heightVal = '100vh';
			transform = direction === 'top' ? 'rotate3d(0,0,1,180deg)' : 'none';
		}

		this.revealerWrapper.style.width = widthVal;
		this.revealerWrapper.style.height = heightVal;
		this.revealerWrapper.style.WebkitTransform = this.revealerWrapper.style.transform = transform;
		this.revealerWrapper.style.opacity = 1;

		// add direction and animate classes to parent
		classie.add(this.revealerWrapper, 'revealer--' + direction || 'revealer--right');
		classie.add(this.revealerWrapper, 'revealer--animate');

		// track the end of the animation for all layers
		var self = this, layerscomplete = 0;
		this.layers.forEach(function(layer) {
			onEndAnimation(layer, function() {
				++layerscomplete;
				if( layerscomplete === self.options.nmbLayers ) {
					classie.remove(self.revealerWrapper, 'revealer--' + direction || 'revealer--right');
					classie.remove(self.revealerWrapper, 'revealer--animate');
					
					self.revealerWrapper.style.opacity = 0;
					self.isAnimating = false;

					// callback
					self.options.onEnd(self.direction);
				}
			});
		});
			
		// reveal fn callback
		if( typeof callback === 'function') {
			if( this.callbacktimeout ) {
				clearTimeout(this.callbacktimeout);
			}
			this.callbacktimeout = setTimeout(callback, callbacktime);
		}
	};

	/**
	 * destroy method
	 */
	Revealer.prototype.destroy = function() {
		classie.remove(bodyEl, this.options.effect);
		window.removeEventListener('resize', this.debounceResize);
		bodyEl.removeChild(this.revealerWrapper);
	};

	window.Revealer = Revealer;


	// grid portafolio

    /**
     * GridLoaderFx obj.
     */
    function GridLoaderFx(el, options) {
        this.el = el;
        this.items = this.el.querySelectorAll('.grid__item > .grid__link');
    }

    /**
     * Effects.
     */
    GridLoaderFx.prototype.effects = {
        shu: {
            lineDrawing: true,
            animeLineDrawingOpts: {
                duration: 800,
                delay: function(t,i) {
                    return i*150;
                },
                easing: 'easeInOutSine',
                strokeDashoffset: [anime.setDashoffset, 0],
                opacity: [
                    {value: [0,1]},
                    {value: [1,0], duration: 200, easing: 'linear', delay:500}
                ]
            },
            animeOpts: {
                duration: 800,
                easing: [0.2,1,0.3,1],
                delay: function(t,i) {
                    return i*150 + 800;
                },
                opacity: {
                    value: [0,1],
                    easing: 'linear'
                },
                scale: [0.5,1]
            }
        }
    };

    GridLoaderFx.prototype._render = function() {
        this._resetStyles();

        var self = this,
            effectSettings = this.effects.shu,
            animeOpts = effectSettings.animeOpts;

        if( effectSettings.perspective != undefined ) {
            [].slice.call(this.items).forEach(function(item) {
                item.parentNode.style.WebkitPerspective = item.parentNode.style.perspective = effectSettings.perspective + 'px';
            });
        }

        if( effectSettings.origin != undefined ) {
            [].slice.call(this.items).forEach(function(item) {
                item.style.WebkitTransformOrigin = item.style.transformOrigin = effectSettings.origin;
            });
        }

        if( effectSettings.lineDrawing != undefined ) {
            [].slice.call(this.items).forEach(function(item) {
                // Create SVG.
                var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
                    path = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
                    itemW = item.offsetWidth,
                    itemH = item.offsetHeight;

                svg.setAttribute('width', itemW + 'px');
                svg.setAttribute('height', itemH + 'px');
                svg.setAttribute('viewBox', '0 0 ' + itemW + ' ' + itemH);
                svg.setAttribute('class', 'grid__deco');
                path.setAttribute('d', 'M0,0 l' + itemW + ',0 0,' + itemH + ' -' + itemW + ',0 0,-' + itemH);
                path.setAttribute('stroke-dashoffset', anime.setDashoffset(path));
                svg.appendChild(path);
                item.parentNode.appendChild(svg);
            });

            var animeLineDrawingOpts = effectSettings.animeLineDrawingOpts;
            animeLineDrawingOpts.targets = this.el.querySelectorAll('.grid__deco > path');
            anime.remove(animeLineDrawingOpts.targets);
            anime(animeLineDrawingOpts);
        }

        if( effectSettings.revealer != undefined ) {
            [].slice.call(this.items).forEach(function(item) {
                var revealer = document.createElement('div');
                revealer.className = 'grid__reveal';
                if( effectSettings.revealerOrigin != undefined ) {
                    revealer.style.transformOrigin = effectSettings.revealerOrigin;
                }
                if( effectSettings.revealerColor != undefined ) {
                    revealer.style.backgroundColor = effectSettings.revealerColor;
                }
                item.parentNode.appendChild(revealer);
            });

            var animeRevealerOpts = effectSettings.animeRevealerOpts;
            animeRevealerOpts.targets = this.el.querySelectorAll('.grid__reveal');
            animeRevealerOpts.begin = function(obj) {
                for(var i = 0, len = obj.animatables.length; i < len; ++i) {
                    obj.animatables[i].target.style.opacity = 1;
                }
            };
            anime.remove(animeRevealerOpts.targets);
            anime(animeRevealerOpts);
        }

        if( effectSettings.itemOverflowHidden ) {
            [].slice.call(this.items).forEach(function(item) {
                item.parentNode.style.overflow = 'hidden';
            });
        }

        animeOpts.targets = effectSettings.sortTargetsFn && typeof effectSettings.sortTargetsFn === 'function' ? [].slice.call(this.items).sort(effectSettings.sortTargetsFn) : this.items;
        anime.remove(animeOpts.targets);
        anime(animeOpts);
    };

    GridLoaderFx.prototype._resetStyles = function() {
        this.el.style.WebkitPerspective = this.el.style.perspective = 'none';
        [].slice.call(this.items).forEach(function(item) {
            var gItem = item.parentNode;
            item.style.opacity = 0;
            item.style.WebkitTransformOrigin = item.style.transformOrigin = '50% 50%';
            item.style.transform = 'none';

            var svg = item.parentNode.querySelector('svg.grid__deco');
            if( svg ) {
                gItem.removeChild(svg);
            }

            var revealer = item.parentNode.querySelector('.grid__reveal');
            if( revealer ) {
                gItem.removeChild(revealer);
            }

            gItem.style.overflow = '';
        });
    };

    window.GridLoaderFx = GridLoaderFx;

    var portafolio = document.querySelector('#portafolio'),
        currentGrid = document.querySelector('#grid'),
        loader = new GridLoaderFx(currentGrid),
        loadingTimeout;

    function gridInit() {
        imagesLoaded(portafolio, function() {
            var m = new Masonry(grid, {
                itemSelector: '.grid__item',
                columnWidth: '.grid__sizer',
                percentPosition: true,
                transitionDuration: 0
            });

            m.layout();

            applyFx();

            portafolio.classList.remove('loading');
        });
    }

    function applyFx() {
        clearTimeout(loadingTimeout);
        currentGrid.classList.add('grid--loading');

        loadingTimeout = setTimeout(function() {
            currentGrid.classList.remove('grid--loading');
            loader._render();
        }, 2000);
    }

    gridInit();

})(window);