(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

    $WIN = $(window);


	var clPreloader = function() {
			
		$("html").addClass('cl-preload');

		$WIN.on('load', function() {

			//force page scroll position to top at page refresh
			$('html, body').animate({ scrollTop: 0 }, 'normal');

			// will first fade out the loading animation 
			$(".pre-img").fadeOut("slow", function() {
				// will fade out the whole DIV that covers the website.
				$(".preloader").delay(300).fadeOut("slow");
			}); 
			
			// for hero content animations 
			$("html").removeClass('cl-preload');
			$("html").addClass('cl-loaded');
		
		});
	};
	/* Move header
    * -------------------------------------------------- */
   var clMoveHeader = function () {

	var hero = $('.page-hero'),
		hdr = $('header'),
		triggerHeight = hero.outerHeight() - 170;


	$WIN.on('scroll', function () {

		var loc = $WIN.scrollTop();

		if (loc > triggerHeight) {
			hdr.addClass('sticky');
		} else {
			hdr.removeClass('sticky');
		}

		if (loc > triggerHeight + 20) {
			hdr.addClass('offset');
		} else {
			hdr.removeClass('offset');
		}

		if (loc > triggerHeight + 150) {
			hdr.addClass('scrolling');
		} else {
			hdr.removeClass('scrolling');
		}

	});

	// $WIN.on('resize', function() {
	//     if ($WIN.width() <= 768) {
	//             hdr.removeClass('sticky offset scrolling');
	//     }
	// });

};


/* Mobile Menu
 * ---------------------------------------------------- */ 
var clMobileMenu = function() {

	var toggleButton = $('.header-menu-toggle'),
		nav = $('.header-nav-wrap');

	toggleButton.on('click', function(event){
		event.preventDefault();

		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();
	});

	if (toggleButton.is(':visible')) nav.addClass('mobile');

	$WIN.on('resize', function() {
		if (toggleButton.is(':visible')) nav.addClass('mobile');
		else nav.removeClass('mobile');
	});

	nav.find('a').on("click", function() {

		if (nav.hasClass('mobile')) {
			toggleButton.toggleClass('is-clicked');
			nav.slideToggle(); 
		}
	});

};


/* Highlight the current section in the navigation bar
 * ------------------------------------------------------ */
var clWaypoints = function() {

	var sections = $(".target-section"),
		navigation_links = $(".header-nav li a");

	sections.waypoint( {

		handler: function(direction) {

			var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prevAll(".target-section").first();

			var active_link = $('.header-nav li a[href="#' + active_section.attr("id") + '"]');

			navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},

		offset: '25%'

	});
	
};

/* Smooth Scrolling
    * ------------------------------------------------------ */
   var clSmoothScroll = function() {
        
	$('.smoothscroll').on('click', function (e) {
		var target = this.hash,
		$target    = $(target);
		
			e.preventDefault();
			e.stopPropagation();

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, cfg.scrollDuration, 'swing').promise().done(function () {

			// check if menu is open
			if ($('body').hasClass('menu-is-open')) {
				$('.header-menu-toggle').trigger('click');
			}

			window.location.hash = target;
		});
	});

};

	(function clInit() {

		clPreloader();
		clMoveHeader();
        clMobileMenu();
        clWaypoints();
	})();
        
	})(jQuery);