// 因为入口函数等页面加载完才执行 会比普通代码要慢的  先执行创建构造函数 声明原型等代码
// 案例先执行console.log(1) 再 执行入口函数 执行console.log(2) 构造函数已经声明好了可以直接用
$(function() {
    /*搜索历史功能 使用本地存储技术 把搜索的内容 添加到本地存储中 使用本地存储中数据渲染页面*/
    // 1. 添加搜索记录
    //  1. 把搜索的内容追加入到本地存储的localstorage中
    //  2. 使用数组的方式去添加到本地存储中
    //          1. 第一次加里面的是空的使用空数组添加当前搜的值
    //          2. 第二次以后加 获取之前的数组 在原来数组的基础上去加
    //  3. 加完后调用查询刷新页面

    // 1. 创建 Letao对象的实例 letao
    var letao = new Letao('historyData1');
    // 调用对象里面的每个功能   
    // letao.addHistory();
    // letao.queryHistory();
    // letao.deleteHistory();
    // letao.clearHistory();
    // 2. 调用letao实例对象里面的一些函数
    // 因为每个函数里面都返回this对象 letao对象 
    // 当点下一个的时候 把前面当成一个表达式 取表达式的返回值来调用下一个函数 
    // 表达式的返回值就是函数 返回值 就是letao对象
    //调用添加 调用查询 调用删除 调用清空
    letao.addHistory().queryHistory().deleteHistory().clearHistory();
});

// 如果使用函数方式 这种方式会把函数的代码提前执行 等new Letao  函数已经声明了 也可以用
// function Letao(){

// }
//表达式的方式 虽然后面的匿名函数已经优先执行了 但是 赋值表达式没有优先执行 Letao函数还没被赋值
var Letao = function(key) {
    //key 表示本地存储需要操作的键 而且这个键参数大家都会用到可以放到构造函数参照传递
    this.key = key;
}
Letao.prototype = {
    // get 里面代码 相当于给全局 letao对象赋值  类似于在原型对象上定义一个historyData 
    // historyData: JSON.parse(localStorage.getItem(this.key) || '[]'),
    //添加历史记录函数
    addHistory: function() {
        console.log(this);
        //this表示当前调用函数的对象 addHistory是letao对象调用的 所以this就是letao对象
        var that = this; //把 this对象 赋值给 that 变量
        // 1. 给当前的搜索按钮添加点击事件
        $('.btn-search').on('tap', function() {
            // 但是事件里面也有this 事件也有函数 只要有函数都会this this就是当前调用这个函数的对象
            // 因为事件函数是当前添加事件的元素调用的 this就是当前元素
            console.log(that); // 指的是letao对象
            console.log(this); // 指定是当前按钮对象
            // 2. 获取输入输入的内容
            var search = $('.input-search').val();
            // 3. 进行非空判断 空格也要去掉 search.trim() 去除首尾空格  !是取反  !false == true !true == false
            if (!search.trim()) {
                alert('请输入合法的内容');
                //结束当前函数后面代码不执行 return false不仅可以结束当前的函数代码 还可以阻止元素默认行为
                return false;
            }
            // 4. 获取本地存储中的值判断如果有值 就在这个值的基础上添加 如果没有值 使用空数组添加
            //如果有数据 使用JSON.parse把字符串转成数组 如果没有数据 使用后面的空数组
            // 添加需求取值 先取值 
            // 调用查询数据的函数
            that.getHistoryData();
            console.log(that.historyData);
            // 5. 把当前输入的search添加到 searchData数组中
            // historyData.push(search);//往数组后追加
            // historyData.unshift(search);//往数组前追加
            // 6. 加的时候还需要去重 indexOf检测当前值是否在数组中存储 存在返回当前值的索引 不存在返回-1
            if (that.historyData.indexOf(search) != -1) {
                // 如果返回索引表示存在 把当前索引值的删掉  splice删除数组 中的元素 第一个是要删除的索引第二个参往后删除几个
                that.historyData.splice(that.historyData.indexOf(search), 1)
            }
            // 7. 确保去除重复后在往数组前面追加当前输入的内容
            that.historyData.unshift(search);
            console.log(that.historyData);
            // 8. 把数组存储到本地存储中 设置值 只能使用字符串 把数组转成字符串设置
            // 调用设置数据的函数
            that.setHistoryData();
            // 9. 输入完成后把输入框清空
            $('.input-search').val('');
            // 10. 添加完成调用查询刷新列表
            that.queryHistory();
            // 11. 当添加历史记录完成后 跳转页面 到搜索商品的列表页面 
            // 并且跳转页面还要把当前输入搜素内容传递到商品列表页面
            location = 'productlist.html?search='+search;
        });
        // 把函数执行完成返回当前调用函数this 对象 letao对象
        return this;
    },
    //查询历史记录函数
    queryHistory: function() {
        var that = this;
        // 2. 查询搜素记录
        //  1. 获取本地存储中 数组
        //  2. 把数组通过模板引擎渲染到列表

        // 1. 获取当前本地存储中的数组
        // 调用查询数据函数
        that.getHistoryData();
        // 2. 调用模板引擎的方法传入当前模板id和 数据 数组是一个数组不是对象 不是对象就要包 包在一个空对象的rows属性里面
        var html = template('historyListTpl', { 'rows': that.historyData });
        // 3. 把模板渲染到ul里面
        $('.search-history ul').html(html);
        return this;
    },
    deleteHistory: function() {
        var that = this;
        // 3. 删除搜索记录
        //  1. 点击了x获取当前点击x的索引
        //  2. 获取当前整个数组 把当前点击x对应索引元素删除
        //  3. 删除完成后重新存储到本地存储中
        //  4. 调用查询刷新页面
        // 1. 给所有x添加点击事件 动态添加列表 需要委托
        $('.search-history ul').on('tap', '.btn-delete', function() {
            // 2. 获取当前x按钮上的要删除的索引
            var index = $(this).data('index');
            // 3. 获取本地存储的数组
            // 调用查询数据函数
            that.getHistoryData();
            // 4. 调用删除方法 删除当前index的元素
            that.historyData.splice(index, 1);
            // 5. 删除完成重新存储到本地存储中
            // 调用设置数据函数
            that.setHistoryData();
            // 6. 删除完成后调用查询重新刷新页面
            that.queryHistory();
        });
        return this;
    },
    clearHistory: function() {
        var that = this;
        // 4. 清空搜索记录
        //  1. 直接把整个本地存储的键删除
        //  2. 调用查询刷新页面
        // 1. 获取清空按钮添加点击事件 
        $('.btn-clear').on('tap', function() {
            // 2. 获取本地存储清空 删除当前的historyData这个键 不要使用clear把所有本地存储记录都清空
            localStorage.removeItem(that.key);
            // 3. 重新调用查询刷新页面
            that.queryHistory();
        });
        return this;
    },
    // 获取本地存储的 历史记录数据
    getHistoryData: function() {
        var that = this;
        // 把从本地存储取值的代码封装成一个函数 大家可以重复使用获取值的代码
        that.historyData = JSON.parse(localStorage.getItem(that.key) || '[]');
    },
    // 设置本地存储的 历史记录数据
    setHistoryData: function() {
        var that = this;
        localStorage.setItem(that.key, JSON.stringify(that.historyData));
    }
}
