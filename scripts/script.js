var dt = 5000;
var page = 1;
var timer;

function next_page() {
	$('.dstyle').removeClass('on');
	$('.dstyle:eq(' + page + ')').toggleClass('on');
	$('.timer').animate({'width':'100%'}, dt - 100, function(){
		$('.timer').css('width', '0%');
	});
	$('.slider').animate({'left':'' + page * -100 + '%'}, 500);
	page += 1;
	timer = setTimeout(next_page, dt);
	if (page == $('.slide').size()) {
		page = 0;
	}
}

function pause_slideshow() {
	$('.timer').animate({'width':'100%'});
	$('.timer').stop();
	clearTimeout(timer);
}

function resume_slideshow() {
	$('.timer').css('width','0%');
	page -= 1;
	if (page == -1) {
		page = $('.slide').size() - 1;
	}
	next_page();
}

var pause;
function setup_pause() {
	var hundred = $(window).height();
	var triggerOffset = 20;
	if ($(document).scrollTop() > hundred - 50 - triggerOffset) {
		pause_slideshow();
		pause = true;
	}
	else {
		pause = false;
	}

	$(window).scroll(function() {
		var scroll = $(document).scrollTop();
		hundred = $(window).height();
		
		if (pause == false && scroll > hundred - 80 - 50 - triggerOffset) {
			pause_slideshow();
			pause = true;
		}
		else if (pause == true && scroll <= hundred - 80 - 50 - triggerOffset){
			resume_slideshow();
			pause = false;
		}
	});
}

var menubar = false;
function setup_menubar() {
	$('#header-menu').click(function() {
		if (menubar == false) {
			$('.menu-bar').toggleClass('reveal');
			$('.timer').toggleClass('movedown');
			$('.menu-closer').css('display','block');
			menubar = true;
		}
		else {
			$('.menu-bar').removeClass('reveal');
			$('.menu-closer').css('display','none');
			$('.timer').removeClass('movedown');
			menubar = false;
		}
	});
	$('.menu-closer').click(function() {
		if (menubar == true) {
			$('.menu-bar').removeClass('reveal');
			$('.menu-closer').css('display','none');
			$('.timer').removeClass('movedown');
			menubar = false;
		}
	})

	var catcount = $('.menu-item').size();
	for (var idx = 0; idx < catcount; idx += 1) {
		$('.menu-item:eq(' + idx + ')').click((function(n) {
			return function() {
				var offset = $('#content').position().top;
				var dx = $('.sec:eq(' + n + ')').position().top + offset;  //move to next anchor point
				pause_slideshow();
				$('.menu-bar').removeClass('reveal');
				$('.menu-closer').css('display','none');
				$('.timer').removeClass('movedown');
				menubar = false;
				$("body, html").animate({ scrollTop: dx - 81});
			}
		})(idx));
	}
}

var scount;
function setup() {
	scount = $('.slide').size();
	var interval = 100.0 / scount;

	$('.indicator').click(function() {
		$("html").animate({ scrollTop: $(window).height() - 80 - 50});
		$("body").animate({ scrollTop: $(window).height() - 80 - 50}, function() {
			pause_slideshow();
		});
	});

	$('.slider').css('width', '' + scount + '00%');
	for (var idx = 0; idx < scount; idx += 1) {
		$('.slide:eq(' + idx + ')').css('left','' + idx * interval + '%');
		$('.slide:eq(' + idx + ')').css('width','' + interval + '%');
	}

	for (var idx = 0; idx < $('.dot').size(); idx += 1) {
		$('.dot:eq(' + idx + ')').click((function(n) {
			return function() {
				$('.timer').stop();
				$('.timer').css('width', '0%');
				clearTimeout(timer);
				page = n;
				next_page();
			}
		})(idx));
	}

	$('.slit.left').click(function() {
		$('.timer').stop();
		$('.timer').css('width', '0%');
		clearTimeout(timer);

		page -= 2;
		if (page < 0) {
			page += 3;
		}

		$('.slider').animate({'left':'' + page * -100 + '%'}, 500);
		next_page();
	});

	$('.slit.right').click(function() {
		$('.timer').stop();
		$('.timer').css('width', '0%');
		clearTimeout(timer);
		
		next_page();
	});

	$('.dstyle:eq(0)').toggleClass('on');
	$('.timer:eq(0)').animate({'width':'100%'}, dt - 100, function(){
		$('.timer').css('width', '0%');
	});
	timer = setTimeout(next_page, dt);


	// add for parallax effect
	$('.parallax-sec-s2').parallax({ speed : 0.2}); 


	setup_pause();
	setup_menubar();
}