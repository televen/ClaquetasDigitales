function Contestant(){}

Contestant.prototype.db		 		= '';
Contestant.prototype.dbname 		= 'televen::contestant';
Contestant.prototype.dbversion 		= '1.0';
Contestant.prototype.dbdescription 	= 'Contestants db. Will store all the casting data';
Contestant.prototype.dbsize		 	= 5 * 1024 * 1024;
//Contestant.prototype.sql		 	= '';

Contestant.prototype.init			= function(){
	try{
		if(window.openDatabase){
			this.db = openDatabase(this.dbname, this.dbversion, this.dbdescription, this.dbsize);
			if(this.db){
				sql = "CREATE TABLE IF NOT EXISTS contestant (id INTEGER PRIMARY KEY AUTOINCREMENT, ci INTEGER, first_name TEXT, last_name TEXT, email TEXT, phone TEXT, twitter TEXT, city TEXT, game TEXT, code TEXT, timestamp REAL)";
				this.db.transaction(
				function(tx){
					tx.executeSql(
					sql, 
					[], 
					function(tx, result){
						return true;
					}, 
					function(tx, error){
						console.error("Can't create table Contestant: [code:" + error.code + ", message:" + error.message + "]");
						return false;
					});
				});
			}else{
				console.error("Can't open database televen::contestant");
				return false;
			}
		}else{
			console.error("OpenDatabase is not supported by your browser");
			return false;
		}
	}catch(e){
		console.error(e);
		return false;
	}
}

Contestant.prototype.add			= function(entry){
	if(this.db){
		sql = "INSERT INTO contestant ('', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		this.db.transaction(
		function(tx){
			tx.executeSql(
			sql, 
			[entry.ci, entry.first_name, entry.last_name, entry.email, entry.phone, entry.twitter, entry.city, entry.game, entry.code, new Date().getTime()], 
			function(tx, result){
				return true;
			}, 
			function(tx, error){
				console.error("Can't create table Contestant: [code:" + error.code + ", message:" + error.message + "]");
				return false;
			});
		});
	}else{
		console.error("The database shutdown unexpectly. Please reload the page");
		return false;
	}
}

Contestant.prototype.showError		= function(error){
	console.error("Can't create table Contestant:" + error.message);
	return false;
}

Contestant.prototype.success		= function(tx, result){
	return true;
}



/*var Contestant =  {
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
		Contestant.SHOW.on('click', function(e){
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
				code		: hex_md5($('.ci').val())
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
		Contestant.showCode(entry.code);
	},
	
	remove 	: function(entry){},
	
	list 	: function(){
		if (window.localStorage.length - 1) {
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
        }
	},
	
	showCode: function(code){
		console.debug(code);
	}
};

Contestant.init();*/
/*
$(function(){
	$('.show').click(function(){
		$('.band').html($('.band_input').val());
		$('.name').html($('.name_input').val());
		$('.inputs_wrapper').hide();
		$('.txt_wrapper').fadeIn();
	});
	
	console.debug(hex_md5("17402962"));
});

window.onload = function() {
	window.addEventListener('shake', shakeEventDidOccur, false);
	function shakeEventDidOccur () {
		$('.txt_wrapper').hide();
		$('.inputs_wrapper').fadeIn();
	}
};*/
/*
window.onload = function() {
	var contestant = new Contestant();
	contestant.init();
}*/

$(function(){
	var contestant = new Contestant();
	contestant.init();
	
	$('.show').click(function(){
		var entry = {
			ci 			: $('.ci').val(),
			first_name 	: $('.first_name').val(),
			last_name 	: $('.last_name').val(),
			email 		: $('.email').val(),
			phone 		: $('.phone').val(),
			twitter		: $('.twitter').val(),
			city		: $('.city').val(),
			game		: $('.game').val(),
			code		: hex_md5($('.ci').val())
		};
		contestant.add(entry);
		$('.inputs_wrapper').hide();
		$('.txt_wrapper').fadeIn();
	});
});