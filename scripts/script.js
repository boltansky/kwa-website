var dt = 5000;
var page = 1;
var timer;
function next_page() {
	$('.dstyle').removeClass('on');
	$('.dstyle:eq(' + page + ')').toggleClass('on');
	$('.timer:eq(0)').animate({'width':'100%'}, dt - 100, function(){
		$('.timer').css('width', '0%');
		// console.log('here');
	});
	$('.slider').animate({'left':'' + page * -100 + '%'}, 500);
	page += 1;
	timer = setTimeout(next_page, dt);
	if (page == 3) {
		page = 0;
	}
}

var scount;
function setup() {
	scount = $('.slide').size();
	var interval = 100.0 / scount;

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
}