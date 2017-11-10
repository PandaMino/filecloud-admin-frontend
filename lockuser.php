<?php
header("content-type:text/html; charset=utf-8");
//---获取名字
$username=$_GET['name'];
$n = 0;
//---php加载json文件
$jsonStr = file_get_contents('users.json');
$data = json_decode($jsonStr,true);// 把JSON字符串转成PHP数组
foreach($data as $k=>&$v){
    if($v['name']===$username){
        if($v['juris']===1){
            $v['juris']=$n;
        }else{
            $v['juris']=1;
        }

    }
}
echo json_encode($data);
file_put_contents('users.json',json_encode($data));
$jsonStr2 = file_get_contents('users.json');












?>