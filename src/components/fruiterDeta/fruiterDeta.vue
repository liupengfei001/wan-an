<!--
    ============= 果园详情模块 =============
    这么简单 还需要注释吗？
-->
<template>
<div id="fruiterDeta">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <img class="fruiterDetaPic" :src="Data.img == '' ? './static/img/timg.jpg' : Data.img " alt="">
  <div class="FDdetaBox">
    <div class="FDFruiterName">
      {{Data.name}}
    </div>
    <p class="global_orgBB"></p>
    <div id="FDFruiterDeta" class="FDFruiterDeta">
      {{Data.describe}}
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
  name: "fruiterDeta",
  data: function data() {
    return {
      iSsuccess: false,
      Data:{}, //请求回来的数据
      isLoading: false,
      pageName: '果树详情', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/allCommodity' //返回按钮跳转到的位置
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

},
created: function created() {
  //do something after creating vue instance
  var _this = this;
  var Tid = _this.$route.params.Tid
  this.ajax(_this.port.goodsDeta, {
      goods_id: Tid,
  }, 'GET', function(res) {
    // console.log(res);
    if (res.code == 1) {
      _this.Data = res.data;
      $('#FDFruiterDeta').html(res.data.describe);
    //   console.log(_this.Data);
    } else if (res.code == 0) {
      _this.$message.warning(res.message);
    } else {
      _this.$message({message: '噢哦~!服务器好像开小差了，请待会儿重试吧....',type: 'warning'});
    }
  })
}
}
</script>
<style>

</style>
