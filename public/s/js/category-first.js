$(function(){
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    getData();

    $("#next").on("click",function(){
        page++;
        if(page > totalPage){
            page = totalPage;
            alert("已经是最后一页");
            return;
        }
        getData();
    });
    $("#prev").on("click",function(){
        page--;
        if(page < 1){
            page = 1;
            alert("已经是第一页");
            return;
        }
        getData();
    })

    function getData(){
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page : page,
                pageSize : pageSize
            },
            success: function (res) {
                totalPage = Math.ceil(res.total / pageSize);
                var html = template("category-first",res);
                $("#categoryBox").html(html);
            }
        });
    }

    $("#save").on("click",function(){
        var categoryFirstName = $.trim($("[name='categoryFirstName']").val());
        if(!categoryFirstName){
            alert("请输入一级分类名称");
            return;
        }
        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: {
                categoryName : categoryFirstName
            },
            success: function (res) {
                if(res.success){
                    location.reload();
                }
            }
        });
    })
})