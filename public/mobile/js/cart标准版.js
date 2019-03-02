$(function() {
    /*1. 实现购物车的商品动态渲染
    	1. 发送ajax请求购物车商品的数据APi
    	2. 创建购物车商品列表的模板
    	3. 调用模板 渲染页面*/
    var page = 1;
    $.ajax({
        url: '/cart/queryCartPaging', //请求带分页的API
        data: { page: page, pageSize: 4 },
        success: function(data) {
            console.log(data);
            //进行登录验证 如果没有登录 就跳转到登录页面
            if(data.error == 400){
            	 // 跳转到登录页面 并且指定登录成功后返回当前页面
            	 location = 'login.html?returnUrl='+location.href;
            }	
            // 因为data数据后台返回有点问题 当没有数据 后台直接返回空数组 而不是对象 
            // 如果是空数组传入到模板使用里面的data会报错
            if (Array.isArray(data)) {
                // 判断如果是一个空数组 赋值给一个对象 里面有data数组值为空
                data = {
                    data: []
                }
            }
            console.log(data);
            var html = template('cartProductTpl', data);
            $('.cart-list').html(html);
            // 7. 刷新页面的时候重置 上拉加载的效果
            mui('#refreshContainer').pullRefresh().refresh(true);
        }
    });

    /*2. 实现购物车列表下拉刷新 和 上拉加载更多
    	1. 先写结构  和 区域滚动一致 有一个父容器 子容器
    	2. 初始化下拉刷新 和 上拉加载更多
    	3. 下拉刷新的回调函数 发送请求 刷新页面   结束下拉刷新  重置page 和 重置上拉加载效果
    	4. 在上拉加载回调函数 发送请求下一页数据 追加页面  结束上拉加载*/
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                //下拉刷新的回调函数       
                callback: function() {
                    // 1. 为了模拟延迟写一个定时器
                    setTimeout(function() {
                        // 下拉刷新之前 要重新请求第一页 要把page重置为1
                        page = 1;
                        // 2. 请求数据
                        $.ajax({
                            url: '/cart/queryCartPaging', //请求带分页的API
                            data: { page: page, pageSize: 4 },
                            success: function(data) {
                                // 因为data数据后台返回有点问题 当没有数据 后台直接返回空数组 而不是对象 
                                // 如果是空数组传入到模板使用里面的data会报错
                                if (Array.isArray(data)) {
                                    // 判断如果是一个空数组 赋值给一个对象 里面有data数组值为空
                                    data = {
                                        data: []
                                    }
                                }
                                var html = template('cartProductTpl', data);
                                $('.cart-list').html(html);
                                // 3. 结束下拉刷新  注意官方结束代码有问题 改成 endPulldownToRefresh
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                // 4. 结束了下拉刷新后 要重置上拉加载的效果
                                mui('#refreshContainer').pullRefresh().refresh(true);
                            }
                        });
                    }, 2000);
                }
            },
            up: {
                //上拉加载的回调函数       
                callback: function() {
                    // 1. 为了模拟延迟写一个定时器
                    setTimeout(function() {
                        // 上拉请求数据之前 让page ++
                        page++;
                        // 2. 请求数据
                        $.ajax({
                            url: '/cart/queryCartPaging', //请求带分页的API
                            data: { page: page, pageSize: 4 },
                            success: function(data) {
                                console.log(data);
                                // 因为data数据后台返回有点问题 当没有数据 后台直接返回空数组 而不是对象 
                                // 如果是空数组传入到模板使用里面的data会报错
                                if (Array.isArray(data)) {
                                    // 判断如果是一个空数组 赋值给一个对象 里面有data数组值为空
                                    data = {
                                        data: []
                                    };
                                    // 如果已经是空数组了 表示没有数据了 
                                    // 3. 结束上拉加载 注意官方结束代码有问题 改成 endPullupToRefresh
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                    // 并且return 后面代码不执行
                                    return false;
                                }
                                var html = template('cartProductTpl', data);
                                // 上拉追加不是替换
                                $('.cart-list').append(html);
                                // 3. 结束上拉加载 注意官方结束代码有问题 改成 endPullupToRefresh
                                mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                            }
                        });
                    }, 2000);
                }
            }
        }
    });

    /* 3. 实现计算总金额
     	1. 获取当前所有选中的复选框  (添加一个change事件 当复选框选择发生变化时时获取)
     	2. 遍历所有选中的复选框  计算每一个复选框的商品价格和数量 为商品单价
     	3. 定义一个和把所有商品单价累加就是总金额
     	4. 把总金额渲染到页面*/
    // 1. 给所有复选框添加一个change事件 当复选框的值发生改变才获取
    $('.cart-list').on('change', '.checkbox-product', function() {
        // 2. 获取所有选中的复选框
        var checkboxs = $('.checkbox-product:checked');
        // 6. 所有商品的总价
        var sum = 0;
        // 3. 遍历所有选中的复选框
        for (var i = 0; i < checkboxs.length; i++) {
            // 4. 获取当前每个选中复选框身上 价格 和数量
            var price = $(checkboxs[i]).data('price');
            var num = $(checkboxs[i]).data('num');
            // 5. 计算当前单个商品的总价 = 商品价格 * 商品的数量
            var singleCount = price * num;
            sum += singleCount;
            // console.log(singleCount);
        }
        console.log(sum.toFixed(2));
        //JS保留2位小数
        sum = sum.toFixed(2);
        // 7. 把总价渲染到页面上
        $('.order-total span').html(sum);
    });

    /*4. 商品的删除
    	1. 当前删除按钮点击时候弹出确认框
    	2. 如果点击确定 删除
    		获取当前要删除的商品id
    		调用删除的API删除商品
    		删完成重新刷新页面
    	3. 点击取消 不删 什么都不干*/
    // 1. 给所有删除按钮添加点击事件
    $('.cart-list').on('tap', '.btn-delete', function() {
        // 为什么要把 this保存在that上 因为函数改变this指向
        var that = this;
        // 2. 弹出一个确认框问用户是否要删除
        mui.confirm('您确定要删除商品吗?', '温馨提示', ['确定', '取消'], function(e) {
            // console.log(this);//这个函数没人调用 是window 就不是按钮 把按钮提前保存到that变量中
            // 3. 判断用户点击了确定 去删除
            if (e.index == 0) {
                // 4. 获取当前点击要删除的商品的id
                var id = $(that).data('id');
                // 5. 调用删除的API删除商品
                $.ajax({
                    url: '/cart/deleteCart',
                    data: { id: id },
                    success: function(data) {
                        // 6. 如果删除成功就刷新页面
                        if (data.success) {
                            // 7. 重置为第一页
                            page = 1;
                            // 8. 请求第一页商品刷新页面
                            $.ajax({
                                url: '/cart/queryCartPaging', //请求带分页的API
                                data: { page: page, pageSize: 4 },
                                success: function(data) {
                                    console.log(data);
                                    // 因为data数据后台返回有点问题 当没有数据 后台直接返回空数组 而不是对象 
                                    // 如果是空数组传入到模板使用里面的data会报错
                                    if (Array.isArray(data)) {
                                        // 判断如果是一个空数组 赋值给一个对象 里面有data数组值为空
                                        data = {
                                            data: []
                                        }
                                    }
                                    console.log(data);
                                    var html = template('cartProductTpl', data);
                                    $('.cart-list').html(html);
                                    // 9. 刷新页面的时候重置 上拉加载的效果
                                    mui('#refreshContainer').pullRefresh().refresh(true);
                                }
                            });
                        }
                    }
                });
            } else {
                //点击了取消 把当前列表滑动回去
                // 1. 获取当前要滑动回去的li 只能使用dom元素 不能是zpeto对象
                var li = that.parentNode.parentNode;
                // 2. 调用官方的滑动关闭函数
                mui.swipeoutClose(li);
            }
        })
    });

    /*5. 商品的编辑
    	1. 点击编辑按钮弹出一个确认框
    		1. 但是确认框里面的放的不仅是文字 还有代码 尺码按钮  数字框
    		2. 让编辑栏的尺码 和 数量支持点击
    	2. 点击确定了 获取当前选中新的尺码和数量
    	3. 调用编辑的API传入新的尺码和数量去编辑商品
    	4. 编辑成功 重刷新页面
    	5. 如果点击了取消 滑动列表回去*/
    // 1. 给编辑按钮添加点击事件
    $('.cart-list').on('tap', '.btn-edit', function() {
    	  var that = this;
        // 3. 在确认框弹出来之前 去渲染当前尺码和数量的模板
        // 4. 获取当前按钮上绑定的单个商品所有数据
        var data = $(this).data('product');
        // 5. 把商品尺码40-50字符串 转成数组
        var sizeArr = data.productSize.split('-');
        // 6. 真正的尺码数组
        var size = [];
        // 7. 定义一个循环从数组[0] 40开始 到 [1] 50结束  包含<= 把循环的每个i的值加到数组中
        for (var i = (sizeArr[0] - 0); i <= sizeArr[1]; i++) {
            size.push(i);
        }
        // 8. 把临时真实数组放到data对象里面 productSize属性上
        data.productSize = size;
        console.log(data);
        var html = template('editCartTpl', data);
        // 9. 把html字符串的回车换行去掉 \r 回车 \n 换行 都替换成空
        html = html.replace(/[\r\n]/g, '');
        // 10. 弹出一个确认框 把准备好的尺码数量模板放到确认框里面
        mui.confirm(html, '编辑商品标题', ['确定', '取消'], function(e) {
            // 15. 判断点击确定还是取消
            if (e.index == 0) {
                // 16. 获取选中尺码数量 重新调用API编辑商品
                var size = $('.btn-size.mui-btn-warning').data('size');
                var num = mui('.mui-numbox').numbox().getValue();
                // 17. 调用APi实现编辑商品
                $.ajax({
                    url: '/cart/updateCart',
                    type: 'post',
                    data: { id: data.id, size: size, num: num },
                    success: function(data) {
                        // 18. 判断如果编辑成功刷新页面
                        if (data.success) {
                            // 19. 调用查询渲染页面
                            page = 1;
                            $.ajax({
                                url: '/cart/queryCartPaging', //请求带分页的API
                                data: { page: page, pageSize: 4 },
                                success: function(data) {
                                    console.log(data);
                                    // 因为data数据后台返回有点问题 当没有数据 后台直接返回空数组 而不是对象 
                                    // 如果是空数组传入到模板使用里面的data会报错
                                    if (Array.isArray(data)) {
                                        // 判断如果是一个空数组 赋值给一个对象 里面有data数组值为空
                                        data = {
                                            data: []
                                        }
                                    }
                                    console.log(data);
                                    var html = template('cartProductTpl', data);
                                    $('.cart-list').html(html);
                                    // 7. 刷新页面的时候重置 上拉加载的效果
                                    mui('#refreshContainer').pullRefresh().refresh(true);
                                }
                            });
                        }
                    }
                })
            } else {
                //点击了取消 把当前列表滑动回去
                // 1. 获取当前要滑动回去的li 只能使用dom元素 不能是zpeto对象
                var li = that.parentNode.parentNode;
                // 2. 调用官方的滑动关闭函数
                mui.swipeoutClose(li);
            }
        });
        // 11. 等确认框代码执行 html渲染到确认框里面才执行初始化数字框和初始化按钮点击       
        mui('.mui-numbox').numbox();
        // 12. 使用数字框的设置方法 设置value值为上一次选中的数量
        mui('.mui-numbox').numbox().setValue(data.num);
        // 13. 给所有尺码的按钮添加一个点击事件 因为尺码已经渲染完毕就不用委托
        $('.product-size .btn-size').on('tap', function() {
            // 14. 给当前的点击尺码按钮添加 类名 其他尺码删除类名
            $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
        });
    });
})
