$(function() {
   var letao = new Letao();
   letao.register();
   letao.getvCode();
})

var Letao = function() {

}

Letao.prototype = {
    // 注册函数
    register: function() {
        var that = this;
        /*1. 实现用户注册功能
            1. 获取用户输入的手机号 用户名 密码 确认密码 验证码等信息
            2. 验证表单是否输入 
            3. 如果没有输入要提示用户输入
            4. 验证手机号是否合法
            5. 验证2次密码是否一致
            6. 验证是否一致
            7. 调用注册APi接口实现注册*/
        // 1. 给注册按钮添加一个点击事件
        $('.btn-register-confirm').on('tap', function() {
            // 使用开关思想
            var check = true;
            // 2. 获取用户输入的手机号 用户名 密码 确认密码 验证码等信息
            // 获取了所有input遍历
            mui(".mui-input-group input").each(function() {
                //若当前input为空，则alert提醒 
                // 获取每个input的value值 并且去空格 如果为空
                if (!this.value || this.value.trim() == "") {
                    // 获取Input旁边的上一个兄弟 label注意input上面需要有lable标签
                    var label = this.previousElementSibling;
                    // 调用mui弹框提示用户输入
                    mui.alert(label.innerText + "不允许为空");
                    // 把开关设置了关闭
                    check = false;
                    // 退出并阻止默认
                    return false;
                }
            }); //校验通过，继续执行业务逻辑 
            if (check) {
                var username = $('.username').val();
                var mobile = $('.mobile').val();
                // 3. 验证手机号是否合法
                if (!(/^1[345789]\d{9}$/.test(mobile))) {
                    mui.alert('您输入的手机号不合法！');
                    return false;
                }
                // 4. 判断密码是否一致
                var password1 = $('.password1').val();
                var password2 = $('.password2').val();
                if (password1 != password2) {
                    mui.alert('两次输入的密码不一致！');
                    return false;
                }
                // 5. 判断验证码是否获取
                if (!that.vCode) {
                    mui.alert('请获取验证码');
                    return false;
                }
                // 6. 获取当前输入的验证码和获取的验证码是否一致
                var nowvCode = $('.input-vcode').val();
                if (that.vCode != nowvCode) {
                    mui.alert('请输入正确的验证码');
                    return false;
                }
                // 7. 调用注册APi接口实现注册
                $.ajax({
                    url: '/user/register',
                    type: 'post',
                    data: { username: username, password: password1, mobile: mobile, vCode: that.vCode },
                    success: function(data) {
                        // 8. 判断如果注册失败 提示用户失败的原因
                        if (data.error == 403) {
                            // 把错误的信息通过toast提示用户错误的原因
                            mui.toast(data.message);
                        } else {
                            // 表示注册成功 返回到登录页面去登录 而且传递了一个参数  登录成功后要跳转到的页面是首页
                            location = 'login.html?returnUrl=index.html';
                        }
                    }
                })
            }
        });
    },
    //获取验证码的函数
    getvCode: function() {
        var that = this;
        /*2. 获取验证码
            1. 点击了获取验证码按钮需要获取验证码
            2. 调用APi去获取验证码 /user/vCode
            3. 把验证码打印控制台*/
        // 1. 点击了获取验证码按钮需要获取验证码
        $('.btn-get-vcode').on('tap', function() {
            // 2. 调用APi去获取验证码 /user/vCode
            $.ajax({
                url: '/user/vCode',
                success: function(data) {
                    // 3. 把验证码打印控制台
                    console.log(data.vCode);
                    // 4. 因为验证码注册也需要拿到把验证码作为全局变量让别的函数也能访问
                    that.vCode = data.vCode;
                }
            });
        });
    }
}

// var obj = {

// }
// obj.name = '张三';
// obj.fun1 = function () {
//     console.log(this.name);
//     this.name = '李四'
// }
// obj.fun2 = function () {
//     console.log(this.name);    
// }
// obj.fun1();
// obj.fun2();

