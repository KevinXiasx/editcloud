$(document).ready(function () {
	$('#tmbtn').on('click', function (e) {
		if( $('#content').hasClass('shown') )
		{
			$('#content').animate({opacity:'0'},'normal', 'linear', function () {
				$('#content').css('z-index','0');
				$('#content').hide();
			});
			
			$('#content').removeClass('shown');
		}
		else
		{
			$('#content').show();
			$('#content').animate({opacity:'0.8'});
			$('#content').css('z-index','5');
			$('#content').addClass('shown');
		}
	})


	$("#tmbtn").focus(function(){$(this).blur();}); 

	$('#content').hide();
})