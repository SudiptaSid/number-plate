var SuperShowPlate = new Class({

	Implements: [Events,Options],

	options: {
		selector: '.legalOption, .showOption',
		value_container_id: 'plateStyle'
	},

	value_container: null,
	buttons: null,
	current_place_legality: null,

	initialize: function(options) {
		this.setOptions(options);

		this.value_container = $(this.options.value_container_id);
		this.buttons = $$(this.options.selector);

		this.setupEvents();
	},

	setupEvents: function() {
		var that = this;

		this.buttons.addEvent('click', function(e) {
			
			var plate_legality = this.hasClass('showOption') ? 'show':'legal';

			if (plate_legality != null && (that.current_place_legality != plate_legality)) {

				this.getSiblings().removeClass('current');
				this.addClass('current');
				var par = this.getParent();
				par.addClass('active');
				par.getSiblings().removeClass('active');

				that.current_place_legality = plate_legality;

				// update form value to be passed
				that.value_container.setProperty('value', plate_legality);
				
				// we don't need to update the plate for this option
				// that.fireEvent('updateplate');
			}
		});
	}

});