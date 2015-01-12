var dt = 8000;
var page = 1;
function next_page() {
	$('.dstyle').removeClass('on');
	$('.dstyle:eq(' + page + ')').toggleClass('on');
	$('.timer:eq(' + page + ')').animate({'width':'100%'}, dt - 100, function(){
		$('.timer').css('width', '0%');
		console.log('here');
	});
	$('.slider').animate({'left':'' + page * -100 + '%'}, 500);
	page += 1;
	setTimeout(next_page, dt);
	if (page == 3) {
		page = 0;
	}
}

function setup() {
	var scount = $('.slide').size();
	var interval = 100.0 / scount;

	$('.slider').css('width', '' + scount + '00%');
	for (var idx = 0; idx < scount; idx += 1) {
		$('.slide:eq(' + idx + ')').css('left','' + idx * interval + '%');
		$('.slide:eq(' + idx + ')').css('width','' + interval + '%');
	}

	$('.dstyle:eq(0)').toggleClass('on');
	$('.timer:eq(0)').animate({'width':'100%'}, dt - 100, function(){
		$('.timer').css('width', '0%');
		console.log('here');
	});
	setTimeout(next_page, dt);
}