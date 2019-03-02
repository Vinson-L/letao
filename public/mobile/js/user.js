$(function() {
    // 1. 渲染个人中心的信息
    $.ajax({
        url: '/user/queryUserMessage',
        success: function(data) {
        		// 2. 判断数据是否成功 不成功就去登录
            if (data.error == 400) {
            	// 3. 跳转到登录页面 登录成功跳转回到当前页面
            	location = 'login.html?returnUrl='+location.href;
            } else {
                // 3. 绑定到页面元素里面  很简单没有逻辑性就直接绑定
                $('.username span').html(data.username);
                $('.mobile span').html(data.mobile);
            }
        }
    });

    // 2. 退出登录
    $('.btn-exit').on('tap',function () {
    		// 2. 调用退出登录APi退出即可
    		$.ajax({
    			url:'/user/logout',
    			success:function (data) {
    				console.log(data);
    				// 3. 判断如果退出成功就去登录
    				if(data.success){
    					// 4. 退出成功就跳转到登录页面
    					location = 'login.html?returnUrl='+location.href;
    				}
    			}
    		})
    });
});
