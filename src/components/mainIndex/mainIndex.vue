<!--
    ============= 首页 =============
-->
<template>
<div id="mainIndex">
  <basicsOverview :teamFlag="false"></basicsOverview>
  <div class="BigFlagBox" v-if="bigFlag == 1">
    <!-- 轮播图模块 -->
    <div class="mainIndexBanBox">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="data in bannerData" :key="data">
          <router-link :to="{ name: 'bannerDeta', params: { bannerId: data.id}}">
            <img :src="data.img" alt="">
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图模块结束 -->
    <!-- 公告轮播滚动模块 -->
    <router-link tag="div" to="/noticeList" class="indexNoticeBox">
      <div class="idnexNoticeIBox">
        <i class="iconfont icon-xiaoxi"></i>
        <span>系统公告：</span>
      </div>
      <div class="indexNoticeSome">
        <marquee>{{indexNoticeMin}}</marquee>
      </div>
      <div class="indexNoticeMore global_flexC">
        <el-button size="mini" class="indexMore">更多</el-button>
      </div>
    </router-link>
    <!-- 公告轮播滚动模块结束 -->
    <!-- 菜单模块 -->
    <div class="menuListBox">
      <div class="menuRow">
        <router-link tag="div" to="/myCommodity" class="menuBox">
          <i class="iconfont icon-shu"></i>
          <span>我的果树</span>
        </router-link>
        <router-link tag="div" to="/allCommodity" class="menuBox">
          <i class="iconfont icon-shangcheng"></i>
          <span>果园</span>
        </router-link>
        <router-link tag="div" to="/center" class="menuBox">
          <i class="iconfont icon-iconuser"></i>
          <span>个人中心</span>
        </router-link>
      </div>

      <div class="menuRow">
        <router-link tag="div" to="/earnings" class="menuBox">
          <i class="iconfont icon-shouyi"></i>
          <span>收益明细</span>
        </router-link>
        <router-link tag="div" to="/harvest" class="menuBox">
          <i class="iconfont icon-shouhuo"></i>
          <span>金果采摘</span>
        </router-link>
        <router-link tag="div" to="/give" class="menuBox">
          <i class="iconfont icon-zengsong"></i>
          <span>金果赠送</span>
        </router-link>
      </div>

      <div class="menuRow">
        <router-link tag="div" to="/begats2" class="menuBox">
          <i class="iconfont icon-guanxiaobaotubiao19"></i>
          <span>系谱图</span>
        </router-link>
        <router-link tag="div" to="/wallet" class="menuBox">
          <i class="iconfont icon-qianbao"></i>
          <span>增值钱包</span>
        </router-link>
        <router-link tag="div" to="/shareId" class="menuBox">
          <i class="iconfont icon-fenxiang"></i>
          <span>分享账号</span>
        </router-link>
      </div>

      <div class="menuRow">
        <router-link tag="div" to="/statistics" class="menuBox">
            <img src="./TJ.png" alt="">
          <span>注册统计</span>
        </router-link>
        <router-link tag="div" to="/account" class="menuBox">
            <img src="./GL.png" alt="">
          <span>账户关联</span>
        </router-link>
        <router-link tag="div" to="/leaveMsg" class="menuBox">
            <img src="./LY.png" alt="">
          <span>联系我们</span>
        </router-link>
      </div>

    </div>
    <!-- 菜单模块结束 -->

    <!-- 退网模块 -->
    <div class="goTo110" v-if="OsifeStatus == 1" style="width:50%;margin:0.2rem auto 0;height:0.6rem;line-height:0.6rem;" @click="call110()">
      退出网络
    </div>

    <div class="global_nullDiv"></div>

  </div>


  <img src="./FlagBg.jpg" alt="" style="width:100%" v-if="bigFlag == 2">
  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
