$(function(){
	$('.show').click(function(){
		$('.band').html($('.band_input').val());
		$('.name').html($('.name_input').val());
		$('.inputs_wrapper').hide();
		$('.txt_wrapper').fadeIn();
	});
});

window.onload = function() {
	window.addEventListener('shake', shakeEventDidOccur, false);
	function shakeEventDidOccur () {
		$('.txt_wrapper').hide();
		$('.inputs_wrapper').fadeIn();
	}
};