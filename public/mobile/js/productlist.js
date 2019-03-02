$(function() {
    // 1. 取url中 search参数的值
    // location.search 获取地址栏? 和 后面的内容 称之为地址栏参数
    // decodeURI 转码 把url中的中文乱码 转成真实的中文  
    // split是分割 把 url参数以 = 分割 = 号前面的 参数的键(参数名)  = 后面的参数的值
    //参数如果只有一个 就使用=号分割 
    // console.log(decodeURI(location.search.split('=')[1]));
    var search = getQueryString('search');
    var letao = new Letao(search);
    // 1. 下拉刷新的初始化要提前  不然重置会报错
    letao.pullDownUpRefresh();
    //用letao实例对象调用查询商品列表函数
    letao.queryProduct();
    letao.searchProduct();
    letao.sortProduct();
    letao.goBuy();
});
//把公共参数 search 搜索的关键字 不管地址栏 还是文本输入 都是一个变量 作为公共参数
var Letao = function(search) {
    this.search = search;
}

Letao.prototype = {
    page: 1,
    pageSize: 2,
    // queryProduct 根据url参数值查询商品列表
    queryProduct: function() {
        var that = this;
        // console.log(that.search);
        // 1. 发送ajax 请求查询商品列表的API
        // 2. 请求的时候传递一些参数 proName  当前搜索的内容 page 第几页 pageSize 每页(大小)条数
        // 3. 接收返回的数据 调用模板 生成html

        // 每次刷新的时候从头开始都要page重置为1 
        that.page = 1;
        // 把上拉加载的效果也要重置 这个文档没错
        mui('#refreshContainer').pullRefresh().refresh(true);
        // 1. 发送ajax请求
        that.getProductData(function(data) {
            // 2. 拿到数据调用模板生成html
            var html = template('productlistTpl', data);
            // 3. 把html渲染到页面
            $('.product-box').html(html);
        });
    },
    // 根据用户输入搜索商品列表的函数
    // 1. 点击搜索按钮后获取当前文本框输入的内容
    // 2. 根据当前输入的内容调用API进行搜索(查询商品)
    // 3. 渲染商品列表
    searchProduct: function() {
        var that = this;
        // console.log(this.search);
        // 1. 给按钮添加tap事件
        $('.btn-search').on('tap', function() {
            // 2. 获取当前输入框输入的内容
            that.search = $('.input-search').val();
            // console.log(that.search);
            // 3. 进行非空判断 要把空格去掉  trim是去掉输入框里面的首尾空格
            // 修改that.search  that是letao对象 把letao对象search属性的值修改了
            if (!that.search.trim()) {
                alert('请输入合法的内容');
                // 后面代码不执行 阻止默认行为
                return false;
            }
            // 每次刷新的时候从头开始都要page重置为1 
            that.page = 1;
            // 把上拉加载的效果也要重置 这个文档没错
            mui('#refreshContainer').pullRefresh().refresh(true);
            // 4. 调用ajax发送请求请求商品列表的数据
            that.getProductData(function(data) {
                // 5. 拿到数据调用模板生成html
                var html = template('productlistTpl', data);
                // 6. 把html渲染到页面
                $('.product-box').html(html);
            });
        });
    },
    // 商品的排序函数
    // 1. 点击了价格 或者 数量要进行商品的排序
    // 2. 假如一开始是升序  点击后 变成降序   如果一开始降序 点击后 变成升序
    // 3. 通过传递一个参数价格price=1(价格升序)  price=2(价格降序)  数量 num=1 num=2
    // 4. 根据当前排序类型 如果是价格 调用API传入price值为当前排序顺序 如果是数量就调用API传入num值为当前排序顺序
    // 5. 把返回的数据渲染到商品列表
    sortProduct: function() {
        var that = this;
        // console.log(that.search);
        // 1. 给所有排序按钮添加点击事件
        $('.product-list .title a').on('tap', function() {
            // 后面排序也用到了that 也是 letao对象 search改了之后的search
            // console.log(that.search);
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
                // 每次刷新的时候从头开始都要page重置为1 
                that.page = 1;
                // 把上拉加载的效果也要重置 这个文档没错
                mui('#refreshContainer').pullRefresh().refresh(true);
                // 7. 表示进行价格排序 调用API传入price为值当前排序顺序
                that.getProductData(function(data) {
                    // 8. 拿到数据调用模板生成html
                    var html = template('productlistTpl', data);
                    // 9. 把html渲染到页面
                    $('.product-box').html(html);
                }, sort, 0); //如果价格排序 在价格参数上传递sort 数量参数传递0 或者空
                // },sort,'');//如果价格排序 在价格参数上传递sort 数量参数传递0 或者空
            } else if (sortType == 'num') {
                // 每次刷新的时候从头开始都要page重置为1 
                that.page = 1;
                // 把上拉加载的效果也要重置 这个文档没错
                mui('#refreshContainer').pullRefresh().refresh(true);
                // 10. 表示进行数量排序 调用API传入num为值当前排序的顺序
                that.getProductData(function(data) {
                    // 11. 拿到数据调用模板生成html
                    var html = template('productlistTpl', data);
                    // 12. 把html渲染到页面
                    $('.product-box').html(html);
                }, 0, sort); // 进行数量排序 把价格排序传递0 或者空  把数量传递为当前排序顺序
                // },'',sort);// 进行数量排序 把价格排序传递0 或者空  把数量传递为当前排序顺序
            }
            // 13. 点击了a的父元素div添加active 其他兄弟删除active
            $(this).parent().addClass('active').siblings().removeClass('active');
        })
    },
    // 获取商品列表数据的公共函数 发送请求  多加2个参数 分别价格排序  和 数量排序 如果传了price执行price排序 传了num 执行num排序
    getProductData: function(callback, price, num) {
        var that = this;
        // 1. 把一些大家都会用到的ajax请求代码 提取到函数里面
        // 2. 这个函数是用来获取商品数据（只负责商品数据获取）
        // 3. 数据拿到了后的处理 让各个调用函数的时候自己去渲染
        // 4. 如何各自渲染代码 就通过callback参数 接收调用的回调函数 在数据请求成功后执行callback
        $.ajax({
            url: '/product/queryProduct',
            // 1. 把价格和数量排序 进行判断 如果传递价格参数 表示排序价格 把价格排序顺序设置price
            // 2. 把价格和数量排序 进行判断 如果传递数量参数 表示排序数量 把数量排序顺序设置num
            data: { proName: that.search, page: that.page || 1, pageSize: that.pageSize || 2, price: price || '', num: num || '' },
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
                // 当函数的代码里面只有值会变 使用 普通值参数
                // 回调函数的作用当函数里面有代码会变就是要回调函数参数 而且回调函数需要调用
                // 3. callback(data) 把当前success回调函数的返回值数据 作为实参传递给回调函数                
                callback(data);
            }
        });
    },
    //上拉刷新和下拉加载
    pullDownUpRefresh: function() {
        var that = this;
        // 4. 初始化
        mui.init({
            pullRefresh: {
                container: "#refreshContainer",
                down: {
                    contentdown: "你可以下拉",
                    contentover: "你可以松手了",
                    contentrefresh: "正在拼命加载中...",
                    callback: function() {
                        //1. 使用定时器模拟请求 2秒钟
                        setTimeout(function() {
                            // 2. 每次刷新的时候从头开始都要page重置为1 
                            that.page = 1;
                            // 4. 调用封装好的获取数据的函数
                            that.getProductData(function(data) {
                                // 5. 拿到数据调用模板生成html
                                var html = template('productlistTpl', data);
                                // 6. 把html渲染到页面
                                $('.product-box').html(html);
                                // 7. 结束下拉刷新
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                                // 8. 把上拉加载的效果也要重置 这个文档没错
                                mui('#refreshContainer').pullRefresh().refresh(true);
                            });
                        }, 2000)
                    }
                },
                up: {
                    contentrefresh: "哥正在拼命加载中...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                    contentnomore: '我是有底线的', //可选，请求完毕若没有更多数据时显示的提醒内容；
                    callback: function() {
                        //1. 使用定时器模拟请求 2秒钟
                        setTimeout(function() {
                            //2. 上拉加载请求下一页的数据 让当前page不是写死的1 而是++后的page
                            that.page++;
                            console.log(that.page);
                            // 3. 调用封装好的获取数据的函数
                            that.getProductData(function(data) {
                                console.log(data);
                                // 4. 判断当前还有没有数据 有数据就追加渲染 因为data对象 data.data对象里面的data数组 
                                if (data.data.length > 0) {
                                    // 5. 拿到数据调用模板生成html
                                    var html = template('productlistTpl', data);
                                    // 6. 把html追加到页面
                                    $('.product-box').append(html);
                                    // 7. 只是结束上拉加载
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                    // 8. 如果没有数据结束并且提示没有数据了                                         
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }

                            });
                        }, 2000)
                    }
                }
            }
        });
    },
    // 去购买商品
    goBuy: function() {
        // 5. 点击某个商品跳转到商品详情 并且传入商品id
        // 1. 给立即购买按钮添加点击事件
        $('.product-box').on('tap', '.product-buy', function() {
            // 2. 获取当前点击商品商品id
            var id = $(this).data('id');
            console.log(id);
            // 3. 使用location跳转详情页面 并且传参 id=获取的id
            location = 'detail.html?id=' + id;
        });
    }
}


//专门用来根据参数名获取参数值的函数
// function getQueryString(name) {
//     // 参数如果有多个 先用& 分割
//     // substring 字符串的截取方式 从哪里 截取到哪里 排除 ?
//     // ?search=李宁&price=1&num=1   变成 search=李宁&price=1&num=1
//     // 从下标为1  截取到末尾
//     // 获取整个参数 并且转成 参数的数组(可能有多个参数)
//     var searchs = location.search.substring(1, location.search.length).split('&');
//     // console.log(searchs);
//     // 遍历数组中的每一个参数
//     for (var i = 0; i < searchs.length; i++) {
//        // 把当前参数 search=鞋  以等号分割 转成一个数组
//         var search = searchs[i].split('=');
//         // console.log(search);
//         // 查找当前参数名 是否在当前参数的数组中存在
//         if (search.indexOf(name) != -1) {
//             // console.log(decodeURI(search[1]));
//             // 存在返回当前参数的值
//             return decodeURI(search[1]);
//         }
//     }
// }

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
