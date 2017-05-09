(function($){
	$.fn.extend({
		"scroll_2":function(o){
			o=$.extend({
				wrap:"",			//运动框架的父级
				Scroll:"",			//运动框架
				autoTime:2000, 		//定时器的间隔时间
				speed:500,	 		//多少毫秒走一个li的距离
				auto:true,			//定时器的开关
				aa:true,			//定时器的默认方向	,默认是向左的	
				prev:"",			//左边的按钮
				next:"",			//右边的按钮
				t:null,				//左边的定时器属性
				t1:null,			//右边的定时器属性
				act:"click"			//切换的事件
		    },o)
			var current =0;//开始显示第几个菜单
			var wrap_h=$(o.wrap).eq(0).height();
			var aLi=$(o.Scroll).find("li")
			//每个菜单的高度
			var distance=aLi.eq(0).height()+parseInt(aLi.eq(0).css("padding-top"))+parseInt(aLi.eq(0).css("padding-bottom"))
			+parseInt(aLi.eq(0).css("margin-top"))+parseInt(aLi.eq(0).css("margin-bottom"));
			var len=aLi.length;
			$(o.Scroll).height(distance*len);
			var ul_h=$(o.Scroll).height();
			function bottom_arrow(){
				if(current*distance +20>= ul_h - wrap_h)return;
				if(ul_h>wrap_h)
				{
					if(!$(o.Scroll).is(":animated"))
					{
						$(o.Scroll).animate({top:"-="+distance},o.speed,function(){
							current +=1;
						})						
					}
					if(o.auto)
					{
						o.t=setTimeout(bottom_arrow,o.autoTime)	
					}

				}
			}
			function top_arrow(){
				if(current <=0)return;
				if(ul_h>wrap_h)
				{
					if(!$(o.Scroll).is(":animated"))
					{
						$(o.Scroll).animate({top:"+="+distance},o.speed,function(){
							current -=1;
						})		
					}
					if(o.auto)
					{
						o.t1=setTimeout(top_arrow,o.autoTime)	
					}

				}
			}
			if(o.auto)
			{
				o.aa?bottom_arrow():top_arrow();
			}
			
			$(o.prev).bind(o.act,function(){
				clearTimeout(o.t);
				clearTimeout(o.t1);
				o.t1=null;
				bottom_arrow();
			})
			$(o.next).bind(o.act,function(){
				clearTimeout(o.t);
				clearTimeout(o.t1);
				o.t=null;
				top_arrow();
			})
			if(o.auto)
			{
				$(this).hover(function(){
					clearTimeout(o.t);
					clearTimeout(o.t1);				
				},function(){
					o.t?bottom_arrow():top_arrow()
				})				
			}

			
		}
	})


})(jQuery);
