$(function() {
    var page = 1;
    var pageSize = 2;
    // 1. 商品根据url搜索
    // 1. 获取地址栏参数search键的值
    var search = getQueryString('search');
    // 2. 调用ajax根据搜索的内容请求商品列表数据
    $.ajax({
        url: '/product/queryProduct',
        data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
        success: function(data) {
            // 3. 拿到数据调用模板生成html
            var html = template('productlistTpl', data);
            // 4. 把html渲染到页面
            $('.product-box').html(html);
        }
    });
    // 2. 商品根据按钮搜索
    // 1. 给按钮添加tap事件
    $('.btn-search').on('tap', function() {
        // 2. 获取当前输入框输入的内容
        search = $('.input-search').val();
        // 3. 进行非空判断 要把空格去掉  trim是去掉输入框里面的首尾空格
        // 修改that.search  that是letao对象 把letao对象search属性的值修改了
        if (!search.trim()) {
            alert('请输入合法的内容');
            // 后面代码不执行 阻止默认行为
            return false;
        }
        // 每次刷新的时候要先把page 重置为1 
        page = 1;
        // 把上拉加载的效果也要 不然拉不了了
        mui('#refreshContainer').pullRefresh().refresh(true);
        // 4. 调用ajax发送请求请求商品列表的数据
        $.ajax({
            url: '/product/queryProduct',
            data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
            success: function(data) {
                // 5. 拿到数据调用模板生成html
                var html = template('productlistTpl', data);
                // 6. 把html渲染到页面
                $('.product-box').html(html);
            }
        });
    });
    // 3. 商品排序
    // 1. 给所有排序按钮添加点击事件
    $('.product-list .title a').on('tap', function() {
        // 2. 获取当前点击a 的排序类型
        var sortType = $(this).data('sort-type');
        // 3. 获取当前点击a默认的排序的顺序
        var sort = $(this).data('sort');
        // console.log(sortType);
        // console.log(sort);
        // 4. 把排序的顺序改变 默认升序1  改成降序2  默认是2降序 改成1
        if (sort == 1) {
            sort = 2;
            // 把a里面的 i标签图标类名向下删掉 变成向上
            $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            sort = 1;
            // 把a里面的 i标签图标类名向上删掉 变成向下
            $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        // 5. 改了之后要重新把排序的顺序 更新到标签的属性上
        $(this).data('sort', sort);
        // 6. 判断当前的排序的方式
        if (sortType == 'price') {
            // 7. 调用ajax发送请求请求商品列表的数据
            $.ajax({
                url: '/product/queryProduct',
                data: { proName: search, page: page || 1, pageSize: pageSize || 2, price: sort },
                success: function(data) {
                    // 8. 拿到数据调用模板生成html
                    var html = template('productlistTpl', data);
                    // 9. 把html渲染到页面
                    $('.product-box').html(html);
                }
            });
        } else if (sortType == 'num') {
            // 10. 调用ajax发送请求请求商品列表的数据
            $.ajax({
                url: '/product/queryProduct',
                data: { proName: search, page: page || 1, pageSize: pageSize || 2, num: sort },
                success: function(data) {
                    // 11. 拿到数据调用模板生成html
                    var html = template('productlistTpl', data);
                    // 12. 把html渲染到页面
                    $('.product-box').html(html);
                }
            });
        }
        // 13. 点击了a的父元素div添加active 其他兄弟删除active
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
    // 4. 商品下拉刷新和上拉加载
    // 1. 初始化下拉和上拉
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                contentdown: "你可以下拉",
                contentover: "你可以松手了",
                contentrefresh: "正在拼命加载中...",
                callback: function() {
                    //请求数据的  请求渲染完毕后 要结束下拉刷新
                    //1. 每次刷新的时候要先把page 重置为1 
                    page = 1;
                    //2. 使用定时器模拟请求延迟 2秒钟
                    setTimeout(function() {
                        // 3. 发送请求刷新数据                     
                        $.ajax({
                            url: '/product/queryProduct',
                            data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
                            success: function(data) {
                                // 4. 拿到数据调用模板生成html
                                var html = template('productlistTpl', data);
                                // 5. 把html渲染到页面
                                $('.product-box').html(html);
                                // 6. 结束下拉刷新
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                // 注意要等结束了下拉刷新了后再重置
                                // 7. 把上拉加载的效果也要 不然拉不了了 有时候会自动触发 不是bug希望帮你加载一些
                                mui('#refreshContainer').pullRefresh().refresh(true);
                            }
                        });
                    }, 2000)
                }
            },
            up: {
                contentrefresh: "哥正在拼命加载中...",
                contentnomore: '我是有底线的',
                callback: function() {
                    //请求数据的  请求渲染完毕后 要结束下拉刷新
                    //1. 使用定时器模拟请求 2秒钟
                    setTimeout(function() {
                        // 2. 上拉加载请求下一页的数据 让当前page不是写死的1 而是++后的page
                        page++;
                        // 3. 发送请求 请求请求下一页的数据
                        $.ajax({
                            url: '/product/queryProduct',
                            data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
                            success: function(data) {
                                // 4. 判断数据是否有长度 有长度就追加渲染 没有长度就提示没有数据了
                                if (data.data.length > 0) {
                                    // 5. 拿到数据调用模板生成html
                                    var html = template('productlistTpl', data);
                                    // 6. 把html追加到页面
                                    $('.product-box').append(html);
                                    // 7. 只是结束上拉加载
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                    // 9. 不仅结束上拉加载 并提示没数据了
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        });
                    }, 2000)
                }
            }
        }
    });
    // 5. 点击某个商品跳转到商品详情 并且传入商品id
    // 1. 给立即购买按钮添加点击事件
    $('.product-box').on('tap','.product-buy',function () {
        // 2. 获取当前点击商品商品id
        var id = $(this).data('id');
        console.log(id);
        // 3. 使用location跳转详情页面 并且传参 id=获取的id
        location = 'detail.html?id='+id;
    });
});

//别人使用正则写的获取url地址栏参数的方法
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        // 用了另一种转码方式 我们是默认转码方式 使用decodeURI
        // return unescape(r[2]);
        return decodeURI(r[2]);
    }
    return null;
}
