<!--
    ============= 系谱图模块 =============
    结构：
    头   部   导   航
         父级树
  有几个子带出现对应的分支（图片）
  子代模块（数据有几个就出现几个）
-->
<template>
<div id="begats">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <!-- 父级模块 -->
  <div class="headRow" style="">
    <p>{{Data.username}}</p>
    <div class="begatsChangeBtn" @click="ajaxBegatsDeta(Data.username, true)">-</div>
  </div>
  <!-- 分支图片模块 -->
  <div class="branchImgBox">
    <img v-show="Data.num == 1" src="./1.png" alt="">
    <img v-show="Data.num == 2" src="./2.png" alt="" style="width:80%; margin:0 auto;display:block">
    <img v-show="Data.num == 3" src="./3.png" alt="">
  </div>
  <!-- 子代模块 -->
  <div class="begatsChildBox">
    <div class="headRow" style="" v-for="data in Data.child" :key="data.key">
      <p>{{data.username}}</p>
      <div class="begatsChangeBtn" @click="ajaxBegatsDeta(data.username, false)">+</div>
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
  name: "begats",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '系谱图', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      Data: {},
      TopId: '',
      lastId: '', //上一个Id
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
  methods: {
      //点击请求对应的上翻页或者下翻页
    ajaxBegatsDeta: function ajaxBegatsDeta(Id, upFlag) {
      let up = 0;
      var _this = this;
      // console.log(Id, this.TopId);
      //判断是否翻到了顶部
      if (Id == this.TopId) {
        _this.$message({
          message: '您无法看到您的上级',
          type: 'warning'
        });
        return
      }
      if (upFlag) {
        up = 1;
      }
      this.ajax(_this.port.begats, {
        username: Id, //被点击人的ID
        up: up      //  若是上翻则是1，下翻是0
      }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.Data = res.data;
          _this.lastId = res.data.username;
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
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this;
    //初次进入请求，默认请求回来的是登录人ID及以下的子代
    this.ajax(_this.port.begats, {

    }, 'POST', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data;
        _this.TopId = res.data.username;
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
