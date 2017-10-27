<!--
    ============= 修改密码模块 =============
-->
<template>
<div id="password">
  <p class="centerRow">
    <span class="centerRowTit">原密码：</span>
    <input type="password" name="" value="Password" v-model="Password" class="global_IptSad">
  </p>
  <p class="centerRow">
    <span class="centerRowTit">新密码：</span>
    <input type="password" name="" value="Newpassword" v-model="Newpassword" class="global_IptSad">
  </p>
  <p class="centerRow">
    <span class="centerRowTit">确认秘密：</span>
    <input type="password" name="" value="Repassword" v-model="Repassword" class="global_IptSad">
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
  name: "password",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      Password: '', //
      Newpassword: '', //
      Repassword: '', //
      NewpasswordFlag: false, //判断密码长度的开关
      RepasswordFlag: false, //判断密码长度的开关
    }
  },
  methods: {
      // 点击提交修改密码
      // 执行密码长度判断以及新旧密码是否一样的判断
      // 之后调取发送请求函数 sendAjax()
    sureChange: function sureChange() {
        var _this = this;
      //1、判断 密码长度
      if (_this.Newpassword.length < 6 || _this.Newpassword.length > 15) {
        _this.NewpasswordFlag = false;
      } else {
        _this.NewpasswordFlag = true;
      }
      if (_this.Repassword.length < 6 || _this.Repassword.length > 15) {
        _this.RepasswordFlag = false;
      } else {
        _this.RepasswordFlag = true;
      }

      if (_this.NewpasswordFlag && _this.RepasswordFlag) {
        //2、判断新旧密码是否一样
        if (_this.Newpassword != _this.Repassword) {
          _this.$message({
            message: '抱歉，您两次输入的密码不一样~！',
            type: 'warning'
          });
          return;
        } else {
          _this.sendAjax();
        }
      } else {
        _this.$message({
          message: '密码长度要在6-15之间哦~！！',
          type: 'warning'
        });
      }

    },
    // 发送修改密码的请求
    sendAjax: function sendAjax() {
      var _this = this
      this.ajax(_this.port.changePsw, {
        password: _this.Password,
        newPassword: _this.Newpassword,
        rePassword: _this.Repassword,
      }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          // console.log('success');
          _this.$message({
            message: '恭喜您修改密码成功~！！',
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
