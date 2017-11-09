$('#Mclick').on('click',function(){
	var result = "";
    var arr = [];
    for(var i=0;i<26;i++){
    	arr.push(String.fromCharCode(65+i));
    }
    for(var i=0;i<26;i++){
    	arr.push(String.fromCharCode(97+i));
    }
    for(var i=0;i<10;i++){
    	arr.push(String.fromCharCode(48+i));
    }
    for(var i = 0;i<4;i++){
        var ranNum = Math.floor(Math.random()*62);
        result+=arr[ranNum];
    }
    document.getElementById("Mconfirm").innerHTML = result;
});
$("#Msub").on("click",function () {
    var ck = document.getElementById("ck");
    var Mconfirm = document.getElementById("Mconfirm");
    var content = Mconfirm.innerHTML;
    if(ck.value.toUpperCase()==content.toUpperCase()){
        alert("验证码输入正确！");
        Musername=$("#username").val();
        Mpassword=$("#pwd").val();
        $.ajax({
            url:"Mpassword.json",
            type:"get",
            dataType:"json",
            success:function (data) {
            	for(var i=0;i<data.length;i++){
            		console.log(Musername);
            		console.log(data[i].Musername);
            		if(Musername==data[i].Musername){
            			if(Mpassword==data[i].Mpassword){
            				alert('登录成功！');
            				i++;
            				window.location = 'back_content';
            			}else{
            				alert('密码不正确，请重新输入！');
            				$("#pwd").val('');
            				return 0;
            			}
            		}
            	}
            	console.log(i);
    			if(i==2){
    				alert('账号不存在，请重新输入！');
	    			$("#pwd").val('');
	    			$("#username").val('');
    			}
            }
        })
    }else {
        alert("验证码为空或者输入不正确。。。");
        ck.value = "";
    }
});