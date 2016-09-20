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
});
