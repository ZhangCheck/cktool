(function ($) {
    $.fn.comboBoxLinked = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.tabs.methods[options](this, param);
        }
        options = options || {};
        return this.each(function (i, t) {
            var t = $(t), r = t.find(".rightSide .easyui-datagrid"), l = t.find(".leftSide .easyui-datagrid");
            t.find(".toLeftBt").click(function () {
                var selected = r.datagrid('getSelections');
            });
            t.find(".toRightBt").click(function () {
                var selected = l.datagrid('getSelections');
                for (var i = 0; i < selected.length; i++) {
                    r.datagrid('appendRow', selected[i]);
                    var index = l.datagrid('getRowIndex', selected[i]);
                    l.datagrid('deleteRow', index);
                }
            });
        });
    };
})(jQuery);
$(function () {
    $('.leftRight').comboBoxLinked();
});
//# sourceMappingURL=ComboBoxLinked.js.map