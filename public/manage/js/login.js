$(function() {
    /*1. 后台的登录功能
    	1. 获取用户输入用户和密码进行非空验证
    		2. 调用API传入用户名和密码登录
    		3. 如果成功就跳到首页
    		4. 如果失败就提示用户失败的原因*/
    // 1. 给登录按钮添加事件
    $('.btn-login').on('click', function() {
        // 使用开关思想
        var check = true;
        // 2. 获取用户输入的手机号 用户名 密码 确认密码 验证码等信息
        // 获取了所有input遍历
        $(".form-horizontal input").each(function() {
            //若当前input为空，则alert提醒 
            // 获取每个input的value值 并且去空格 如果为空
            if (!this.value || this.value.trim() == "") {
                // 获取Input的父元素的上一个兄弟 label注意input上面需要有lable标签
                var label = this.parentNode.previousElementSibling;
                // 调用mui弹框提示用户输入
                alert(label.innerText + "不允许为空");
                // 把开关设置了关闭
                check = false;
                // 退出并阻止默认
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
        if (check) {
            // 2. 获取用户名密码
            var username = $('.username').val();
            var password = $('.password').val();
            // 3. 调用API实现登录功能
            $.ajax({
            	url:'/employee/employeeLogin',
            	type:'post',
            	data:{username:username,password:password},
            	success:function (data) {
            		// 4. 判断如果返回有错误提示用错误的原因
            		if(data.error){
            			alert(data.message);
            		}else{
            			// 5. 登录成功就跳转到后台的首页
            			location = 'index.html';
            		}
            	}
            });
        }
    });
});
