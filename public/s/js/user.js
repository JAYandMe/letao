$(function(){
    $.ajax({
        type: "get",
        url: "/user/queryUser",
        data: {
            page:1,
            pageSize:10
        },
        success: function (res) {
            console.log(res)
          var html = template("userBoxTpl",res);
          $("#userBox").html(html);
        }
    });

    $('body').on('click','.edit-btn',function(){
        var id = $(this).attr("data-id");
        var isDelete =$(this).attr("data-isdelete");
        // alert(isDelete);
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id:id,
                isDelete:isDelete ? 0 : 1
            },
            success: function (res) {
                if(res.success){
                    location.reload();
                }
            }
        });
    })
})