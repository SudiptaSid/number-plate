var SuperSlogans = new Class({

	Implements: [Events,Options,Restrictions],

	options: {
		checkbox_id: 'noslogan',
		text_field_id: 'formSlogan',
		scroller_id: 'slogan-scroller',
		restricted: ['vintage_plate'],
		tab_id: 'tabSlogan',
		value_container_id: 'addSlogan',
		default_text: 'If chosen, text will appear here'
	},

	artefacts: {
		text_field: null,
		enabler_checkbox: null,
		scroller: null,
		color_picker: null,
		value_container: null
	},

	initialize: function(options) {
		this.setOptions(options);

		this.artefacts.scroller = $(this.options.scroller_id);
		this.artefacts.value_container = $(this.options.value_container_id);

		this.setupEvents();
		this.setupSloganTextField();
		this.setupSloganCheckbox();
		this.setupSloganColorPicker();
	},

	setupEvents: function() {
		/*$('formSlogan').observe = new Observer($('formSlogan'), updatePlate, {delay: 2000});
		$('formSlogan').addEvents({
			keyup: PlateUtilities.tidyString(this),
			change: PlateUtilities.tidyString(this)
		});*/
	},

	setupSloganColorPicker: function() {
		this.artefacts.color_picker = new SuperSloganColors({
			onUpdateplate: function() {
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setupSloganCheckbox: function() {
		this.artefacts.enabler_checkbox = $(this.options.checkbox_id);
		this.artefacts.enabler_checkbox.addEvent('click', function() {
			if(this.artefacts.enabler_checkbox.checked) {
				this.artefacts.scroller.hide();
				this.artefacts.text_field.hide();
				this.artefacts.value_container.set('value',0);
			}else{
				this.artefacts.scroller.show();
				this.artefacts.text_field.show();
				this.artefacts.value_container.set('value',1);
			}
			this.fireEvent('updateplate');
		}.bind(this));

		if (this.artefacts.text_field.getProperty('value') != this.options.default_text && $('addSlogan').get('value') == 1) {
			this.artefacts.enabler_checkbox.setProperty('checked', false);
		}
	},

	setupSloganTextField: function() {
		this.artefacts.text_field = $(this.options.text_field_id);

		this.artefacts.text_field.addEvents({
			focus: function(e) {
				var el = e.target;
				if (this.options.default_text == el.value) {
					el.value = '';
				}

				this.artefacts.enabler_checkbox.setProperty('checked', false);
			}.bind(this),
			blur: function(e) {
				var el = e.target;
				if (el.value == '') {
					el.value = this.options.default_text;
				}

				if (el.value == '' || el.value == this.options.default_text) {
					this.artefacts.enabler_checkbox.setProperty('checked', true);
				}
				
				this.fireEvent('updateplate');
			}.bind(this)
		});
	},

	setToDefault: function() {
		this.artefacts.value_container.set('value',0);
	},

	validate: function() {
		// validate slogan
		if($('tabSlogan').getStyle('display') != 'none' && !$('formSlogan').getProperty('value').replace('If chosen, text will appear here','')) {
			if(!$('noslogan').getProperty('checked')){
				$('tabSlogan').click();
				$('formSlogan').focus();
				return new SuperError('error','Please define your plate slogan.',this);
			}
		}
	}

});