<!--
    ============= 修改个人资料模块 =============
-->
<template>
<div id="changeBasics">
  <p class="centerRow">
    <span class="centerRowTit">姓名：</span>
    <!-- <span class="global_txtOver">{{Data.name}}</span> -->
    <span class="global_txtOver">{{userName}}</span>
    <!-- <input type="text" name="" v-model="userName" :value="userName" class="global_IptSad"> -->
  </p>
  <p class="centerRow">
    <span class="centerRowTit">电话：</span>
    <span class="global_txtOver">{{Data.mobile}}</span>
  </p>
  <p class="centerRow">
    <span class="centerRowTit">银行账号：</span>
    <input type="text" name="" v-model="bankAccount" :value="bankAccount" class="global_IptSad">
  </p>
  <p class="centerRow">
    <span class="centerRowTit">开户行：</span>
    <input type="text" name="" v-model="depositBank" :value="depositBank" class="global_IptSad">
  </p>
  <p class="centerRow">
    <span class="centerRowTit">收货地址：</span>
    <input type="text" name="" v-model="Address" :value="Address" class="global_IptSad">
  </p>
  <div class="passwordRow">
    <div class="sureChange passwordBtn" @click="sureChange()">
      确认修改
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
  name: "changeBasics",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Data: {},
      userName: '数据加载中...', //用户姓名
      bankAccount: '数据加载中...', //银行账号
      depositBank: '数据加载中...', //银行地址
      Address: '数据加载中...', //收货地址
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this
    this.ajax(_this.port.basicsDeta, {}, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.Data = res.data;
        _this.bankAccount = res.data.bank_account
        _this.depositBank = res.data.deposit_bank
        _this.Address = res.data.address
        _this.userName = res.data.name
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
  methods: {
    //   确认修改个人资料模块
    //   注：名字不能为空
    sureChange: function sureChange() {
      var _this = this
      if(_this.userName == ''){
          _this.$message({
            message: '名字可不能为空啊~！！！',
            type: 'warning'
          });
          return
      }
      this.ajax(_this.port.changeBasics, {
        name: _this.userName,
        bank_account: _this.bankAccount,
        deposit_bank: _this.depositBank,
        address: _this.Address,
    }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
            // console.log('success');
            _this.$message({
              message: '恭喜您修改成功~！！',
              type: 'success'
            });
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
}
</script>
<style>
</style>
