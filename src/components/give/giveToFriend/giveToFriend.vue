<!--
    ============= 赠送好友模块 =============
-->
<template>
<div id="giveToFriend">
  <div class="bodyMainHead">
    <p>
      现有金果：
      <span>{{GFruit}}</span>
    </p>
    <p>
      现有金种子：
      <span>{{GSeed}}</span>
    </p>
  </div>
  <div class="harvestRequestIptBox global_boxSad">
    <div class="bodyMainRow">
      <span>赠送类型：</span>
      <div class="radioBox">
        <el-radio class="radio" v-model="radio" label="1">金果</el-radio>
        <el-radio class="radio" v-model="radio" label="2">金种子</el-radio>
      </div>
    </div>
    <div class="bodyMainRow">
      <span> 获赠对象：</span>
      <div class="shareSureBox" style="margin-right:0;">
        <input type="text" name="" :value="giveForId" v-model="giveForId" class="global_IptSad harvestRequestIpt" placeholder="请填写账号">
        <div class="global_boxSad shareSureBtn" @click="suerTheId()">
          验证
        </div>
      </div>
    </div>
    <p class="bodyMainRow">
      <span>赠送金额：</span>
      <input type="number" name="" :value="giveCoin" v-model="giveCoin" class="global_IptSad harvestRequestIpt" placeholder="请填写赠送金额">
    </p>
  </div>
  <div class="goTo110" @click="sureSend()">
    确认并赠送
  </div>


  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "giveToFriend",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      radio: '1', // 赠送类型 默认选中选项 1是金果子
      GFruit: '数据加载中...', //请求回来的用户拥有的金果果
      GSeed: '数据加载中...', //请求回来的用户拥有的金种子
      giveForId: '', //用户输入的赠送对象的ID
      giveCoin: '', //用户输入的赠送金额
    }
  },
  methods: {
    //验证该  ID对应的用户
    suerTheId: function suerTheId() {
      var _this = this;
      this.ajax(_this.port.sureId, {
        username: _this.giveForId
      }, 'GET', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.$alert('您所输入的ID对应的用户名是：' + res.data.name, '请核对分享人', {
            confirmButtonText: '朕已阅',
            callback: action => {}
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
    },
    //获得用户金果子和金种子
    getUserCoin: function getUserCoin() {
      var _this = this;
      this.ajax(_this.port.memberCoin, {}, 'GET', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.GFruit = res.data[0].a_coin;
          _this.GSeed = res.data[0].b_coin;
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
    //判断赠送条件
    // 若通过，则调用函数：sendAjaxFun（）
    sureSend: function sureSend() {
      var _this = this;
      // 1、判断获赠人ID是否为空
      if (this.giveForId != '') {
        // *排除智障* 判断用户输入的数字是否为负数
        if (this.giveCoin <= 0) {
          _this.$message({
            message: '赠送金额不可为0或者为负',
            type: 'warning'
          });
          return
        }
        // *排除智障* 判断用户输入的数字是否为小数
        if ((this.giveCoin % 1) != 0) {
          _this.$message({
            message: '赠送金额不可为小数',
            type: 'warning'
          });
          return
        }

        // 2、判断赠送类型
        if (this.radio == 1) {
          // 3、判断赠送金额是否大于余额
          if (this.giveCoin > this.GFruit) {
            _this.$message({
              message: '您输入的金果数量不可大于您的余额',
              type: 'warning'
            });
          } else {
            this.$confirm('您确定将' + _this.giveCoin + '个金果赠送给：' + _this.giveForId + '吗？', '提示', {
              confirmButtonText: '是的',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.sendAjaxFun()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消赠送'
              });
            });
          }
        } else {
          // 3、判断赠送金额是否大于余额
          if (this.giveCoin > this.GSeed) {
            _this.$message({
              message: '您输入的金种子数量不可大于您的余额',
              type: 'warning'
            });
          } else {
            this.$confirm('您确定将' + _this.giveCoin + '个金种子赠送给：' + _this.giveForId + '吗？', '提示', {
              confirmButtonText: '是的',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.sendAjaxFun()
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消赠送'
              });
            });
          }
        }
      } else {
        _this.$message({
          message: '获赠人的ID不可为空',
          type: 'warning'
        });
      }

    },

    //发送赠送请求
    sendAjaxFun: function sendAjaxFun() {
      var _this = this;
      this.ajax(_this.port.sendGive, {
        username: _this.giveForId,
        give_coin: _this.giveCoin,
        coinType: _this.radio
      }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.$message({
            message: '恭喜您赠送成功',
            type: 'success'
          });
          if (_this.radio == 1) {
            _this.GFruit = _this.GFruit - _this.giveCoin;
          } else {
            _this.GSeed = _this.GSeed - _this.giveCoin;
          }
          _this.giveCoin = '';
          _this.giveForId = '';
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
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    this.getUserCoin();
  }
}
</script>
<style>
#giveToFriend .bodyMainRow {
  height: 1.1rem;
}

#giveToFriend .bodyMainHead {
  justify-content: space-around;
}

#giveToFriend .bodyMainHead p:last-child span {
  color: #00ac0c;
}

.radioBox {
  width: 3.3rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.radioBox .radioList {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 1.7rem;
}

.el-checkbox__input {
  width: 0.3rem;
  height: 0.4rem;
  margin-top: -0.15rem;
}
</style>
