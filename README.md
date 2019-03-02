### 总结

1. 了解项目的架构和目录结构
2. 搭建项目的环境
3. 启动项目
4. 理解项目依赖包和引包顺序
5. 主页的搭建和轮播图组件的使用
6. 主页商品的布局
7. 主页区域滚动插件的使用
8. 使用git管理源代码和上传到github


## 常见网页布局方式和应用场景

1. 固定宽高： 在PC端jd 不考虑屏幕适配的页面
2. 浮动+定位： 
    浮动： 传统没有伸缩布局之前只能使用浮动实现块级元素一行显示   
    定位: 需要定到别的元素上 或者整屏上
3. 百分比布局(流式布局)+浮动： 需要考虑屏幕适配的页面
    1. 早期没伸缩布局 只能使用百分比实现 宽度(只能是宽度)自适应
4. 伸缩布局:宽度自适应  解决以上 块级元素不能一行显示 和 无法自适应屏幕
    1. 伸缩布局   === 浮动 + 百分比
    2. 伸缩布局只能实现宽度自适应
5. rem布局：宽高内容都自适应  解决以上所有问题
    1. rem =  伸缩布局宽度自适应 +  高度也自适应

6. 框架的栅格布局： 响应式布局 同时适配PC 移动端需要使用栅格布局


## 电商全端项目

1. 是一个综合移动端+PC端+node.js后台  (前端(PC+移动)+后端(node.js))    重点是前端
2. 学会移动web切图写页面 + 移动端基本交互 点击滑动之类的交互 + ajax请求数据 渲染模板 + PC切图 + PC 端的交互 + 请求数据渲染模板

## 搭建电商全端项目

1. 安装环境
    1. 安装node.js (用来开启nodejs服务器 提供数据API数据)
        1. 打开移动web第三天 1-教学资料 》 nodejs 找到对应位数的安装包
        2. 双击打开一路下一步安装 不要修改安装目录默认在C盘
        3. 验证是否安装成功 打开cmd  左下角开始菜单右键 》 运行 或者输入win+r 打开运行窗口输入cmd 回车
        4. 输入node -v  出现版本  v10.12.0 表示安装成功
    2. 安装phpstudy  (开启mysql数据库服务器)   没有安装的重新安装一下

2. 启动项目
    1. 下载项目
        <img src="1-教学资料/1.png" alt="">
    2. 导入数据库
        1. 找到数据sql文件 
            <img src="1-教学资料/2.png" alt="">
        2. 打开phpstudy 启动数据库
            <img src="1-教学资料/3.png" alt="">
        3. 导入数据库
            <img src="1-教学资料/4.png" alt="">
            <img src="1-教学资料/5.png" alt="">
            <img src="1-教学资料/6.png" alt="">
            <img src="1-教学资料/6-1.png" alt="">
    3. 开启数据库服务器   打开phpstudy 变绿
    4. 开启nodeAPi后台服务器 
        1. 进入letao-master文件夹的根目录
        2. 在空白处 按住shift+鼠标右键 在此处打开命令窗口
        <img src="1-教学资料/7.png" alt="">
3. 访问项目 
    1. 使用链接的方式访问      
       1. 乐淘完整版移动端 http://localhost:3000/mobile/index.html
       2. 乐淘完整版PC端 http://localhost:3000/manage/login.html
       3. 乐淘自写版移动端 http://localhost:3000/m/index.html
       4. 乐淘自写版PC端  http://localhost:3000/admin/login.html
    2. 使用书签的方式访问页面
        <img src="1-教学资料/10-1.png" alt="">
        <img src="1-教学资料/10-2.png" alt="">
        <img src="1-教学资料/10-3.png" alt="">
    3. 前端用户名密码 itcast   111111
    4. PC后台管理系统 用户名 root  123456


## 项目架构和项目的文件作用

  1. bin 项目启动目录
  2. docs 项目文档目录
  3. models 数据模型文件 增删改查数据库
  4. node_modules nodejs依赖包文件 类似前端lib
  5. public 前端项目根目录 （页面文件）
  6. routes nodejs APi路由文件  APiurl配置
  7. app.js项目根文件
  8. readme.md说明文档
    <img src="1-教学资料/项目的目录结构.png" alt="">

## 前端的项目文件夹public

  1. admin 自己写的PC后台管理系统文件夹
  2. m     自己写的移动端文件夹
  3. manage 完整版的后台管理系统文件夹
  4. mobile 完整版的移动端文件夹
    <img src="1-教学资料/public目录结构.png" alt="">
