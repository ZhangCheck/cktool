$(function(){
    $('.popVideoBt').click(function(){
        $('#videoModal').modal('show');
        if($(document).width()<768){
            videojs('videoPlayer').requestFullScreen();
            videojs('videoPlayer').play();
        }
    })

    $('#videoModal').on('hidden.bs.modal', function (e) {
        videojs("videoPlayer").pause();
    })

    videojs('videoPlayer').on('fullscreenchange',function(){
        if(!videojs('videoPlayer').isFullScreen){
            $('#videoModal').modal('hide');
        }
    })
})