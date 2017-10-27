# wan_an_frontend

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

<!--

# 万岸-手机端

#    (项目采用前后端分离模式，数据来源都是走的接口)
#    (项目采用MVVM框架（VUE）：https://vuefe.cn/v2/guide/)
#    (项目采用饿了么UI：http://element.eleme.io/#/zh-CN/component/installation)

# 如果你有Vue 的经验请跳过大括号部分
#    {
#        安装依赖：npm install
#        启动项目：npm run dev
#        打包：npm run build
#    }


#如果你是昂恪的F4团队成员，或者 £团队成员 您可以跳过尖括号部分
#    <<<<<<<<<<<
#                       代码规范
#        1、全局变量/全局Css类名名用大写来声明（全局CSS用global-）
#        2、方法和变量，声明在作用域的最上方（并且注释清楚）
#        3、大的模块必须要有开头注释和结束注释
#        4、方法/函数声明时要备注该函数的作用，以及需要传入的形参的含义
#        5、定义方法名时，要能让人看得懂，或者说能翻译出来
#        6、CSS的模块必须要有开头注释和结束注释
#        7、id名采用xxx_xxx方式来命名（列如：nav_aboutUs）
#        8、class名采用xxx-xxx的方式来命名（列如：nav-list）
#        9、命名中有多个单词或者多个拼音时，采用驼峰命名法(列如：mainBox、guanYu)
#        10、js尽量使用最新技术规范；
#    >>>>>>>>>>>


# A、目录结构：

# 需要关注的：
# ！！！！新起的网络传销！！！！
# 6！->0000 0000 0000 0***
# 1、模板文件放置地点：src/components
# 2、打包后的文件放置地点：dist
# 3、vue配置文件放置地点：config
# 4、路由配置：src/router/index.js

# B、模板文件对应模块：、
#        （你看页面，其实跟页面结构差球不多，注意 /*两*/ 三点就行了：
#            1、头部模块，带返回箭头的那个   是共用的（这个用到的就多了）；
#            2、个人信息概览   也是共用的（主要是首页和个人中心中有用到）；
#            3、UI用的是饿了么的UI，详情请挪步：http://element.eleme.io/#/zh-CN/component/installation
#          ）
# mainIndex '@/components/mainIndex/mainIndex.vue'; //首页
# bannerDeta '@/components/bannerDeta/bannerDeta.vue'; //轮播图详情
# basics '@/components/center/basics/basics.vue'; //基本资料
# center '@/components/center/center.vue'; //个人中心
# myCommodity '@/components/myCommodity/myCommodity.vue' //我的果树模块
# noticeList '@/components/noticeList/noticeList.vue' //公告列表模块
# allCommodity '@/components/allCommodity/allCommodity.vue' //果园模块
# fruiterDeta '@/components/fruiterDeta/fruiterDeta.vue' //果树详情模块
# earnings '@/components/earnings/earnings.vue' //收益明细模块
# begats '@/components/begats/begats.vue'//系谱图模块
# give '@/components/give/give.vue'//金果赠送模块
# harvest '@/components/harvest/harvest.vue'//金果采摘模块
# shareId '@/components/shareId/shareId.vue'//分享账号模块
# wallet '@/components/wallet/wallet.vue'//增值钱包模块
# noticeDeta '@/components/noticeDeta/noticeDeta.vue'//增值钱包模块
# changeBasics '@/components/center/changeBasics/changeBasics.vue'; //修改个人资料
# password '@/components/center/password/password.vue'; //修改密码
# basicsOverview '@/components/basicsOverview/basicsOverview.vue'; //个人信息概览
# all '@/components/earnings/all/all.vue'; //收益明细->全部
# share '@/components/earnings/share/share.vue'; //收益明细->分享
# performanc '@/components/earnings/performance/performance.vue'; //收益明细->绩效
# harvestRequest '@/components/harvest/harvestRequest/harvestRequest.vue'; //金果收获->申请提现
# depositRecord '@/components/harvest/depositRecord/depositRecord.vue'; //金果收获->提现记录
# giveToFriend '@/components/give/giveToFriend/giveToFriend.vue'; //金果赠送->赠送好友
# giveRecord '@/components/give/giveRecord/giveRecord.vue'; //金果赠送->赠送记录
# getRecord '@/components/give/getRecord/getRecord.vue'; //金果赠送->赠送记录
#
#
#
# C、可能你会用到的地方：
# 1、打包的目录的配置：config/index.js:build里面
# 2、项目启动的端口号：config/index.js:dev:{port:xxxx}
# 3、项目封装的ajax函数在util.js里面，以及各个请求配置
# 4、在main.js中的主要工作是注册各个需要使用的组件

-->
