<!--
    ============= 个人信息概览模块 =============
-->
<template>
  <div id="basicsOverview" >
      <div class="basicsOverviewBox global_boxSad">
          <!-- 左边图片模块 -->
          <div class="bsOImgBox">
              <img src="../../assets/logo.jpg" alt="">
          </div>

          <!-- 右边详情模块 -->
          <div class="bsODetaBox">
              <div class="bsODetaName">
                  <div class="nameBox">
                      <h3 class="global_txtOver">姓名：{{Data.name}}</h3>
                      <p class="global_txtOver">用户名:{{Data.username}} &nbsp; <span style="font-size:12px;" v-if="Data.parent_id != 0">推荐人:{{Data.parent_username}}</span></p>
                  </div>
                  <div class="btnBox">
                      <button type="button" name="button" class="global_orgBtn" @click="logout()">退出</button>
                  </div>
              </div>
              <div class="bsODetaViewBox">
                  <div class="bsOsunBox">
                      <h4>金果</h4>
                      <span>{{Data.a_coin}}</span>
                  </div>
                  <div class="bsOsunBox">
                      <h4>金种子</h4>
                      <span>{{Data.b_coin}}</span>
                  </div>
                  <div class="bsOsunBox">
                      <h4>分享业绩</h4>
                      <span>{{Data.child_num}}</span>
                  </div>
              </div>
          </div>

      </div>
      <!-- 我的团队模块 -->
      <div class="centerMyTeam global_boxSad" v-if="teamFlag">
        <div class="centerTitBox">
          <div class="global_flexC">
            <span class="global_titLog"></span> 我的团队
          </div>
        </div>
        <div class="centerTitBox">
          <div class="centerTeamDeta">
            现小组数：
            <span>{{Data.group_num}}</span>
          </div>
          <div class="centerTeamDeta">
            团队总业绩量：
            <span>{{Data.child}}</span>
          </div>
        </div>
      </div>
      <!-- 我的团队模块结束 -->
  </div>
</template>
<script>
export default {
  name: "basicsOverview",
  props: ['teamFlag'],
  data: function data() {
    return {
        Data:{},//请求回来的数据盒子
    }
},
mounted: function mounted() {
  //do something after mounting vue instance
  var _this = this
  this.ajax(_this.port.basicsDeta, {
  }, 'GET', function(res) {
    if (res.code == 1) {
      _this.Data = res.data;
  }else if (res.code == 0) {
        _this.$message.warning(res.message);
    }else{
      _this.$message({message: 'shit~!服务器好像开小差了，请待会儿重试吧....',type: 'warning'});
    }
  })
},
methods: {
  logout: function logout() {
      var _this = this
      this.ajax(_this.port.logout, {
      }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.$message({
            message: '退出成功~',
            type: 'success'
          });
          sessionStorage.setItem("accessToken", 0);
          _this.$router.push('login')
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
