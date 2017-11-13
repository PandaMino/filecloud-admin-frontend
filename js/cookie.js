//封装函数
//username=666 expires=xxx pwd=666;
function setCookie(key,value,time){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+time);
	document.cookie = key+'='+encodeURI(value)+';expires='+oDate.toGMTString();
}
//获取cookie
function getCookie(key){
	var arr1 = document.cookie.split(';');
	for(var i=0;i<arr1.length;i++){
		var arr2 = arr1[i].split('=');
		if(arr2[0]==key){
			return decodeURI(arr2[1]);
		}
	}
}
//删除cookie
function removeCookie(key){
	setCookie(key,'',-1);
}
$('#name').text(getCookie('username'));
$('#logout').on('click',function(){
	removeCookie('username');
	window.location = 'index.html';
});
