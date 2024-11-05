var SuperFittingKits = new Class({

	Implements: [Events,Options],

	options: {},

	initialize: function(options) {
		this.setOptions(options);

		this.setupSwitches();
	},

	setupSwitches: function() {
		// needs re-writing

		$$('.fittingKit').each(function(el) {

			el.getElement('.plus').addEvent('click', function(e) {
				new Event(e).stop();
				var newQty = (parseInt($$('input[name="fitting_kit[' + el.get('id') + ']"]').getProperty('value')) + 1);
				$$('input[name="fitting_kit[' + el.get('id') + ']"]').setProperty('value', newQty);
				el.getElement('.selector span').set('html', newQty);

				this.fireEvent('updateplate');
			}.bind(this));

			el.getElement('.minus').addEvent('click', function(e) {
				new Event(e).stop();
				var newQty = (parseInt($$('input[name="fitting_kit[' + el.get('id') + ']"]').getProperty('value')) - 1);
				if (newQty < 0) {

				}
				else {
					$$('input[name="fitting_kit[' + el.get('id') + ']"]').setProperty('value', newQty);
					el.getElement('.selector span').set('html', newQty);
					
					this.fireEvent('updateplate');
				}
			}.bind(this));
		}.bind(this));
	}

});
