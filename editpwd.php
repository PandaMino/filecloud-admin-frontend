<?php
header("content-type:text/html; charset=utf-8");
//---获取名字
$username=$_GET['name'];

$pwd=111111;
//---php加载json文件
$jsonStr = file_get_contents('users.json');
$data = json_decode($jsonStr,true);// 把JSON字符串转成PHP数组
foreach($data as $k=>&$v){
    if($v['name']===$username){
        $v['pwd']=$pwd;

    }
}
echo $res;
file_put_contents('users.json',json_encode($data));
$jsonStr2 = file_get_contents('users.json');
echo json_encode($data);






?>