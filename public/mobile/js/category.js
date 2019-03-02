$(function() {
    //调用区域滚动的初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

    //实现分类左侧的动态渲染

    // 1. 发送ajax请求一级分类的数据
    // 2. 通过模板引擎把一级分类的数据生成html
    // 3. 把html渲染左侧ul里面
    $.ajax({
        // url里面的地址 / 斜杠 表示项目的根目录 当前根目录就是localhost:3000  使用当前根目录的地址拼接API地址
        url: '/category/queryTopCategory',
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
        // type: 'get', //请求类型 默认get
        // data: {}, //请求参数 如果没有可以省略
        // dataType: 'json', //返回值的数据类型 默认值是json 把json转成js对象方式返回
        success: function(data) { //成功的回调函数
            console.log(data);
            //调用写好的模板
            // var html = template('topCategoryTpl',{rows:data.rows});
            var html = template('topCategoryTpl', data);
            $('.category-left ul').html(html);
        },
        error: function(err) { //失败的回调函数
            console.log(err);
        }
    });
    // 注意zepto的get方法jquery传参不一样
    // $.get('/category/queryTopCategory', {}, function(data) {
    //     console.log(data);
    //     //调用写好的模板
    //     var html = template('topCategoryTpl', data);
    //     $('.category-left ul').html(html);
    // });

    // 实现左侧分类的点击 显示对应品牌
    // 1. 当左边点击的时候切换active 给当前点击的加 其他删除
    // 2. 点击的时候获取当前点击a的data-id的值
    // 3. 根据当前id去请求品牌的数据
    // 4. 创建品牌模渲染模板
    // 给分类左侧的a添加tap 事件 由于a是动态添加需要使用事件委托方式添加
    $('.category-left ul').on('tap', 'li a', function() {
        // 获取当前a的父元素添加active 其他删除active
        $(this).parent().addClass('active').siblings().removeClass('active');
        // zepto或者jquery提供的函数 专门用来读取和设置自定义属性的函数 
        // 默认加了data- 不需要在加data- 只要写id即可
        var id = $(this).data('id');
        //类似于原生JS的dataset
        // var id = this.dataset['id'];
        // 根据当前的id发送ajax请求 请求二级分类品牌的数据
        querySecondCategory(id);
    });
    //默认传入1请求第一个品牌的数据默认显示
    querySecondCategory(1);
});

function querySecondCategory(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data: { id: id },
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
            //调用模板生成html
            var html = template('secondCategoryTpl', data);
            $('.category-right .mui-row').html(html);
        }
    });
}