## 如何写前端代码

  1. 把m里面的除了lib和images都删掉
  2. 把admin里面除了lib和images都删掉
  3. 把项目在编辑器打开
      在public 里面的 m文件夹里面 创建一个移动端的主页index.html 然后写点代码
      在public 里面的 admin文件夹里面 创建一个PC端的登录页面login.html 写点代码
  4. 打开书签的自写移动端 和 自己写的PC后台管理系统 看看能不能看到自己写的代码


## 回顾项目启动

  1. 开启数据流库phpstudy  变绿
  2. 进入letao-master文件夹 在根目录打开黑窗  黑窗只能开启一个 执行npm start
  3. 通过书签的方式访问页面（一定要使用书签的链接的方式访问页面）

## 项目的依赖包 

  1. MUI ： 在移动端写页面的UI框架
  2. zepto: 是一个移动端的JS库 操作DOM和发送ajax请求 
  3. artTemplate ： 模板引擎的JS文件  用来渲染模板生成模板
  4. fontawesome ： 字体图标框架  实现页面的字体图标显示
  5. less ： 编译less 
  6. bootstrap: 在PC端用来写页面UI框架
  7. jquery：在PC端写JSDOM操作和发送ajax请求
    在移动端使用 MUI+zepto+fontawesome+arttemplate+less
    在PC端使用 bootstrap+jquery+arttemplate+fontawesome+less


## 项目的搭建

1. 添加视口和引包
    <!-- 添加视口 -->
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">  
    <title>自己写的乐淘移动端首页</title>
    <!-- 1. 为了实现屏幕适配在最上面先引入rem动态改变根元素字体大小的js -->
    <script src="js/rem.js"></script>
    <!-- 2. 引入MUI的CSS文件 -->
    <link rel="stylesheet" href="lib/mui/css/mui.css">
    <!-- 3. 引入字体图标的CSS文件 -->
    <link rel="stylesheet" href="lib/fontAwesome/css/font-awesome.css">
    <!-- 4. 引入自己主页的less文件 注意rel="stylesheet/less" -->
    <link rel="stylesheet/less" href="less/index.less">
    <!-- 5. 引入less的编译器文件 -->
    <script src="lib/less/less.js"></script>
    <!-- 1. 引入zepto的JS -->
    <script src="lib/zepto/zepto.min.js"></script>
    <!-- 2. 引入MUI的JS文件 -->
    <script src="lib/mui/js/mui.js"></script>
    <!-- 3. 引入模板引擎的JS文件 注意 引入template-web.js-->
    <script src="lib/artTemplate/template-web.js"></script>
    <!-- 4. 引入自己主页的js文件 -->
    <script src="js/index.js"></script>

2. 写页面结构
      <!-- 头部区域 -->
      <header id="header">
      </header>
      <!-- 中间的主体区域 -->
      <main id="main">
        <!-- 轮播图区域 -->
        <section id="slide"></section>
        <!-- 导航区域 -->
        <nav id="nav"></nav>
        <!-- 广告区域 -->
        <section id="banner"></section>
        <!-- 品牌专区 -->
        <section id="brand"></section>
        <!-- 运动生活专区 -->
        <section id="sport"></section>
        <!-- 女士专区 -->
        <section id="women"></section>
        <!-- 男士专区 -->
        <section id="men"></section>  
      </main>
      <!-- 底部区域 -->
      <footer id="footer">
      
      </footer>

3. 实现头部的布局

4. 实现广告 和 专区的栅格布局

## 主页的内容滚动效果实现

1. 学会使用MUI的区域滚动插件  http://dev.dcloud.net.cn/mui/ui/#scroll
2. 使用方式
    1. 引包
    2. 写结构 
        <div class="mui-scroll-wrapper">
          <div class="mui-scroll">
            <!--这里放置真实显示的DOM内容-->
            <!-- 整个main -->
          </div>
        </div>      
    3. 初始化区域滚动插件
        mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    4. 修改样式
        1. 给区域滚动外面添加一个相对定位的容器让区域滚动参照父元素相对定位而不是body
        <!-- 中间的主体区域 -->
        <main id="main">
          <div class="mui-scroll-wrapper">
            <div class="mui-scroll">
              <!--这里放置真实显示的DOM内容-->
              <!-- 整个main -->
            </div>
          </div>   
        </main>
        2. 由于设置了相对定位 但是里面区域滚动是绝对定位脱标导致父元素没有高度 所以还需要添加一个高度100%继承body 和 html的高度
              /* 让html和body的高度100% */

              html,
              body {
                  height: 100%;
              }


              /* 让main高度也是100% 跟body的内容一样高 */


              /* 因为main里面的区域滚动的盒子绝对定位 子元素脱标不能撑开父盒子高度  那就继承body  和 html的高度 */

              #main {
                  height: 100%;
                  position: relative;
                  overflow:hidden;
              }



