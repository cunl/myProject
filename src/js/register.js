jQuery(function($){
	$('.header').load('header.html');
	
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
	
	
	var arr=['4-20位字符,可由中文、英文、数字或符号“_”组成','请填写正确的手机号码，以便接收订单通知，找回密码',,'6-20个大小写英文字母、符号或数字的组合','请再次输入密码'];
	var arrblur=['用户名不能为空','格式错误，请输入正确的手机号码',,'密码不能为空',,];
	
	var $input=$('.input');
	$input.find('input').on('focus',function(){
		var index=$(this).closest('div').index();
		
		if(index==3){
			$(this).next().animate({
				left:-90
			});
		}else if(index==4 || index==5){
			$(this).next().animate({
				left:-78
			});
		}else {
			$(this).next().animate({
				left:-62
			});
		}
		
		if(index!=3){
			var $hidediv=$('<div/>').addClass('hidediv').html(arr[index-1]);
			var $hideicon=$('<div/>').addClass('hideicon').appendTo($hidediv);
			$hidediv.appendTo($(this).closest('div'));
		}
	}).on('blur',function(){
		var index=$(this).closest('div').index();
		
		$('.hidediv').remove();
		
		if(index!=3){
			var $hidediv1=$('<div/>').addClass('hidediv2').html(arr1[index-1]);
			var $hideicon1=$('<div/>').addClass('hideicon2').appendTo($hidediv);
			$hidediv1.appendTo($(this).closest('div'));
		}
	});;
});
