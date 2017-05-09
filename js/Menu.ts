$(function(){
    var test = $('<div id="menuTest"></div>').appendTo("body");
    test.empty();
    test.append($('.menuCon>.menu').clone());
    $(window).resize(function(){
        var overflow = test.find('.menu').width()>$('.menuCon').width();
        if(overflow){
            $('.menuCon>.menu').addClass('dropdown').addClass('pull-right');
            $('.menuCon>.menu .m-items').addClass('dropdown-menu').addClass('dropdown-menu-right').removeClass('m-row');
            $('.menuCon>.menu>.btn').show();
            $('dropdown').dropdown();
        }else{
            $('.menuCon>.menu').removeClass('dropdown').removeClass('pull-right');
            $('.menuCon>.menu .m-items').removeClass('dropdown-menu').removeClass('dropdown-menu-right').addClass('m-row');
            $('.menuCon>.menu>.btn').hide();
        }
    }).resize();
});