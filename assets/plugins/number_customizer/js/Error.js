var SuperError = new Class({

	Implements: [Events],

	options: {},

	initialize: function(level, message, module) {
		this.level = level;
		this.message = message;
		this.module = module;
	}

});