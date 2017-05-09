$(window).load(function(){
    $('.flexslider').flexslider({
        animation: "slide",
        slideshowSpeed: 5000,
        animationSpeed: 600,
        slideshow: true,
        start: function(slider){
            $('body').removeClass('loading');
        }
    });
});