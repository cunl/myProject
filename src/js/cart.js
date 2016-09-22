jQuery(function($){
	var $baby=$('.baby');
	var $babya=$('.babya');
	$babya.on('mouseenter',function(){
		$baby.css('display','block');
		$(this).addClass('baby2');
	}).on('mouseleave',function(){
		$baby.css('display','none');
		$(this).removeClass('baby2');
	});
	
	$baby.on('mouseenter',function(){
		$(this).css('display','block');
		$babya.addClass('baby2');
	}).on('mouseleave',function(){
		$(this).css('display','none');
		$babya.removeClass('baby2');
	});

	var $message=$('.message');
	var $detail=$('.detailmessage');
	var goodmoney=0;
	var moneyall=0;
	var value;

	var $input;
	$detail.each(function(index,ele){
		//加按钮
		$(ele).find('.add').on('click',function(){
			btncheck($(ele),true);
			//点击加按钮的时候如果复选框是选中状态的话，商品总价就变化
			checkmoney($(this),true);
		});
		
		//减按钮
		$(ele).find('.reducenum').on('click',function(){
			btncheck($(ele),false);
			//点击减按钮的时候如果复选框是选中状态的话，商品总价就变化
			checkmoney($(this),true);
		});
		
	
		//复选框选中状态
		var $checkparent=$(ele).find(':checked').parents('.detailmessage');
		moneyall=ischeckbox($checkparent);
		
	});
	
	//商品总计
	moneyall=moneyall.toFixed(2);
	$('.allmoney').find('span').html(moneyall);
	
	//加减按钮的移出事件
	$('.count').on('mouseleave','a',function(){
		$(this).css({
			'text-decoration':'none',
			'color':'#333'
		});
	});
	
	
	//除了全选的那些按钮
	var $checkbox=$message.find(':checkbox');

	//全选按钮
	var $all=$('#all');
	
	//全选功能
	$all.on('click',function(){
		var ifchecked=$(this).prop('checked');
		$checkbox.prop('checked',ifchecked);
		
		//全选按钮选中的时候商品总价和合计的变化情况
		checkmoney($(this),false);
		
	});
	
	$message.on('click',':checkbox',function(){
		ifallchecked();
		
		//点击复选框时商品总计的变化情况和合计的变化情况
		checkmoney($(this));
	});
	
	
	//删除按钮
	$('.delete').on('click',function(){
		var $this_parent=$(this).parents('.detailmessage');
		var reldelete=$this_parent.find(':checked').length;
		if(reldelete){
			$this_parent.remove();
		}
	});

	//------
	function money(ele){
		//单价
		var oneprice=ele.find('.priceshow').html();
		//合计价格
		var total=value*oneprice;
		total=total.toFixed(2);
		ele.find('.money').html(total);
	}
	
	function ifallchecked(){
		var alllength=$checkbox.length;
		var checklength=$message.find(':checked').length;
		$all.prop('checked',alllength==checklength);
	}
	
	
	function ischeckbox($checkparent){
		var allmoney=0;
		$checkparent.each(function(idx,elem){
			$input=$(elem).find('.count').find('input');
			
			var value=parseFloat($input.val());
			var oneprice=parseFloat($(elem).find('.priceshow').html());
			
			var total=value*oneprice;
			total=parseFloat(total);
			
			allmoney=allmoney+total;
		});
		return allmoney;
	}
	
	function checkmoney(ele,bool){
		if(bool){
			var $thisparent=ele.parents('.message').find('.detailmessage').find(':checked').parents('.detailmessage');
		}else {
			var $thisparent=ele.parents('.cart').find('.message').find('.detailmessage').find(':checked').parents('.detailmessage');
		}

		var money_all=ischeckbox($thisparent);
			
		//商品总计
		money_all=money_all.toFixed(2);
		$('.allmoney').find('span').html(money_all);
	}
	
	//点击加减按钮时，如果复选框是选中状态的话，商品总价就变化
	function btncheck(ele,bool){
		var speed=0;
		if(bool){
			speed=1;
		}else {
			speed=-1;
		}
		
		$input=ele.find('.count').find('input');
		
		
		//当数量已经是1时，如果点击的是减少的按钮则不变，数量仍然是1
		if($input.val()==1 && bool==false){
			value=1;
		}else {
			value=parseInt($input.val())+speed;
		}
		
		$input.val(value);
		
		money(ele);
	}
});
