/**
 * Created by CHECK ZHANG on 2015/8/21.
 */
///<reference path="../Definition/jquery/jquery.d.ts"/>
$(function () {
    $(window).resize(autoTrimAll);
    autoTrimAll();
    function autoTrim(target) {
        if (!$(target).data("size")) {
            var src = $(target).css("background-image").replace("url(", "").replace(")", "");
            getImageWidth(src, function (w, h) {
                console.log({ width: w, height: h });
                var size = { width: w, height: h, rate: 1 };
                size.rate = size.width / size.height;
                $(target).data("size", size);
                autoTrim(target);
            });
        }
        var imgSize = $(target).data("size");
        if (imgSize) {
            var winSize = { width: $(window).width(), height: $(window).height(), rate: 1 };
            winSize.rate = winSize.width / winSize.height;
            if (imgSize.rate > winSize.rate) {
                $(target).css({ width: winSize.width, height: winSize.height, "background-size": "auto " + winSize.height + "px " });
            }
            else {
                $(target).css({ width: winSize.width, height: winSize.height, "background-size": winSize.width + "px auto" });
            }
        }
    }
    function autoTrimAll() {
        $('.autoTrimImg').each(function (i, t) {
            autoTrim(t);
        });
    }
    function getImageWidth(url, callback) {
        $('<img>').attr('src', url).load(function () {
            callback(this.width, this.naturalHeight);
        });
    }
});
//# sourceMappingURL=autoTrimImg.js.map