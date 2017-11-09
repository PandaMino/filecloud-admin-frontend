<?php
header("content-type:text/html; charset=utf-8");
$username = $_GET['username'];
//---php加载json文件
$jsonStr = file_get_contents('users.json');
$data = json_decode($jsonStr,true);// 把JSON字符串转成PHP数组
foreach($data as $k=>$v){
    if($v['name']===$username){
        echo json_encode($v);
    }
}



?>