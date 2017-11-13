function load() {
    $.getJSON('users.json',function (data) {
        console.log(data);
        $.each(data,function (index,element) {

                var newTr = $('<tr></tr>');
                //---定义用户组
                var newName = $('<td>'+element.name+'</td>');
                //---定义性别组
                var newSex = $('<td>'+element.sex+'</td>');
                //---定义年龄组
                var newAge = $('<td>'+element.age+'</td>');
                //---定义等级组
                var newLevel = $('<td>'+element.juris+'</td>');
                if(element.juris==1){
                    //---定义操作钮
                    var newEditor = $('<td class="dropdown"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown">操作<span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li class="dele"><a href="###">删除</a></li><li class="lock"><a href="###">锁定</a></li><li class="edit"><a href="###">修改密码</a></li></ul></td>');
                }else{
                    var newEditor = $('<td class="dropdown"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown">操作<span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li class="dele"><a href="###">删除</a></li><li class="lock"><a href="###">解锁</a></li><li class="edit"><a href="###">修改密码</a></li></ul></td>');
                }
                //---添加
                newTr.append(newName);
                newTr.append(newSex);
                newTr.append(newAge);
                newTr.append(newLevel);
                newTr.append(newEditor);
                $('#lists tbody:eq(0)').append(newTr);
        });
        //----分页
        LoadPages();
        //----设置锁定函数
        $('.lock').on('click',function () {
            var $this = $(this);
            Suo($this);
        });
        //----设置删除函数
        $('.dele').on('click',function () {
            var $this = $(this);
            Dele($this);
        });
    });
}
function Search() {
    $('#tb tbody').html('');
    var user = $('#username').val();
    //----定义查找标志位
    var flag = 0;
    //----获取json数据
    $.getJSON('users.json',function (data) {
        //---遍历查找相应数据
        $.each(data,function (index,element) {
            if(element['name']===user){
                //----执行该数据添加
                var newTr = $('<tr></tr>');
                    //---定义用户组
                    var newName = $('<td>'+element['name']+'</td>');
                    //---定义性别组
                    var newSex = $('<td>'+element['sex']+'</td>');
                    //---定义年龄组
                    var newAge = $('<td>'+element['age']+'</td>');
                    //---定义等级组
                    var newLevel = $('<td>'+element['juris']+'</td>');
                    if(element['juris']==1){
                        //---定义操作钮
                        var newEditor = $('<td class="dropdown"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown">操作<span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li class="dele"><a href="###">删除</a></li><li class="lock"><a href="###">锁定</a></li><li><a href="###">修改密码</a></li></ul></td>');
                    }else{
                        var newEditor = $('<td class="dropdown"><button class="btn btn-default dropdown-toggle" data-toggle="dropdown">操作<span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li class="dele"><a href="###">删除</a></li><li class="lock"><a href="###">解锁</a></li><li><a href="###">修改密码</a></li></ul></td>');
                    }
                    //---添加
                    newTr.append(newName);
                    newTr.append(newSex);
                    newTr.append(newAge);
                    newTr.append(newLevel);
                    newTr.append(newEditor);
                    console.log(newTr);
                    $('#tb tbody').append(newTr);
                    flag = 1;
            }
        });
        if(flag===0){
            alert('查无此人');
        }
        //----执行锁定函数
        $('#tb tbody .lock').on('click',function () {
            var $this = $(this);
            Suo($this);
        });
        //----执行删除函数
        $('#tb tbody .dele').on('click',function () {
            var $this = $(this);
            Dele($this);
        })
    });
    return false;

}
//----设定锁定函数
function Suo(ele1) {
    //---获取用户名
    var Btr = ele1.parent().parent().parent();
    var Dlevel = Btr.children()[3].innerHTML;
    if(Dlevel==0){
        ele1.children()[0].innerHTML = '锁定';
        Btr.children()[3].innerHTML = 1;
    }else{
        ele1.children()[0].innerHTML = '解锁';
        Btr.children()[3].innerHTML = 0;
    }
}
//----设定删除函数
function Dele(ele1) {
    //---让表格将该行数据删除
    //---获取这行
    var Tr = ele1.parent().parent().parent();
    Tr.remove();
    LoadPages();

}
function SearchUser(ele) {
    //----用于查询
    $(function () {
        var newTB = $('<table class="table" id="tb"><thead><tr><td>用户名</td><td>性别</td><td>年龄</td><td>等级</td><td>操作</td></tr></thead><tbody></tbody></table>');
        $(ele).append('<br>');
        $(ele).append('<br>');
        $(ele).append(newTB);
    });
}
//---分页
function LoadPages() {
    $('.page').html('');
    var $table = $('#lists .table');
    var currentPage = 0;//当前页默认值为0
    var pageSize = 4;//每一页显示的数目
    $table.bind('paging',function(){
        $table.find('tbody tr').hide().slice(currentPage*pageSize,(currentPage+1)*pageSize).show();//---总体隐藏，这一部分显示
    });
    var sumRows = $("#lists .table tbody").find("tr").length;
    console.log(sumRows);
    var sumPages = Math.ceil(sumRows/pageSize);//总页数
    console.log(sumPages);
    var $pager = $('<div class="page"></div>');  //新建div，放入a标签,显示底部分页码
    for(var pageIndex = 0 ; pageIndex<sumPages ; pageIndex++){
        $('<a href="#" id="pageStyle" onclick="changCss(this)"><span>'+(pageIndex+1)+'</span></a>').bind("click",{"newPage":pageIndex},function(event){
            currentPage = event.data["newPage"];
            $table.trigger("paging");
            //触发分页函数
        }).appendTo($pager);
    }
    $pager.insertAfter($table);
    $table.trigger("paging");

    //默认第一页的a标签效果
    var $pagess = $('#pageStyle');
    $pagess[0].style.backgroundColor="lightskyblue";
    $pagess[0].style.color="#ffffff";
}
//a链接点击变色，再点其他回复原色
function changCss(obj){
    // console.log(obj);
    var arr = document.getElementsByTagName("a");
    for(var i=0;i<arr.length;i++){
        if(obj===arr[i]){       //当前页样式
            obj.style.backgroundColor="lightskyblue";
            obj.style.color="#ffffff";
        }
        else
        {
            arr[i].style.color="";
            arr[i].style.backgroundColor="";
        }
    }
}
