<!--
    ============= 收益明细模块 =============
-->
<template>
<div id="earnings">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <!-- 操作按钮模块 -->
  <div class="headTypeList">
    <div class="HeadTypeBox" :class=" allBtnFlag ? 'HeadTypeActive' : '' " @click="changeModule(1)">
      全部
    </div>
    <div class="HeadTypeBox" :class=" shareBtnFlag ? 'HeadTypeActive' : '' " @click="changeModule(2)">
      分享
    </div>
    <div class="HeadTypeBox" :class=" performanceBtnFlag ? 'HeadTypeActive' : '' " @click="changeModule(3)">
      绩效
    </div>
    <div class="HeadTypeBox" :class=" TopUpBtnFlag ? 'HeadTypeActive' : '' " @click="changeModule(4)">
      充值记录
    </div>
  </div>

  <!-- 显示的模块 -->
  <div class="bodyMainBox">
    <transition name="el-zoom-in-center">
      <all class="earnAllBox" v-show="allFlag"></all>
    </transition>
    <transition name="el-zoom-in-center">
      <share class="earnShareBox" v-show="shareFlag"></share>
    </transition>
    <transition name="el-zoom-in-center">
      <performanc class="earnPerformanceBox" v-show="performanceFlag"></performanc>
    </transition>

    <transition name="el-zoom-in-center">
      <topup class="earnPerformanceBox" v-show="TopUpFlag"></topup>
    </transition>
  </div>
  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
import all from '@/components/earnings/all/all.vue'; //收益明细->全部
import share from '@/components/earnings/share/share.vue'; //收益明细->分享
import performanc from '@/components/earnings/performance/performance.vue'; //收益明细->绩效
import topup from '@/components/earnings/topup/topup.vue'; //收益明细->充值记录
export default {
  name: "earnings",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '收益明细', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      shareFlag: false, //分享模块的开关
      allFlag: true, //全部分类的开关
      performanceFlag: false, //绩效模块的开关
      TopUpFlag: false, //充值记录的开关
      shareBtnFlag: false, //分享模块的开关
      allBtnFlag: true, //全部分类的开关
      performanceBtnFlag: false, //绩效模块的开关
      TopUpBtnFlag: false, //充值记录的开关
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
    } else if (hasLogin == null) {
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
    'all': all,
    'share': share,
    'performanc': performanc,
    'topup': topup
  },
  methods: {
    changeModule: function changeModule(typeNum) {
      var _this = this;
      var tempTimeOut
      if (typeNum == 1) {
        _this.shareFlag = false;
        _this.performanceFlag = false;
        _this.TopUpFlag = false;

        _this.TopUpBtnFlag = false;
        _this.performanceBtnFlag = false;
        _this.shareBtnFlag = false;
        _this.allBtnFlag = true;
        tempTimeOut = setTimeout(function() {
          _this.allFlag = true;
        }, 300)
      } else if (typeNum == 2) {
        _this.allFlag = false;
        _this.performanceFlag = false;
        _this.TopUpFlag = false;

        _this.TopUpBtnFlag = false;
        _this.allBtnFlag = false;
        _this.performanceBtnFlag = false;
        _this.shareBtnFlag = true;
        tempTimeOut = setTimeout(function() {
          _this.shareFlag = true;
        }, 300)
      } else if (typeNum == 4) {
        _this.allFlag = false;
        _this.performanceFlag = false;
        _this.shareFlag = false;

        _this.allBtnFlag = false;
        _this.performanceBtnFlag = false;
        _this.shareBtnFlag = false;
        _this.TopUpBtnFlag = true;
        tempTimeOut = setTimeout(function() {
          _this.TopUpFlag = true;
        }, 300)
      } else {
        _this.shareFlag = false;
        _this.allFlag = false;
        _this.TopUpFlag = false;

        _this.TopUpBtnFlag = false;
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

</style>
