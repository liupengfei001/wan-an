<!--
    ============= 登录模块 =============
-->
<template>
<div id="login">
  <img src="./loginTopBg.png" alt="" style="width:100%">
  <div class="loginBox">
    <div class="loginRow">
      <i class="iconfont icon-gerenzhongxin"> </i>
      <input class="loginIpt" type="text" name="" value="userName" placeholder="用户名" v-model="userName">
    </div>
    <div class="loginRow">
      <i class="iconfont icon-mima"> </i>
      <input class="loginIpt" type="password" name="" value="userPsw" placeholder="密码" v-model="userPsw">
    </div>
    <div class="loginRow loginImgRow">
      <i class="iconfont icon-ad80-copy"> </i>
      <input class="authCodeIpt loginIpt" type="text" name="" value="userACode" placeholder="验证码" v-model="userACode">
      <div class="AuthCodeImgBox">
        <img class="authCodeImg" v-model="authCodeImg" :src="authCodeImg" alt="" @click="changeAuthCodeImg()">
      </div>
    </div>
    <div class="loginBtn lBtn global_boxSad" @click="sureLogin()">
      登录
    </div>
    <div class="findPswBtn lBtn global_boxSad" @click='findPsw()'>
      找回密码
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
  name: "login",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      userName: '',
      userPsw: '',
      userACode: '',
      authCodeImg: '',
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance

  },
  methods: {
    // 点击登录时的函数
    // 若是登录成功则在存入accessToken：1
    // 后面的页面会根据这个accessToken 是否为一来判断是否跳入登录页面
    sureLogin: function sureLogin() {
      var _this = this
      // console.log(_this.userACode);
      this.ajax(_this.port.login, {
        username: _this.userName,
        password: _this.userPsw,
        authCode: _this.userACode
      }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.$message({
            message: '欢迎您回来~',
            type: 'success'
          });
          sessionStorage.setItem("accessToken", 1);
          _this.$router.push('mainIndex')
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
    //点击 图片跟换图片
    changeAuthCodeImg: function changeAuthCodeImg() {
      var _this = this;
      this.ajax(_this.port.authCode, {}, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.authCodeImg = res.data.url;
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
    // 点击找回密码弹出消息提示
    findPsw: function findPsw() {
      var _this = this;
      _this.$alert('— — — —请联系客服— — — — 微信客服1:wanankeji88、微信客服2:wanankeji888', '联系客服', {
        confirmButtonText: '知道了',
        callback: action => {}
      });
    }
  },
  mounted: function mounted() {
    this.changeAuthCodeImg();
  }
}
</script>
<style scoped>
html {
  background-color: #fff9f9;
}

#login ::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #aaaaaa;
}

#login :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #aaaaaa;
  opacity: 1;
}

#login ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #aaaaaa;
  opacity: 1;
}

#login :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #aaaaaa;
}
.loginIpt{
    height: 0.5rem;
    font-size: 0.22rem;
}
</style>
