jQuery(function($){
	var timer1=setInterval(function(){
		$('.domove').animate({
			top:390
		},2000).animate({
			top:420
		},2000);
	},100);
	
	var i=0;
	var num=0;
	var t=3000;
	var $img=$('.bigimg');
	var $phone=$('.phone');
	var $imgsmall=$phone.find('img');
	$imgsmall.css('left',270).eq(0).css('left',0);
	
	var timer2=setInterval(picmove,t);
	var timer3=setInterval(domove2,2000);
	
	$('.banner').on('mouseenter',function(){
		clearInterval(timer2);
	}).on('mouseleave',function(){
		timer2=setInterval(picmove,t);
	});
	
	var $btn=$('.btn');
	$btn.on('click','.prev',function(){
		picmove();
	});
	$btn.on('click','.next',function(){
		next();
	});
	
	function picmove(){
		if(i==$img.length-1){
			i=0;
		}else {
			i++;
		}

		$img.eq(i-1).stop().animate({
			left:-1263
		});
		$img.eq(i).css('left',1263).stop().animate({
			left:0
		},function(){
			$img.eq(i-1).css('left',1263);
		});
	}
	
	function next(){
		if(i==$img.length-1){
			i=0;
		}else {
			i++;
		}
		
		$img.eq(i-1).stop().animate({
			left:1263
		});
		$img.eq(i).css('left',-1263).stop().animate({
			left:0
		},function(){
			$img.eq(i-1).css('left',-1263);
		});
	}
	
	function domove2(){
		if(num==$imgsmall.length-1){
			num=0;
		}else {
			num++;
		}
		
		$imgsmall.eq(num-1).stop().animate({
			left:-255
		});
		$imgsmall.eq(num).stop().animate({
			left:0
		},function(){
			$imgsmall.eq(num-1).css('left',270);
		});
	}
});