## 第二天总结

1. 乐淘项目架构： 
    1. 前后端不分离的项目 前端后端代码都在一个文件夹letao-master
    2. 前端（移动端+PC端）  后端(nodejs) + 数据库
    3. 前端是public里面的  除了public其他都是 nodejs后端

2. 项目的环境搭建和启动
    1. 安装node.js 一路下一步
    2. 安装mysql 安装phpstudy即可 
    3. 导入数据 把letao-master里面的docs  里面的letao初始化.sql导入数据库 UTF-8编码问题
    4. 启动
        1. 开启数据库
        2. 开启nodejs黑窗  
        3. 进入letao-master根目录按住shift+右键  在此处打开命令窗口 powershell 窗口
        4. 输入npm start 回车 没有报错就表示成功
        5. 黑窗和数据库都不要关闭 黑窗只有能一个
            如果开启多个回车 报错 Port 3000 is already in use   3000端口被占用
            全部关闭再开一个（把node.js进程关闭）
3. 写前端代码
    1. 在public 前端目录
    2. m 自写移动端
    3. admin 自写的PC端
    4. mobile 完整移动端
    5. manage完整的PC端
    6. 在m里面 和 admin里面写代码 把 除了lib 和 images之外的都删掉
    7. 访问方式
        1. 使用链接访问
             1. 乐淘完整版移动端 http://localhost:3000/mobile/index.html
             2. 乐淘完整版PC端 http://localhost:3000/manage/login.html
             3. 乐淘自写版移动端 http://localhost:3000/m/index.html
             4. 乐淘自写版PC端  http://localhost:3000/admin/login.html
        2. 使用书签的方式访问
            1. 导入书签 点击书签的链接
4. 写移动端首页
    1. 引包 移动端需要MUI + fontawesome + zepto + arttemplate + less
        1. 先引入第三方CSS
        2. 在引入自己的CSS
        3. 如果有依赖先引入依赖 在引入不依赖的
        4. JS放后面引入(一些特殊的JS除外)
    2. 搭建首页布局
          写结构
          头部
          主体
            轮播图
            导航条
            广告
            品牌
            运动
            女士
            男士 
          底部
    3. 实现头部布局
        1. 使用rem单位 把页面所有px使用rem 
        2. 默认以1rem = 100px作为标准 设置根元素字体大小 默认 100px
        3. 写代码的时候把一些px单位 / 100  例如 45px   0.45rem
        4. 使用 fontawesome图标 让图标定位在右边
    4. 导航条 使用flex布局
    5. 广告使用flex布局
    6. 各种专区 flex布局
    7. 首页的区域滚动效果
        1. 给页面容器固定高度
        2. 以main为大容器 main固定高度 设置100%  body 100vh
        3. 给main设置相对定位 里面的区域滚动父容器设置绝对定位 父元素一定要相对定位
        4. 添加区域滚动的父容器 和 子容器
            <div class="mui-scroll-wrapper">
                <div class="mui-scroll">
                    真实的内容 轮播图 导航条等
                </div>
            </div>
        5. 使用JS初始化区域滚动 （查看官网文档）
  

## 分类页面的数据渲染

1. 获取一级分类数据的函数
     1. 使用ajax请求 数据接口 /category/queryTopCategory
     2. 创建页面标签的模板
     3. 调用模板生成的函数 生成html
     4. 把生成的模板渲染到左侧分类

2. 获取二级分类的函数
     1. 点击了一级分类去获取二级分类
     2. 获取当前点击的一级分类的id
     3. 根据当前一级分的id调用二级分类的APi接口获取二级分类数据
     4. 创建 和 渲染模板
     5. 切换点击a的元素li的active类名

## 商品搜索历史记录的功能

1. 添加搜索记录
  根据输入输入框内容点击搜索添加到本地存储中
  而且要把每次都是的内容都加进去(使用一个数组的方式 追加)
      1.1 给搜索按钮添加点击事件     
      1.2 获取当前文本输入的内容 判断如果用户没有输入提示请输入
      1.3 获取本地存储中已经存储的数据  并且转成一个数组 
          如果有值就使用JSON.parse转换成数组 如果没有值 使用空数组
      1.4 把当前输入文本的内容 往前插入到数组中
      1.4.1 去数组查询一下当前搜索的内容是否存在 存在删除 再往前追加          
      1.4.2 调用删除的方法删掉当前索引的值 删1个
      1.4.3 删掉了之后再往数组的前面追加
      1.5 把数组保存到本地存储中 往本地存储存储值的时候也要转成字符串存储
      1.6 添加完成调用查询的方法查询历史记录 
      1.7 添加完成后清空输入框
