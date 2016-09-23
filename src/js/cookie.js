function cookie(attr){
	var message=getCookie(attr);

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