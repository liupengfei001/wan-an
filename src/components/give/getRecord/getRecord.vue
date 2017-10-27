<!--
    ============= 获赠记录模块 =============
    如此简单，不需要注释
-->
<template>
<div id="giveRecord">
  <div class="bodyMainRow">
    <span class="listTypeLon">赠送人</span>
    <span class="listTimeLon">获赠时间</span>
    <span class="listOrtherLon">赠送类型</span>
    <span class="listOrtherLon">赠送金额</span>
  </div>
  <p class="global_orgBB"></p>
  <div class="bodyMainListBox" v-for="data in Data" :key="data.key">
    <div class="bodyMainRow">
      <span class="listTypeLon global_txtOver">{{data.member_username}}</span>
      <span class="listTimeLon">{{data.created_at}}</span>
      <span class="listOrtherLon global_txtOver depositRWait" v-if="data.type == 1">金果</span>
      <span class="listOrtherLon global_txtOver depositRSucceed" v-else-if="data.type == 2">金种子</span>
      <span class="listOrtherLon global_txtOver depositRSucceed" v-else style="color:#ccc">异次元</span>
      <span class="listOrtherLon listOrtherLonDeta global_txtOver">{{data.give_coin}}</span>
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
  name: "giveRecord",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Data: {},
    }
  },
  methods: {
    fun: function fun() {

    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this;
    this.ajax(_this.port.getRecord, {}, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data
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
