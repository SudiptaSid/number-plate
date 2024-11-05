var SuperPlateOptions = new Class({

	Implements: [Events,Options],

	options: {

	},

	modules: {
		reg_number: null,
		show_plate: null,
		plate_sizes: null,
		slogans: null,
		plate_types: null,
		fonts: null,
		badges: null,
		badge_colors: null,
		border_colors: null,
		fitting_kits: null
	},

	tabs: null,
	restricted: [],

	initialize: function(options) {
		this.setOptions(options);

		this.setupNavigation();

		this.setupRegNumber();
		this.setupPlateTypes();
		this.setupPlateSizes();
		this.setupMaterial();
		//this.setupShowPlate();
		this.setupFonts();
		this.setupBadgeColors();
		this.setupBorderColors();
		this.setupBackgroundColors();
		this.setupSlogans();
		this.setupBadges();
		this.setupFittingKits();
	},

	setupFittingKits: function() {
		this.modules.fitting_kits = new SuperFittingKits({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupNavigation: function() {
		this.tabs = $$('#plateNav > li');
		var plateBuilderAccordion = new Fx.Accordion(this.tabs, $$('.plateBlock'), {
			onActive: function(toggler, element){
				toggler.addClass('current');
			},

			onBackground: function(toggler, element){
				toggler.removeClass('current');
				element.setStyles({'height': element.offsetHeight, 'border': 'none'});
			},

			onComplete: function(){
				this.elements[this.previous].setStyles({'height':'auto'});
			}
		});

		this.setupScrollBlocks();
	},

	setupScrollBlocks: function() {
		// THIS NEEDS TO BE CHANGED FOR A MOOTOOLS EQUIVALENT
		jQuery('div[data-fluid-replace-with-scroll-options]').each(function(){
			vid = 'VirtualId'+(new Date().getTime());
			jQuery(this).attr('id', vid);
			lister = jQuery('ul:first', this);
			jQuery('ul:first', lister).height(jQuery(this).data('height'));
			jQuery(this).css({
				position: 'relative',
				height: '145px',
				width: '220px',
				overflow: 'scroll',
				margin: '0px auto 10px auto'
			});
			jQuery('ul:first', this).css({'margin':'0px 0px 0px 0px'});

		});
	},

	setupMaterial: function() {
		this.modules.materials = new SuperMaterial({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupShowPlate: function() {
		this.modules.show_plate = new SuperShowPlate({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupRegNumber: function() {
		this.modules.reg_number = new SuperRegNumber({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupPlateTypes: function() {
		this.modules.plate_types = new SuperPlateTypes({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupFonts: function() {
		this.modules.fonts = new SuperFonts({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupBadges: function() {
		this.modules.badges = new SuperBadges({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this),
			onUpdated: function(badge_id) {
				this.modules.badge_colors.checkBadge(badge_id);
			}.bind(this)
		});
	},

	setupBadgeColors: function() {
		this.modules.badge_colors = new SuperBadgeColors({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this),
			onRemoved: function() {
				this.modules.badges.removeBadge();
			}.bind(this)
		});
	},

	setupBorderColors: function() {
		this.modules.border_colors = new SuperBorderColors({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupBackgroundColors: function() {
		this.modules.background_colors = new SuperBackgroundColors({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupPlateSizes: function() {
		this.modules.plate_sizes = new SuperPlateSizes({
			onUpdated: function(plate_id) {
				this.modules.plate_types.checkSize(plate_id);
				this.modules.fonts.checkAvailability(plate_id);
				this.modules.materials.checkAvailability(plate_id);

				// if vintage is selected
				if (plate_id == 32) {
					this.addModuleRestriction('vintage_plate');
				} else {
					this.removeModuleRestriction('vintage_plate');
				}

				setTimeout(function(){
					this.fireEvent('updateplate');
				}.bind(this), 500);
			}.bind(this)
		});
	},

	setupSlogans: function() {
		this.modules.slogans = new SuperSlogans({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	addModuleRestriction: function(type) {
		if (!this.restricted.contains(type)) {
			this.restricted.push(type);
			this.disableModules();
		}
	},

	removeModuleRestriction: function(type) {
		if (this.restricted.contains(type)) {
			this.restricted.splice(this.restricted.indexOf(type),1);
			this.disableModules();
		}
	},

	disableModules: function() {
		// check each module to see if we need to disable it in this instance
		var restricted = this.restricted;
		Object.each(this.modules, function(module) {
			if (typeof module.shouldDisable == 'function') {
				if (module.shouldDisable(restricted)) {
					module.disable();
				} else {
					module.enable();
				}
			}
		});
	}

});