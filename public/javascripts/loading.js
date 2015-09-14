function addloading ( who ) {
	if( $('.loding-animation').length == 0)
		who.append('<div class="loding-animation"><div class="animationer"><i></i><i></i></div><p>Loading...</p></div>')
}

function removeloading () {
	$('.loding-animation').remove();
}

