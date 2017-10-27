<!--
    ============= 基本资料模块 =============
    不需要注释了吧。。。
-->
<template>
  <div id="basics">
      <p class="centerRow">
          <span class="centerRowTit">姓名：</span>
          <span class="global_txtOver">{{Data.name}}</span>
      </p>
      <p class="global_orgBB"></p>
      <p class="centerRow">
          <span class="centerRowTit">电话：</span>
          <span class="global_txtOver">{{Data.mobile}}</span>
      </p>
      <p class="global_orgBB"></p>
      <p class="centerRow">
          <span class="centerRowTit">银行账号：</span>
          <span class="global_txtOver">{{Data.bank_account}}</span>
      </p>
      <p class="global_orgBB"></p>
      <p class="centerRow">
          <span class="centerRowTit">开户行：</span>
          <span class="global_txtOver">{{Data.deposit_bank}}</span>
      </p>
      <p class="global_orgBB"></p>
      <p class="centerRow">
          <span class="centerRowTit">收货地址：</span>
          <span class="global_txtOver">{{Data.address}}</span>
      </p>
      <!--遮罩层及loading-->
      <div v-if="iSsuccess" class="bgblacks  in"></div>
      <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
      <!--遮罩层及loading结束-->
  </div>
</template>
<script>
export default {
  name: "basics",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Data:{},

    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this
    this.ajax(_this.port.basicsDeta, {
    }, 'GET', function(res) {
      //  console.log(res);
      if (res.code == 1) {
        _this.Data = res.data;
    }else if (res.code == 0) {
          _this.$message.warning(res.message);
      }else{
        _this.$message({message: 'shit~!服务器好像开小差了，请待会儿重试吧....',type: 'warning'});
      }
    })
  }
}
</script>
<style>

</style>