2. 查询搜索记录
  查询本地存储中的搜索记录 
  渲染搜索历史列表
    2.1 获取本地存储中已经存储的数据  并且转成一个数组 
    2.2 调用历史记录的模板 传入当前的搜索历史的数据 
        但是数据是一个数组 不是一个对象 把数组转成一个对象再传入模板函数里面

3. 删除搜索记录
  点击x删除当前搜索记录 
  获取当前点击搜索内容去数组中删除
  删除完成后保存到本地存储中
    3.1 给所有的删除x添加点击 tap
    3.2 获取当前点击x的删除的索引
    3.3 获取本地存储中已经存储的数据  并且转成一个数组 
    3.4 把数组中当前要删除的索引的元素删掉
    3.5 删除完成后要把数组重新保存到本地存储中
    3.6 删除完成后要重新查询刷新页面
4. 清空搜索记录
  把整个本地存储的键清空  
    4.1 给清空按钮添加点击事件
    4.2 把整个本地存储的键清空removeItem  不要使用clear
    4.3 清空完成后重新刷新页面



## 第三天总结

1. 分类页面布局
    上
      左 中 右  圣杯布局
    中
      左侧分类
      右侧分类
      flex伸缩布局
    下
2. 分类页面的功能
  1. 左侧 和右侧分类的滑动
  2. 加一个区域滚动
    <div class="mui-scroll-wrapper">
      <div class="mui-scroll">
        <ul>真实ulli内容</ul>
      </div>
    </div>
  3. 设置样式
    给父元素设置相对定位
    父元素高度从父元素继承下来
    main父元素从body继承
  4. 初始化区域滚动
  5. 内容高度没有超过父容器高度 无法滚动（给内容写一个min-height比父元素稍微高1px）
  6. 右侧分类padding不会影响到定位元素的  给里面ul设置padding 因为li没有定位
  7. 设置align-content: flex-start;  让内容对齐方式不要平铺拉伸 而是从顶部对齐
3. 分类数据请求
  1. 请求一级分类 /category/queryTopCategory
  2. API都是在locahost:3000下面的    / 表示根目录  注意/不能漏掉了
    locahost:3000/category/queryTopCategory
  3. 创建模板渲染模板
      模板参数数据必须是对象 已经是对象没有包装一个空对象里面
      如果数据里面有数组需要遍历 
      数组名叫什么each什么 后台一般返回rows数组  each rows
  4. 右侧通过点击了左侧再发请求
      1. 获取左侧点击的分类id(自定义属性绑定在每个a身上)  通过data('id') 专门获取自定义属性的
      2. 根据id请求二级分类数据
      3. 渲染右侧分类
      
4. 商品搜索的布局
    搜索表单  flex布局 （去掉输入框右边圆角 和 按钮左边的圆角）
    搜索历史  使用MUI 卡片
    内容使用列表  右侧添加数字角标等控件
5. 搜索的功能
  1. 添加搜索记录
      1. 点击按钮获取输入值
      2. 非空判断 !search.trim()  先去空格 再 取反
      3. 获取之前的记录如果有就获取(getItem)转成数组JSON.parse 没有使用空数组
      4. 判断 值在数组中存不存在indexOf 存在把值删掉 splice
      5. 不存在或者删掉之后再往数组的前面添加 unshift
      6. 把数据保存到本地存储中 setItem 转成字符串JSON.stringfy()
      7. 重新调用查询刷新
  2. 查询搜索记录
      1. 获取记录的值 转成数组
      2. 创建模板 把数组转成对象传入模板里面
          historyData = {rows:historyData};  把数组存到对象里面 重新覆盖原来的数组
          <!-- var num = 10;
          num = num+10; -->
      3. 调用模板渲染页面
      
  3. 删除搜索记录
      1. 给所有删除x绑定一个索引  根据索引来删除
      2. 给x加事件 获取当前点击x的删除的索引
      3. 获取所有数组 根据当前的索引去删除这个元素 splice(index,1);
      4. 删完后重新保存到存储里面
      5. 重新调用查询刷新
  4. 清空搜索记录
      1. 点击清空的时候把整个键删掉 removeItem() 不要使用clear 会把别人删掉
      2. 重新查询刷新页面

6. 商品列表布局
    1. 表单使用搜索页面的表单
    2. 商品列表使用首页的商品列表
