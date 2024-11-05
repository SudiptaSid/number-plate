var SuperPlateTypes = new Class({

	Implements: [Events,Options],

	options: {
		button_selector: '#plateoptions a',
		value_container_id: 'valWhichPlates',
		rear_id: 'plateRearPlate'
	},

	value_container: null,

	initialize: function(options) {
		this.setOptions(options);

		this.value_container = $(this.options.value_container_id);
		this.buttons = $$(this.options.button_selector);

		this.setupButtonEvents();
	},

	setupButtonEvents: function() {
		this.buttons.addEvent('click', function(e) {
			var el = e.target;
			var which = el.getProperty('rel');
			this.value_container.setProperty('value', which);
			this.buttons.removeClass('current');
			el.addClass('current');
			this.fireEvent('updateplate');
		}.bind(this));
	},

	checkSize: function(plate_id) {
		this.buttons.removeClass('current');

		switch (plate_id) {
			case '4': case '5': case '6':
			$('plateRearPlate').addClass('current');

			this.value_container.setProperty('value', 'rear');
			this.hideFront();
			break;

			default:
				$('plateBothPlates').addClass('current');
				this.value_container.setProperty('value', 'both');
				this.showFront();
		}
		
	},

	hideFront: function() {
		this.buttons.hide();
		$(this.options.rear_id).show();
	},

	showFront: function() {
		this.buttons.show();
	}

});