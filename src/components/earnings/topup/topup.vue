<!--
    ============= 个人收益——>绩效模块 =============
-->
<template>
<div id="performance">
  <div class="bodyMainRow">
    <span class="listTypeLon">操作类型</span>
    <span class="listTimeLon">时间</span>
    <span class="listTimeLon">类型</span>
    <span class="listOrtherLon" style="font-size:12px">金额</span>
  </div>
  <p class="global_orgBB"></p>
  <div class="bodyMainListBox" v-for="data in Data" :key="data.key">
    <div class="bodyMainRow">
      <span class="listTypeLon">{{data.typeName}}</span>
      <span class="listTimeLon">{{data.created_at}}</span>
      <span class="listTimeLon">{{data.coinName}}</span>
      <span class="listOrtherLon listOrtherLonDeta global_txtOver">{{data.num}}</span>
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
  name: "performance",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Data: {},
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this;
    this.ajax(_this.port.myEarnings, {
      type: 3
    }, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data.data;
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
