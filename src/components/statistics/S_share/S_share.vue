<template>
  <div id="S_share">
      <div class="bodyMainRow">
        <span class="listTimeLon">注册时间</span>
        <span class="listTypeLon">注册账号</span>
      </div>
      <p class="global_orgBB"></p>
      <div class="bodyMainListBox" v-for="data in Data" :key="data.key">
        <div class="bodyMainRow">
          <span class="listTimeLon">{{data.created_at}}</span>
          <span class="listTypeLon">{{data.relation}}</span>
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
  name: "S_share",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Data: {}, //请求回来的数据
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this
    this.ajax(_this.port.statisticsLog, {
        type: 2
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
</style>
