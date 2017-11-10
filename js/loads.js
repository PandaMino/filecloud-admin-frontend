function load(URL,ele) {
    $.ajax({
        type:'get',
        dataType:'json',
        data:{

        },
        url:URL,
        success:function (data) {
            //--清空表格
            $(ele).html('');
            $.each(data,function (index,element) {
                //---定义新的一行
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
                $(ele).append(newTr);
            });
            LoadPages();
//               //----设置删除函数
            $('.dele').on('click',function () {
                var $this = $(this);
                Dele('deleuser.php','showusers.php',$this,ele);
            });
            //-----设置锁定函数
            $('.lock').on('click',function () {
                var $this = $(this);
                Suo('lockuser.php','showusers.php',$this,ele);
            });
            //-------设置修改密码函数
            $('.edit').on('click',function () {
                var $this = $(this);
                Edit('editpwd.php',$this);
            })
        },
        error:function () {
            console.log(0);
        }
    })
}
function Search() {
    $('#tb tbody').html('');
    var user = $('#username').val();
    $.ajax({
        type:'get',
        dataType:'json',
        url:'searchuser.php',
        data:{
            username:user
        },
        success:function (data) {
            //添加
            var newTr = $('<tr></tr>');
            //---定义用户组
            var newName = $('<td>'+data.name+'</td>');
            //---定义性别组
            var newSex = $('<td>'+data.sex+'</td>');
            //---定义年龄组
            var newAge = $('<td>'+data.age+'</td>');
            //---定义等级组
            var newLevel = $('<td>'+data.juris+'</td>');
            if(data.juris==1){
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
            //----设置删除函数
            $('.dele').on('click',function () {
                //---获取用户名
                var Btr = $(this).parent().parent().parent();
                var Dname = Btr.children()[0].innerHTML;
                console.log(Dname);
                $.ajax({
                    type:'get',
                    dataType:'json',
                    data:{
                        name:Dname
                    },
                    url:'deleuser.php',
                    success:function (data) {
                        console.log(data);
                        Search();
                    },
                    error:function () {
                        console.log(0);
                    }
                })
            });
            //-----设置锁定函数
            $('.lock').on('click',function () {
                //---获取用户名
                var Btr = $(this).parent().parent().parent();
                var Dname = Btr.children()[0].innerHTML;
                $.ajax({
                    type:'get',
                    dataType:'json',
                    data:{
                        name:Dname
                    },
                    url:'lockuser.php',
                    success:function (data) {
                        console.log(1);
                        Search();

                    },
                    error:function () {
                        console.log(0);
                    }
                })
            });
            //-------设置修改密码函数
            $('.edit').on('click',function () {
                //---获取用户名
                var Btr = $(this).parent().parent().parent();
                var Dname = Btr.children()[0].innerHTML;
                console.log(Dname);
                $.ajax({
                    type:'get',
                    dataType:'json',
                    data:{
                        name:Dname
                    },
                    url:'editpwd.php',
                    success:function (data) {
                        console.log(data);
                    },
                    error:function () {
                        console.log(0);
                    }
                })
            })
        },
        error:function (data) {
            alert('查无此人');
        }
    });
    return false;
}
//----设定锁定函数
function Suo(URL1,URL2,ele1,ele2) {
    //---获取用户名
    var Btr = ele1.parent().parent().parent();
    var Dname = Btr.children()[0].innerHTML;
    $.ajax({
        type:'get',
        dataType:'json',
        data:{
            name:Dname
        },
        url:URL1,
        success:function (data) {
            console.log(111);
            load(URL2,ele2);
        },
        error:function () {
            console.log(0);
        }
    })
}
//----设定删除函数
function Dele(URL1,URL2,ele1,ele2) {
    //---获取用户名
    var Btr = ele1.parent().parent().parent();
    var Dname = Btr.children()[0].innerHTML;
    console.log(Dname);
    $.ajax({
        type:'get',
        dataType:'json',
        data:{
            name:Dname
        },
        url:URL1,
        success:function (data) {
            load(URL2,ele2);
        },
        error:function () {
            console.log(0);
        }
    })
}
//----设定修改密码函数
function Edit(URL,ele) {
    //---获取用户名
    var Btr = ele.parent().parent().parent();
    var Dname = Btr.children()[0].innerHTML;
    console.log(Dname);
    $.ajax({
        type:'get',
        dataType:'json',
        data:{
            name:Dname
        },
        url:URL,
        success:function (data) {
            console.log(data);
        },
        error:function () {
            console.log(0);
        }
    })
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
