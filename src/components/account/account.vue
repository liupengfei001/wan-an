<template>
<div id="account">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>

  <div class="bodyMainRow" style="border-top: 2px solid #e89b29;">
    <span class="listTimeLon">注册时间</span>
    <span class="listTypeLon">关联用户</span>
  </div>
  <p class="global_orgBB"></p>
  <div class="bodyMainListBox" v-for="data in Data" :key="data.key">
    <div class="bodyMainRow">
      <span class="listTimeLon">{{data.created_at}}</span>
      <span class="listTypeLon">{{data.username}}</span>
    </div>
    <p class="global_orgBB"></p>
  </div>
  <div class="global_nullDiv"></div>

  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "account",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Data: {}, //请求回来的数据
      pageName: '账户关联', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this
    this.ajax(_this.port.accountDeta, {
    }, 'GET', function(res) {
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
  },
}
</script>
<style>
#account{
    background-color: #fff5ee;
}
#account .bodyMainRow:first{

}
</style>
