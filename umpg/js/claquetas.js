var Contestant =  {
	INDEX 	: window.localStorage.getItem("Contestant:INDEX"),
	SHOW	: $('.show'),
	
	init 	: function(){
		// initializes the storage index
		if (!Contestant.INDEX) {
            window.localStorage.setItem("Contestant:INDEX", Contestant.INDEX = 1);
        }
		
		// initializes the form
		$('input').val("");
		$('.id-entry').val((window.localStorage.length == 0) ? 0 : window.localStorage.length - 1);
		// add eventListeners
		Contestant.SHOW.addEventListener('click', function(e){
			var entry = {
				id 			: $('.id-entry').val(),
				ci 			: $('.ci').val(),
				first_name 	: $('.first_name').val(),
				last_name 	: $('.last_name').val(),
				email 		: $('.email').val(),
				phone 		: $('.phone').val(),
				twitter		: $('.twitter').val(),
				city		: $('.city').val(),
				game		: $('.game').val(),
			};
			Contestant.add(entry);
			$('input').val("");
			$('.id-entry').val((window.localStorage.length == 0) ? 0 : window.localStorage.length - 1);
			e.preventDefault();
		}, true);
	},
	
	add		: function(entry){
		entry.id = Contestant.INDEX;
        window.localStorage.setItem("Contestant:"+ entry.id, JSON.stringify(entry));
        window.localStorage.setItem("Contestant:INDEX", ++Contestant.INDEX);
	},
	
	remove 	: function(entry){},
	
	list 	: function(){
		/*if (window.localStorage.length - 1) {
            var contacts_list = [], i, key;
            for (i = 0; i < window.localStorage.length; i++) {
                key = window.localStorage.key(i);
                if (/Contacts:\d+/.test(key)) {
                    contacts_list.push(JSON.parse(window.localStorage.getItem(key)));
                }
            }

            if (contacts_list.length) {
                contacts_list
                    .sort(function(a, b) {
                        return a.id < b.id ? -1 : (a.id > b.id ? 1 : 0);
                    })
                    .forEach(Contacts.tableAdd);
            }
        }*/
	}
}

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