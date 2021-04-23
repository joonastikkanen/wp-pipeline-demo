/* global UISearch */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

(function( $ ) {
	'use strict';

	var $document = $(document);
	var $window = $(window);

	$.fn.TopMenuMargin = function() {
		$(window).on('resize orientationchange', update);

		function update() {

			var windowWidth = $(window).width();

			var $header = $('.site-header');
			var $main_content = $('#main');

			$main_content.css('paddingTop', $header.outerHeight());

			var $adminbar = $('#wpadminbar');

			var isHidden = true;
			var size = [$(window).width(), $(window).height()];

		}

		update();
	};

	$.fn.sideNav = function() {
	    var wasPlaying = false;

	    function toggleNav() {
	        $(document.body).toggleClass('side-nav-open').addClass('side-nav-transitioning');

	        var flex = $('#slider').data('flexslider');
	        if (flex) {
				if ($(document.body).hasClass('side-nav-open')) {
	                wasPlaying = flex.playing;
	                if (flex.playing)  {
	                    flex.pause();
	                }
	            } else {
	                if (wasPlaying) {
	                    flex.play();
	                }
	            }
	        }

	        var called = false;
	        $('.site').one('transitionend', function () {
	            $(document.body).removeClass('side-nav-transitioning');
	            called = true;
	        });

	        setTimeout(function() {
	            if (!called) {
	                $(document.body).removeClass('side-nav-transitioning');
	            }

	            $window.trigger('resize');
	        }, 230);
	    }

	    /* touchstart: do not allow scrolling main section then overlay is enabled (this is done via css) */
	    $('.navbar-toggle, .side-nav-overlay').on('click touchend', function (event) {
			if ($(document.body).hasClass('side-nav-transitioning')) {
	            return;
	        }

	        toggleNav();

	        if ( ! $(document.body).hasClass('side-nav-open') ) {
				$document.find('.header-navigation-wrapper button.navbar-toggle').focus();
	        } else {
				if ($window.width() <= 640) {
					$document.find('.side-nav__close-button > button').focus();
				} else {
					$document.find('nav.mobile-menu-wrapper ul li:first-child').focus();
				}
	        }

			$.fn.keepFocusInMobileSidebar();
	    });

	    /* allow closing sidenav with escape key */
		$document.on('keyup', function(event) {
			if (event.keyCode === 27 && $(document.body).hasClass('side-nav-open')) {
	            toggleNav();
	        }
	    });

	    /**
	     * ScrollFix
	     *
	     * https://github.com/joelambert/ScrollFix
	     */
	    $('.side-nav__scrollable-container').on('touchstart', function (event) {
	        var startTopScroll = this.scrollTop;

	        if (startTopScroll <= 0) {
	            this.scrollTop = 1;
	        }

	        if (startTopScroll + this.offsetHeight >= this.scrollHeight) {
	            this.scrollTop = this.scrollHeight - this.offsetHeight - 1;
	        }
	    });
	};

	$.fn.sbSearch = function() {
		/* allow closing sidenav with escape key */
		$document.on('keyup', function(event) {
		    if (event.keyCode === 27 && $('#sb-search').hasClass('sb-search-open')) {
				$("#sb-search").removeClass("sb-search-open");
		    }
		});

	   	return this.each(function() {
			new UISearch( this );
	   	});
	};

	$.fn.keepFocusInSearchModal = function() {
		$document.on('keydown', function(event) {
			var modal, selectors, elements, activeEl, lastEl, firstEl, tabKey, shiftKey;

			if ($('#sb-search').hasClass('sb-search-open')) {
				selectors = 'input, a, button';
				modal = $document.find('#sb-search');

				elements = modal.find(selectors);
				elements = Array.prototype.slice.call(elements);

				lastEl = elements[elements.length - 1];
				firstEl = elements[0];
				activeEl = document.activeElement;
				tabKey = event.keyCode === 9;
				shiftKey = event.shiftKey;

				if (!shiftKey && tabKey && lastEl === activeEl) {
					event.preventDefault();
					firstEl.focus();
				}

				if (shiftKey && tabKey && firstEl === activeEl) {
					event.preventDefault();
					lastEl.focus();
				}
			}
		});
	};

	$.fn.keepFocusInMobileSidebar = function() {
		$document.on('keydown', function(event) {
			var sidebar, selectors, elements, activeEl, lastEl, firstEl, tabKey, shiftKey;

			if ($(document.body).hasClass('side-nav-open')) {
				selectors = 'input, a, button';
				sidebar = $document.find('aside#side-nav');

				elements = sidebar.find(selectors);
				elements = Array.prototype.slice.call(elements);

				lastEl = elements[elements.length - 1];
				firstEl = elements[0];
				activeEl = document.activeElement;
				tabKey = event.keyCode === 9;
				shiftKey = event.shiftKey;

				if (!shiftKey && tabKey && lastEl === activeEl) {
					event.preventDefault();
					firstEl.focus();
				}

				if (shiftKey && tabKey && firstEl === activeEl) {
					event.preventDefault();
					lastEl.focus();
				}
			}
		});
	};

	$(function() {
		$.fn.sideNav();

		/**
		 * Search form in header.
		 */
		$("#sb-search").sbSearch();
		$.fn.keepFocusInSearchModal();

		/**
		 * FitVids - Responsive Videos in posts
		 */
		$(".wpzlb-layout, .builder-wrap, .entry-content, .video_cover, .featured_page_content").fitVids();

		/**
		 * Activate superfish menu.
		 */
		$('.sf-menu').superfish({
			'speed': 'fast',
			'animation': {
				'height': 'show'
			},
			'animationOut': {
				'height': 'hide'
			}
		});

		// TODO: check if option is enanled
		if (true) {
			// $.fn.TopMenuMargin();

			/**
			 * Activate Headroom.
			 */
			$('.site-header').headroom({
				tolerance: {
					up: 0,
					down: 0
				},
				offset: 70
			});
		}

		$('.side-nav .navbar-nav li.menu-item-has-children > a .svg-icon')
			.on( 'click', function(e) {
				e.preventDefault();

				var $li = $(this).closest('li'),
					$sub = $li.find('> ul');

				if ($sub.is(':visible')) {
					$sub.slideUp();
					$li.removeClass('open');
				} else {
					$sub.slideDown();
					$li.addClass('open');
				}
			});
	});
})( jQuery );
