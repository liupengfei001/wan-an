<!--
    ============= 我的果树模块 =============
-->
<template>
<div id="myCommodity">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <div v-if="hasT" class="">
    <img class="fruiterDetaPic" :src="Data.img_path" alt="">
    <p style="font-size:0.3rem;text-align:center;color:#222;margin-bottom:0.2rem;" v-if="!Data.img_path">
        您的果树还在种植中，请耐心等候。
    </p>
    <div class="FDdetaBox" style="padding-bottom:0.18rem;">
      <div class="FDFruiterName">
        {{Data.fruiter_name}}
      </div>
      <div class="global_nullDiv">

      </div>
    </div>
  </div>
  <div v-if="!hasT" class="myCommodityRow">
    <p><img src="../../assets/shit.png" alt=""></p>
    <p>您还没认购果树呢</p>
  </div>
  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "myCommodity",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '我的果树', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      hasT: false, //是否拥有果树
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
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this;
    this.ajax(_this.port.myFruiter, {}, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.hasT = true
        _this.Data = res.data
      } else if (res.code == 0) {
        _this.hasT = false
        _this.$message.warning(res.message);
      } else {
        _this.$message({
          message: 'shit~!服务器好像开小差了，请待会儿重试吧....',
          type: 'warning'
        });
      }
    })
  }
}
</script>
<style>
</style>
