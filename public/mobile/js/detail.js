$(function() {
    var letao = new Letao();
    letao.queryProductDetail();
    letao.addCart();
    // console.log(letao.page);
    // console.log(letao.pageSize);
    // console.log(letao.id);
});
// 1. 创建一个构造函数
var Letao = function() {

}

Letao.prototype = {
    // 后面修改之前可能就要直接用就需要定义在原型里面（或者这个是不改的值 ）
    // page:1,
    // pageSize:2,
    // id在修改之前没有作用  不需要定义
    // id:1,
    // 1. 查询商品详情 并渲染
    queryProductDetail: function() {
        var that = this;
        // 1. 实现商品详情渲染
        //  1. 获取url中id参数的值
        //  2. 根据id参数的值去请求详情数据
        //  3. 分开渲染
        //      1. 渲染商品的轮播图
        //      2. 渲染商品的详情信息
        // 1. 使用获取地址栏参数的函数 获取id参数的值
        that.id = that.getQueryString('id');
        // 2. 根据id去发送请求
        $.ajax({
            url: '/product/queryProductDetail',
            data: { id: that.id },
            // ajax发送请求之前的回调函数
            beforeSend: function() {
                // 请求之前show显示加载中效果 
                $('.mask').show();
            },
            // ajax请求完成后的回调函数
            complete: function() {
                // 请求完成后hide隐藏加载中效果
                $('.mask').hide();
            },
            success: function(data) {
                // 2. 在渲染轮播图之前把页面的静态结构清空 不清空会有问题
                // 3. 调用轮播图模板去渲染轮播图
                var html = template('slideTpl', data);
                // 4. 把轮播图片和小圆点放到mui轮播图容器mui-slider里面
                $('#slide .mui-slider').html(html);
                // 5. 使用了组件里面的内容是动态添加都需要等渲染完成后再初始化组件
                var gallery = mui('.mui-slider');
                // 注意还有个坑就是就算轮播图放到了后面初始化但是页面中之前已经有静态结构已经初始化了一次
                // 不能让一开始的静态结构去初始化
                gallery.slider({
                    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
                });

                // 1. 渲染商品的详情
                // 1. 尺码是一个字符串40-50 需要把字符串变成数组 [40,41,...50]
                // 1. 把data.size的字符串按照 - 分割  arr[40,50]
                // 2. 写一个循环从40开始到50结束
                // 3. 把循环的每个值都加到数组里面
                var sizeArr = data.size.split('-');
                console.log(sizeArr);
                // 2. 真正的尺码数组
                var size = [];
                // 3. 定义一个循环从数组[0] 40开始 到 [1] 50结束  包含<= 把循环的每个i的值加到数组中
                for (var i = (sizeArr[0] - 0); i <= sizeArr[1]; i++) {
                    size.push(i);
                }
                // 4. 把临时真实数组放到data对象里面
                data.size = size;
                // 在渲染数据之间读取本地存储的数据 把 上一次选择的尺码和数量获取下拉
                data.prevSize = localStorage.getItem('size') || 0;
                // 如果没有值 默认为0
                data.prevNum = localStorage.getItem('num') || 0;
                // 5. 调用商品信息的模板生成html
                var html = template('productInfoTpl', data);
                // 6. 把商品的信息放到容器里面
                $('#productInfo').html(html);
                // 7. 等数字框出来后再初始化数字框  总结只要使用了动态渲染的组件都需要手动初始化
                mui('.mui-numbox').numbox();
                // 使用数字框的设置方法 设置value值为上一次选中的数量
                mui('.mui-numbox').numbox().setValue(data.prevNum)
                // 8. 给所有尺码的按钮添加一个点击事件 因为尺码已经渲染完毕就不用委托
                $('.product-size .btn-size').on('tap', function() {
                    // 9. 给当前的点击尺码按钮添加 类名 其他尺码删除类名
                    $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
                });
                // 10. 等页面全部加载完成后再初始化区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
            }
        });
    },
    // 2. 实现加入购物车
    addCart: function() {
        var that = this;
        console.log(that);
        /*2. 实现加入购物车
            1. 先得让尺码和数量能够点击
            2. 给加入购物车按钮添加点击事件
            3. 获取当前选择的尺码和数量
            4. 判断是否选择尺码和数量 如果没选提示用户选择
            5. 调用/cart/addCart 加入购车的APi实现加入购车 使用post 传入productId num size*/
        // 1. 给加入购车按钮添加点击事件
        $('.btn-add-cart').on('tap', function() {
            // 2. 获取当前用户选择的尺码和数量
            // 3. 获取当前选择的尺码 如果有按钮btn-size 又有mui-btn-warning表示被选中了 获取按钮身上的data-size属性的值
            var size = $('.btn-size.mui-btn-warning').data('size');
            // 判断size是否选中
            if (!size) {
                // mui.toast('请选择尺码'); 
                // 如果要改时间可以写数字(毫秒数) 也可以写字符串
                mui.toast('请选择尺码', { duration: 3000, type: 'div' });
                // mui.toast('请选择尺码',{ duration:'short', type:'div' }) 
                // 提示完成后要结束后面代码不在执行
                return false;
            }
            // 4. 获取选中数量  使用MUI提供的方法获取数字框的值 传递一个数字框的容器
            var num = mui('.mui-numbox').numbox().getValue();
            // 判断num是否选择
            if (!num) {
                mui.toast('请选择数量', { duration: 3000, type: 'div' });
                return false;
            }
            // 当加入购车的时候把选择的尺码和数量保存到本地存储中
            localStorage.setItem('size', size);
            localStorage.setItem('num', num);
            // 5. 如果都选择了就调用ajax 请求加入购物车的API
            $.ajax({
                url: '/cart/addCart',
                type: 'post', // 加入购车的请求方式是post不是get需要手动
                // 注意 参数要求是productId 但是我们的变量名叫id  如果为了保证有数据 || 默认值
                data: { productId: that.id || 1, size: size || 40, num: num || 1 },
                success: function(data) {
                    // 6. 判断当前是否加入购车成功  不成功跳转到登录 
                    //后台返回数据里面有error表示失败未登录
                    if (data.error == 400) {
                        console.log(location.href); //就是当前页面url
                        // 未登录跳转到登录页面
                        // location = 'login.html?returnUrl='+'http://localhost:3000/m/detail.html?id=2';
                        // 把当前页面url通过参数传递到登录页面
                        location = 'login.html?returnUrl=' + location.href;
                    } else {
                        // 7. 加入购车成功 使用MUI确认框提示用户是否去购物车查看
                        mui.confirm('加入购物车是否去购物车查看?', '温馨提示', ['yes', 'no'], function(e) {
                            // 8. 因为e.index == 0 表示点击了左边的确定 e.index == 1表示点击了右边的取消
                            if(e.index == 0){
                                // 9.点击了是 跳转到购物车
                                location = 'cart.html';
                            }else{
                                mui.toast('请继续添加！');
                            }
                        });
                    }
                }
            })
        });
    },
    // 3. 获取ur参数的值
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
            // return unescape(r[2]);
            return decodeURI(r[2]);
        }
        return null;
    }
}
