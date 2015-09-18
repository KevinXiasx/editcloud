//----------------function slide show 
function myshowfunc (obj, anima, time, event, func) {
	obj.transition(anima, 0);
	if( event != undefined )
		event.obj.on(event.e, function () {
			if( func(obj) )
				obj.transition({scale: 1,y:0, x:0, opacity: 1}, time.amtime);
		});
	else
		obj.transition({scale: 1,y:0, x:0, opacity: 1}, time.amtime);
};

//-----disable mousewheel event
$(document).on('mousewheel', function () {
	return false;
})




/*-----		create circle on rightframe		------*/
$(document).ready(function () {
	$('.page , .topframe').each(function () {
		$('.rightframe').append('<span data-title="'+$(this).attr('data-title')+'"><i class="fa fa-circle-o-notch"></i></span>');
	})

	$('.rightframe > span:nth-child(1)').css({'color':'black', 'text-shadow':'0px 0px 2px white'});
	$('.rightframe > span').hover(function () {
		$(this).append('<span style="opacity:0">'+$(this).attr('data-title')+'<span>');
		$(this).stop();
		$(this).animate({'height':'50px'}, 500);
		$(this).children('span').animate({'opacity':'1'}, 500);
	}, function () {
		$(this).stop();
		$(this).animate({'height':'30px'}, 500);
		$(this).children('span').animate({'opacity':'0'}, 500);
		$(this).children('span').remove();
	});

	$('.rightframe > span').on('click', function () {
		var s = $(this).attr('data-title');
		var obj = $('[data-title="'+s +'"]:not("span")');
		$(document).scrollTop(obj.offset().top-parseInt($('.alink-group').css('height')));
	})

	$(document).scroll(function () {
		var myhigh = $(document).scrollTop();
		console.log(myhigh);
		$('.rightframe').css('top', myhigh);
		var th = parseInt((myhigh+100)/900) + 1 ;
		for (var i = 1 ; i<= th; i++) {
			$('.rightframe span:nth-child('+i+')').css({'color':'black', 'text-shadow':'0px 0px 2px white'});
		};
		for (var k = th+1 ; k<= $('.rightframe').children().length; k++) {
			$('.rightframe span:nth-child('+ k +')').css({'color':'white', 'text-shadow':'0px 0px 2px black'});
		};
		
	});
})


//----------- animaition about slide border----------


$(document).ready(function () {
	$('.page').hover(mouseinfunc,mouseoutfunc);	
});

function mouseinfunc (e) {
	var animater = $(this).children('.imgborder');
	animater.children('.anima-line').stop();
	animater.children('.top-line').animate({'width':'100%'}, 650, 'swing', function (){
		animater.children('.right-line').animate({'height':(parseInt(animater.css('height'))+parseInt(animater.children('.top-line').css('height'))).toString()+'px'}, 650, 'swing',function ( ){
			animater.children('.bottom-line').animate({'width':'100%', 'left':'0%'}, 650, 'swing',function ( ){
				animater.children('.left-line').animate({'height':'100%', 'top':'0%'}, 650, 'swing');
			});
		});
	});
};

function mouseoutfunc (e) {
	var animater = $(this).children('.imgborder');
	animater.children('.anima-line').stop();
	animater.children('.left-line').animate({'height':'0%','top':'100%'}, 650, 'swing',function  () {
		animater.children('.bottom-line').animate({'width':'0%','left':'100%'}, 650, 'swing',function  () {
			animater.children('.right-line').animate({'height':'0%'}, 650, 'swing',function  () {
				animater.children('.top-line').animate({'width':'0%'}, 650, 'swing');
			});
		});
	});
};


//----------- animaition about direction click event----------

$(document).ready(function () {
	$('.downdir li').on('click', function () {
		var grandfather = $(this).parent().parent();
		$("html,body").animate({scrollTop: parseInt(grandfather.css('height')) + grandfather.offset().top-parseInt($('.alink-group').css('height'))}, 750);
	})

	$('.updir li').on('click', function () {
		var grandfather = $(this).parent().parent();
		$("html,body").animate({scrollTop: grandfather.offset().top - $(window).height()}, 750);
	})

});