import basicsOverview from '@/components/basicsOverview/basicsOverview.vue';
export default {
  name: "mainIndex",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '我的果树模块', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      bannerData: {}, //请求回来的图片数据盒子
      indexNoticeMin: '', //公告概览
      OsifeStatus: '', //是否显示退网按钮
      bigFlag: 1,
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
  components: {
    'basicsOverview': basicsOverview,
  },
  created: function created() {
    //do something after creating vue instance
    loadData: {
      var _this = this;
      this.ajax(_this.port.getIndexBanner, {}, 'GET', function(res) {
        // console.log(res);
        if (res.code == 1) {

          //   判断是否到系统维护时间
          var sDate = new Date(parseInt(res.timestamp) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
          // var clock = rStr.slice((rStr.indexOf('shoper_id=')+10),(rStr.indexOf('&')));
          var clock = sDate.slice(sDate.indexOf(' ') + 1)
          var TimeP = clock.split(":")

          //   if (TimeP[0] < 8) {
          //     _this.bigFlag = 2;
          //   } else {
          //     _this.bigFlag = 1;
          //   }

          // console.log(clock);
          let ajaxData = res.data
          _this.bannerData = ajaxData.adv
          if(ajaxData.title.length){
              _this.indexNoticeMin = ajaxData.title[0].title;
          }else{
              _this.indexNoticeMin = '暂无系统公告'
          }
          _this.OsifeStatus = ajaxData.out_status;
          // console.log(ajaxData.void_status);
          if (ajaxData.void_status == 1) {
            _this.$alert('您即将被降级，为了保障您的收益，请尽快完成任务！', '温馨提示:', {
              confirmButtonText: '知道了',
              callback: action => {}
            });
          }
          if (_this.OsifeStatus == 1) {
            _this.$alert('您已经被降级，为了保障您的收益，请尽快完成任务！', '温馨提示:', {
              confirmButtonText: '好的',
              callback: action => {}
            });
          }
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
    //获取初始数据
  },
  methods: {
    call110: function call110() {
      var _this = this;
      _this.$confirm('您确定要退网吗？？', '提示', {
        confirmButtonText: '我是认真的',
        cancelButtonText: '我不',
        type: 'success'
      }).then(() => {
        this.ajax(_this.port.call110, {}, 'POST', function(res) {
          // console.log(res);
          if (res.code == 1) {
            _this.$message({
              message: '恭喜您，成功退网~',
              type: 'success'
            });
            _this.$router.push({
              name: 'login',
              params: {}
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

        _this.$alert('您已被换位，请尽快直推人~！', '请尽快直推', {
          confirmButtonText: '好的',
          callback: action => {}
        });


      });

    }
  }
}
</script>
<style>
.menuBox .icon-shu {
  color: #168d3e;
}

.menuBox .icon-shangcheng {
  color: #91db30;
}

.menuBox .icon-iconuser {
  color: #db3430;
}

.menuBox .icon-shouyi {
  color: #27c6ee;
  font-size: 0.45rem;
}

.menuBox .icon-shouhuo {
  color: #039100;
}

.menuBox .icon-zengsong {
  color: #ffb43d;
}

.menuBox .icon-guanxiaobaotubiao19 {
  color: #2fd588;
}

.menuBox .icon-qianbao {
  color: #db9127;
}

.menuBox .icon-fenxiang {
  color: #6fffd5;
}
.menuBox img{
    width: 0.45rem;
}
.mainIndexBanBox {
  height: 3rem;
}

.el-carousel__container {
  height: 3rem;
}

.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.indexNoticeBox {
  width: 100%;
  height: 0.5rem;
  background-color: #f7f7f7;
  position: relative;
  margin-bottom: 0.1rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  padding-right: 0.1rem;
}

.idnexNoticeIBox {
  color: #f84a05;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.9rem;
}

.idnexNoticeIBox span {
  font-size: 0.2rem;
  display: block;
}

.idnexNoticeIBox i {
  font-size: 0.35rem;
  margin-top: -0.05rem;
}

.indexNoticeSome {
  font-size: 0.24rem;
  height: 0.5rem;
  line-height: 0.5rem;
  width: 67%;
}

.indexNoticeMore {
  justify-content: center;
  padding-left: 0.1rem;
}

.menuListBox {
  background-color: #fff5ee;
}

.menuRow {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 1.08rem;
  border-top: solid 1px #ffbba1;
}

.menuRow:last-child {
  border-bottom: solid 1px #ffbba1;
}

.menuBox {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  width: 33.3%;
  height: 1.08rem;
  align-items: center;
  justify-content: center;
  border-right: solid 1px #ffbba1;
}

.menuRow .menuBox:last-child {
  border-right: none;
}

.menuBox span {
  font-size: 0.26rem;
  color: #999999;
}

.menuBox .iconfont {
  font-size: 0.45rem;
}

.footBox {
  width: 100vw;
  height: 0.5rem;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: #eeeeee;
  font-size: 0.24rem;
  color: #2d9100;
}
.footBox2{
    font-size: 0.18rem;
}

.footBox p {
  padding-top: 0.03rem
}

.footBox img {
  height: 100%;
  margin-left: 0.2rem;
}

.goTo110 {
  width: 100vw;
  background-color: #188d3d;
  height: 0.7rem;
  color: #fff;
  font-size: 0.26rem;
  line-height: 0.7rem;
  margin-top: 0.2rem;
  border-radius: 0.08rem;
  text-align: center;
}

.indexMore {
  border: none;
  background-color: #f96620;
  border-radius: 0.08rem;
  color: #fff;
  -webkit-box-shadow: 0 5px 15px -4px #fff inset;
  -moz-box-shadow: 0 5px 15px -4px #fff inset;
  -o-box-shadow: 0 5px 15px -4px #fff inset;
  -ms-box-shadow: 0 5px 15px -4px #fff inset;
  box-shadow: 0 5px 15px -4px #fff inset;
  /*  从上到下下渐变的颜色  */
  background-color: rgba(249, 76, 7, 0.9);
  /*  背景的颜色  */
}
</style>
