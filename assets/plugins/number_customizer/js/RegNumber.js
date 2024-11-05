var SuperRegNumber = new Class({

	Implements: [Events,Options],

	options: {
		input_id: 'formRegnumber',
		submit_delay: 2000
	},

	reg_input: null,
	orig_value: null,
	flag: null,

	initialize: function(options) {

		// this is gross, roughly converted to Moo from jquery but at least it has some structure. should be rewritten into a clearer format

		this.setOptions(options);

		this.reg_input = $(this.options.input_id);
		this.orig_value = this.reg_input.value;

		this.letter_places = $$('#form_register_context_box [data-type=model] input');

		this.letter_places.each(function(el) {
			el.store('access-letter', el.getProperty('data-access-letter'));
		});

		this.splitValueToLetters();
		setTimeout(function(){
			this.checkSpaces(null);
		}.bind(this), 1000);
		this.setupEvents();
	},

	setupEvents: function() {
		this.letter_places.addEvent('focus', function(e) {
			if (this.reg_input.value == this.orig_value) {
				this.clearInterface();
			} else {
				this.checkSpaces(e.target);
			}
		}.bind(this));

		var current_box, prev;
		this.letter_places.addEvent('keyup', function(e) {

			clearTimeout(this.flag);

			current_box = e.target;

			// backspace or left arrow
			if (e.code == 8 || e.code == 37) {
				current_box.value = '';
				prev = current_box.getPrevious();
				prev.value = '';
				prev.focus();

				// ignore shift key
			} else if (e.code != 16) {
				current_box.getNext().focus();
			}

			this.mergeLettersToValue();
			this.checkSpaces(null);

			this.flag = setTimeout(function(){
				this.fireEvent('updateplate');
			}.bind(this),1500);

		}.bind(this));
	},

	clearInterface: function() {
		this.reg_input.value = '';
		
		this.letter_places.each(function(el) {
			el.value = '';
		});

		this.letter_places[0].focus();

		this.checkSpaces(null);
	},

	mergeLettersToValue: function() {
		var str = '';
		this.letter_places.each(function(el, i) {
			str += el.value;
		});

		this.reg_input.value = str.toUpperCase();
	},

	splitValueToLetters: function() {
		var i = 0;
                if(this.reg_input.value != undefined){
		var str = this.reg_input.value.split('');
		while (i <= str.length -1) {
			this.letter_places[i].value = str[i++];
		}
		}
	},

	checkSpaces: function(target) {
		
		if (target) {
			target = this.letter_places.indexOf(target);
		}

		this.letter_places.each(function(el, i) {

			if (target && el.value == '' && i < target) {
				el.value = ' ';
			}


			if (el.value == ' ') {
				el.setStyle('background','#FBB917');
			} else {
				el.setStyle('background','#EEE');
			}
		});
	},

	validate: function() {

		var response;

		if (response = this.validateEntry()) {
			return response;
		}

		if (response = this.validateSpaces()) {
			return response;
		}
	},

	validateEntry: function() {
		if(!$('formRegnumber').getProperty('value').replace('YOUR REG','')){
			$('tabText').fireEvent('click');
			$('formRegnumber').focus();
			return new SuperError('error','Please enter your plate number.', this);
		}
	},

	validateSpaces: function() {

		var snum = new String($('formRegnumber').getProperty('value'));

		space_count = 0;
		for(var ci=0;ci<snum.length;ci++){
			if(snum.charAt(ci)==' '){
				space_count++;
			}
		}

		// validate style
		if(space_count < 1){
			$('spaceCounter').setProperty('value','nil');
			return new SuperError('confirm', 'Your number plate contains no spaces, are you sure you want to continue?', this);
		}else if(space_count > 1){
			$('spaceCounter').setProperty('value','multi');
			return new SuperError('confirm', 'Your number plate contains multiple spaces, are you sure you want to continue?', this);
		}else{
			$('spaceCounter').setProperty('value','normal');
		}
	},

	acceptConfirmation: function() {
		
	}

});