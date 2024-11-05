var SuperFonts = new Class({

	Implements: [Events,Options,Restrictions],

	options: {
		item_selector: '.fontBlock a',
		current_selector: '.current',
		value_container_id: 'valFont',
		gel_font_selector: '#mainFontBlock a[title~=Gel]',
		gel_font_ids: [20,21],
		gel_font_excluded_plate_ids: [
			4 // id for motorcycle plate
		],
		restricted: ['vintage_plate'],
		tab_id: 'tabStyle'
	},

	fonts: null,
	value_container: null,
	default_font: null,
	current_font: null,
	gel_fonts: null,

	popup_map: {
		font1: '/builder/pop/standard.php',
		font3: '/builder/pop/3d.php',
		font16: '/builder/pop/carbon.php',
		font18: '/builder/pop/domed.php',
		font19: '/builder/pop/highline.php',
		font20: {url:'/builder/pop/3dgelcarbon.php', w: null, h: 340},
		font21: {url:'/builder/pop/3dgelblack.php', w: null, h: 340}
	},

	initialize: function(options) {
		this.setOptions(options);

		this.fonts = $$(this.options.item_selector);
		this.value_container = $(this.options.value_container_id);

		this.default_font = this.fonts[0].getProperty('rel');

		this.gel_fonts = $$(this.options.gel_font_selector);
		
		this.setupAccordion();
		this.setupEvents();
	},

	setupAccordion: function() {
		// setup accordions
		var fontSizeAccordion = new Fx.Accordion($$('.plateSizeLink'), $$('.plateSizeMenu'), {
			alwaysHide: true,
			show: -1,
			onActive: function(toggler, element){
				toggler.addClass('current');
			}
		});
	},

	setupEvents: function() {
		var that = this;

		this.fonts.addEvent('click', function(e) {
			
			var font_id = this.getProperty('rel');

			if (font_id != null && (that.current_font != font_id)) {
				that.current_font = font_id;

				// update form value to be passed
				that.value_container.setProperty('value', font_id);

				// update current item
				this.getSiblings().removeClass('current');
				this.addClass('current');
				
				that.fireEvent('updateplate');

				that.displayPopup(font_id);
			}
		});
	},

	displayPopup: function(font_id) {
		var popup = this.popup_map['font'+font_id];
		if (typeof popup == 'object') {
			openPopup(popup.url, popup.w, popup.h);
		} else {
			openPopup(popup);
		}
	},

	checkAvailability: function(plate_id) {
		if (this.options.gel_font_excluded_plate_ids.contains(parseInt(plate_id))) {
			this.gel_fonts.hide();

			// if the user had previously selected a gel font, but can't keep it now then change back to default font.
			if (this.options.gel_font_ids.contains(parseInt(this.current_font))) {
				this.setToDefault();
				this.current_font = this.default_font;
			}
		} else {
			this.gel_fonts.show();
		}
	},

	setToDefault: function() {
		this.value_container.setProperty('value', this.default_font);
	}

});