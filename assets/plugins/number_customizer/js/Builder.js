var Builder;

var SuperBuilder = new Class({

	Implements: [Events,Options],

	options: {
		buy_button_id: 'buttonBuy'
	},

	repricer: null,

	plate_options: null,
	price_request: null,
	image_request: null,

	initialize: function(options) {
		this.setOptions(options);

		this.setupPlateOptions();
		this.setupAddToBasket();
		this.setupPriceRequest();
		this.setupImageRequest();

		this.updatePlate();
	},

	setupImageRequest: function() {
		this.image_request = new SuperImageRequest();
	},

	setupPriceRequest: function() {
		this.price_request = new SuperPriceRequest();
	},

	setupPlateOptions: function() {
		this.plate_options = new SuperPlateOptions({
			onUpdateplate: function() {
				this.updatePlate();
			}.bind(this)
		});
	},

	updatePlate: function() {
		var plateTypeId = this.plate_options.modules.plate_sizes.current_plate_size;
		this.price_request.makeRequest(plateTypeId);
		this.image_request.makeRequest();
	},

	setupAddToBasket: function() {
		// STRAIGHT FROM OLD VERSION. NEEDS RE-WRITING
		// add to basket button
		$(this.options.buy_button_id).addEvent('click', function(e){

			var validator = new SuperValidator(this.plate_options.modules,{});
			var response;
			var is_valid = false;

			if (validator.isValid()) {
				is_valid = true;
			} else {
				is_valid = false;
				response = validator.getError();

				if (response.level == 'confirm') {
					if (confirm(response.message)) {
						if (typeof response.module.acceptConfirmation == 'function') {
							response.module.acceptConfirmation();
						}
						is_valid = true;
					}
				} else {
					alert(response.message);
				}
			}

			if(is_valid){
				new Event(e).stop();
				$('plateForm').setProperty('action', '/builder/basket.php');
				$('plateForm').adopt(new Element('input', {
					type: 'hidden',
					name: 'basketaction',
					value: 'addplate'
				}));
				$('plateForm').removeEvent('submit').submit();
			}
			return;
		}.bind(this));
	}

});

var PlateUtilities = {

	tidyString: function(el){
		console.log(el);
		el.setProperty('value', el.getProperty('value').replace(/([^A-Za-z0-9 ])/g, ''));
	},

	tidyStringSlogan: function(el){
		el.setProperty('value', el.getProperty('value').replace(/(")/g, ''));
	},

	keyHandle: function(e){
		var event = new Event(e);
		if (!event.key.test(/left|right|space|backspace|delete|a|b|c|d|e|f|g|h|i|j|k|l|m|n|o|p|q|r|s|t|u|v|w|x|y|z|0|1|2|3|4|5|6|7|8|9/i)) event.stop();
		if (event.key.test(/0|1|2|3|4|5|6|7|8|9/) && event.shift) event.stop();
	}

}

var Restrictions = new Class({
    shouldDisable: function(restrictions) {

		if (typeof this.options.restricted == 'undefined') {
			console.log("Restrictions not defined.");
			return false;
		}

		return restrictions.some(function(restriction_type){
			if (this.options.restricted.contains(restriction_type)) {
				return true;
			} else {
				return false;
			}
		}.bind(this));
	},

	disable: function() {
		if (typeof this.options.tab_id == 'undefined') {
			console.log("Tab id is not defined.");
		} else {
			$(this.options.tab_id).hide();

			if (typeof this.setToDefault == 'function') {
				this.setToDefault();
			}
		}

	},

	enable: function() {
		if (typeof this.options.tab_id == 'undefined') {
			console.log("Tab id is not defined.");
		} else {
			$(this.options.tab_id).show();
		}
	}
});

window.addEvent('domready', function() {
	new SuperBuilder({});
});