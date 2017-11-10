<?php
header("content-type:text/html; charset=utf-8");
//---获取名字
$username=$_GET['name'];
//---php加载json文件
$jsonStr = file_get_contents('users.json');
$data = json_decode($jsonStr,true);// 把JSON字符串转成PHP数组
//----定义一个结果数组
$res=array();
foreach($data as $k=>$v){
    if($v['name']===$username){


    }else{
        array_push($res,$v);
    }
}
echo json_encode($res);
file_put_contents('users.json',json_encode($res));
$jsonStr2 = file_get_contents('users.json');












?>