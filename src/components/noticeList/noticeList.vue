<!--
    ============= 公告列表模块 =============
-->
<template>
<div id="noticeList">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <router-link :to="{ name: 'noticeDeta', params: { noticeDetaId: data.id}}" tag="div" class="noticeListList" v-for="data in Data" :key="data.key">
    <div class="noticeDetaBox">
      <p class="global_txtOver">{{data.title}}</p>
    </div>
    <div class="noticeTimeBox">
      <div class="noticeTimeDeta">
        <span>{{data.created_at}}</span>
        <span>{{data.author}}</span>
      </div>
      <div class="noticeDetaBtn">
        查看详情
      </div>
    </div>
  </router-link>


  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "noticeList",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '公告列表模块', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      Data: {}, //数据盒子
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
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this
    this.ajax(_this.port.noticeList, {}, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data;
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
.noticeListList {
  background-color: #fff5ee;
  margin-top: 0.2rem;
  box-shadow: 1px 1px 6px #ccc;
}

.noticeDetaBox {
  font-size: 0.28rem;
  color: #222222;
  height: 0.65rem;
  line-height: 0.65rem;
  border-bottom: solid 1px #ffddd0;
  padding-left: 0.2rem;
  width: 100%;
}

.noticeTimeBox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  height: 0.6rem;
}

.noticeTimeDeta {
  font-size: 0.22rem;
  color: #aaaaaa;
}

.noticeDetaBtn {
  font-size: 0.24rem;
  width: 1.1rem;
  height: 0.4rem;
  border: solid 1px #f85b28;
  color: #f85b28;
  text-align: center;
  line-height: 0.4rem;
  border-radius: 0.07rem;
}
</style>
