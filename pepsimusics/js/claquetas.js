$(function(){
	$('.show').click(function(){
		$('.band').html($('.band_input').val());
		$('.name').html($('.name_input').val());
		$('.inputs_wrapper').hide();
		$('.txt_wrapper').fadeIn();
	});
	
	// 	$('window').bind('shake', eventHandler);
});