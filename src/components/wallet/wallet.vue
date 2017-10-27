<!--
    ============= 增值钱包模块 =============
    这 个 页 面 不~！ 给~！注~！释~！
    因为还没开发
-->
<template>
<div id="wallet">
    <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
    <img src="./../../assets/walletBg.jpg" alt="" style="width:100%;margin-top:0.2rem">

    <!--遮罩层及loading-->
    <div v-if="iSsuccess" class="bgblacks  in"></div>
    <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
    <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "wallet",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '增值钱包', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex' //返回按钮跳转到的位置
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
}
</script>
<style>
</style>
