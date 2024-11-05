var _GLOBAL_FITING_ARRAY = {};

var Gl = {};
Gl.is_debug_enabled = false;

var updatePlateAjax, plateEffects, plateHeightEffects, loaderEffects, plateTypeId;

var updatePlateImage = function(imagefile){
	console.log("call to old updatePlateImage function");
}

var updatePlatePrice = function(){
	console.log("call to old updatePlatePrice function");
}

var updatePlate = function(){

	console.log("call to old updatePlate function");
}

if (typeof document.addEventListener != 'undefined') {
	document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
	document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);
}