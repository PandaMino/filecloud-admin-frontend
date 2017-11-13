function changesCss() {
    $('#searchuser').click(function () {
        $('#suser').addClass("active");
        $('#auser').removeClass("active");
        $('#muser').removeClass("active");
    })
    $('#showuser').click(function () {
        $('#muser').addClass("active");
        $('#auser').removeClass("active");
        $('#suser').removeClass("active");
    })
    $('#addusers').click(function () {
        $('#auser').addClass("active");
        $('#suser').removeClass("active");
        $('#muser').removeClass("active");
    })

//另一组
    $('#suser').click(function () {
        //左边导航栏变化
        $('#auser').removeClass("active");
        $('#muser').removeClass("active");
        $('#suser').addClass("active");

        //导航头部变化
        $('#showuser').removeClass("active");
        $('#addusers').removeClass("active");
        $('#searchuser').addClass("active");

        //内容变化
        $('#lists').removeClass("active");
        $('#adds').removeClass("active");
        $('#search').addClass("active");

    })

    $('#muser').click(function () {
        //左边导航栏变化
        $('#auser').removeClass("active");
        $('#suser').removeClass("active");
        $('#muser').addClass("active");

        //导航头部变化
        $('#searchuser').removeClass("active");
        $('#addusers').removeClass("active");
        $('#showuser').addClass("active");

        //内容变化
        $('#search').removeClass("active");
        $('#adds').removeClass("active");
        $('#lists').addClass("active");

    })

    $('#auser').click(function () {
        //左边导航栏变化
        $('#muser').removeClass("active");
        $('#suser').removeClass("active");
        $('#auser').addClass("active");

        //导航头部变化
        $('#showuser').removeClass("active");
        $('#searchuser').removeClass("active");
        $('#addusers').addClass("active");

        //内容变化
        $('#search').removeClass("active");
        $('#lists').removeClass("active");
        $('#adds').addClass("active");

    })
}