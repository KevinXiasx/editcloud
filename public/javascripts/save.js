//net save
var savebool = true;
var needsave = {};
var savetimes = 3000;

$(document).ready(function () {
	$('.timeradd').on('click', savetimesaddfunc);
	$('.timerdel').on('click', savetimesdelfunc);
});


function savetimesaddfunc() {
	savetimes += 1000;
	$('.timervalue').text(savetimes/1000 + 's');
}

function savetimesdelfunc() {
	if( savetimes != 0){
		savetimes -= 1000;
		$('.timervalue').text(savetimes/1000 + 's');
	}
}

function editorchange () {
	needsave[$('.files.shown').attr('id')] = true;
	if(savebool){
		savebool = false;
		setTimeout('postsave()', savetimes);
	}
}

function postsave () {
	for( var i in needsave){
		if( needsave[i] ){
			$.ajax({
				'url':'/save',
				'type' : 'post',
				'data' : {filename: i, code: editorlist[i].ace.getValue()},
				'success' : function (data) {
						console.log('save success');
					},
				'error' : function () {
						console.log('save err');
					}
			});	
			needsave[i] = false;
		}
	}
	savebool = true;
}

//session save

function edisession () {
	var id = $('.files.shown').attr('id');
	sessionStorage.setItem( id,editorlist[id].ace.getValue() );
}