export default {
  install: function(Vue) {
    Vue.prototype.port = {
      'basicsDeta': '/member/memberdetail', //个人信息概览模块    get
      'goodsList': '/shop/goods-list', //果树列表   get
      'goodsDeta': '/shop/goods-details', //果树详情接口   get
      'buyT': '/shop/buy', //认购果树模块接口 get
      'noticeList': '/announcement/index', //公告列表页接口 get
      'noticeDeta': '/announcement/select', //公告详情接口 get
      'hasGCoin': '/withdrawals/coin', //现有金果 get 参数：id（用户id）
      'requestGCoin': '/withdrawals/add', //金果提现 get   参数：id（用户id），coin（提现数量）
      'hervestList': '/withdrawals/index', //提现记录 get 参数：id（用户id）
      'memberCoin': '/member/coin', // 用户拥有的金果和金种子 get
      'sendGive': '/member/give', //赠送申请 post 参数： give_member_id(赠送人的id) give_coin(赠送金额)
      'giveRecord': '/member/gives', //赠送记录 GET
      'getRecord': '/member/gain', //获赠记录 GET
      'getIndexBanner': '/announcement/list', //首页的banner列表接口 get
      'bannerDeta': '/announcement/listid', //banner详情接口 get
      'changeBasics': '/member/update', //编辑个人资料 POST name姓名 deposit_bank开户行 bank_account银行账号 address地址
      'changePsw': '/member/pass', //修改密码接口 post 原密码password(忘了) 新密码newpassword 确认密码repassword
      'myEarnings': '/member/bonus', //收益明细接口 get type:0全部 1绩效 2分享
      'myFruiter': '/member/fruiter', //我的果树模块 get
      'login': '/site/login', //登录 post账号(id,默认2) 密码(默认111111)
      'logout': '/site/logout', //退出登录 不需要参数 get
      'suerNextId': '/member/able', //查询注册人账号是否重复
      'sureId': '/member/validate', //查询分享人账号的信息 get
      'register': '/member/register', //用户注册 POST
      'begats': '/member/tree', //系谱图 post
      'authCode': '/site/captcha?refresh', //验证码接口 get
      'adminTree': '/member/full-tree', // 后台系谱图接口
      'call110': '/member/outline', //退网接口
      'accountDeta': '/member/relate', // 关联用户接口 get 不用参数
      'statisticsLog': '/member/log', // 注册统计记录接口 type： 1：注册；2：分享
    };
    Vue.prototype.hostUrl = 'http://api.wantu3.cn'; //定义请求公共头 测试环境的
    //Vue.prototype.hostUrl = 'http://api.wantu3.ypxl/'; //定义请求公共头线上的
    Vue.prototype.ajax = function(url, data, methodType, callback) {
      var _this = this;
      //const  HostUrl='http://192.168.2.174/';
      this.isLoading = true;
      this.iSsuccess = true;
      $.ajax({
        type: methodType,
        url: _this.hostUrl + url,
        data: data,
        timeout: 15000,
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: function(data) {
          _this.isLoading = false;
          _this.iSsuccess = false;
          if (data.code == 10001) {
            let timeStr = data.data.offTime;
            _this.$alert('系统结算中，稍后再来吧。结算时间：' + timeStr, '系统结算', {
              confirmButtonText: '我明天在来',
              type: 'error',
              callback: action => {
                window.location.href = 'http://www.wantu3.cn/#/login'
              }
            });
            return
          } else {
            callback(data);
          }
          //   var sDate = new Date(parseInt(data.timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          //   // var clock = rStr.slice((rStr.indexOf('shoper_id=')+10),(rStr.indexOf('&')));
          //   var clock = sDate.slice(sDate.indexOf(' ') + 1)
          //   var TimeP = clock.split(":")
          //   if (TimeP[0] < 8) {
          //       alert('系统维护中（00：00——8：00），明天在来吧。');
          //     return
          //   } else {
          //     callback(data);
          //   }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          // console.log(textStatus)
          if (textStatus == 'timeout') {
            //alert('网络超时');
            _this.$message({
              message: '噢哦~!网络超时啦~！！',
              type: 'warning'
            });
            _this.isLoading = false;
            _this.iSsuccess = false;
          } else if (textStatus == 'error') {
            //alert('网络错误');
            _this.$message({
              message: '噢哦~!网络错误啦~！！',
              type: 'warning'
            });
            _this.isLoading = false;
            _this.iSsuccess = false;
          } else if (textStatus == 'parsererror') {
            //alert('数据异常');
            _this.$message({
              message: '噢哦~!数据异常啦~！！',
              type: 'warning'
            });
            _this.isLoading = false;
            _this.iSsuccess = false;
          }
        }
      });
    };

    // (function () {
    //   const  HostUrl='http://192.168.2.222:8080/';
    //   $.ajax({
    //     type: 'get',
    //     url: HostUrl+'role/get-roles',
    //     data:'',
    //     dataType:'json',
    //     success: function (data) {
    //       console.log(data.data)
    //       window.localStorage.setItem('roledata',JSON.stringify(data.data));
    //     },
    //     error:function (err) {
    //       console.log(err);
    //     }
    //   });
    // })()


  }
}