//------------------------page show animage function--------------------

var pageshowlist = {};

function arrive (selector) {
	var currenHight = $(document).scrollTop()+$(window).height();
	var eleHight = parseInt($(selector).offset().top);
	return eleHight+200 < currenHight;
}

pageshowlist['page-2'] = function () {
	if( arrive('#page-2') ){
		var timerout = 0;
		myshowfunc($('#page-2'), {scale:0.9, y:100}, {"amtime":1000});
		setTimeout('myshowfunc($("#page-2 #text1"), {x:500}, {"amtime":1500})',timerout+=500);
		setTimeout('myshowfunc($("#page-2 .imgs"), {x:-800}, {"amtime":1500})',timerout+=0);
		setTimeout('myshowfunc($("#page-2 #text2"), {x:0}, {"amtime":1500})',timerout+=1000);
		setTimeout('myshowfunc($("#page-2 #text3"), {x:0}, {"amtime":1500})',timerout+=500);
		$(document).off('scroll', pageshowlist['page-2']);
	}
}

pageshowlist['page-1'] = function () {
	if( arrive('#page-1') ){
		var timerout = 0;
		setTimeout('myshowfunc($("#page-1"), {scale:0.9, y:100}, {"amtime":1000})',timerout);
		setTimeout('myshowfunc($("#page-1 #text1 .content span:nth-child(1)"), {y:100}, {"amtime":1500})',timerout+=500);
		setTimeout('myshowfunc( $("#page-1 #text1 .content span:nth-child(2)"),{y:100}, {"amtime":1500})',timerout+=500);
		$(document).off('scroll', pageshowlist['page-1']);
	}
}

pageshowlist['page-3'] = function () {
	if( arrive('#page-3') ){
		var timerout = 0;
		$('#page-3 #text1 .title').transition({scale:2, y:100}, 0);
		myshowfunc($('#page-3'), {scale:0.9, y:100}, {"amtime":1000});
		setTimeout("$('#page-3 #text1 .title').transition({scale:1, y:0}, 1000)",timerout+=1500);
		setTimeout('myshowfunc( $("#page-3  #partner-1"),{y:100}, {"amtime":1500})',timerout+=250);
		setTimeout('myshowfunc( $("#page-3  #partner-2"),{y:100}, {"amtime":1500})',timerout+=250);
		setTimeout('myshowfunc( $("#page-3  #partner-3"),{y:100}, {"amtime":1500})',timerout+=250);
		setTimeout('myshowfunc( $("#page-3  #partner-4"),{y:100}, {"amtime":1500})',timerout+=250);
		setTimeout('myshowfunc( $("#page-3  #partner-5"),{y:100}, {"amtime":1500})',timerout+=250);

		$(document).off('scroll', pageshowlist['page-3']);
	}
}

pageshowlist['page-4'] = function () {
	if( arrive('#page-4') ){
		myshowfunc($('#page-4'), {scale:0.9, y:100}, {"amtime":1000});
		$(document).off('scroll', pageshowlist['page-4']);
	}
}
$(document).ready(function () {
	for(var page in pageshowlist){
		$(document).on('scroll',pageshowlist[page]);	
	}
})

//------------------------page-home show animage function--------------------

$(document).ready(function () {
	setTimeout('myshowfunc( $(".maintitle"), { scale:0.8 },{"amtime":1500});',500);

	$(document).scroll(function () {
		var myhigh = $(document).scrollTop();
		document.getElementById('bgimg').style.opacity = myhigh/800+0.1;
		$('.maintitle').css('opacity',1 - myhigh/200);
	})
});


//--------------------------input ----------------------------------

$(document).ready(function () {
	$('.formpage input').on('focus', function () {
		$(this).val('');
		$(this).css('color', 'blue');
		$(this).off('focus');

	})
})