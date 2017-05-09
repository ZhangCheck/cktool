var toolCk = toolCk || {};
toolCk.getView = function () {
    return $('div[viewCk]');
};
toolCk.getCode = function () {
    return $('textarea[codeCk]').text();
};
toolCk.setCode = function (code) {
    $('textarea[codeCk]').text(code);
};
toolCk.appendEasyOptions = function (target, value) {
    target = $(target);
    var options = target.attr('data-options'); //target.data('options');
    options = options || "";
    if (options.indexOf(value) == -1) {
        options += options == "" ? value : "," + value;
        target.attr('data-options', options);
    }
    toolCk.freshView();
};
toolCk.removeEasyOptions = function (target, value) {
    target = $(target);
    var options = target.attr('data-options');
    if (options && options.indexOf(value) != -1) {
        options = options.replace(value, "");
        target.attr('data-options', options);
    }
    toolCk.freshView();
};
toolCk.setScript = function (id, scripts) {
    var source = toolCk.getCode();
    var scriptHead = '<script id="' + id + '">';
    if (source.indexOf(scriptHead) == -1) {
        source += '\n' + scriptHead + '\n' + scripts + "\n" + '</script>';
    }
    else {
        var reg = new RegExp('<script id="' + id + '">' + '[\\s\\S]*' + '<\\/script>', "m");
        source = source.replace(reg, scriptHead + '\n' + scripts + "\n" + '</script>');
    }
    toolCk.setCode(source);
};
/**
 * ������������view������
 */
toolCk.freshView = function () {
    var view = $('div[viewCk]');
    var source = toolCk.getCode();
    view.html(source);
    if (toolCk.initView) {
        toolCk.initView();
    }
};
$(function () {
    $('#codeBtn').click(function () {
        $('textarea[codeCk]').toggle();
    });
    $('#normalBt').click(function () {
        location.reload();
    });
});
//# sourceMappingURL=argumentCk.js.map