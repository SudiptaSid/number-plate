var SuperBadgeColors = new Class({

	Implements: [Events,Options],

	options: {
		item_selector: '#formBadgeColourList a',
		current_selector: '.current',
		value_container_id: 'valBadgeColour',
		indicator_id: 'currentBadgeColour',
		default_colour_id: 4,
		no_background_id: 0
	},

	badge_colors: null,
	value_container: null,
	current_badge_color: null,

	initialize: function(options) {
		this.setOptions(options);

		this.badge_colors = $$(this.options.item_selector);
		this.value_container = $(this.options.value_container_id);
		
		this.setupEvents();
	},

	setupEvents: function() {
		var that = this;

		this.badge_colors.addEvent('click', function(e) {
			
			var badge_color_id = this.getProperty('rel');

			if (badge_color_id != null && (that.current_badge_color != badge_color_id)) {

				that.handleIndicator(this);

				that.current_badge_color = badge_color_id;

				// update form value to be passed
				that.value_container.setProperty('value', badge_color_id);

				// update current item
				this.getParent().getSiblings().removeClass('current');
				this.getParent().addClass('current');
				
				if (badge_color_id == that.options.no_background_id) {
					that.fireEvent('removed');
				} else {
					that.fireEvent('updateplate');
				}

			}
		});
	},

	checkBadge: function(badge_id) {
		
		var selected = $$('.badgeImage[rel='+badge_id+']');

		// if no badge is selected then there shouldn't be a background color either
		if (selected.getProperty('title') == 'None') {
			this.badge_colors[0].click();
		// if the color hasnt been selected then select the default color
		} else if (!parseInt(this.current_badge_color)) {
			$$('.badgeColour a[rel='+this.options.default_colour_id+']')[0].click();
		} else {
			this.fireEvent('updateplate');
		}
		
	},

	handleIndicator: function(badge) {
		if ($(this.options.indicator_id)) {
			$(this.options.indicator_id).destroy();
		}

		var currentIcon = new Element('span', {
			'id': this.options.indicator_id,
			'class': 'tick'
		});

		badge.adopt(currentIcon);
	}

});