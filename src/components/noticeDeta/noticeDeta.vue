<!--
    ============= 公告详情模块 =============
-->
<template>
<div id="noticeDeta">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>

  <div class="noticeDetaMain global_boxSad">
    <div class="noticeDetaTitBox">
      <h2>
                <span class="global_titLog"></span>
                {{Data.title}}
            </h2>
      <div class="noticeTimeDeta">
        <span>{{Data.created_at}}</span>
        <span>{{Data.author}}</span>
      </div>
    </div>
    <div class="noticeDetaDeta" id="noticeDetaDetail">
      <!-- 水电费收到发撒的路撒地方的收到水电费 发斯蒂芬是的法律框架撒的加适量的放假了设计费类似地方死定了房价了手机端分类收代理费路撒地方 类似地方了收代理费爱丽丝打飞机 老师的啦sd 阿萨德了就 -->
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
  name: "noticeDeta",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '公告列表', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/noticeList', //返回按钮跳转到的位置
      Data:{},
      noticeMain: {},
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
    var _this = this
    var detaId = _this.$route.params.noticeDetaId;
    this.ajax(_this.port.noticeDeta, {
        id:detaId
    }, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data;
        $('#noticeDetaDetail').html(res.data.content);
        //_this.noticeMain =
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
.noticeDetaMain {
  background-color: #fff5ee;
  margin-top: 0.2rem;
}

.noticeDetaTitBox {
  border-bottom: solid 1px #ffddd0;
  padding: 0 0.2rem 0.07rem;
}

.noticeDetaTitBox h2 {
  height: 0.66rem;
  line-height: 0.66rem;
  font-size: 0.28rem;
  color: #222;
}

.noticeDetaDeta {
  font-size: 0.26rem;
  color: #666666;
  padding: 0.2rem 0.4rem 0.6rem;
  line-height: 1.5em
}
</style>
