/**
 * 
 */ 
var onlyOpenTitle ="首页";

//$(function(){
//      jQuery("#leftmenu").accordion({ //初始化accordion
//        fillSpace:true,
//        fit:true,
//        border:false,
//        animate:false,
//        onSelect: function(title,index){
//        	var urllist=$('#topurl')[0].value;
//     	  	var urlsz=urllist.split(":");
//     	  	var nd=urlsz[index].split(",");
//     	  	if(nd[3] == '1')
//     	  		addTab(nd[0],title,nd[1], nd[2]);
//        }   
//      }); 
//      tabCloseEven();
////      ("#leftmenu").accordion()
//      $.ajaxSetup({   
//    	  async : false  
//      }); 
//      $.ajax({
//			type : "get",
//			url : "Admin/Security/getTopUrl",  
//			success : function(result) {  
//				$('#topurl').val(result); 
//			}
//		}); 
//
//      $.post("Admin/Security/getPages", { "ParentID": "-1" }, //获取第一层目录
//         function (data) {
//           if (data == "0") {
//             //window.location = "/Account";
//           } 
//           
//           $.each(data, function (i, e) {//循环创建手风琴的项
//             var id = e.fpageid;
//             $('#leftmenu').accordion('add', {
//               title: e.pagename,
//               content: "<ul id='tree"+id+"' ></ul>",
//               selected: false,
//               iconCls:e.ficon,//e.Icon
//               onClick: function(acd){
//            	   //alert(acd.title);            	   
//               }
//             }); 
//             
////             $.parser.parse(); 
//            
//             $.post("Admin/Security/getPages2?ParentID="+id,  function(data) {//循环创建树的项
//             
//               $("#tree" + id).tree({ 
//                 data: data, 
//                 lines:false,
//                 iconCls:data.iconcls,
//                 onBeforeExpand:function(node,param){    
//                   $("#tree" + id).tree('options').url = "Admin/Security/getPages2?ParentID=" + node.id;
//                 },   
//                 onClick : function(node){   
//                   if (node.state == 'closed'){  
//                     $(this).tree('expand', node.target);  
//                   }else if (node.state == 'open'){  
//                     $(this).tree('collapse', node.target);  
//                   }  
//                   if(node.islink){  
//                     addTab(node.id,node.text, node.furl, node.iconCls);
//                   } 
//                   
//                 }
//               });
//             }, 'json');
//           });
//         }, "json");
//      //如果 不是 首页 跳转 默认 选择第一个菜单那 
//      if(charts==""){
//    	  $('#leftmenu').accordion('select',"信访汇聚");
//      } else if(charts=="xfhj"){
//    	  $('#leftmenu').accordion('select',"信访汇聚");
//      } else if(charts=="zjba"){
//    	  $('#leftmenu').accordion('select',"执纪办案");
//      }
//      else if(charts=="zfbajk"){
//    	  $('#leftmenu').accordion('select',"执法办案监控");
//      
//      }
//      else if(charts=="jdjc"){
//    	  $('#leftmenu').accordion('select',"监督检查");
//      }
//      else if(charts=="dlkp"){
//    	  $('#leftmenu').accordion('select',"党廉考评");
//      }
//      else if(charts=="xzgljk"){
//    	  $('#leftmenu').accordion('select',"行政管理监控");
//      }
//      else if(charts=="lzda"){
//    	  $('#leftmenu').accordion('select',"廉政档案");
//      }
//      else if(charts=="lzjy"){
//    	  $('#leftmenu').accordion('select',"廉政教育");
//      }
//    });
function addHome(menuid,subtitle,url,icon){
	$('#tabs').tabs('add',{
		id:menuid,
		title:subtitle,
		content:createFrame(url),
		closable:false,
		icon:icon
	});	
}
function addTab(menuid,subtitle,url,icon){   	
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			id:menuid,
			title:subtitle,
			content:createFrame(url),
			closable:true,
			icon:icon
		});
	}else{
		$('#tabs').tabs('select',subtitle);
		
		$('#mm-tabupdate').click();
		updateTabs();
	}
	tabClose();
}



function updateTabs(){    
var fbsid = $('.thirdmenu ul li[class="select"]').attr('fbsid');
var if_src = $('#'+fbsid).attr('src');
$('#'+fbsid).attr('src',if_src);
$('#div_info').window('close', true);  
}

// 刷新不关闭弹出窗口，有点冗余
function refresh() {
	var fbsid = $('.thirdmenu ul li[class="select"]').attr('fbsid');
	var if_src = $('#'+fbsid).attr('src');
	$('#'+fbsid).attr('src',if_src);
}

