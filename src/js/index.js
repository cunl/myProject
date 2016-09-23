jQuery(function($){
	//我的淘宝,收藏夹
	var $list=$('.nav_div .list');
	$list.on('mouseenter','li',function(){
		var $div=$(this).find('div').eq(0)
		$div.css({
			display:'block'
		}).prev('a').addClass('active');
		$div.next().addClass('picactive');
	}).on('mouseleave','li',function(){
		var $div=$(this).find('div')
		$div.eq(0).css({
			display:'none'
		}).prev('a').removeClass('active');
		$div.next().removeClass('picactive');
	});
	
	// 手机版
	var $div2=$list.children('div');
	$div2.find('li').eq(0).on('mouseenter',function(){
		$('.code_img').css({
			display:'block',
			zIndex:2
		});
	}).on('mouseleave',function(){
		$('.code_img').css('display','none');
	});
	
	// 商家支持,网站导航
	$div2.on('mouseenter','li',function(){
		var $div=$(this).find('div').eq(0);
		$div.css('display','block').prev('a').addClass('active');
		$div.next().addClass('picactive');
	}).on('mouseleave','li',function(){
		var $div=$(this).find('div').eq(0);
		$div.next().removeClass('picactive').css('display','block');
		$div.css('display','none').prev('a').removeClass('active');		
	});
	
	// 手机逛
	$('.phone').on('mouseenter',function(){
		$('.hide_code').css('display','block');
		$('.hide_pic').addClass('hide_pic2');

	}).on('mouseleave',function(){
		$('.hide_code').css('display','none');
		$('.hide_pic').removeClass('hide_pic2');
	});

	// 描述服务物流
	$('.dere').closest('dd').on('mouseenter',function(){
		flow();
	}).on('mouseleave',function(){
		flowhide();
	});
	$('.flow').on('mouseenter',function(){
		flow();
	}).on('mouseleave',function(){
		flowhide();
	});
	
	//导航栏
	$('.data_nav').on('mouseenter','a',function(){
		$('<span/>').addClass('bgnav')
	});
	
	$('.data_nav').on('mouseenter','a',function(){
		var width=$(this).width();
		var $span=$('<span/>').addClass('bgnav').appendTo($(this)).html($(this).html());
		$span.css('width',width+28);
		
		$(this).stop().animate({
			bottom:30
		});
		$span.stop().animate({
			height:30,
			bottom:-30
		});
	}).on('mouseleave','a',function(){
		var $span=$(this).find('span');
		$(this).stop().animate({
			bottom:0
		});
		$span.stop().animate({
			height:0,
			bottom:0
		});
	});
	
	//侧边栏
	var height=window.innerHeight;
	var $tabs=$('.tabs').css({
		height:height,
		'padding-top':height*0.3
	});
	
	$('.toptabs').css({
		'margin-top':height*0.26
	});
	$('.back').css({
		'top':height*0.63
	});
	
	//侧边栏移入事件
	var arr=['我的特权',,'我的资产','我关注的品牌','我的收藏','我看过的'];
	var $right;
	$tabs.on('mouseenter','a',function(){
		var index=$(this).index();
		if(index!=1 && index<6){
			var $left=$('<div/>').addClass('tabsleft');
			$right=$('<div/>').addClass('tabsright').html(arr[index]).append($left).appendTo('body').css({
				top:$(this).offset().top,
				opacity:0
			}).stop().animate({
				right:35,
				opacity:1
			});
		}else if(index==1){
			$(this).find('img').attr('src','../img/tabscar.png');
		}else if(index==6){
			$('.backcode').css('display','block');
		}
		$(this).css('background','#C40000');
		
	}).on('mouseleave','a',function(){
		var index=$(this).index();
		if(index!=1 && index<6){
			$right.animate({
				right:70,
				opacity:0
			}).remove();
		}else if(index==1){
			$(this).find('img').attr('src','../img/tabs2.png');
		}else if(index==6){
			$('.backcode').css('display','none');
		}
		$(this).css('background','');
	});
	
	//侧边栏二维码
	$('.backcode').on('mouseenter',function(){
		$(this).css('display','block');
	}).on('mouseleave',function(){
		$(this).css('display','none');
	});
	
	//侧边栏回到顶部
	var $goback=$('.goback');
	$goback.on('click',function(){
		$(window).scrollTop(0);
	});
	
	//客服
	$('.service').on('mouseenter',function(){
		$('.servicehide').css('display','block');
	}).on('mouseleave',function(){
		$('.servicehide').css('display','none');
	});
	
	//回到顶部的按钮鼠标移入事件
	var $untilshow=$('.untilshow');
	$untilshow.on('mouseenter',function(){
		$(this).css('background','rgba(255,255,255,1)');
	}).on('mouseleave',function(){
		$(this).css('background','rgba(255,255,255,0.8)');
	}).on('click',function(){
		$(window).scrollTop(0);
	});
	
	//滚动条改变时回到顶部按钮的显隐
	$goback.css('display','none');
	$(window).on('scroll',function(){
		if($(this).scrollTop()>1000){
			$untilshow.css('display','block');
			$goback.css('display','block');
		}else {
			$untilshow.css('display','none');
			$goback.css('display','none');
		}
	});
	
	//所有事物,517吃货节
	show($('.li_a_hide'),$('.li_hide'));
	show($('.li_a_hide2'),$('.li_hide'));
	
	//切换按钮,跳到对应的界面
	var $turnto=$('.turnto');
	$turnto.find('a').on('click',function(e){
		e.preventDefault();
		
		var top=$turnto.eq($(this).index()-1).offset().top;
		
		$(window).scrollTop(top);
	});
	
	
	//初始化
	var $bigbanner=$('.bigbanner');
	var $btnbanner=$('.btnbanner');
	$btnbanner.find('a').eq(0).css('opacity',0.5);
	var $bannershow=$bigbanner.find('#banner').children('div');
	$bannershow.eq(0).css('opacity',1);
	var $banner=$('#banner');
	
	//移入两个小按钮时对应下标的大图显示，其他隐藏
	var i=0;
	$btnbanner.on('mouseenter','a',function(){
		clearInterval(timer);
		i=$(this).index();
		banner($bannershow);
		btnshow($(this));
	}).on('mouseleave','a',function(){
		btnshow($(this));
		timer=setInterval(timermove,3000);
	});
	
	var timer=setInterval(timermove,3000);
	//移入大图时清除定时器
	$banner.on('mouseenter',function(){
		clearInterval(timer);
		//当移入的是第一张图片的时候，才让收缩的那张图运动
		if(i==0){
			$(this).find('img').animate({
				left:-328,
				top:0,
				height:705
			});
		}
	}).on('mouseleave',function(){
		timer=setInterval(timermove,3000);
		if(i==0){
			$(this).find('img').animate({
				left:630,
				top:352,
				height:0
			});
		}
	});
	
	//加载底部
	$('.bottom').load('footer.html');
	
	function timermove(){
		if(i==$bannershow.length-1){
			i=0;
		}else {
			i++;
		}
		banner($bannershow);
		btnshow($btnbanner.find('a').eq(i));
	}
	
	function banner(ele){
		ele.eq(i).stop().animate({
			opacity:1
		}).siblings('div').stop().animate({
			opacity:0
		});
	}
	
	function btnshow(ele){
		ele.stop().animate({
			opacity:0.5
		}).siblings('a').stop().animate({
			opacity:0.2
		});
	}
});

function flow(){
	$('.flow').css('display','block');
	$('.hide_pic').addClass('hide_pic2');
}
function flowhide(){
	$('.flow').css('display','none');
	$('.hide_pic').removeClass('hide_pic2');
}

function show(obj1,obj2){
	obj1.on('mouseenter',function(){
		obj1.next().css('display','block');
	}).on('mouseleave',function(){
		obj1.next().css('display','none');
	});
	
	obj2.on('mouseenter',function(){
		$(this).css('display','block');
	}).on('mouseleave',function(){
		$(this).css('display','none');
	});
}

