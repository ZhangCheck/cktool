$(function(){
    /* center modal */
    function centerModals(){
        $('.modal').each(function(i){
            var $clone = $('.modal').eq(i);
            if($clone.length==0) return;
            try{
                $clone = $clone.clone()
                $clone.css('display', 'block').appendTo('body');
                var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
                top = top > 0 ? top : 0;
                $clone.remove();
                $(this).find('.modal-content').css("margin-top", top);
            }catch(ex){
                //todo error in IE8
            }

        });
    }
    $('.modal').on('show.bs.modal', centerModals);
    $(window).on('resize', centerModals);
});