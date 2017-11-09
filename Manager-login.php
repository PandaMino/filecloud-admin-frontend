<?php
header("content-type:text/html;charset=utf-8");
$filename="Mpassword.json";
//---加载文件
$js=file_get_contents($filename);
//---转数组
$js=json_decode($js);
//---定义获得的值
$MUN=$_GET["Musername"];
$MPWD=$_GET["Mpassword"];

$flag=0;//-----表示失败
//-----判断是否存在数组中
for($i=0;$i<count($js);$i++){
    if($js[$i]->Musername==$MUN && $js[$i]->Mpassword==$MPWD ){
        $flag=1;
    }
 }
 echo $flag;
?>