7. 商品列表搜索功能
    1. 拿到当前要搜索的关键字
    2. 在搜索页面点击搜索加完历史记录后 跳转到商品列表并且传入一个参数 当前输入搜索的内容
    3. 在商品列表获取传递过来参数的值
        decodeURI(location.search.split('=')[1])  只能拿1个参数 如果有多个参数 去思考一下
    4. 调用查询商品APi传入当前搜索关键字
      API需要传入一些必传参数page 页码数   pageSize   每页大小 选择传入proName=search
    5. 创建模板 渲染商品列表
    6. 文字不等设置固定显示2行 超出隐藏 设置固定高度 和 行高 只能显示2行 overflow:hidden 隐藏溢出

## 商品列表的功能

### 1. 根据url搜索商品列表功能
    1.1 获取当前商品列表url里面要搜索的参数  ?search=鞋  获取当前这个'鞋'
        获取url参数的方式
        1. 如果不考虑多个的话使用字符串分割 用=号分割 取分割的后面的[1]
           如果有中文会有乱码问题要使用decodeURI转码
           decodeURI(location.search.split('=')[1]);
        2. 如果考虑多个参数 要获取指定的参数 推荐使用正则匹配  
            百度链接：  https://www.cnblogs.com/Arlar/p/6606259.html
            getQueryString: function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = decodeURI(window.location.search).substr(1).match(reg);
                if (r != null) return decodeURI(r[2]);
                return null;
            }
            传入需要获取参数值的参数名 获取参数值 原理是使用正则根据参数名匹配=号后面的参数值 然后转码成中文
            使用方式 调用当前getQueryString 方法传入参数名(字符串类型参数) 获取到参数值并且解决中文乱码问题
              ?search=鞋&price=1
              this.getQueryString('search')  == 鞋
              this.getQueryString('price')  == 1

    1.2 根据当前搜索的关键字去调用API搜索商品列表
    1.3 创建一个模板 渲染商品列表数据
    1.4 调用模板方法生成html 渲染到页面

### 2. 点击搜索按钮实现商品搜索功能
    1.1 给搜索按钮添加点击事件
    1.2 获取输入框输入的文本内容
    1.3 根据当前搜索的关键字去调用API搜索商品列表
    1.4 创建一个模板 渲染商品列表数据      
    1.5 调用模板方法生成html 渲染到页面

### 3. 商品的排序功能 点击价格 或者 销量能够实现商品的排序
     3.1 给所有排序按钮添加点击事件
     3.2 获取当前点击的排序的方式
          (在页面中就要定义这种排序的属性) 只要获取排序的data-sort-type属性的值     
     3.3 获取当前排序的顺序 
             price 1是升序  2 降序
             num  1是升序  2 降序
             需要在页面中定义排序的顺序 默认都为1
             在JS中去获取当前的排序的顺序如果为 1  变成 =  2  如果为2变成1
         3.8 获取当前排序里面的i标签  删除之前的类名 再添加新的类名
     3.4 判断你当前是属于哪一种排序的方式 如果是price 就行价格排序 如果num就进行num排序
         3.5 调用APi传入当前排序的顺序   
                3.6 调用模板 
                 3.7 渲染页面
         3.5 调用APi传入当前排序的顺序   
                 3.6 调用模板 
                 3.7 渲染页面
                 
### 4. 下拉刷新搜索最新的商品

  1. 学会下拉刷新和上拉加载插件的使用
    1. 写页面结构
      <!--下拉刷新容器  就是区域滚动的父容器-->
      <div id="refreshContainer" class="mui-content mui-scroll-wrapper">
          <!-- 区域滚动的子容器 -->
          <div class="mui-scroll">
              <!--真实要刷新的滑动的内容-->
              <ul class="mui-table-view mui-table-view-chevron">
              </ul>
          </div>
      </div>
    2. 初始化
        mui.init({
            //指定初始化刷新的功能
            pullRefresh: {
                //初始化刷新的功能的容器
                container: '#refreshContainer',
                //初始化下拉刷新
                down: {
                    //是下拉刷新的回调函数 发送ajax请求刷新页面 并结束下拉刷新效果
                    callback: pulldownRefresh
                },
                //初始化上拉加载
                up: {
                    contentrefresh: '正在加载...',
                    //是上拉的回调函数 发送ajax请求追加页面 并结束上拉加载效果
                    callback: pullupRefresh
                }
            }
        });
        /**
           * 下拉刷新具体业务实现
           */
          function pulldownRefresh() {
              //定时器为了模拟请求的延迟
              setTimeout(function() {
                 // ajax请求 渲染刷新页面
                 $.ajax()
                 //当页面刷新完成结束下拉刷新效果 不结束会一直转
                  mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
              }, 1500);
          }
          var page = 1;
          /**
           * 上拉加载具体业务实现
           */
          function pullupRefresh() {
              setTimeout(function() {
                  // ajax请求 追加渲染页面
                  $.ajax()
                  //当页面刷新完成结束上拉加载效果 不结束会一直转
                  mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                  //如果传入一个参数true表示上拉加载到底了没有更多数据了
                  mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
              }, 1500);
          }
    3. 下拉和上拉的一些常用的方法
          1. 结束下拉刷新  
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
          2. 结束上拉加载  
            mui('#refreshContainer').pullRefresh().endPullupToRefresh();
          3. 结束上拉加载并且提示没有数据     
            mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
          4. 重置上拉加载功能  
            mui('#refreshContainer').pullRefresh().refresh(true);
    
    4. 功能具体实现步骤
          4.1 初始化下拉刷新和上拉加载功能
          4.2 指定下拉刷新的回调函数 发送ajax请求刷新页面 并结束下拉刷新效果
          4.3 发送ajax请求 渲染刷新页面
          4.4 调用模板 
          4.5 渲染页面
          4.6 当页面刷新完成结束下拉刷新效果 不结束会一直转
          4.7 除了需要下拉刷新还要重置上拉加载  
          4.8 把page也重置为1

