<!--
    ============= 提现记录模块 =============
    就  。。。  不给注释 了哈
-->
<template>
<div id="depositRecord">
  <div class="bodyMainRow">
    <span class="listTypeLon">收割数量</span>
    <span class="listTimeLon">申请时间</span>
    <span class="listOrtherLon">状态</span>
  </div>
  <p class="global_orgBB"></p>
  <div class="bodyMainListBox" v-for="data in Data" :key="data.key">
    <div class="bodyMainRow">
      <span class="listTypeLon global_txtOver">{{data.total}}</span>
      <span class="listTimeLon">{{data.created_at}}</span>
      <span class="listOrtherLon global_txtOver depositRWait" v-if="data.status == 0">待审核</span>
      <span class="listOrtherLon global_txtOver depositRSucceed" v-else-if="data.status == 1">已通过</span>
      <span class="listOrtherLon global_txtOver depositRDefeated" v-else-if="data.status == 2">已拒绝</span>
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
  name: "depositRecord",
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
    this.ajax(_this.port.hervestList, {
      id: 2
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
.depositRWait {
  color: #f84a05;
}

.depositRSucceed {
  color: #00ac0c;
}

.depositRDefeated {
  color: #fe1818;
}
</style>
