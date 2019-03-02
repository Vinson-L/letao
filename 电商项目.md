## 电商项目

>1.包含主流电商业务逻辑的移动端项目   
>2.学习的主要目标是掌握移动端应用开发

### 项目准备

#### 项目介绍

网站是中国主要的运动鞋、皮鞋网络零售网站，聚焦在垂直的鞋及其相关商品领域深耕。
凭借雄厚的资金实力和在电子商务业界的诚信积累，与Nike、Adidas、Converse、NewBalance等国际大牌深度合作。
保证了产品与专卖店同步更新，让您不出家门能最快速度买到当季新款名牌鞋。

#### 功能介绍

| 平台 | 模块 | 功能 |
|:------:|:-----:|:-----:|
|移动端web端|首页|静态展示页面模块|
|移动端web端|分类|一级分类、二级分类|
|移动端web端|商品|搜索中心、商品列表、商品详情|
|移动端web端|购物车|购物车管理|
|移动端web端|用户|登录、注册、账户管理|
|移动端web端|收货地址|展示、添加、编辑、删除|
|-|-|-|
|pc端后台管理|登录|管理员登录|
|pc端后台管理|用户管理|用户权限管理|
|pc端后台管理|分类管理|一级分类、二级分类管理|
|pc端后台管理|商品管理|商品录入、删除、修改、展示|

#### 项目架构
| 系统分层 | 使用技术 |
|------:|:----|
|数据层：|MYSQL|
|服务层：|NodeJs(express)|
|前端展示：|mobile web application,pc management system|

#### 开发模式
- 前后分离：  
 
 + 一种是前端先写一个静态页面，写好后，让后端去套模板。
 静态页面可以本地开发，也无需考虑业务逻辑只需要实现页面即可。
 不足是还需要后端套模板，这些前端代码后端需要浏览一遍，以免出错。

 + 另一种协作模式是，前端直接去写模板。
 这样做的问题在于，前端编写过程中很依赖与后端环境，需要依赖后台提供的接口。
 这种模式可认为是**前后分离模式**，也是**接口化开发**。
 ![前后分离](images/)
 
 + 不管哪一种开发模式都需要对服务层**session**有所了解。

- 了解session
 + 在计算机中，尤其是在网络应用中，称为**会话控制**。
 Session 对象存储特定用户会话所需的属性及配置信息。
 这样，当用户在应用程序的 Web 页之间跳转时，存储在 Session 对象中的变量将不会丢失，
 而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 Web 页时，
 如果该用户还没有会话，则 Web 服务器将自动创建一个 Session 对象。
 当会话过期或被放弃后，服务器将终止该会话。Session 对象最常见的一个用法就是存储用户的首选项。


#### 环境搭建

> 一般在进行前后分离开发需要配置好本地开发环境，  
> 也就是说需要在本地搭建后台开发环境，node，java，php，等后台编程语言，提供接口支持。