function createFrame(url)
{
	var s="";
	if(url=="zjba/ajlr/index"){
		s = '<iframe   name="fbsPanelIframe_zb"  scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	}else if(url=="zjba/jbaj/index"){
		s = '<iframe   name="fbsPanelIframe_jb"  scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	}else if(url=="zjba/zbaj/ajjc/index")
		s = '<iframe   name="fbsPanelIframe_jc"  scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	else{
		s = '<iframe   name="fbsPanelIframe"  scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
		
	}
	return s;
}

function tabClose()
{
	/*双击关闭TAB选项卡*/
	$(".tabs-inner").dblclick(function(){
		var subtitle = $(this).children(".tabs-closable").text();
		
		$('#tabs').tabs('close',subtitle);
	})
	/*为选项卡绑定右键*/
	$(".tabs-inner").bind('contextmenu',function(e){
		$('#mm').menu('show', {
			left: e.pageX,
			top: e.pageY
		});

		var subtitle =$(this).children(".tabs-closable").text(); 
		
		$('#mm').data("currtab",subtitle);
		$('#tabs').tabs('select',subtitle);
		return false;
	});
}


//绑定右键菜单事件
function tabCloseEven() {

    $('#mm').menu({
        onClick: function (item) {
            closeTab(item.id);
        }
    });

    return false;
}

function closeTab(action)
{
    var alltabs = $('#tabs').tabs('tabs');
    var currentTab =$('#tabs').tabs('getSelected');
	var allTabtitle = [];
	$.each(alltabs,function(i,n){
		allTabtitle.push($(n).panel('options').title);
	})
   
    switch (action) {
        case "update":
            var iframe = $(currentTab.panel('options').content);
            var src = iframe.attr('src');
            $('#tabs').tabs('update', {
                tab: currentTab,
                options: {
                    content: createFrame(src)
                }
            })
            break;
        case "close":
            var currtab_title = currentTab.panel('options').title;
            $('#tabs').tabs('close', currtab_title);
            break;
        case "closeall":
            $.each(allTabtitle, function (i, n) {
                if (n != onlyOpenTitle){
                    $('#tabs').tabs('close', n);
				}
            });
            break;
        case "closeother":
            var currtab_title = currentTab.panel('options').title;
            $.each(allTabtitle, function (i, n) {
                if (n != currtab_title && n != onlyOpenTitle)
				{
                    $('#tabs').tabs('close', n);
				}
            });
            break;
        case "closeright":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);

            if (tabIndex == alltabs.length - 1){ 
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i > tabIndex) {
                    if (n != onlyOpenTitle){
                        $('#tabs').tabs('close', n);
					}
                }
            });

            break;
        case "closeleft":
            var tabIndex = $('#tabs').tabs('getTabIndex', currentTab);
            if (tabIndex == 0) { 
                return false;
            }
            $.each(allTabtitle, function (i, n) {
                if (i < tabIndex) {
                    if (n != onlyOpenTitle){
                        $('#tabs').tabs('close', n);
					}
                }
            });

            break;
        case "exit":
            $('#closeMenu').menu('hide');
            break;
    }
}

function changeScreen(){
	if($("#screenType").attr("class") == "main_fullscreen"){
		$(document.body).layout('collapse','north');
		$(document.body).layout('collapse','west');
	}else if($("#screenType").attr("class") == "main_unfullscreen"){
		$("#screenType").empty();
		$("#screenType").text("全屏");
		$("#screenType").attr("class","main_fullscreen");
		$(document.body).layout('expand','west');
		$("#northLayout").layout('expand','north');
		$(document.body).layout('panel', 'north').panel('resize',{height:102});
	}
}

/**  
 * layout方法扩展  
 */  
$.extend($.fn.layout.methods, {     
    setRegionToolVisableState:function(jq,params){  
        return jq.each(function(){   
            if(params.region=="center")   
                return;   
            var panels = $.data(this, 'layout').panels;   
            var panel = panels[params.region];   
            var tool = panel.panel('header').find('>div.panel-tool');   
            tool.css({display:params.visible?'block':'none'});   
            var first = params.region.substring(0,1);      
            var others = params.region.substring(1);      
            var expand = 'expand' + first.toUpperCase() + others;     
            if(panels[expand]){   
                panels[expand].panel('header').find('>div.panel-tool').css({display:params.visible?'block':'none'});   
            }   
        });   
    }   
});  

