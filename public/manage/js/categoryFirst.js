$(function() {
    var letao = new Letao();
    //调用查询一级分类的函数
    letao.queryTopCategory();
    letao.initPaginator();
    letao.addCategory();
});

var Letao = function() {
	
}

Letao.prototype = {
    page: 1,
    pageSize: 5,
    totalPages: 2,    
    // 1. 查询一级分类的数据 渲染到分类表格
    queryTopCategory: function() {
        var that = this;
        // 1. 请求一级分类APi数据
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: { page: that.page, pageSize: that.pageSize },
            success: function(data) {
                // 2. 创建一级分类表格模板 生成html
                var html = template('categoryFirstTpl', data);
                // 3. 渲染表格
                $('.table-category tbody').html(html);
                // 4. 计算当前的总页数 总条数 / 每页大小 
                // 注意向上取整 因为 7 / 5 == 1.4 只要超了一页的数据都要加一页 
                that.totalPages = Math.ceil(data.total / that.pageSize);
                // 5. 调用初始化分页
                that.initPaginator();
            }
        })
    },
    // 2. 添加分类
    addCategory: function() {
        var that = this;
        // 1. 点击了保存按钮添加分类
        $('.btn-save').on('click', function() {
            // 2. 获取当前输入的分类名称
            var categoryName = $('.input-category').val();
            if (!categoryName.trim()) {
                alert('请输入分类名称');
                return false;
            }
            // 3. 调用APi添加分类
            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: { categoryName: categoryName },
                success: function(data) {
                    // 4. 添加成功重新查询刷新页面
                    if (data.success) {
                    	   // 调用查询方法
                        that.queryTopCategory();
                    }
                }
            })
        });
    },
    // 3. 初始化bootstrap分页插件
    initPaginator: function() {
        var that = this;
        // 3. 分页的插件初始化
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion: 3, //对应的bootstrap版本
            currentPage: that.page, //当前页数
            numberOfPages: that.pageSize, //每次显示页数
            totalPages: that.totalPages, //总页数
            shouldShowPage: true, //是否显示该按钮
            useBootstrapTooltip: true,
            //点击事件 当点击上一页下一页首页尾页第几页 跳转都会触发这个事件
            onPageClicked: function(event, originalEvent, type, nowPage) {
                // nowPage就是当前点击的页数的
                // 点击了第二页把page = 2
                // 把当前点击nowPage赋值给全局page变量
                that.page = nowPage;
                // 请求第二页的数据 调用公共函数
                that.queryTopCategory();
            }
        });
    }
}
