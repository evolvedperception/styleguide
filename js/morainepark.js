jQuery(document).ready(function($){

	/* MOBILE NAV */
	// click event
	"use strict";

	$('#main-nav').prepend('<div id="menu-button">Menu</div>');
	$('#main-nav #menu-button').on('click', function(){
		var menu = $(this).next('ul');
		if (menu.hasClass('open')) {
			menu.removeClass('open');
		}
		else {
			menu.addClass('open');
		}
	});

	/* END MOBILE NAV */

	/* DESKTOP NAV HACK  */
	//  if viewport < 1024, ignore hover event

	// level 1/2 nav
	$('#main-nav>ul>li.has-children').each(function() {
		var viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		// var viewport = $('body')[0].scrollWidth;
		$(this).hover(function () {
			if (viewport >= 1024) {
				$(this).children('ul').show(); 
				var pos = $(this).offset();
				if (pos.left < 0) { pos.left = 0; }
				if (viewport-pos.left < 195) {
					if (viewport-pos.left < 95) {
						$(this).children('ul').addClass('left200'); 
					}
					else {
						$(this).children('ul').addClass('left75');
					}
				}
			}
		},function () {
			if (viewport >= 1024) { $(this).children('ul').hide(); }
		});
	});

	// level 3+ nav
	$('#main-nav>ul>li>ul li.has-children').each(function() {
		var viewport = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		$(this).hover(function () {
			if (viewport >= 1024) {
				$(this).children('ul').show(); 
				var pos = $(this).offset();
				if (pos.left < 0) { pos.left = 0; }
				if (viewport-pos.left < 395) {
					$(this).children('ul').addClass('left200'); 
				}
			}
		},function () {
			if (viewport >= 1024) {$(this).children('ul').hide(); }
		});
	});

	/* END DESKTOP NAV HACK */

	// if you change this breakpoint in the style.css file, don't forget to update this value as well
	var MqL = 1004;

	// move nav element position according to window width
	moveNavigation();

	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});


	function checkWindowWidth() {
		//check window width (scrollbar included)
		var e = window,
            a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        if ( e[ a+'Width' ] >= MqL ) {
			return true;
		} else {
			return false;
		}
	}

	function moveNavigation(){
		var navigation = $('.cd-nav');
  		var desktop = checkWindowWidth();
        if ( desktop ) {
			navigation.detach();
			navigation.insertBefore('.cd-header-buttons');
		} else {
			navigation.detach();
			navigation.insertBefore('.cd-header-buttons');
		}
	}

	// end import


	window.addEventListener('WebComponentsReady', function() {
	var scope = document.querySelector("template#scope");
	scope.selected = 0; // set initial tab
	/*
	var mid = document.getElementById("mid");
	mid.className = mid.className + " viz";
	*/
	});

		// side menu
		$('.lefty-nav ul li a').click(function(e) {
			$(this).parent().toggleClass('expanded');
			$(this).parent().children('ul').toggleClass('is-hidden');
			if($(this).attr('target') == '_blank'){
				window.open($(this).attr('href'), '_blank');
			} else {
				location.href = $(this).attr('href');
			}
			e.preventDefault();
		});
	
		// mobile menu
		$('#main-nav ul li a').click(function(e) {
			e.preventDefault();
			$(this).parent().siblings().each(function() {
				if($(this).hasClass('expanded')) {
					// console.log($(this) + 'open');
					$(this).toggleClass('expanded');
					$(this).children('ul').toggleClass('is-hidden');
				}
			  });
			$(this).parent().toggleClass('expanded');
			$(this).parent().children('ul').toggleClass('is-hidden');
			if ($(this).attr('href') != '#' || $(this).attr('href') != '#/'){
				if($(this).attr('target') == '_blank'){
					window.open($(this).attr('href'), '_blank');
				} else {
					location.href = $(this).attr('href');
				}
			}
			return false;
		});



	$(window).scroll(function() {
		//alert($(this).scrollTop());
		if ($(this).scrollTop() >= 50){
			$('header').addClass("sticky");
			$('.mobile-menu').addClass("sticky");
			$('.mega-menu-container').addClass("sticky");
		  }
		  else{
			$('header').removeClass("sticky");
			$('.mobile-menu').removeClass("sticky");
			$('.mega-menu-container').removeClass("sticky");
		  }
		});

	$('.hamburger').click(function() {
		$('.mobile-menu').slideToggle();
		if ($('.rotator-container').hasClass('expanded') == false) {
			$('.rotator-container').addClass('expanded');
		} else {
			$('.rotator-container').removeClass('expanded');
		}

	});

	// secondary nav promo links
	  $('nav .promo-links .promo-tab a').click(function(){
	  $('nav .promo-links').toggleClass('is-expanded');
	  $('nav .promo-links').toggleClass('is-contracted');
	});

	// accordion v2
	if ($('ul').hasClass('accordion')) {
		$('ul.accordion').accordion({
			autoHeight: false,
			collapsible: true,
			navigation: true,
			heading: '.accordion li'
		});

		if (location.href.split('/').length == 5) {
			$('ul.accordion li').click();
			$('body').click();
		}
	}

});
