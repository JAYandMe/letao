$(function(){
    var id = getParamsByUrl(location.href,"id") || 1;
    var productId = 0;
    var num = 1;
    var rest = 0;
    var size = -1;
    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id:id
        },
        success: function (res) {
            console.log(res);
            rest = res.num; 
            $("#detailBox").html(template("detailTpl",{data:res}));
            var gallery = mui('.mui-slider');

            gallery.slider();
        }
    });

    $("body").on('tap','.detail-size span',function(){
        $(this).addClass("active").siblings().removeClass("active");
        size = $(this).html();
    });
    $('body').on('tap','.plus',function(){
       num++;
        if(num > rest){
            num = rest;
        }
        $(".num").val(num)
    })
    $('body').on('tap','.reduce',function(){
        num--;
        if(num < 1){
            num = 1;
        }
        $(".num").val(num);
    });
    $("#addCart").on('tap',function(){
        if(size == -1){
            alert('请输入尺码');
            return;
        }
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId:productId,
                num:num,
                size:size
            },
            success: function (result) {
                if(result.error && result.error == 400){
                    localStorage.returnUrl = location.href;
                    location.href = "login.html"
                }
                else if(result.success){
                    mui.confirm('添加成功，去购物车看看？','温馨提示',['确定','取消'],function(message){
                        if(message.index == 0){
                            location.href = "cart.html";
                        }
                    })
                }
            }
        });
    })
})