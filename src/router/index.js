import Vue from 'vue';
import Router from 'vue-router';
//import Hello from '@/components/Hello';

import mainIndex from '@/components/mainIndex/mainIndex.vue'; //首页
import bannerDeta from '@/components/bannerDeta/bannerDeta.vue'; //轮播图详情
import basics from '@/components/center/basics/basics.vue'; //基本资料

import center from '@/components/center/center.vue'; //个人中心
import myCommodity from '@/components/myCommodity/myCommodity.vue' //我的果树模块
import noticeList from '@/components/noticeList/noticeList.vue' //公告列表模块
import allCommodity from '@/components/allCommodity/allCommodity.vue' //果园模块
import fruiterDeta from '@/components/fruiterDeta/fruiterDeta.vue' //果树详情模块

import earnings from '@/components/earnings/earnings.vue' //收益明细模块
import begats from '@/components/begats/begats.vue' //系谱图模块 老版
import begats2 from '@/components/begats2/begats2.vue' //系谱图模块 新版

import give from '@/components/give/give.vue' //金果赠送模块
import harvest from '@/components/harvest/harvest.vue' //金果采摘模块
import shareId from '@/components/shareId/shareId.vue' //分享账号模块
import wallet from '@/components/wallet/wallet.vue' //增值钱包模块
import noticeDeta from '@/components/noticeDeta/noticeDeta.vue' //增值钱包模块


import changeBasics from '@/components/center/changeBasics/changeBasics.vue'; //修改个人资料
import password from '@/components/center/password/password.vue'; //修改密码
import basicsOverview from '@/components/basicsOverview/basicsOverview.vue'; //个人信息概览

import all from '@/components/earnings/all/all.vue'; //收益明细->全部
import share from '@/components/earnings/share/share.vue'; //收益明细->分享
import performanc from '@/components/earnings/performance/performance.vue'; //收益明细->绩效
import topup from '@/components/earnings/topup/topup.vue'; //收益明细->充值

import harvestRequest from '@/components/harvest/harvestRequest/harvestRequest.vue'; //金果收获->申请提现
import depositRecord from '@/components/harvest/depositRecord/depositRecord.vue'; //金果收获->提现记录

import giveToFriend from '@/components/give/giveToFriend/giveToFriend.vue'; //金果赠送->赠送好友
import giveRecord from '@/components/give/giveRecord/giveRecord.vue'; //金果赠送->赠送记录
import getRecord from '@/components/give/getRecord/getRecord.vue'; //金果赠送->赠送记录



import login from '@/components/login/login.vue' //用户登录
import adminTree from '@/components/adminTree/adminTree.vue' //用户登录


import statistics from '@/components/statistics/statistics.vue' //注册统计
import S_register from '@/components/statistics/S_register/S_register.vue' //注册统计
import S_share from '@/components/statistics/S_share/S_share.vue' //注册统计

import leaveMsg from '@/components/leaveMsg/leaveMsg.vue' //我要留言模块
import account from '@/components/account/account.vue' //关联账户模块

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/mainIndex',
      name: 'mainIndex',
      component: mainIndex
    },
    {
      path: '/center',
      name: 'center',
      component: center,
      children: [{
          path: '/center/basics/basics.vue',
          component: basics
        },
        {
          path: '/center/changeBasics/changeBasics.vue',
          component: changeBasics
        },
        {
          path: '/center/password/password.vue',
          component: password
        },
      ],
    }, {
      path: '/basicsOverview',
      name: 'basicsOverview',
      component: basicsOverview
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/bannerDeta',
      name: 'bannerDeta',
      component: bannerDeta
    }, {
      path: '/myCommodity',
      name: 'myCommodity',
      component: myCommodity
    }, {
      path: '/noticeList',
      name: 'noticeList',
      component: noticeList
    }, {
      path: '/allCommodity',
      name: 'allCommodity',
      component: allCommodity
    }, {
      path: '/earnings',
      name: 'earnings',
      component: earnings,
      children: [{
          path: '/earnings/all/all.vue',
          component: all
        },
        {
          path: '/earnings/share/share.vue',
          component: share
        },
        {
          path: '/earnings/performance/performance.vue',
          component: performanc
        },
        {
          path: '/earnings/topup/topup.vue',
          component: topup
        },
      ],
    }, {
      path: '/begats',
      name: 'begats',
      component: begats
    }, {
      path: '/begats2',
      name: 'begats2',
      component: begats2
    }, {
      path: '/give',
      name: 'give',
      component: give,
      children: [{
          path: '/give/giveToFriend/giveToFriend.vue',
          component: harvestRequest
        },
        {
          path: '/give/giveRecord/giveRecord.vue',
          component: giveRecord
        },
        {
          path: '/give/getRecord/getRecord.vue',
          component: getRecord
        },
      ],
    }, {
      path: '/harvest',
      name: 'harvest',
      component: harvest,
      children: [{
          path: '/harvest/harvestRequest/harvestRequest.vue',
          component: harvestRequest
        },
        {
          path: '/harvest/depositRecord/depositRecord.vue',
          component: depositRecord
        },
      ],
    }, {
      path: '/shareId',
      name: 'shareId',
      component: shareId
    }, {
      path: '/wallet',
      name: 'wallet',
      component: wallet
    }, {
      path: '/fruiterDeta',
      name: 'fruiterDeta',
      component: fruiterDeta
    }, {
      path: '/noticeDeta',
      name: 'noticeDeta',
      component: noticeDeta
    }, {
      path: '/adminTree',
      name: 'adminTree',
      component: adminTree
    }, {
      path: '/statistics',
      name: 'statistics',
      component: statistics,
      children: [{
          path: '/statistics/S_register/S_register.vue',
          component: S_register
        },
        {
          path: '/statistics/S_share/S_share.vue',
          component: S_share
        },
      ],
    }, {
      path: '/leaveMsg',
      name: 'leaveMsg',
      component: leaveMsg
    }, {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '*',
      redirect: '/mainIndex'
    } //重定向（进来的默认跳转位置）
  ],

})
