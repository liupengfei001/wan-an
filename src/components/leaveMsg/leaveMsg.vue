<!--
    ============= 我要留言模块 =============
    这 个 页 面 不~！ 给~！注~！释~！
    因为还没开发
    现在开发了，但是很简单
    所以也不给注释啦~
-->
<template>
<div id="leaveMsg">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>

  <div class="leaveMsgBox global_boxSad">
    <h3>万岸客服1</h3>
    <p>wanankeji88</p>
    <img src="./88.png" alt="">
  </div>
  <div class="leaveMsgBox global_boxSad">
    <h3>万岸客服2</h3>
    <p>wanankeji888</p>
    <img src="./888.png" alt="">
  </div>
  <div class="leaveMsgBox global_boxSad">
    <p>客服服务时间:</p>
    <p>09:—12:00 14:00—17:00（工作日内）</p>
    <p>客服电话:13008136276</p>
  </div>

  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "leaveMsg",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '联系我们', //tiele的名称
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
}
</script>
<style>
.leaveMsgBox {
  width: 68%;
  margin: 0.2rem auto 0;
  text-align: center;
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.1rem 0;
}

.leaveMsgBox h3 {
  font-size: 0.32rem;
}

.leaveMsgBox p {
  font-size: 0.26rem;
}

.leaveMsgBox img {
  width: 60%;
  margin: 0.2rem;
}
</style>