### 5. 上拉加载搜索更多商品 往当前列表的后面追加更多的商品

  
 
    5.1 指定上拉的回调函数 发送ajax请求追加页面 并结束上拉加载效果
    5.2 ajax请求下一页的数据 追加渲染页面
    5.3 请求下一页数据 定义page变量默认=1  ++page    每次请求下一页
    5.4 判断当前返回数据的data数组是否还有长度 有长度表示还有数据 只要上拉 
    如果没有长度 表示没有数据 结束并提示没有数据了
    5.5 调用模板 
    5.6 追加页面
    5.7 当页面刷新完成结束上拉加载效果 不结束会一直转
    5.8 如果传入一个参数true表示上拉加载到底了没有更多数据了

## 1. 实现商品列表跳转到商品详情

  1. 点击立即购买跳转到商品详情
  2. 使用JS给按钮加事件 跳转 传递当前商品id参数

## 2. 实现商品详情页面的布局

  1. 轮播图 
  2. 商品信息 MUI 列表
  3. 商品尺码 mui默认按钮
  4. 商品数量 mui数字输入框

## 3. 实现商品详情的页面动态渲染

  1. 通过封装好的查询url参数值的函数获取 id参数的值
  2. 请求API获取数据 传入当前id参数
  3. 这个返回数据data.size尺码是字符串 40-50字符串 把字符串转成数组
        // 3.1  拿到当前字符串最小值
        var min = data.size.split('-')[0] - 0;
        // 3.2  拿到当前字符串最小值
        var max = data.size.split('-')[1];
        // 3.4 把data.size赋值为空数组
        data.size = [];
        // 3.5 循环从最小开始到最大结束
        for (var i = min; i <= max; i++) {
            // 3.6 把循环的每个都添加到数组里面
            data.size.push(i);
        }
  4. 调用商品详情的模板生成html
      
  5. 等到页面中的商品详情信息加载完了后再 初始化区域滚动
  6. 等轮播图结构出来了之后再初始化轮播图
  7. 等数字框出来后手动初始化
  8. 等尺码出来后手动初始化点击


## 4. 加入购物车

  1. 给加入购物车按钮加事件
  2. 让尺码能够点击 给所有尺码加点击事件 切换active类名
  3. 获取选中尺码和数量
  4. 判断当前尺码和数量是否选中
  5. 没有选中使用mui.toast('消息提示框') 提示用户选择
  6. 调用API加入购车
      1. 传参设置productId:当前url获取id(作为全局变量) size:获取的尺码  num: 当前获取的数量
      2. type设置为post 提交 都是post
      3. 还需要登录 （先使用完整版登录 cookie都是一个网站是共享的）
      4. 返回错误信息表示未登录 跳转到登录页
      5. 如果成功跳转到购物车(未实现)
      6. 如果加入成功可以去完整版购物车查看 

## 1. 登录页面

    1. 登录页面的布局 使用MUI 输入表单
    2. 登录的功能
        1. 获取用户输入用户名密码 
        2. 判断是否输入 进行提示输入
        3. 调用APi去登录
        4. 如果登录失败提示用户失败的原因
        5. 登录成功返回上一页（后续你们需要返回到指定页面）

