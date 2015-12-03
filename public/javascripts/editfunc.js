
var normallength = '15%';
var editorlist ={};

$(document).ready(function () {
	$('.projectloader').on('click', function () {
		removeproject();
		$(this).addClass('shown');
		sessionStorage.setItem('openproject', $(this).text())
		openproject($(this).attr('projpath'), $(this).text());
	})
	if(sessionStorage.getItem('openproject')){
		$('.projectloader').each(function () {
			if($(this).text() == sessionStorage.getItem('openproject'))
				$(this).trigger('click');
		});
	}
})

function openproject ( project ,toplabel) {
	$('#label > .dirlist > .dirname ').text(toplabel);
	$.post('/loadtree', {path: project}, function (data) {
		addson($('.dirlist'), data);
		editinit();
	})
}

function removeproject () {
	$('.projectloader.shown').removeClass('shown');
	$('.closelabel').each(function () {
		$(this).trigger('click');
	})

	$('#label > .dirlist ').children().each(function () {
		if(!$(this).hasClass('dirname'))
			$(this).remove();
	});
}

function addson (mather, sons) {
	for (var k = sons.files.length - 1; k >= 0; k--) 
	{
		mather.append('<div class="files" id="'+sons.self+'/'+sons.files[k]+'">'+sons.files[k]+'</div>');
		mather.children().last().on('dblclick', fileclick);
	};
	for (var i = sons.dirs.length - 1; i >= 0; i--)
	{
		mather.append('<div class="dirlist"></div>');
		var real = mather.children().last();
		var realname = sons.dirs[i].substr(sons.dirs[i].lastIndexOf('/')+1);
		real.append('<div class="dirname" id="'+ sons.dirs[i] +'">'+'-'+realname+'</div>');
		real.children().last().on('click', dirclick);
	};
}

function fileclick () {

	var names = $(this).attr("id");

	if ( $(this).hasClass('opened') )
		anothershow($(this));
	else
	{
		var baby = $('#editarea').append('<div class="editor" id="'+names+'edit"></div>').children().last();
		var editor = ace.edit(names+'edit');
		$('.editor').css('font-size', '20px');
		$('.editor').css('position', 'absolute');

		editorlist[names]={'ace':editor, 'ele':baby, 'fileid':names};

		editor.setTheme("ace/theme/kuroir");
		editor.getSession().setMode("ace/mode/javascript");
		editor.getSession().on('change', edisession);
		
		$(this).addClass('opened');
		$('#filelabel').append('<div class="mybtn" id="'+names+'" >'+'<div class="closelabel" >x</div>'+'<div class="mybtnname" >'+$(this).text()+'</div>'+'</div>');
		$('.closelabel').on('click', closebutton);
		$('#filelabel').children().last().on('click', labelclick);
		$('#filelabel').children().last().trigger('click');

		if( sessionStorage.getItem( names ) && names != 'openproject') {
			editor.setValue(sessionStorage.getItem( names ));
			editorlist[names].ace.clearSelection();				//------------------BUG------------------------
			editor.getSession().on('change', editorchange);
		}
		else{
			addloading( $('body') );
			setText('loading '+ $(this).text());
			alert('sdf');
			$.ajax({
				'url':'/loadfile',
				'type' : 'get',
				'data' : {filename: $(this).attr("id")},
				'success' : function (data) {
						editor.setValue(data);
						editorlist[names].ace.clearSelection();			//------------------BUG------------------------
						editor.getSession().on('change', editorchange);
					},
				'error' : function () {
						alert('loading fail, network disconnect');
						$('.mybtn.shown > .closelabel').trigger('click');
					},
				'complete' : function(){
					removeloading();
				}
			});	
		}
	}
	if($('.opened').length >= 6)
		openlabelshow();
}

$( document ).ajaxError(netwarning);

function netwarning () {
	
}


function labelclick () {
	anothershow($(this));
}

function dirclick () {
	if(!$(this).hasClass('loaded')){
		$(this).addClass('loaded');
		addloading($('body'));
		var who = $(this);
		$.ajax({
			'url':'/loadtree',
			'type' : 'post',
			'data' : {path: $(this).attr('id')},
			'success' : function (data) {
					addson(who.parent('.dirlist'), data);
				},
			'error' : function () {
					who.removeClass('loaded');
				},
			'complete':function () {
				removeloading();
			}
		});	
	}

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

function closebutton () {
	var father = $(this).parent();
	var s = father.attr('id');

	sessionStorage.removeItem(s);

	$('.files').each(function () {
		if( $(this).attr("id") == s)
			$(this).removeClass('opened');
	})
	if($('.opened').length >= 7)
		openlabelshow();
	editorlist[s].ele.remove();
	if(father.hasClass('shown'))
	{
		$('.files.shown').removeClass('shown');
		father.remove();
		if( $('.mybtn').length != 0)
		{
			var showner = $('.mybtn').last();
			showner.addClass('shown');
			editorlist[showner.attr('id')].ele.addClass('shown');
			$('.files').each(function () {
				if( $(this).attr('id') == showner.attr('id'))
					$(this).addClass('shown');
			})
		}
	}
	else
		father.remove();
}

function editinit () {
	$('.dirlist').each(function () {
		$(this).children().each(function () {
			$(this).hide();
		});
	})

	dirshow($('#label > .dirlist'));

	for(var m in sessionStorage){
		$('.files').each(function () {
			if( $(this).attr('id') == m)
				$(this).trigger('dblclick');
		})
	};
};

function dirshow (dir) {
	if(dir.hasClass('dirlist'))
		dir.children().each(function () {
			$(this).fadeIn();
			if($(this).hasClass('dirlist'))
				$(this).children().first().fadeIn(300);
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

function anothershow (who) {
	var id = who.attr('id');

	$('.files.shown').removeClass('shown');
	$('.editor.shown').removeClass('shown');
	$('.mybtn.shown').removeClass('shown');

	who.addClass('shown');
	if( who.hasClass('files') ){	
		$('.mybtn').each(function () {
			if( $(this).attr('id') == id)
				$(this).addClass('shown');
		});
		editorlist[id].ele.addClass('shown');
	}
	else if( who.hasClass('mybtn') ){
		$('.files').each(function () {
			if( $(this).attr('id') == id)
				$(this).addClass('shown');
		});
		editorlist[id].ele.addClass('shown');
	}
}

function openlabelshow () {
	normallength = (90/$('.opened').length).toString() + '%';
	$('.mybtn').each(function () {
		$(this).animate({width:normallength}, 100);
	})
}
