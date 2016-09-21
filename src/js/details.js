jQuery(function($){
	//我的购物车
	var $hidecart=$('.hidecart');
	var $cart=$('.cart');
	$cart.on('mouseenter',function(){
		$(this).addClass('hidea');
		$hidecart.css('display','block');
	}).on('mouseleave',function(){
		$(this).removeClass('hidea');
		$hidecart.css('display','none');
	});
	
	$hidecart.on('mouseenter',function(){
		$cart.addClass('hidea');
		$(this).css('display','block');
	}).on('mouseleave',function(){
		$cart.removeClass('hidea');
		$(this).css('display','none');
	});
	
	$('.search').on('focus',function(){
		$(this).val('');
	}).on('blur',function(){
		if($(this).val()===''){
			$(this).val('礼盒');
		}
	}).trigger('blur');
	
	var $input=$('.addcart').find('input');
	$('.plus').on('click',function(){
		var value=parseInt($input.val())+1;
		$input.val(value);
	});
	$('.reduce').on('click',function(){
		var value=0;
		if($input.val()==1){
			var value=1;
		}else {
			value=parseInt($input.val())-1;
		}
		$input.val(value);
	});
	
	var $smallimg=$('.showbigimg').find('ul');
	var $bigdiv=$('.bigimg');
	var $bigimg=$bigdiv.find('img');
	var $simg=$smallimg.find('img');
	
	//初始化
	$bigimg.css('opacity',0).eq(0).css({
		opacity:1,
		zIndex:1
	});
	$simg.css('border','2px solid #fff').eq(0).css('border','2px solid #C40000');
	
	//移入小图变到对应的大图
	$smallimg.on('mouseenter','li',function(){
		var index=$(this).index();
		$bigimg.eq(index).css('z-index',1).stop().animate({opacity:1}).siblings('img').css({
			opacity:0,
			zIndex:0
		});
		$simg.css('border','2px solid #fff').eq(index).css('border','2px solid #C40000');
	});
	
	//放大镜
	var $cloneImg;
	var left;
	var top;
	var spanpos;
	var ratio;
	var $span=$('<span/>').addClass('spanhide');
	var $div=$('<div/>').addClass('divhide');
	var $hideshowimg=$('<div/>').addClass('hideshowimg');
	
	
	$bigdiv.on('mouseenter','img',function(e){
		
		//大图变化的倍率
		var smallwidth=$bigdiv.find('img').eq(0).outerWidth();
		ratio=3;
		
		//鼠标移入时生成html结构
		$cloneImg=$(this).clone().css('width',smallwidth*ratio).appendTo($div);
		$hideshowimg.append($div).insertAfter($bigdiv);
		
		//span的初始位置
		spanpos={
			left:e.pageX-$bigdiv.offset().left-$span.outerWidth()/2,
			top:e.pageY-$bigdiv.offset().top-$span.outerHeight()/2
		}
		
		$span.css({
			left:spanpos.left,
			top:spanpos.top
		}).appendTo($bigdiv);
		
	})
	
	.on('mouseleave',function(){
		//鼠标移开时移除html结构
		$hideshowimg.remove();
		$span.remove();
	})
	
	.on('mousemove',function(e){
		//移动过程中span的位置
		spanpos={
			left:e.pageX-$bigdiv.offset().left-$span.outerWidth()/2,
			top:e.pageY-$bigdiv.offset().top-$span.outerHeight()/2
		}
		
		//边界条件
		var pos={
			x:$bigdiv.outerWidth()-$span.outerWidth(),
			y:$bigdiv.outerHeight()-$span.outerHeight()
		}
		
		//判断是否到达边界
		if(spanpos.left<=0){
			spanpos.left=0;
		}else if(spanpos.left>=pos.x){
			spanpos.left=pos.x;
		}
		
		if(spanpos.top<=0){
			spanpos.top=0;
		}else if(spanpos.top>=pos.y){
			spanpos.top=pos.y;
		}
		
		//鼠标移动时span运动
		$span.css({
			left:spanpos.left,
			top:spanpos.top
		});
		
		//大图移动时的位置
		var $bigmoveimg=$div.find('img');
		var bigimgpos={
			left:spanpos.left*ratio,
			top:spanpos.top*ratio
		}
		
		//大图到达边界的条件
		if(bigimgpos.left>=$bigmoveimg.outerWidth()-$div.outerWidth()){
			bigimgpos.left=$bigmoveimg.outerWidth()-$div.outerWidth();
		}
		if(bigimgpos.top>=$bigmoveimg.outerHeight()-$div.outerHeight()){
			bigimgpos.top=$bigmoveimg.outerHeight()-$div.outerHeight();
		}
		
		$bigmoveimg.css({
			left:-bigimgpos.left,
			top:-bigimgpos.top
		});
	});
});
