var dt = 5000;
var page = 1;
var timer;

function next_page() {
	$('.dstyle').removeClass('on');
	$('.dstyle:eq(' + page + ')').toggleClass('on');
	$('.timer').animate({'width':'100%'}, dt - 100, function(){
		$('.timer').css('width', '0%');
		// console.log('here');
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
	console.log('resume');
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

var scount;
function setup() {
	scount = $('.slide').size();
	var interval = 100.0 / scount;

	$('.indicator').click(function() {
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
		// console.log(page, page - 1);

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
		// console.log('here');
	});
	timer = setTimeout(next_page, dt);

	setup_pause();
}