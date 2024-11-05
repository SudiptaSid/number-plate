var SuperPriceRequest = new Class({

	Implements: [Events,Options],

	options: {
		post_url: '/builder/parse_price.php'
	},

	requestDataPrice: {},
	ignoredRequests: 0,

	initialize: function(options) {
		this.setOptions(options);
	},

	getData: function() {
		return {
			plate: {
				id: parseInt($$('[name=regtype]')[0].getProperty('value')),
				material: $$('[name=plateMaterialType]')[0].getProperty('value'),
				disclaimer: ($('plateStyle').getProperty('value')),
				print: $$('[name=whichplates]')[0].getProperty('value')
			},
			font: {
				id: $$('[name=regfont]')[0].getProperty('value'),
				type: ($$('#showTextStyle_Legal.current').length?'legal':'custom')
			},
			slogan: !$$('[name=noslogan]:checked').length ? 1 : 0,
			badge: $('valBadge').getProperty('value'),
			colorize: {
				badge: $('valBadgeColour').getProperty('value'),
				border: ($$('#formBorderColourList .borderColour.current').length?$$('#formBorderColourList .borderColour.current a')[0].getProperty('rel'):false),
				background: ($$('#formBackgroundColourList .backgroundColour.current').length?$$('#formBackgroundColourList .backgroundColour.current a')[0].getProperty('rel'):false),
				slogan: ($$('#formSloganColourList .sloganColour.current').length?$$('#formSloganColourList .sloganColour.current a')[0].getProperty('rel'):false)
			},
			fitting_kit: this.getFittingKitValues(),
			active_id: new Date().getTime()
		};
	},

	makeRequest: function(plateTypeId) {

		var requestDataPrice = this.getData();

		var myRequest = new Request.JSON({
			url: this.options.post_url,
			noCache: true,
			method: 'post',
			data: requestDataPrice,
			onSuccess: function(e) {
				if(e.id == requestDataPrice.active_id){
					$('plateinnerprice').getElement('span').set('text',e.price);
				}
			}
		}).send();

	},

	getFittingKitValues: function() {
		var kits = {};
		$$('input[name^="fitting_kit"]').each(function(el) {
			kits[el.getParent('li').getProperty('id')] = el.getProperty('value');
		});

		return kits;
	}

});