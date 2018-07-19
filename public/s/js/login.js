$.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    success: function (res) {
        if(res.success){
            location.href = "user.html";
        }
    }
});
$(function(){
    $("#login-button").on('click',function(){
        var data = {
           username : $.trim($('#username').val()),
           password : $.trim($('#password').val()),
        }
        if(!data.username){
            alert('请输入用户名');
            return;
        }
        if(!data.password){
            alert('请输入密码');
            return;
        }

        $.ajax({
            type: "post",
            url: "/employee/employeeLogin",
            data:data,
            success: function (res) {
               if(res.success){
                   location.href = "user.html";
               }else{
                   if(res.error){
                       alert(res.message);
                   }

               }
            }
        });
    })
})