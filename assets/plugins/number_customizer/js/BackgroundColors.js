var SuperBackgroundColors = new Class({

	Implements: [Events,Options,Restrictions],

	options: {
		item_selector: '#formBackgroundColourList a',
		current_selector: '.current',
		value_container_id: 'valBackgroundColour',
		indicator_id: 'currentBackgroundColour',
		restricted: ['vintage_plate'],
		tab_id: 'tabBackground'
	},

	background_colors: null,
	value_container: null,
	current_background_color: null,
	default_background: null,

	initialize: function(options) {
		this.setOptions(options);

		this.background_colors = $$(this.options.item_selector);
		this.value_container = $(this.options.value_container_id);
		this.default_background = $(this.options.indicator_id).getSiblings('a')[0];
		
		this.setupEvents();
	},

	setupEvents: function() {
		var that = this;

		this.background_colors.addEvent('click', function(e) {
			
			var background_color_id = this.getProperty('rel');

			if (background_color_id != null && (that.current_background_color != background_color_id)) {

				that.handleIndicator(this);

				that.current_background_color = background_color_id;

				// update form value to be passed
				that.value_container.setProperty('value', background_color_id);

				// update current item
				this.getParent().getSiblings().removeClass('current');
				this.getParent().addClass('current');
				
				that.fireEvent('updateplate');
			}
		});
	},

	handleIndicator: function(background) {
		if ($(this.options.indicator_id)) {
			$(this.options.indicator_id).destroy();
		}

		var currentIcon = new Element('span', {
			'id': this.options.indicator_id,
			'class': 'tick'
		});

		background.adopt(currentIcon);
	},

	setToDefault: function() {
		this.value_container.setProperty('value', this.default_background.getProperty('rel'));
	}

});