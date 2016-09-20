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
});
