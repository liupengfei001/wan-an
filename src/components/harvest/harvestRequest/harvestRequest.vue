<!--
    ============= 申请提现模块 =============
    这个就不需要注释啦~
-->
<template>
<div id="harvestRequest">
  <p class="bodyMainHead">
    现有金果：
    <span>{{userCoin}}</span>
    <span class="harvestRequestWTit">
              (仅限用金果可提现)
          </span>
  </p>
  <div class="harvestRequestIptBox global_boxSad">
    <p class="bodyMainRow">
      <span>采摘数量：</span>
      <input type="number" name="" v-model="userIpt" :value="userIpt" class="global_IptSad harvestRequestIpt" placeholder="提现金额为200的倍数">
    </p>
    <p class="HRwarningP">
      (提现过程中将抽出10%的金额作为平台运营维护费用)
    </p>
    <p class="HRwarningP">
      *每天只能提现一次
    </p>
  </div>
  <div class="goTo110" @click="requestGCoin()">
    确认提现
  </div>


    <!--遮罩层及loading-->
    <div v-if="iSsuccess" class="bgblacks  in"></div>
    <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
    <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "harvestRequest",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      userIpt: '',
      userCoin: '数据加载中....',
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this
    //请求用户金果数
    this.ajax(_this.port.hasGCoin, {}, 'GET', function(res) {
      // console.log(res);
      if (res.code == 1) {
        _this.userCoin = res.data[0].a_coin;
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
    //点击提现
    requestGCoin: function requestGCoin() {
      var _this = this;
      if(_this.userIpt <= _this.userCoin){
          if (_this.userIpt % 1 == 0) {
              if(_this.userIpt <= 0 ){
                  _this.$message.warning('提现金额不能为0或负数~！！');
                  return
              }

              this.$confirm('您确定要将'+_this.userIpt+'个金果提现吗？', '提示', {
                confirmButtonText: '是的',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

                _this.ajax(_this.port.requestGCoin, {
                  id: 2,
                  coin: _this.userIpt
                }, 'POST', function(res) {
                  // console.log(res);
                  if (res.code == 1) {
                      _this.$message({
                        message: '恭喜你申请成功，请等待审核。',
                        type: 'success'
                      });
                      _this.userCoin = _this.userCoin - _this.userIpt;
                      _this.userIpt = '';
                  } else if (res.code == 0) {
                    _this.$message.warning(res.message);
                  } else {
                    _this.$message({
                      message: 'shit~!服务器好像开小差了，请待会儿重试吧....',
                      type: 'warning'
                    });
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消提现'
                });
              });

          } else {
            _this.$message.warning('提现金额必须是200的倍数~！！');
          }
      }else{
          _this.$message.warning('您输入的金果数量不可大于您的余额~！！');
      }
    }
  }
}
</script>
<style>
#harvestRequest .bodyMainHead {
  display:-webkit-box;
display:-webkit-flex;
display:-ms-flexbox;
display:flex;
}

#harvestRequest .bodyMainRow {
  height: 1.1rem;
}

#harvestRequest .bodyMainRow span {
  margin-left: 0.8rem;
}

#harvestRequest .bodyMainRow input {
  margin-right: 0.8rem;
}

.bodyMainHead .harvestRequestWTit {
  display: inline-block;
  font-size: 0.20rem;
  width: auto;
  height: 0.27rem;
  background-color: #f01515;
  color: #fff;
  line-height: 0.27rem;
  text-align: center;
  padding: 0 0.07rem;
  border-radius: 0.03rem;
  margin-left: 0.2rem;
}

.harvestRequestIpt {
  width: 3.3rem;
  height: 0.6rem;
  border: none !important;
  border-radius: 0.06rem !important;
  padding-left: 0.2rem;
  background-color: rgba(233, 225, 220, 0.6);
}

.HRwarningP {
  font-size: 0.2rem;
  color: #f01515;
  text-align: center;
  padding-bottom: 0.2rem;
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #fff;
}
</style>
