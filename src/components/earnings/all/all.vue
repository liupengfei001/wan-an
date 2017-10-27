<!--
    ============= 个人收益——>全部收益模块 =============
-->
<template>
<div id="all">
  <p class="bodyMainHead">
    <!-- <i class="iconfont icon-ganxiejin"></i> -->
    <img src="./apple.png" alt="" style="width:0.4rem;height:0.4rem;padding-right:0.1rem;margin-top:-0.1rem;"> 金果总数：
    <span>{{gross}}</span>
  </p>
  <div class="bodyMainRow">
    <span class="listTypeLon">奖励类型</span>
    <span class="listTimeLon">获得时间</span>
    <span class="listOrtherLon" style="font-size:12px">来源账号</span>
    <span class="listOrtherLon" style="font-size:12px">奖励金果</span>
  </div>
  <p class="global_orgBB"></p>
  <div class="bodyMainListBox" v-for="data in Data" :key="data.key">
    <div class="bodyMainRow">
      <span class="listTypeLon">{{data.typeName}}</span>
      <span class="listTimeLon">{{data.created_at}}</span>
      <span class="listOrtherLon global_txtOver">{{data.relate_username}}</span>
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
  name: "all",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Data: {},
      gross: '加载中...'
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this;
    this.ajax(_this.port.myEarnings, {
      type: 0
    }, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data.data;
        _this.gross = res.data.gross;
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
