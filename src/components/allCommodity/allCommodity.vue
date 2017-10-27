<!--
    ============= 果园模块 =============
-->
<template>
<div id="allCommodity">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>

  <!-- 果园列表模块 -->
  <div class="allCommodityListBox">

    <div class="allCommodityBox" v-for="data in Data" :key="data.key">
      <div class="allCPicBox">
        <img :src="data.img == '' ? './static/img/timg.jpg' : data.img " alt="">
        <span class="allCPriceBox">
              市值:{{data.price}}
          </span>

      </div>
      <div class="allCDetaBox">
        <p class="allCTit">
          {{data.name}}
        </p>
        <div class="allCBtnBox">
          <router-link :to="{name: 'fruiterDeta', params: { Tid: data.id}}">
            <button type="button" name="button" class="global_genBtn global_boxSad">详情</button>
          </router-link>

          <button v-if="data.has_buy == 1" type="button" name="button" class="global_redBtn global_boxSad" style="background-color:#a56e57;border-color:#a56657">已认购</button>

          <button v-else-if="data.has_buy == -1" type="button" name="button" class="global_redBtn global_boxSad" style="background-color:#7e7e7e;border-color:#dbdbdb">认购</button>
          <button v-else-if="data.has_buy == 0" @click="getFruiter(data.id)" type="button" name="button" class="global_redBtn global_boxSad">认购</button>
        </div>
      </div>
    </div>

  </div>
  <!-- 果园列表模块结束  -->



  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
export default {
  name: "allCommodity",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '果园', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      Data: {}, //请求回来的数据盒子
    }
  },
  //判断是否登录
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
    //点击认购模块
    getFruiter: function getFruiter(Tid) {
      var _this = this
      this.$confirm('您确定要认购这颗果树？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.ajax(_this.port.buyT, {
          goods_id: Tid
        }, 'GET', function(res) {
          if (res.code == 1) {
            _this.$message({
              type: 'success',
              message: '恭喜您认购成功'
            });
            //如果购买成功，再次请求接口刷新数据
            _this.ajax(_this.port.goodsList, {}, 'GET', function(res) {
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
          message: '已取消认购'
        });
      });
    }
  },
  mounted: function mounted() {
    //do something after mounting vue instance
    var _this = this
    //读取果树列表
    this.ajax(_this.port.goodsList, {}, 'GET', function(res) {
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
  }
}
</script>
<style>
.global_genBtn {
  border: solid 1px #00af26;
  border-radius: 0.08rem;
  background-color: #00b024;
  color: #fff;
  height: 0.5rem;
  width: 1rem;
  font-size: 0.24rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 0.15rem;
  margin-right: 0.3rem;
}

.global_redBtn {
  border: solid 1px #f83306;
  border-radius: 0.08rem;
  background-color: #fa5207;
  color: #fff;
  height: 0.5rem;
  width: 1.2rem;
  font-size: 0.24rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 0.15rem;
  margin-right: 0.3rem;
}
</style>