## 2. 注册页面

    1. 实现注册页面的布局 使用MUI输入表单
    2. 注册功能
        1. 获取用户输入手机号 用户名 密码 确认密码 验证码
        2. 验证是否输入（MUI表单验证的代码） 改一下选择器 定义var check = true
        3. 判断手机号是否合法
        4. 密码是否输入一致 不一致就提示
        5. 验证码是否一致  不一致就提示
        6. 点击获取验证码 把验证码作为全局变量 
        7. 获取之前全局变量的验证码 和当前输入进行判断 
        8. 调用注册APi实现注册 
            type : post 传参 注册失败提示失败原因 
            注册成功跳转到登录页面

## 3. 登录成功后返回指定页面

    1. 从详情 到 登录  返回详情
    2. 从注册 到 登录 返回首页
    3. 跳转到登录的时候就把你要返回的页面url传递过来
        参数名returnUrl  参数值 当前详情页地址
        location = 'login.html?returnUrl=' + location.href;
        参数名returnUrl  参数值 首页url
        location = 'login.html?returnUrl=index.html';
    4. 在登录页面只需要获取当前returnUrl的值就知道需要回到哪个页面
        // 1. 获取当前登录页面的参数 returnUrl 的值
        var returnUrl = that.getQueryString('returnUrl');
        // 2. 使用location 手动跳转到这个地址
        location = returnUrl;


## 4. 商品加入购车提示

    1. 使用MUI确认框提示 加入购物车成功 是否去购物车查看
    2. 有个回调函数 e.index == 0 点击了确定 e.index ==1 表示点击了取消
    3. 点击确定跳转到购物车 取消就提示用户继续添加

## 5. 实现购物车页面布局

    1. 使用mui列表 媒体列表 带箭头列表 带滑动的列表   三合一实现列表  把他们不同的类名加在同一个标签
    2. 左边默认一个图片左浮动 左边需要加一个复选框 把图片和复选框包在一个容器里面
      <!-- 媒体列表的左边  -->
      <div class="mui-pull-left product-left">
          <img class="mui-media-object " src="/mobile/images/product.jpg">
          <!-- MUi的复选框 注意复选框里面设置定位需要调整他的位置-->
          <div class="mui-input-row mui-checkbox mui-left">
              <input name="checkbox1" value="Item 1" type="checkbox">
          </div>
      </div>
    3. 使用MUI官方的复选框
        样式需要注意把定位去掉变成static 给盒子加上text-align:center居中
    4. 商品名称默认不换行 去掉去掉不换行的样式
      <p class="product-name">匡威三星标1970s converse复刻 142334c 144757c三星标黑色高帮</p>
      .product-name{
          /* 强制让文本换行或者不换行 normal自动 */
          white-space: normal;
          color:#666;         
        }
    5. 给商品尺码和数量放到一起设置 两端对齐
        .product-params{
          display:flex;
          justify-content: space-between;
        }

## 6. 实现购物车的查询渲染
    1. 发送ajax请求购物车商品数据
    2. 渲染页面
        注意数据如果没有的时候返回是一个空数组 不是对象 模板用 了会报错判断如果数组转成对象 里面data:[]
        // 因为data数据后台返回有点问题 当没有数据 后台直接返回空数组 而不是对象 
        // 如果是空数组传入到模板使用里面的data会报错
        if (data instanceof Array) {
            // 判断如果是一个空数组 赋值给一个对象 里面有data数组值为空
            data = {
                data: []
            }
        }

## 7. 实现购物车的下来刷新和上拉加载更多   
      1. 添加下拉上拉结构
      2. 初始化下拉刷新和上拉加载
      3. 在下拉刷新的函数请求最新的数据
      4. 结束下拉刷新的效果(不结束会一直转)
      5. 定义一个page = 1;
      6. 上拉加载的回调函数让page++
      7. 请求page++了之后的更多的数据
      8. 追加append到购物车的列表
      9. 结束上拉加载效果
      10. 判断如果没有数据的时候结束并且提示没有数据了  调用结束上拉加载效果传递一个true
      11. 下拉结束后重置上拉加载的效果
      12. 把page也要重置为1



## 1. 商品删除
      1. 给删除按钮添加事件
      2. 弹出确认框问用户是否要删除
      3. 如果e.index == 0 点击确定
      4. 获取当前要删除id去删除（绑定在按钮 这里面确认有回调函数会改变this指向把按钮提前保存在that）
      5. 调用APi删除商品 删除调用查询刷新页面
      6. 如果e.index == 1点击取消  关闭滑动效果
          // 1. 获取当前要滑动回去的li 只能使用dom元素 不能是zpeto对象
          var li = that.parentNode.parentNode;
          // 2. 调用官方的滑动关闭函数
          mui.swipeoutClose(li);

