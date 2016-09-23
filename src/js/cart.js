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

	//获取加入购物车的产品
	var good=getCookie('goodcart');
	good=good.slice(1);
	good=good.slice(0,-1);
	
	var arr=good.split('},{');
	
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

	//生成html结构
	var $message=$('.message');
	
	$.map(allarr, function(item,index) {
		console.log(item)
		init(item);
	});

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

	function init(item){
		//生成一个商品容器
		var $detailmessage=$('<div/>').addClass('detailmessage');
		//生成每个商品的复选框
		var $goodslist=$('<input/>').attr({
			name:"goodslist",
			type:"checkbox"
		});
		//生成存放复选框的p标签
		var $btnchecks=$('<p/>').addClass('btnchecks').append($goodslist);
		//生成商品图片
		var $goodimg=$('<div/>').addClass('goodimg');
		var $img=$('<img/>').attr('src',item.imgsrc).appendTo($goodimg);
		//生成商品详情介绍
		var $introgood=$('<a/>').addClass('introgood').html(item.title);
		//生成商品价格
		var $unitprice=$('<div/>').addClass('unitprice');
		var goodprice=parseFloat(item.price);
		goodprice=goodprice.toFixed(2);
		var $priceshow=$('<p/>').addClass('priceshow').html(goodprice);
		var $group=$('<p/>').addClass('group').html('团购价');
		$unitprice.append([$priceshow,$group]);
		//生成商品数量
		var $count=$('<div/>').addClass('count');
		var $add=$('<a/>').addClass('add').html('+');
		var $reduce=$('<a/>').addClass('reducenum').html('-');
		var $input2=$('<input/>').attr({
			type:'text',
			value:item.count
		});
		$count.append([$add,$reduce,$input2]);
		
		//生成合计价格
		var $total=$('<div/>').addClass('total');
		var goodcount=item.count;
		var money=goodprice*goodcount;
		money=money.toFixed(2);
		var $money=$('<p/>').addClass('money').html(money).appendTo($total);
		
		//生成删除按钮
		var $operation=$('<div/>').addClass('operation');
		var $delete=$('<a/>').addClass('delete').html('删除').appendTo($operation);
		
		$detailmessage.append([$btnchecks,$goodimg,$introgood,$unitprice,$count,$total,$operation]).prependTo($message);
		
		//删除按钮,只有当复选框选中状态时删除按钮才可以使用
		$delete.on('click',function(){
			var $this_parent=$(this).parents('.detailmessage');
			var reldelete=$this_parent.find(':checked').length;
			if(reldelete){
				$this_parent.remove();
				//复选框选中状态
				var $relchecked=$message.find(':checked');
				var $relallcheckbox=$message.find(':checkbox');
				var relparent=$relchecked.parents('.detailmessage');
				
				//判断删除之后的全选按钮是否需要勾上
				if($relallcheckbox.length!=0){
					$all.prop('checked',$relchecked.length==$relallcheckbox.length);
				}else{
					$all.prop('checked',false);
					$all.attr('disabled',true);
				}
				
				
				//商品总计
				moneyall=ischeckbox(relparent);
				moneyall=moneyall.toFixed(2);
				$('.allmoney').find('span').html(moneyall);
			}
		});
	}
	
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

	function money(ele){
		//单价
		var oneprice=ele.find('.priceshow').html();
		//合计价格
		var total=value*oneprice;
		total=total.toFixed(2);
		ele.find('.money').html(total);
	}
	
	function ifallchecked(){
		var alllength=$message.find(':checkbox').length;
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
