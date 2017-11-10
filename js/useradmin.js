$(function () {
    load('showusers.php','#lists tbody:eq(0)');
    SearchUser('#search');
    changesCss();
});

