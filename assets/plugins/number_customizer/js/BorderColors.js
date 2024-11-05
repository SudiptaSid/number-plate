var SuperBorderColors = new Class({

	Implements: [Events,Options,Restrictions],

	options: {
		item_selector: '#formBorderColourList a',
		current_selector: '.current',
		value_container_id: 'valBorderColour',
		indicator_id: 'currentBorderColour',
		restricted: ['vintage_plate'],
		tab_id: 'tabBorder'
	},

	border_colors: null,
	value_container: null,
	current_border_color: null,
	default_border: null,

	initialize: function(options) {
		this.setOptions(options);

		this.border_colors = $$(this.options.item_selector);
		this.value_container = $(this.options.value_container_id);
		this.default_border = $(this.options.indicator_id).getSiblings('a')[0];
		
		this.setupEvents();
	},

	setupEvents: function() {
		var that = this;

		this.border_colors.addEvent('click', function(e) {
			
			var border_color_id = this.getProperty('rel');

			if (border_color_id != null && (that.current_border_color != border_color_id)) {

				that.handleIndicator(this);

				that.current_border_color = border_color_id;

				// update form value to be passed
				that.value_container.setProperty('value', border_color_id);

				// update current item
				this.getParent().getSiblings().removeClass('current');
				this.getParent().addClass('current');
				
				that.fireEvent('updateplate');
			}
		});
	},

	handleIndicator: function(border) {
		if ($(this.options.indicator_id)) {
			$(this.options.indicator_id).destroy();
		}

		var currentIcon = new Element('span', {
			'id': this.options.indicator_id,
			'class': 'tick'
		});

		border.adopt(currentIcon);
	},

	setToDefault: function() {
		this.value_container.setProperty('value', this.default_border.getProperty('rel'));
	}

});