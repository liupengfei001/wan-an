<!--
    ============= 轮播图的详情模块 =============
-->
<template>
<div id="bannerDeta">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <!-- 请求回来的轮播图详情 -->
  <img :src="bannerImg" alt="" style="width:100%">
  <!-- 请求回来的轮播图介绍 -->
  <div class="bannerDetaBox">
      <p><img src="./bannerDetaLogo.png" alt=""></p>
      <h3>{{detaName}}</h3>
      <div id="bannerDetaDeta" class="bannerDetaDeta">

      </div>
  </div>

  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "bannerDeta",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '轮播图详情', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      bannerImg:'', //；banner图片的地址
      detaName:'数据加载中...',
    }
  },
  components: {},
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
  created: function created() {
    //do something after creating vue instance
    var _this = this;
    var bannerId = _this.$route.params.bannerId;  //获取路由传入的ID
    // console.log(bannerId);
    //请求点入的banner的详情
    this.ajax(_this.port.bannerDeta, {
        id: bannerId
    }, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data;
        _this.bannerImg = res.data.img;
        _this.detaName = res.data.name
        $('#bannerDetaDeta').html(res.data.content);
        // console.log(_this.bannerImg);
      } else if (res.code == 0) {
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
