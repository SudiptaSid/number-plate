var pngReplace = function(){
	if (/MSIE (5.5|6.)/.test(navigator.userAgent)) {
		$$('.png').each(function(el){
			var pos = el.getCoordinates();
			el.setStyles({
				background: (el.getStyle('backgroundColor').test(/(.+)/) ? el.getStyle('backgroundColor') : ''),
				filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + el.getStyle('backgroundImage').substring(5, el.getStyle('backgroundImage').length - 2) + "', sizingMethod='scale')"
			}).addEvent('propertychange', function(){
				if (window.event.propertyName == "style.backgroundImage") {
					var el = $(window.event.srcElement);
					if (el.hasClass('png')) {
						el.filters.item(0).src = el.getStyle('backgroundImage').substring(5, el.getStyle('backgroundImage').length - 2);
					}
				}
			});
		});
	}
}

window.addEvent('domready', pngReplace);