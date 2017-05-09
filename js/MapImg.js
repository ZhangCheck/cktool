/**
 * Created by CHECK on 2015/8/10.
 */
///<reference path="../Definition/jquery/jquery.d.ts"/>
$(function () {
    $('.withMap').load(function () {
        var temp = new Image();
        temp.src = $(this).attr('src');
        var img = $(this);
        img.data({ width: temp.width, height: temp.height });
        console.log(img.data().width);
        $(window).resize(function () {
            var map = $(img.attr('usemap'));
            map.find('area').each(function (ii, tt) {
                var tempData = $(tt).data().coords;
                if (!$(tt).data().coords) {
                    $(tt).data({ coords: $(tt).attr('coords') });
                }
                else {
                    console.log(img.width(), img.data().width);
                    var scalex = img.width() / img.data().width;
                    var scaley = img.height() / img.data().height;
                    var coords = $(tt).data().coords.split(",");
                    var newCoords = [];
                    for (var i = 0; i < coords.length; i++) {
                        newCoords.push(coords[i] * (i % 2 == 0 ? scaley : scalex));
                    }
                    $(tt).attr('coords', newCoords.join(","));
                }
            });
        }).resize();
    });
});
var MapArea = (function () {
    function MapArea(selector) {
        this.selector = selector;
    }
    MapArea.prototype.setCoords = function (x) {
        $(this.selector).attr('coords', typeof x == 'string' ? x : x.join(","));
        $(this.selector).data({ coords: $(this.selector).attr('coords') });
    };
    return MapArea;
})();
//# sourceMappingURL=MapImg.js.map