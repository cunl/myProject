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
	
	//初始化
	$bigimg.css('opacity',0).eq(0).css('opacity',1);
	
	//移入小图变到对应的大图
	$smallimg.on('mouseenter','li',function(){
		var index=$(this).index();
		$bigimg.eq(index).stop().animate({opacity:1}).siblings('img').css('opacity',0);
	});
	
	//放大镜
	$bigdiv.on('mouseenter','img',function(){
		$(this)
	})
});
