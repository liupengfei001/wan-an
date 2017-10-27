<!--
    ============= 金果采摘模块 =============
-->
<template>
<div id="harvest">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>

<!-- 操作按钮模块 -->
  <div class="headTypeList">
    <div class="HeadTypeBox" :class=" allBtnFlag ? 'HeadTypeActive' : '' " @click="changeModule(1)">
      申请提现
    </div>
    <div class="HeadTypeBox" :class=" shareBtnFlag ? 'HeadTypeActive' : '' " @click="changeModule(2)">
      提现记录
    </div>
  </div>
  <!-- 显示模块 -->
  <div class="bodyMainBox">
    <transition name="el-zoom-in-center">
      <harvestRequest class="earnAllBox" v-if="allFlag"></harvestRequest>
    </transition>
    <transition name="el-zoom-in-center">
      <depositRecord class="earnShareBox" v-if="shareFlag"></depositRecord>
    </transition>
  </div>

  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
import harvestRequest from '@/components/harvest/harvestRequest/harvestRequest.vue'; //金果收获->申请提现
import depositRecord from '@/components/harvest/depositRecord/depositRecord.vue'; //金果收获->提现记录
export default {
  name: "harvest",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '金果采摘', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      shareFlag: false, //分享模块的开关
      allFlag: true, //全部分类的开关
      performanceFlag: false, //绩效模块的开关
      shareBtnFlag: false, //分享模块的开关
      allBtnFlag: true, //全部分类的开关
      performanceBtnFlag: false, //绩效模块的开关
    }
  },
  beforeRouteEnter(to, from, next) {
      // console.log(sessionStorage.getItem('accessToken'));
      let hasLogin = sessionStorage.getItem('accessToken')
    if (hasLogin == 0) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
  }else if (hasLogin == null) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
  } else {
      next()
    }
  },
  components: {
    'harvestRequest': harvestRequest,
    'depositRecord': depositRecord,
  },
  methods: {
    changeModule: function changeModule(typeNum) {
      var _this = this;
      var tempTimeOut
      if (typeNum == 1) {
        _this.shareFlag = false;
        _this.performanceFlag = false;

        _this.performanceBtnFlag = false;
        _this.shareBtnFlag = false;
        _this.allBtnFlag = true;
        tempTimeOut = setTimeout(function() {
          _this.allFlag = true;
      }, 300)
      } else if (typeNum == 2) {
        _this.allFlag = false;
        _this.performanceFlag = false;

        _this.allBtnFlag = false;
        _this.performanceBtnFlag = false;
        _this.shareBtnFlag = true;
        tempTimeOut = setTimeout(function() {
          _this.shareFlag = true;
      }, 300)
      } else {
        _this.shareFlag = false;
        _this.allFlag = false;

        _this.allBtnFlag = false;
        _this.shareBtnFlag = false;
        _this.performanceBtnFlag = true;
        tempTimeOut = setTimeout(function() {
          _this.performanceFlag = true;
      }, 300)
      }
    }
  }
}
</script>
<style>
#harvest .HeadTypeBox{
    width: 1.55rem;
}
</style>
