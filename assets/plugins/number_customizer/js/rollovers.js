// setup image mouseovers

var initMouseOvers = function(){
	var preload = new Image();

	$$('.rollover, .rollChild').each(function(el){
		var subElement = (el.hasClass('rollChild') ? el.getElement('img') : el);
		if (subElement.getProperty('src').test(/\.(gif|jpg|jpeg|png)$/i)) {
			preload.src = subElement.getProperty('src').replace(/\.(gif|jpg|jpeg|png)/, '_over.$1');

			el.addEvents({
				mouseover: function(){
					var element = (el.hasClass('rollChild') ? el.getElement('img') : el);
					element.setProperty('src', element.getProperty('src').replace(/\.(gif|jpg|jpeg|png)/, '_over.$1'));
				},
				mouseout: function(){
					var element = (el.hasClass('rollChild') ? el.getElement('img') : el);
					element.setProperty('src', element.getProperty('src').replace(/_over\.(gif|jpg|jpeg|png)/, '.$1'));
				}
			});
		}
	});
}


// and initialise the mouseovers on page load

window.addEvent('domready', initMouseOvers);