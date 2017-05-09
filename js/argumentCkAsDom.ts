var toolCk = toolCk||{};
toolCk.getCode=function(){
    if(!toolCk.code){
        var source = $('textarea[codeCk]').text();
        toolCk.code = $("<div>"+source+"</div>");
    }
    return toolCk.code;
}
toolCk.getView = function(){
    return $('div[viewCk]');
}
toolCk.getCodeSource=function(){
    var code = toolCk.getCode();
    return code.get(0).innerHTML;
}

toolCk.appendEasyOptions=function(target,value){
    target=$(target);
    var options = target.attr('data-options');//target.data('options');
    options = options||"";
    if(options.indexOf(value)==-1){
        options += options==""?value:","+value;
        target.attr('data-options',options);
    }

    toolCk.freshView();
}

toolCk.removeEasyOptions=function(target,value){
    target=$(target);
    var options = target.attr('data-options');

    if(options && options.indexOf(value)!=-1){
        options = options.replace(value,"");
        target.attr('data-options',options);
    }

    toolCk.freshView();
}

toolCk.freshView=function(){
    var view = $('div[viewCk]');
    if(!toolCk.code){
        toolCk.code = toolCk.getCode();
    }

    var source = toolCk.getCodeSource();
    $('textarea[codeCk]').text(source);
    view.html(source);



    if(toolCk.initView){
        toolCk.initView();
    }
}

$(function(){
    $('#codeBtn').click(function(){
        $('textarea[codeCk]').toggle();
    })
    $( '#normalBt').click(function(){
        location.reload();
    })
})