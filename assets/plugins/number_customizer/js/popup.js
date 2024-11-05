var openPopup = function(url, popupWidth, popupHeight) {
	if(popupWidth==null) {
		popupWidth = 340;
	}
	
	if(popupHeight==null){
		popupHeight = 500;
	}
	
	var popWin = window.open(url, "win", "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable=1,width=" + popupWidth + ",height=" + popupHeight, 1);
	popWin.focus();
	return false;
}
