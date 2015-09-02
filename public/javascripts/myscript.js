var editor = ace.edit("edit");
editor.setTheme("ace/theme/kuroir");
editor.getSession().setMode("ace/mode/javascript");

$.post('/loadtree', {path: 'files'}, function (data) {
	addson($('.dirlist'), data);
	init();
})

var normallength = '15%', showlength = '18%';

function addson (mather, sons) {
	console.log(sons);
	for (var k = sons.file.length - 1; k >= 0; k--) 
	{
		mather.append('<div class="files" id="'+sons.self+'/'+sons.file[k]+'">'+sons.file[k]+'</div>');
		mather.children().last().on('dblclick', fileclick);
	};
	console.log(sons.self+sons.dir.length);
	for (var i = sons.dir.length - 1; i >= 0; i--) 
	{
		mather.append('<div class="dirlist"></div>');
		var real = mather.children().last();
		real.append('<div class="dirname" >'+sons.dir[i].self+'</div>');
		real.children().last().on('click', dirclick);
		addson(real, sons.dir[i]);
	};
}

function fileclick () {
	$.get('/loadfile', {filename: $(this).attr("id")}, function (data) {
		editor.setValue(data);
	});

	var names = $(this).attr("id");
	if ( $(this).hasClass('opened') )
	{
		$('.mybtn').each(function () {
			if( $(this).attr("id") == names)
				$(this).trigger('click');
		})
	}
	else
	{
		$(this).addClass('opened');
		$('#filelabel').append('<input type="button" class="mybtn" id="'+$(this).attr("id")+'" value="'+$(this).text()+'" >');
		$('#filelabel').children().last().on('click', labelclick);
		$('#filelabel').children().last().trigger('click');
	}

	$('.shown.files').removeClass('shown');
	$(this).addClass('shown');

	if($('.opened').length >= 7)
	{
		normallength = (90/('.opened').length).toString() + '%';
		showlength = (parseInt(normallength)+3).toString() + '%';

		console.log($('.opened').length);
		console.log("nor = "+normallength);
		console.log(90/('.opened').length);
		console.log("show = "+showlength);
		console.log(parseInt(normallength)+3);

		$('.mybtn').each(function () {
			$(this).animate({width:normallength});
		})
		$('.mybtn.shown').trigger('click');
	}
}

function labelclick () {
	$('.shown.mybtn').animate({width:normallength},250);
	$('.shown.mybtn').removeClass('shown');
	$(this).addClass('shown');
	$('.shown.mybtn').animate({width:showlength},250);
}

function dirclick () {
	if( $(this).hasClass('showdir') )
	{
		dirhide($(this));
		$(this).removeClass('showdir');
	}
	else
	{
		dirshow($(this));
		$(this).addClass('showdir');
	}
}


function init () {
/*	var file = document.querySelectorAll('.files');
	for (var k = file.length - 1; k >= 0; k--) {
		file[k].onclick = fileclick;
	};*/

/*	$(document).keypress(function(e) {
		if (e.ctrlKey && e.which == 13)
		$.post('/save', {filename:$('.shown').text(), code:editor.getValue()}, function (data) {
		})
	})*/

/*	$(document).keydown(function(event){
		alert(event.keyCode);
	}); */

/*	$('#shellinput').keypress(function (e) {
		if(e.keyCode == 13)
		{
			sock.emit('comman', $('#shellinput').val());
			$('#shellinput').val('');
		}
	}) 
*/
/*	$('#savebtn').on('click', function (e) {
		if($('.shown').length != 0)
		{
			var f, fileobject = $('.shown');
			if(fileobject.parent().children().first().text() != 'workdir')
				f = fileobject.parent().children().first().text() + '/'+fileobject.text();
			else
				f = fileobject.text();			
			$.post('/save', {filename: f , code:editor.getValue()});
		}
	});*/
	$('#tmbtn').on('click', function (e) {
		if( $('#content').hasClass('shown') )
		{
			$('#content').animate({opacity:'0'},'normal', 'linear', function () {
				$('#content').css('z-index','0');
			});
			$('#content').removeClass('shown');
		}
		else
		{
			$('#content').animate({opacity:'0.8'});
			$('#content').css('z-index','5');
			$('#content').addClass('shown');
		}

	})

	$('.dirlist').each(function () {
		$(this).children().each(function () {
			$(this).hide();
		});
	})

	$("#tmbtn").focus(function(){$(this).blur();});

	dirshow($('#label > .dirlist'));
};

function dirshow (dir) {
	if(dir.hasClass('dirlist'))
		dir.children().each(function () {
			$(this).fadeIn();
			if($(this).hasClass('dirlist'))
				$(this).children().first().fadeIn(700);
		});
	else if(dir.hasClass('dirname'))
		dir.parent().children().each(function () {
			$(this).fadeIn();
			if($(this).hasClass('dirlist'))
				$(this).children().first().fadeIn(700);
		})
}

function dirhide (dir) {
	if(dir.hasClass('dirlist'))
		dir.children().each(function () {
			if(! $(this).hasClass('dirname'))
				$(this).fadeOut(700);
		})
	else if(dir.hasClass('dirname'))
		dir.parent().children().each(function () {
			if(! $(this).hasClass('dirname'))
				$(this).fadeOut(100);
		})	
}