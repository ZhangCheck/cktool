(function ($) {
    function move(append,remove){
        var selected = remove.datagrid('getSelections');
        for (var i = 0; i < selected.length; i++) {
            append.datagrid('appendRow', selected[i]);
            remove.datagrid('deleteRow', remove.datagrid('getRowIndex', selected[i]));
        }
        //save data here

    }

    $.fn.leftRight = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.tabs.methods[options](this, param);
        }
        options = options || {};
        return this.each(function (i, t) {
            var t = $(t), r = t.find(".rightSide .easyui-datagrid"), l = t.find(".leftSide .easyui-datagrid");
            t.find(".toLeftBt").click(function () {
                move(l,r);
            });
            t.find(".toRightBt").click(function () {
                move(r,l);
            });
        });
    };
})(jQuery);
$(function () {
    $('.leftRight').leftRight();
});
//# sourceMappingURL=HeNan_LeftRight.js.map