## 2. 编辑购物车的商品
      1. 给编辑按钮添加点击事件
      2. 弹出框框让用户编辑
      3. 框框里面需要放当前商品尺码 数量标签选择
      4. 提前准备商品尺码 和 数量标签
      5. 使用模板 需要商品数据 把商品数据绑定在编辑按钮上
          data-product="{{value}} 把整个商品对象绑定在属性里面
      6. 通过JS获取整个商品对象 把尺码变成数组 
      7. 调用模板生成html
      8. 把html字符串的回车换行去掉 
        html = html.replace(/[\r\n]/g, '');
      9. 把HTML放到确认框里面
      10. 对按钮和数字框初始化放到确认框的后面  注意不是里面 里面回调函数点击确定和取消的
      11. 点击确定获取最新尺码数量 调用API更新购物车商品数据 如果成功重新查询渲染页面
      12. 如果点击取消吧li滑动回去


## 3. 真机调试

    1. 让手机(真实手机) 看到我们写的移动web页面
    2. 上网原理
        1. 上网不是虚拟的 是有真实的物理传输  把服务器的文件 通过网络下载到你的本机设备 实现上网
        2. 手机上网 通过手机网络 去服务器请求文件  浏览器接收服务器请求的文件 保存手机上 通过浏览器把文件(html 图片)显示出来
        3. 局域网 广域网
            1. 局域网 内网 在同一个网关上就是一个局域
            2. 广域网 外网  连上外网（全球 全国性）
        4. 网站想让外网访问
            1. 你的网站得部署到外网的服务器 （阿里云 新浪云等等 电脑）
            2. 这种电脑 和 广域网在一个网关
        5. 网站想让内网范围
            1. 你的网站 得部署到 内容的服务器(电脑)
            2. 你的内网电脑 和 内网在一个网关上
    3. 真机调试的原理 就是利用内网 让手机和电脑通过内网在一个网关上  手机通过网关请求到服务器上的文件
    4. 真机调试步骤
        1. 让手机和电脑在一个局域网
            1. 手机电脑 都连接同一个wifi  (网关是一样 网关在路由创建)
            2. 手机开热点 电脑连接手机wifi (网关也是一样 在手机上创建的)
                1. 打开设置
                2. 打开个人热点
                3. 移动网络  》 个人热点
                4. 开启热点 有一个wifi  会有密码()
                5. 电脑连接这个wifi
                6. 教室的网线有点坑 插了网线 连接了教室的网络 不能连接wifi  测试电脑能不能上网(保证连接了能够上网 把网线拔了)
            3. 电脑开热点 手机连接电脑wifi (网关在电脑上创建)
                1. 打开电脑设置 网络设置  移动热点  打开
                2. 手机去找到wifi连接即可
        2. 使用电脑开启网页服务器  目前npm start就是服务器  localost:3000就是服务器
            默认这个是本机服务器 把他改成ip地址服务器 
            http://localhost:3000/m/index.html
            http://192.168.137.1:3000/m/index.html
        3. 使用手机打开这个页面
            1. 安装二维码插件手机扫描打开
            2. 手机对着网址输入打开 http://192.168.137.1:3000/m/index.html
            3. 使用微信QQ把网址发给手机
        4. 注意手机扫描打不开 防火墙没关


## 移动端点透问题

      1. 点透： 点击按钮透过按钮 点击到了a标签
      2. 点击了是立即购买按钮  但是按钮添加 tap事件（不延迟的点击事件）
        我们在tap事件里面执行跳转到详情页面的操作（不是一下子跳过去是需要时间）
        还没有跳过的去的时候 又触发了a的默认跳转 a默认跳到#  a里面又要跳转到当前页面
        因为a在按钮的后面执行的跳转 所以a覆盖了按钮的跳转
      3. 解决方法 就是阻止a默认行为
      4. 把a删掉 现在a也是没有用的 已经通过按钮能跳转了不需要使用a
      5. 使用fastclick包 除了可以解决延迟 还可以解决点透（fastclick包里面 加click事件 不会触发父元素a事件 里面做了阻止a默认跳转的操作）
      6. 如何防止点透
          1. 原因的原因是点击事件的延迟造成
          2. 不使用click之类的事件 不使用a（click）跳转 全部 tap代替
          3. 使用fastclick包
          4. 全部用click不要tap


## 找网站 扒网站



## 移动端常见的兼容性问题

      https://www.jianshu.com/p/cb2d8ca8cff2

      https://blog.csdn.net/diqi77/article/details/54692920/


      1. 二倍图问题
      2. 屏幕缩放问题
      3. 点击事件延迟问题
      4. input内边框问题
      5. 移动端点击事件点透问题
      6. MUI的一些奇怪的问题 等等
