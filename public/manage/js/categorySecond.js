$(function() {
    var letao = new Letao();
    //调用查询一级分类的函数
    letao.querySecondCategory();
    letao.initPaginator();
    letao.addBrand();
});

var Letao = function() {
	
}

Letao.prototype = {
    page: 1,
    pageSize: 5,
    totalPages: 2,    
    // 1. 查询二级分类的数据 渲染到分类表格
    querySecondCategory: function() {
        var that = this;
        // 1. 请求一级分类APi数据
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: { page: that.page, pageSize: that.pageSize },
            success: function(data) {
                // 2. 创建一级分类表格模板 生成html
                var html = template('categorySecondTpl', data);
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
    // 2. 添加品牌
    addBrand: function() {
        var that = this;
        // 1. 让弹框里面的下拉的分类变成动态分类
            // 1. 请求一级分类的数据 创建一个模板
            // 2. 替换下拉框里面的option
        $.ajax({
            url:'/category/queryTopCategory',
            success:function (data) {
                var html = '';
                // 遍历所有的数据 
                for (var i = 0; i < data.rows.length; i++) {                    
                    // 每个分类id放到 option的value值里面 分类名称放到option标签的中间
                    // += 为了把每个option加起来
                    html+= '<option value="'+data.rows[i].id+'">'+data.rows[i].categoryName+'</option>'
                }
                // 把准备好的模板放到下拉框里面
                $('.select-category').html(html);
            }
        });

        // 2. 获取选择的图片并且显示到页面上
        // 1. 给文件框添加一个change事件
        $('.brand-img-file').on('change',function () {            
            if(this.files.length <= 0){
                return false;
            }
            // 1. 获取当前点击图片的名称
            var file = this.files[0].name;
            // 2. 拼接图片路径
            var imgSrc = '/mobile/images/'+file;
            // 3. 把拼接好的图片路径放到Img src里面
            $('.show-img').attr('src',imgSrc);
        });

        // 1. 点击了保存按钮添加分类
        $('.btn-save').on('click', function() {
            // 2. 获取当前选择的分类的id
            var categoryId = $('.select-category').val();
            // 3. 获取输入的品牌名称
            var brandName = $('.input-brand').val();
            console.log(brandName);
            if (!brandName.trim()) {
                alert('请输入品牌名称');
                return false;
            }
            // 4. 获取选择的图片路径
            var brandLogo = $('.show-img').attr('src');
            console.log(brandLogo);
            
            // 3. 调用APi添加品牌
            $.ajax({
                url: '/category/addSecondCategory',
                type: 'post',
                data: { brandName: brandName,categoryId:categoryId,brandLogo:brandLogo,hot:1 },
                success: function(data) {
                    // 4. 添加成功重新查询刷新页面
                    if (data.success) {
                    	// 调用查询方法
                        that.querySecondCategory();
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
                that.querySecondCategory();
            }
        });
    }
}
