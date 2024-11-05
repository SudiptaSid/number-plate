var SuperPlateSizes = new Class({

	Implements: [Events,Options],

	options: {
		item_selector: '#formPlateSizeList a',
		current_selector: '.current',
		value_container_id: 'valPlateSize'
	},

	plate_sizes: null,
	value_container: null,
	front_rear_items: null,
	current_plate_size: 1,

	initialize: function(options) {
		this.setOptions(options);

		this.plate_sizes = $$(this.options.item_selector);
		this.value_container = $(this.options.value_container_id);
		
		this.setupEvents();
	},

	setupEvents: function() {
		var that = this;

		this.plate_sizes.addEvent('click', function(e) {
			
			var plate_id = this.getProperty('rel');

			if (plate_id != null && (that.current_plate_size != plate_id)) {
				that.current_plate_size = plate_id;

				// update form value to be passed
				that.value_container.setProperty('value', plate_id);

				// update current item
				this.getParent().getSiblings().removeClass('current');
				this.getParent().addClass('current');
				
				that.fireEvent('updated', plate_id);
			}
		});
	}

});