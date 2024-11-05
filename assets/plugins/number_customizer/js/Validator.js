var SuperValidator = new Class({

	Implements: [Events,Options],

	options: {},

	modules: null,
	message: null,

	initialize: function(modules, options) {
		this.setOptions(options);

		this.modules = modules;
	},

	validate: function() {
		var message = null;

		Object.each(this.modules, function(module) {
			if (typeof module.validate == 'function' && !message) {
				message = module.validate()
			}
		});

		return message;
	},

	isValid: function() {
		this.message = this.validate(this.modules);
		return typeof this.message != 'object';
	},

	getError: function() {
		return this.message;
	}

});