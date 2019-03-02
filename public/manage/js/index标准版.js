$(function() {
    // 当前显示的第几页
    var page = 1;
    // 总页数 如果30条数 每页显示5    30/5 == 6页
    var totalPages = 2;
    var pageSize = 5;
    /*1. 实现用户管理
    	1. 请求用户的数据 来渲染到表格上
    	2. 实现点击了禁用启用按钮实现对用户的状态管理
    	3. 实现数据的分页显示*/
    // 1. 请求用户的数据 来渲染到表格上
    // 1. 发送ajax请求用数据
    $.ajax({
        url: '/user/queryUser',
        data: { page: page, pageSize: pageSize },
        success: function(data) {
            console.log(data);
            // 2. 调用模板渲染页面
            var html = template('userInfoTpl', data);
            $('.table-user tbody').html(html);
            // 3. 把totolPages修改一下 变为当前总条数/每页大小  == 总页数
            totalPages = data.total / pageSize;
            
        }
    });

    // 2.实现点击了禁用启用按钮实现对用户的状态管理
    // 1. 按钮都是动态使用委托方式添加点击事件
    $('.table-user tbody').on('click', '.btn-option', function() {
        // 2. 获取当前点击按钮的用户状态信息
        var isDelete = $(this).data('is-delete');
        // var isDelete = $(this).attr('data-is-delete');
        // 3. 判断你当前是什么状态 如果 ==0  变成 1  如果== 1变成0
        // if(isDelete == 0){
        // 	isDelete = 1;
        // }else{
        // 	isDelete = 0;
        // }
        isDelete = isDelete == 0 ? 1 : 0;
        // 4. 把变了后的信息更新到页面 jquery设置了data属性标签上看不到
        $(this).data('is-delete', isDelete);
        // 如果要看到要使用attr方法设置和读取
        // $(this).attr('data-is-delete',isDelete);
        // 5. 状态变化了后要更新数据 调用API
        var id = $(this).data('id');
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: { id: id, isDelete: isDelete },
            success: function(data) {
                // 6. 判断如果更新成功重新调用查询刷新页面
                if (data.success) {
                    // 1. 发送ajax请求用数据
                    $.ajax({
                        url: '/user/queryUser',
                        data: { page: page, pageSize: pageSize },
                        success: function(data) {
                            // 2. 调用模板渲染页面
                            var html = template('userInfoTpl', data);
                            $('.table-user tbody').html(html);
                            totalPages = data.total / pageSize;
                        }
                    });
                }
            }
        })
    })

    // 3. 分页的插件初始化
    $("#page").bootstrapPaginator({
        bootstrapMajorVersion: 3, //对应的bootstrap版本
        currentPage: page, //当前页数
        numberOfPages: pageSize, //每次显示页数
        totalPages: totalPages, //总页数
        shouldShowPage: true, //是否显示该按钮
        useBootstrapTooltip: true,
        //点击事件 当点击上一页下一页首页尾页第几页 跳转都会触发这个事件
        onPageClicked: function(event, originalEvent, type, nowPage) {
            // nowPage就是当前点击的页数的
            // 点击了第二页把page = 2
            // 把当前点击nowPage赋值给全局page变量
            page = nowPage;
            // 请求第二页的数据
            // 1. 发送ajax请求用数据 根据修改了后的page请求数据渲染页面
            $.ajax({
                url: '/user/queryUser',
                data: { page: page, pageSize: pageSize },
                success: function(data) {
                    // 2. 调用模板渲染页面
                    var html = template('userInfoTpl', data);
                    $('.table-user tbody').html(html);
                    totalPages = data.total / pageSize;
                }
            });
        }
    });

})
