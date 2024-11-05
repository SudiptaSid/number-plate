var SuperMaterial = new Class({

	Implements: [Events,Options],

	options: {
		selector: '.acrylicOption, .aluminiumOption',
		value_container_id: 'plateMaterialType'
	},

	value_container: null,
	buttons: null,
	aluminium_plate_ids: [1,2,4],
	current_material: null,

	initialize: function(options) {
		this.setOptions(options);

		this.value_container = $(this.options.value_container_id);
		this.buttons = $$(this.options.selector);

		this.setupEvents();
	},

	setupEvents: function() {
		var that = this;

		this.buttons.addEvent('click', function(e) {
			
			var material = this.hasClass('acrylicOption') ? 'acrylic':'aluminium';

			if (material != null && (that.current_material != material)) {

				this.getSiblings().removeClass('current');
				this.addClass('current');
				var par = this.getParent();
				par.addClass('active');
				par.getSiblings().removeClass('active');

				that.current_material = material;

				// update form value to be passed
				that.value_container.setProperty('value', material);
				
				// we don't need to update the plate for this option
				that.fireEvent('updateplate');
			}
		});
	},

	checkAvailability: function(plateTypeId) {
		// if plate type isnt set, or the plate type can be provided in aluminium...
		if (plateTypeId === undefined || this.aluminium_plate_ids.contains(parseInt(plateTypeId))) {
			$$('.aluminiumOption').getParent().show();
		}
		else {

			// hide aluminium option
			$$('.aluminiumOption').getParent().hide();
			
			// if it was selected, then deselect it
			if (this.current_material == 'aluminium') {
				this.setToDefault();
			}
		}
	},

	setToDefault: function() {
		$$('.acrylicOption').fireEvent('click');
	}

});