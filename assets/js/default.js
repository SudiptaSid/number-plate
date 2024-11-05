// Fixed Menu
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $("#cs_navbar").addClass("fixed_menu");
    } else {
        $("#cs_navbar").removeClass("fixed_menu");
    }
});
// Banner Slider
$('#banner_slider').owlCarousel({
    margin:0,
    items: 1,
    nav:true,
    navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"], 
    dots:true,
    loop:true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    smartSpeed:1000,
});
// Lightbox
$(function(){
	var gallery = $('#cs_gallery a').simpleLightbox({navText:    ['&lsaquo;','&rsaquo;']});
});