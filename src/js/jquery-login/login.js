(function($){	
	$.fn.login=function(){
		this.each(function(){
			var $self=$(this);

			var $loginbtn;

			init($self);
		});
		
		function init(self){
			var $title=$('<div/>').addClass('login_title').html('扫码登录，防止盗号');
			var $tips=$('<div/>').addClass('login_tips').html('<p>密码登录在这里</p>').css('right',58);;
			var $point=$('<div/>').addClass('point');
			var $pointHide=$('<div/>').addClass('point_hide');
			$tips.append([$point,$pointHide]);
			
			var $icon=$('<div/>').addClass('icon').on('click',function(){
				self.html('');
				reinit(self);
			});
			
			var $logincode=$('<div/>').addClass('login_code');
			var $code=$('<div/>').addClass('code').appendTo($logincode);
			var $code_img=$('<img/>').attr('src','../img/login_code.png').appendTo($code);
			
			var $richscan=$('<div/>').addClass('richscan').html('<p>打开<a href="#">手机天猫</a>|<a href="#">手机淘宝</a></p><p>扫一扫登录</p>');
			
			$loginbtn=$('<p/>').addClass('login_btn').html('<a href="#">密码登录</a><a href="#">免费注册</a>');
			
			$loginbtn.find('a').eq(0).on('click',function(){
				$('.login_box').html('').load('../html/login_2.html');
			});
			
			self.append([$title,$tips,$icon,$logincode,$richscan,$loginbtn]);
		}
		
		function reinit(self){
			var $title=$('<div/>').addClass('login_title').html('密码登录');
			var $tips=$('<div/>').addClass('login_tips').html('<p>扫码登录更安全</p>').css('right',66);
			var $point=$('<div/>').addClass('point');
			var $pointHide=$('<div/>').addClass('point_hide');
			$tips.append([$point,$pointHide]);
			
			var $icon=$('<div/>').addClass('icon icon2').on('click',function(){
				self.html('');
				init(self);
			});

			var $window=$('<form/>').addClass('login_window');
			var $p1=$('<p/>');
			var $label1=$('<label/>').attr('for','username');
			var $username=$('<input type="text"/>').attr('id','username');
			var $span=$('<span/>').html('手机号/会员名/邮箱');
			$p1.append([$label1,$username,$span]);

			var $p2=$('<p/>');
			var $label2=$('<label/>').attr('for','password');
			var $password=$('<input type="password"/>').attr('id','password');
			$p2.append([$label2,$password]);

			var $btn=$('<a/>').attr('href','list.html').addClass('loginbtn').html('登录');
			$btn.on('mouseenter',function(){
				$(this).css('background','#c40000');
			}).on('mouseleave',function(){
				$(this).css('background','#AF0000');
			});

			$window.append([$p1,$p2,$btn]);

			$window.on('mouseenter','input',function(){
				$(this).addClass('input');
			}).on('mouseleave','input',function(){
				$(this).removeClass('input');
			});
			
			var $a1=$('<a/>').html('忘记密码');
			var $a2=$('<a/>').html('免费注册');

			$loginbtn=$('<p/>').addClass('login_btn').append([$a1,$a2]);
		
			self.append([$title,$tips,$icon,$window,$loginbtn]);
			
			var message=getCookie('register');
	
			message=message.slice(1);
			message=message.slice(0,-1);
			
			var arr=message.split('},{');
			
			var arr1=[];
			var allarr=[];
			
			$.map(arr,function(item,index){
				arr1=item.split(',');
				var goods={};
				$.each(arr1, function(idx,item) {
					var arr2=[];
					arr2=item.split(':');
					
					arr2[0]=arr2[0].slice(1);
					arr2[0]=arr2[0].slice(0,-1);
					
					arr2[1]=arr2[1].slice(1);
					arr2[1]=arr2[1].slice(0,-1);
					
					goods[arr2[0]]=arr2[1];
				});
				allarr.push(goods);
			});
			
			var $tips=$('<p/>').addClass('tipsmessage').html('用户名或密码错误！请重新输入');
			
			$.map(allarr, function(item,index) {
				$('.loginbtn').on('click',function(){
					if(($username.val()==item.username || $username.val()==item.phone) && $password.val() ==item.password){
						$tips.remove();
						$(this).attr('href','list.html');
					}else {
						$tips.appendTo('.login_btn');
					}
				});
			});
			
			$username.on('focus',function(){
				$('.login_window').find('span').css('display','none');
			}).on('blur',function(){
				if($(this).val()==''){
					$('.login_window').find('span').css('display','block');
				}
			});
		}
	}
})(jQuery);


//获得cookie
function getCookie(key)
{
	var arr = document.cookie.split("; ");

	for (var i=0;i<arr.length;i++)
	{
		var arr1=arr[i].split('=');
		if (arr1[0]==key)
		{
			return decodeURI(arr1[1]);
		}
	}
	return '';
}