1. 项目后台编程语言是nodejs所有必须安装nodejs软件
2. 项目github主页 [https://github.com/zhousg/letao](https://github.com/zhousg/letao)
3. 可使用git拉取源代码
```text
    git仓库地址 https://github.com/zhousg/letao.git  
    克隆项目：$ git clone https://github.com/zhousg/letao.git  
    进入目录：$ cd letao/
    拉取项目：$ git pull origin master
```
4. 下载源码需要依赖的外部文件，其实就是包。
```text
    npm i  或者  npm install
```
5. 创建数据库直接在数据库中执行建库脚本 **letao初始化.sql**
6. 修改数据库连接
```javascript
    //修改models文件夹里面的db.js中的数据库链接信息
    const pool  = mysql.createPool({
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'letao'
    });
    //a)	host 数据库的ip地址
    //b)	user 数据库的用户名
    //c)	password 数据库密码
    //d)	database 数据库的库名
```
7. 启动项目
```text
    //进入项目目录
    npm start 
```

#### 接口列表

##### 移动端接口列表
1. 用户模块
 - [注册接口](#register)
 - [登录接口](#login)
 - [登出接口](#logout)
 - [修改密码接口](#update-password)
 - [查询个人信息接口](#query-user-message)
 - [注册验证码接口](#v-code)
 - [修改密码验证码接口](#v-code-for-update-password)
2. 产品模块
 - [搜索产品接口](#query-product)
 - [产品详情接口](#query-product-detail) 
3. 分类模块
   + [一级分类查询接口](#query-top-category)  
 - [二级分类查询接口](#query-second-category)
 - [火热的二级分类查询接口](#query-hot-second-category)
4. 购物车
 - [添加接口](#add-cart)
 - [修改接口](#update-cart)
 - [删除接口](#delete-cart)
 - [查询接口](#query-cart)
 - [查询带分页接口](#query-cart-paging)
5. 收货地址模块 
 - [添加接口](#add-address) 
 - [修改接口](#update-address) 
 - [删除接口](#delete-address) 
 - [查询接口](#query-address) 

##### pc端接口列表

1. 员工模块
 - [登录接口](#employee-login)
 - [退出接口](#employee-logout)
 - [是否登录接口](#check-root-login)
2. 产品模块
 - [产品新增接口](#add-product)
 - [上传产品图片接口](#add-product-pic)    
 - [产品修改接口](#update-product) 
 - [产品详情接口](#query-product-detail-list)
3. 分类模块
 - [一级分类新增接口](#add-top-category)   
 - [一级分类修改接口](#update-top-category)
 - [一级分类查询接口](#query-top-category-paging)
 - [二级分类新增接口](#add-second-category)  
 - [二级分类上传图片接口](#add-second-category-pic)  
 - [二级分类修改接口](#update-second-category)  
 - [二级分类查询接口](#query-second-category-paging)
4. 用户模块
 - [用户查询接口](#query-user)  
 - [用户启用停用接口](#update-user)
 - [品牌销量比较接口]()
 - [某产品按时间的销量图接口]()
 
 
### 移动端web端

#### MUI介绍

 - Mui 是一个ui框架 针对移动端开发的ui框架    只能适配移动端（流式布局）
 - 学习官网 http://dev.dcloud.net.cn/mui/
 - 官方文档 http://dev.dcloud.net.cn/mui/ui/
 - 组件展示 http://dcloud.io/hellomui/
 
  **特点**
  
   - 最接近原生APP体验的高性能前端框架
   - 轻量
       追求性能体验，是我们开始启动MUI项目的首要目标，轻量必然是重要特征；
       MUI不依赖任何第三方JS库，压缩后的JS和CSS文件仅有100+K和60+K
   - 原生UI
       鉴于之前的很多前端框架（特别是响应式布局的框架），UI控件看起来太像网页，没有原生感觉，因此追求原生UI感觉也是我们的重要目标
       MUI以iOS平台UI为基础，补充部分Android平台特有的UI控件
   - 流畅体验
       下拉刷新
       为实现下拉刷新功能，大多H5框架都是通过DIV模拟下拉回弹动画，在低端android手机上，
       DIV动画经常出现卡顿现象（特别是图文列表的情况）； 
       mui通过双webview解决这个DIV的拖动流畅度问题；拖动时，拖动的不是div，
       而是一个完整的webview（子webview），回弹动画使用原生动画

#### 首页模块

1. 页面骨架
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0"/>
    <title>乐淘首页</title>
    <link rel="stylesheet" href="assets/mui/css/mui.css"/>
    <link rel="stylesheet" href="css/common.css"/>
</head>
<body>
    <div class="lt_container">
        <header class="lt_topBar"></header>
        <div class="lt_content">
            <div class="lt_wrapper"></div>
        </div>
        <footer class="lt_tabBar"></footer>
    </div>
<script src="assets/mui/js/mui.js"></script>
</body>
</html>
```
2. 轮播图
3. 导航栏
4. 商品区

`学习目的：搭建页面骨架，使用mui轮播图组件。`

#### 分类浏览

1. 分类页面
2. 菜单区域滚动
3. 一级菜单渲染
4. 二级分类联动渲染

`学习目的：全屏页面，使用mui区域滚动组件，异步数据交互。`

#### 搜索中心

1. 搜索中心页面
2. 搜索查询功能
3. 搜索记录管理

`学习目的：完成页面，本地存储，模版引擎使用，关键字搜索。`

#### 商品列表

1. 商品列表页面
2. 搜索查询功能
3. 商品列表渲染
4. 列表排序功能
5. 上拉刷新功能
6. 下拉加载功能

`学习目的：完成页面，模版引擎使用，异步数据交互，mui下拉组件使用，mui上拉组件使用。`

#### 商品详情

1. 商品详情页面
2. 商品数据展示
3. 商品尺码选择
4. 商品数量选中
5. 加入购物车

`学习目的：完成页面，模版引擎使用，异步数据交互，mui下拉组件使用，mui数量选择组件，mui消息弹窗组件。`

#### 购物车

1. 购物车商品展示
2. 购物车商品删除
3. 购物车商品编辑
4. 购物车下拉刷新
5. 购物车总额计算

`学习目的：mui完成页面，模版引擎使用，异步数据交互，mui下拉组件使用，mui滑动列表组件，mui消息弹窗组件。`


#### 用户模块

1. 用户登录  

        1.1 用户登录页面  
        1.2 异步登录  
        1.3 登录回跳
        学习目的：使用mui完成页面，异步完成登录逻辑，异步登录回跳业务实现      
         
2. 个人中心

        2.1 个人中心页面  
        2.2 个人信息展示  
        2.3 退出功能
        学习目的：使用mui完成页面，异步个人信息渲染，异步退出交互。  
        
3. 用户注册

        3.1 用户注册页面  
        3.2 获取短信验证  
        3.3 用户注册功能
        学习目的：使用mui完成页面，短信校验业务，异步注册交互。 

 
### pc端后台管理

#### bootstrap介绍

> Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。
> Bootstrap 提供了全面、美观的文档。你能在这里找到关于 HTML 元素、HTML 和 CSS 组件、jQuery 插件方面的所有详细文档。  
> 还有很多基于bootstrap的插件，如paginator,validator

#### 管理员登录

1. 管理员登录页面
2. 异步登录交互

`学习目的：使用bootstrap完成页面，异步登录交互业务。`

#### 首页模块

1. 首页快速搭建
2. 菜单功能
3. 退出功能
4. 数据可视化

`学习目的：完成页面搭建，二级菜单交互功能，echarts完成数据可视化，退出业务。`

#### 用户管理

1.用户分页展示
2.用户禁用启用

`学习目的：完成页面搭建，二级菜单交互功能，echarts完成数据可视化，退出业务。`

#### 分类管理

1. 一级分类管理

        1.1 一级分类分页展示 
        1.2 一级分类添加
        1.3 一级分类删除
        学习目的：使用bootstrap完成页面，模态框添加功能，模态框删除功能。 

2. 二级分类管理  

        1.1 二级分类分页展示 
        1.2 二级分类添加  
        1.3 二级分类删除
        学习目的：使用bootstrap完成页面，fileuplaod图片上传,添加功能，模态框删除功能。 

#### 商品管理

1. 商品分页展示
2. 商品添加
3. 商品修改
4. 商品删除

`学习目的：完成页面搭建，fileuplaod图片上传，加功能，模态框删除功能。`
 
 
 








