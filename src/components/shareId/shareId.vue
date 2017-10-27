<!--
    ============= 分享账号模块 =============
-->
<template>
<div id="shareId">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>

  <div class="shareIdIptList global_boxSad">
    <div class="bodyMainRow">
      <span> 分享人账号：</span>
      <div class="shareSureBox">
        <input type="text" name="" :value="thatUserId" @blur="suerthatUserId()" v-model="thatUserId" class="global_IptSad harvestRequestIpt" placeholder="请填写账号">
        <div class="global_boxSad shareSureBtn" @click="suerTheId()">
          验证
        </div>
      </div>
    </div>
    <div class="bodyMainRow">
      <span> 注册新账号：</span>

      <input type="text" name="" :value="nextUserId" v-model="nextUserId" @blur="suerTheNextId()" class="global_IptSad harvestRequestIpt" placeholder="由字母或数字组成共5位">

      <!-- <div class="shareSureBox">
        <input type="text" name="" :value="nextUserId" @blur="suernextUserId()" v-model="nextUserId" class="global_IptSad harvestRequestIpt" placeholder="请填写账号">
        <div class="global_boxSad shareSureBtn" @click="suerTheNextId()">
          验证
        </div>
      </div> -->
    </div>
    <p class="bodyMainRow">
      <span>姓名：</span>
      <input type="text" name="" :value="userName" v-model="userName" @blur="sureuserName()" class="global_IptSad harvestRequestIpt" placeholder="请填写注册人姓名">
    </p>
    <p class="bodyMainRow">
      <span> 手机号码：</span>
      <input type="number" name="" :value="userPhone" v-model="userPhone" @blur="sureuserPhone()" class="global_IptSad harvestRequestIpt" placeholder="请填写注册人手机号码">
    </p>
    <p class="bodyMainRow">
      <span>密码：</span>
      <input type="password" name="" :value="userPsw1" v-model="userPsw1" @change="sureuserPsw1()" class="global_IptSad harvestRequestIpt" placeholder="请填写6-15位密码">
    </p>
    <p class="bodyMainRow">
      <span> 确认密码：</span>
      <input type="password" name="" :value="userPsw2" v-model="userPsw2" @blur="sureuserPsw2()" class="global_IptSad harvestRequestIpt" placeholder="请确认密码">
    </p>
    <p class="bodyMainRow">
      <span>开户行(选填)：</span>
      <input type="text" name="" :value="userBackA" v-model="userBackA" class="global_IptSad harvestRequestIpt" placeholder="填写开户行（选填）">
    </p>
    <p class="bodyMainRow">
      <span> 银行账号(选填)：</span>
      <input type="number" name="" :value="userBackNum" v-model="userBackNum" @blur="sureBackNum()" class="global_IptSad harvestRequestIpt" placeholder="填写银行账号（选填）">
    </p>
    <p class="bodyMainRow">
      <span>收获地址(选填)：</span>
      <input type="text" name="" :value="userAds" v-model="userAds" class="global_IptSad harvestRequestIpt" placeholder="请填写收获地址（选填）">
    </p>
    <p class="bodyMainRow">
      <span> 金果注入：</span>
      <input type="number" name="" :value="GFuIn" v-model="GFuIn" @blur="sureGFuIn()" class="global_IptSad harvestRequestIpt" placeholder="请填写注入金果数量">
    </p>
    <p class="bodyMainRow">
      <span>金种子注入：</span>
      <input type="number" name="" :value="GSeedIn" v-model="GSeedIn" @blur="sureGSeedIn()" class="global_IptSad harvestRequestIpt" placeholder="请填写注入金种子数量">
    </p>
    <div class="bodyMainRow">
      <span>注册协议：</span>
      <div class="harvestRequestIpt" style="background-color:#fff5ee;display:flex;margin-right:0.5rem;">
        <span class="E_switch" style="width:1.5rem">
              <el-switch
                v-model="value1"
                on-text=""
                off-text="">
              </el-switch>
    </span>
        <!-- <div class="harvestRequestIpt" style="background-color:#fff5ee;
          display:flex;justify-content:flex-start;align-items:center;width:2rem;">
              点击查看协议
          </div> -->
        <el-button type="text" @click="dialogFormVisible = true">点击查看协议</el-button>

        <el-dialog title="合同详情" :visible.sync="dialogFormVisible">
          <div class="dealDeta">
            <h3>会员网站注册合同</h3>
            <h4>甲方：万岸科技有限公司</h4>
            <h4>乙方：平台签约会员</h4>
            <p>一、甲方开发并运营万岸科技有限公司网站，以“互联网+N”运作模式，链接万岸科技有限公司集研发、旅游、养生、养老、疗养、种植、教育等众多产业，形成线上线下相结合的产业链体系，打造成为一家综合电子商务平台。甲方现推出多种大健康养生、养老、疗养、种植认购等系列产品服务于广大消费者。</p>
            <p>二、乙方是具备完全民事行为能力的自然人、法人，自愿参与甲方电商平台推广的买受甲方的种植认购系列产品，并自愿遵守平台相关规则。双方根据《中华人民共和国合同法》等有关法律规定，在平等、自愿的基础上，就乙方购买和推广甲方产品达成如下购销条款:</p>
            <p>
              三、合同标的及价款
              <p>1、本合同标的价为900元/棵的果树认购金，且每单合同只能认购一次。</p>
              <p>2、以上产品的效益结算以万岸科技有限公司公示的实际收益为准。</p>
              <p>3、以上产品的提取和，消费收益不设期限，由乙方自行决定。</p>
            </p>
            <p>
              四、甲方权利和义务
              <p>1、甲方承诺，按照本合同的约定向乙方交付其购买的万岸科技有限公司系列产品。</p>
              <p>2、甲方承诺，乙方买受的商品和服务的价格不得高于万岸科技有限公司公示的商品销售价格，并享受和零售产品同样的质量保证和售后服务。</p>
              <p>3、甲方将不断地创新商品和提升服务，最大限度地服务于乙方，满足其不断增长的衣食住行及精神文化等方面的需求。</p>
              <p>4、甲方依据国家政策的变化，市场发展的规律，有权更新合同文本，乙方有权享有更新后合同文本的权益。</p>
            </p>
            <p>
              五 ，乙方的权利和义务
              <p>乙方按照相关约定，为甲方销售和推广万岸科技有 限公司的产品，可享有的收益如下:</p>
              <p>1、乙方用900元购买由甲方配置的产品（果树一棵，由乙方自行选择品种），万岸科技有限公司在签约后，按照果树的实际生长阶段，达到成熟条件后每年向乙方配送该果树所产生的果实，期限为3年。</p>
              <p>2、所有认购后继续推广所产生的业绩奖励为金果。一律以平台规则为准。</p>
              <p>3、乙方签约后生成的编号享有继承权和直系亲属的转让权，乙方所有收入产生的税赋，由本人回居住地向税务部门缴纳。</p>
              <p>4、乙方承诺:必须按照与甲方约定的方式，渠道，正确进行消费及开展销售活动，积极维护甲方的形象和利益，否则视为乙方独自行为，造成的损失和后果由乙方自行承担，并承担因此给甲方造成的一切损失</p>
            </p>
            <p>
              六、商城积分运营规则
              <p>1、金果可以在会员间以100的整数倍互转流通消费，但公司不负责回收金果</p>
              <p>2、为了公司的可持续发展，根据市场的运营情况，在正常合理的前提下，在金果提现中扣除一定比例作为综合费用，如平台维护费、运营管理费等。</p>
              <p>3、公司在网站维护期间以及网站正常运营的节假日时期会作一定的调整</p>
            </p>
            <p>七、本合同有效期为:在遵守平台运行规则前提下，乙方需按照规则续签合同，续签成功合同继续生效，否则为合同终止日。如遇国家政策变化，不准许经营，或因人力不可抗拒的因素(如战争、自然灾害等)造成万岸科技有限公司暂停运营的原因，不属于合同违约。</p>
            <p>八、甲、乙双方如违反合同造成对方损失，双方应友好协商解决，协商未果的，可向甲方住地有管辖权的人民法院起诉。</p>
            <p>九、由于产品的特殊性，果树所有权归甲方所有。活动最终解释权归甲方</p>
            <p>十、本合同为电子合同，双方确认同意后提交注册具备同等法律效力。</p>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false; value1 = true">已阅并同意</el-button>
          </div>
        </el-dialog>



      </div>
    </div>
  </div>
  <div class="goTo110" @click="sureRegister()">
    注册
  </div>

  <div class="global_nullDiv">

  </div>

  <el-dialog title="请牢记ID" :visible.sync="remberIdBox">
    <div class="remberIdBox">
      <h3>已注册成功，注册账号为:</h3>
      <div class="shareId-IdBox">
        {{okId}}
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="remberIdBox = false">我记住了</el-button>
    </div>
  </el-dialog>

  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "shareId",
  data: function data() {
    return {
      value1: false, //是否同意协议
      okId: '', //验证分享人的ID
      dialogFormVisible: false, // 是否显示查看协议模块
      remberIdBox: false, //是否显示 ‘请记住ID’模块
      iSsuccess: false,
      isLoading: false,
      pageName: '分享账号', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      thatUserId: '', //分享人Id
      userName: '', //注册人姓名
      userPhone: '', //注册人手机号
      userPsw1: '', //注册人密码
      userPsw2: '', //确认密码
      userBackA: '', //注册人开户行
      userBackNum: '', //注册人银行账号
      userAds: '', //注册人收货地址
      GFuIn: '', //注入金果子数量
      GSeedIn: '', //注入金种子数量
      nextUserId: '', //注册人账号

      thatUserIdFlag: false, //分享人Id开关
      nextUserIdFlag: false, //注册人Id开关
      userNameFlag: false, //注册人姓名开关
      userPhoneFlag: false, //注册人手机号开关
      userPsw1Flag: false, //注册人密码开关
      userPsw2Flag: false, //确认密码开关
      GFuInFlag: false, //注入金果子数量开关
      GSeedInFlag: false, //注入金种子数量开关
      BackNumFlag: true,
    }
  },
  beforeRouteEnter(to, from, next) {
    // console.log(sessionStorage.getItem('accessToken'));
    let hasLogin = sessionStorage.getItem('accessToken')
    if (hasLogin == 0) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else if (hasLogin == null) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  },
  methods: {
    //验证该  ID对应的用户
    suerTheId: function suerTheId() {
      var _this = this;
      this.ajax(_this.port.sureId, {
        username: _this.thatUserId
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
  }, //验证该  注册人的账号是否重复
    suerTheNextId: function suerTheNextId() {
      var _this = this;
      this.ajax(_this.port.suerNextId, {
        username: _this.nextUserId
      }, 'GET', function(res) {
        // console.log(res);
        if (res.code == 1) {
            _this.$message.success(res.message);
            _this.nextUserIdFlag = true
        } else if (res.code == 0) {
            _this.$alert('该账号不可用，请尝试其他账号，请输入由：数字和字母组成的共5位的账号', '注册人账号错误', {
              confirmButtonText: '哦',
              callback: action => {}
            });
            _this.nextUserIdFlag = false
        } else {
          _this.$message({
            message: 'shit~!服务器好像开小差了，请待会儿重试吧....',
            type: 'warning'
          });
          _this.nextUserIdFlag = false
        }
      })
    },
    // 当 银行账号失去焦点时判断
    sureBackNum: function sureBackNum() {
      var _this = this;
      if (this.userBackNum == '') {
        _this.BackNumFlag = true
      } else if (this.userBackNum % 1 != 0) {
        _this.$message({
          message: '银行账号不对哦~！',
          type: 'warning'
        });
        _this.BackNumFlag = false
      } else {
        _this.BackNumFlag = true
      }
    },
    // 当 分享人账号 失去焦点时判断
    suerthatUserId: function suerthatUserId() {
      var _this = this;
      if (this.thatUserId == '') {
        _this.$message({
          message: '分享人账号不能为空哦~！',
          type: 'warning'
        });
        _this.thatUserIdFlag = false
      } else {
        _this.thatUserIdFlag = true
      }
    },

    // 当 注册人账号 失去焦点时判断
    suernextUserId: function suernextUserId() {
      var _this = this;
      if (this.nextUserId == '') {
        _this.$message({
          message: '注册人账号不能为空哦~！',
          type: 'warning'
        });
        _this.nextUserIdFlag = false
      } else {
        _this.nextUserIdFlag = true
      }
    },
    // 当 姓名 失去焦点时判断
    sureuserName: function sureuserName() {
      var _this = this;
      if (this.userName == '') {
        _this.$message({
          message: '注册人姓名不可为空哦~！',
          type: 'warning'
        });
        _this.userNameFlag = false
      } else if (this.userName.length > 4) {
        _this.$message({
          message: '注册人姓名不可超过4位~！',
          type: 'warning'
        });
        _this.userNameFlag = false
      } else {
        _this.userNameFlag = true
      }
    },
    // 当 手机号码 失去焦点时判断
    sureuserPhone: function sureuserPhone() {
      var _this = this;
      let phoneNumber = this.userPhone
      if (this.userPhone == '') {
        _this.$message({
          message: '注册人手机号不能为空~！',
          type: 'warning'
        });
        _this.userPhoneFlag = false
      } else if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
        _this.$message({
          message: '请您输入正确的手机号~！',
          type: 'warning'
        });
        _this.userPhoneFlag = false
      } else {
        _this.userPhoneFlag = true
      }
    },
    // 当 密码1 失去焦点时判断
    sureuserPsw1: function sureuserPsw1() {
      var _this = this;
      if (this.userPsw1 == '') {
        _this.$message({
          message: '注册人密码不能为空~！',
          type: 'warning'
        });
        _this.userPsw1Flag = false
      } else if (this.userPsw1.length >= 6 && this.userPsw1.length < 15) {
        _this.userPsw1Flag = true
      } else {
        _this.$message({
          message: '密码长度不正确~！',
          type: 'warning'
        });
        _this.userPsw1Flag = false
      }
    },
    // 当 密码2 失去焦点时判断
    sureuserPsw2: function sureuserPsw2() {
      var _this = this;
      if (this.userPsw2 != this.userPsw1) {
        _this.$message({
          message: '您两次输入的密码不相同~！',
          type: 'warning'
        });
        _this.userPsw2Flag = false
      } else {
        _this.userPsw2Flag = true
      }
    },
    // 当 金果注入 失去焦点时判断
    sureGFuIn: function sureGFuIn() {
      var _this = this;
      if (this.GFuIn > 500) {
        _this.$message({
          message: '金果注入最多可注入500！',
          type: 'warning'
        });
        _this.GFuInFlag = false;
        return;
      } else if (this.GFuIn == '') {
        _this.$message({
          message: '金果注入不可为空~！',
          type: 'warning'
        });
        _this.GFuInFlag = false;
        return;
      } else if (this.GFuIn < 0) {
        _this.$message({
          message: '注入数量不可为负数~！',
          type: 'warning'
        });
        _this.GFuInFlag = false;
        return;
      } else if ((this.GFuIn % 1) != 0) {
        _this.$message({
          message: '注入数量必须是正整数~！',
          type: 'warning'
        });
        _this.GFuInFlag = false;
        return;
      } else {
        _this.GFuInFlag = true
      }
    },
    // 当 金种子注入 失去焦点时判断
    sureGSeedIn: function sureGSeedIn() {
      var _this = this;
      if (this.GSeedIn < 400) {
        _this.$message({
          message: '金种子最少注入400！',
          type: 'warning'
        });
        _this.GSeedInFlag = false;
        return;
      } else if (this.GSeedIn == '') {
        _this.$message({
          message: '金种子注入不可为空~！',
          type: 'warning'
        });
        _this.GSeedInFlag = false;
        return;
      } else if (this.GSeedIn < 0) {
        _this.$message({
          message: '注入数量不可为负数~！',
          type: 'warning'
        });
        _this.GSeedInFlag = false;
        return;
      } else if ((this.GSeedIn % 1) != 0) {
        _this.$message({
          message: '注入数量必须是正整数~！',
          type: 'warning'
        });
        _this.GSeedInFlag = false;
        return;
      } else {
        _this.GSeedInFlag = true
      }
    },

    //点击注册按钮：
    sureRegister: function sureRegister() {
      var _this = this;
      if (!this.value1) {
        _this.$message({
          message: '您必须同意协议才能注册~！',
          type: 'warning'
        });
        return
      }
      //若所有必填选项都满足则进行提交
      if (this.thatUserIdFlag && this.userNameFlag && this.userPhoneFlag && this.userPsw1Flag && this.userPsw2Flag && this.GFuInFlag && this.GSeedInFlag && this.value1 && this.nextUserIdFlag) {
        this.ajax(_this.port.register, {
          referrer_username: _this.thatUserId,
          username: _this.nextUserId,
          name: _this.userName,
          mobile: _this.userPhone,
          password: _this.userPsw1,
          re_password: _this.userPsw2,
          deposit_bank: _this.userBackA,
          bank_account: _this.userBackNum,
          address: _this.userAds,
          a_coin: _this.GFuIn,
          b_coin: _this.GSeedIn,

        }, 'POST', function(res) {
          // console.log(res);
          if (res.code == 1) {
            _this.remberIdBox = true;
            _this.okId = res.data.username;

            _this.value1 = false;
            _this.thatUserId = '';
            _this.nextUserId = '';
            _this.userName = '';
            _this.userPhone = '';
            _this.userPsw1 = '';
            _this.userPsw2 = '';
            _this.userBackA = '';
            _this.userBackNum = '';
            _this.userAds = '';
            _this.GFuIn = '';
            _this.GSeedIn = '';
            _this.thatUserIdFlag = false;
            _this.userNameFlag = false;
            _this.userPhoneFlag = false;
            _this.userPsw1Flag = false;
            _this.userPsw2Flag = false;
            _this.GFuInFlag = false;
            _this.GSeedInFlag = false;
            _this.BackNumFlag = true;


          } else if (res.code == 0) {
            _this.$message.warning(res.message);
          } else {
            _this.$message({
              message: 'shit~!服务器好像开小差了，请待会儿重试吧....',
              type: 'warning'
            });
          }
        })
      } else {
        _this.$message({
          message: '有误，请检查您输入的数据。',
          type: 'warning'
        });
      }
    }
  }
}
</script>
<style>
.el-switch__button {
  width: 16px !important;
  height: 16px !important;
}

#shareId .el-dialog--small {
  width: 90%
}

.dealDeta h3 {
  font-size: 0.36rem;
  text-align: center;
  margin-bottom: 0.1rem;
  color: #222;
}

.dealDeta h4 {
  font-size: 0.3rem;
}

.dealDeta p {
  color: #333;
  text-indent: 2em;
}

.remberIdBox h3 {
  font-size: 0.36rem;
  text-align: center;
  margin-bottom: 0.1rem;
  color: #222;
}

.remberIdBox .shareId-IdBox {
  font-size: 0.45rem;
  text-align: center;
  color: red;
}
</style>
