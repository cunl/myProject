jQuery(function($){
	
	//我的淘宝,收藏夹
	var $list=$('.nav_div .list');
	$list.on('mouseenter','li',function(){
		var $div=$(this).find('div').eq(0);
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
	
	//注册验证
	var req=/^''$/;
	var index;
	var $parent;
	var value;
	
	var $input=$('.input');
	$input.on('focus','input',function(){
		$parent=$(this).closest('.input');
		index=$parent.index();
		
		//当输入框中的内容还没有改变时，但已经有光标的时候，让黄色提示框隐藏
		if($(this).val()==''){
			$parent.find('.hidediv2').css({
				opacity:0,
				left:332
			});
			$parent.find('.hidediv').stop().animate({
				opacity:1,
				left:350
			});
		}

		//对应文字光标聚焦时运动
		if(index==3){
			$(this).next().stop().animate({
				left:-90
			});
		}else if(index==4 || index==5){
			$(this).next().stop().animate({
				left:-78
			});
		}else {
			$(this).next().stop().animate({
				left:-62
			});
		}

	}).on('blur','input',function(){
		$parent=$(this).closest('.input');
		index=$parent.index();
		

		//当光标移开时，如果移开的当前输入框内容为空则显示黄色提示框
		if(index!=2){
			if($(this).val()==''){
				$parent.find('.hidediv').css({
					opacity:0,
					left:332
				});
				$parent.find('.hidediv2').stop().animate({
					opacity:1,
					left:350
				});
			}
		}
	});
	
	var username;
	var phone;
	var password;
	//用户名
	var $username=$('#username');
	$username.on('input',function(){
		//字母或下划线开头 ,中文英文下划线数字
		req=/^[a-zA-Z_][\w\u4e00-\u9fa5]{3,19}$/;
		username=register($(this),req);
	});
	
	//手机号码
	var $phone=$('#phone');
	$phone.on('input',function(){
		//手机号码
		req=/^1[34578]\d{9}$/;
		phone=register($(this),req);
	});
	
	//输入密码
	var $password=$('#password');
	$password.on('input',function(){
		//输入密码
		req=/^[a-zA-Z0-9_]{6,20}$/;
		password=register($(this),req);
	});

	//确认密码
	var repassword;
	$('#resetpassword').on('input',function(){
		var $thishide=$(this).closest('.input').find('.hidediv');
		var $thishide2=$(this).closest('.input').find('.hidediv2');
		if($password.val()==$(this).val()){
			$thishide.css({
				opacity:0,
				left:332
			});
			$thishide2.css({
				opacity:0,
				left:332
			});
			repassword=true;
		}else{
			$thishide.css({
				opacity:1,
				left:350
			});
		}
	});
	
	//提交注册
	$('#agree').on('click',function(){
		var $allinput=$input.find('input');
		var i=getindex($allinput);
		if(i==-1 && username==true && password==true && phone==true && repassword==true){
			$('#submit').attr('href','../html/login.html');
			$input.find('input').each(function(index,ele){
				$(ele).val('');
			});
		}
	});

	//验证表单的函数
	function register(ele,req){
		value=req.test(ele.val());
		var $thishide=ele.closest('.input').find('.hidediv');
		var $thishide2=ele.closest('.input').find('.hidediv2');

		if(value){
			$thishide.css({
				opacity:0,
				left:332
			});
			
			return true;
		}else{
			$thishide.stop().animate({
				opacity:1,
				left:350
			});
			$thishide2.stop().animate({
				opacity:0,
				left:332
			});
		}
	}
	
	function getindex(eles){
		var flag=true;
		eles.each(function(index,ele){
			if($(ele).val()==''){
				flag=false;
			}
		});
		
		if(flag){
			return -1;
		}
	}
});
