var SuperBadges = new Class({

	Implements: [Events,Options,Restrictions],

	options: {
		item_selector: '.scrollBlockBadge a, .scrollBlockFlag a',
		current_selector: '.current',
		value_container_id: 'valBadge',
		indicator_id: 'currentBadgeImage',
		restricted: ['vintage_plate'],
		tab_id: 'tabBadge'
	},

	badges: null,
	value_container: null,
	current_badge: null,
	default_badge: null,

	initialize: function(options) {
		this.setOptions(options);

		this.badges = $$(this.options.item_selector);
		this.value_container = $(this.options.value_container_id);

		this.default_badge = this.badges[0];
		
		this.setupEvents();
		this.setupTabClasses();
	},

	setupTabClasses: function() {
		// NEEDS TO BE RE-WRITTEN
		// toggle between colour and badget sections
		$('showColours').addEvent('click', function(e){
			e.stop();

			$('showFlags').removeClass('current');
			$('showColours').addClass('current');

			$('showFlagsContent').setStyle('display', 'none');
			$('showColoursContent').setStyle('display', 'block');

			$$('.scrollbar[name="showColoursContent"]').setStyle('display', 'block');
			$$('.scrollbar[name="showFlagsContent"]').setStyle('display', 'none');
		});

		$('showFlags').addEvent('click', function(e){
			e.stop();

			$('showFlags').addClass('current');
			$('showColours').removeClass('current');

			$('showFlagsContent').setStyle('display', 'block');
			$('showColoursContent').setStyle('display', 'none');

			$$('.scrollbar[name="showColoursContent"]').setStyle('display', 'none');
			$$('.scrollbar[name="showFlagsContent"]').setStyle('display', 'block');
		});
	},

	setupEvents: function() {
		var that = this;

		this.badges.addEvent('click', function(e) {
			
			var badge_id = this.getProperty('rel');

			if (badge_id != null && (that.current_badge != badge_id)) {

				that.handleIndicator(this);

				that.current_badge = badge_id;

				// update form value to be passed
				that.value_container.setProperty('value', badge_id);

				// update current item
				this.getSiblings().removeClass('current');
				this.addClass('current');
				
				that.fireEvent('updated', badge_id);
			}
		});
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
	},

	setToDefault: function() {
		this.default_badge.click();
	},

	removeBadge: function() {
		this.setToDefault();
		this.fireEvent('updateplate');
	}

});
