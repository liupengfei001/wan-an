<!--
    ============= 个人中心模块 =============
-->
<template>
<div id="center">
  <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <!-- 个人信息概览及团队信息模块 -->
  <basicsOverview :teamFlag="true"></basicsOverview>

  <!-- 我的资料模块： -->
  <div class="centerMyBasic global_boxSad">
    <div class="centerTitBox">
      <div class="global_flexC">
        <span class="global_titLog"></span> 我的资料
      </div>
      <div class="CMyBasicBtnBox">
          <!-- 操作按钮模块 -->
        <button type="button" name="button" v-show="!changeBasicsBtnFlag" class="global_orgBtn" @click="changeBlock('c')">编辑资料</button>
        <button type="button" name="button" v-show="!basicsBtnFlag" class="global_grayBtn" @click="changeBlock('b')">基本资料</button>
        <button type="button" name="button" v-show="!passwordBtnFlag" class="global_orgBtn" @click="changeBlock('p')">修改密码</button>
        <button type="button" name="button" v-show="passwordBtnFlag" class="global_grayBtn" @click="changeBlock('b')">取消改密</button>
      </div>
    </div>
    <div class="centerMainBox">
        <!-- 显示或者隐藏模块 -->
      <transition name="el-zoom-in-center">
        <basics v-if="basicsFlag" class="transition-box"></basics>
      </transition>
      <transition name="el-zoom-in-center">
        <password v-if="passwordFlag" class="transition-box"></password>
      </transition>
      <transition name="el-zoom-in-bottom">
        <changeBasics v-if="changeBasicsFlag" class="transition-box"></changeBasics>
      </transition>
    </div>
  </div>

  <!--遮罩层及loading-->
  <div v-if="iSsuccess" class="bgblacks  in"></div>
  <div type="primary" element-loading-text="拼命加载中" v-loading.fullscreen.lock="isLoading"></div>
  <!--遮罩层及loading结束-->
</div>
</template>
<script>
import basics from '@/components/center/basics/basics.vue';
import password from '@/components/center/password/password.vue';
import changeBasics from '@/components/center/changeBasics/changeBasics.vue';
import basicsOverview from '@/components/basicsOverview/basicsOverview.vue';

export default {
  name: "center",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      basicsFlag: true, //是否显示基本资料模块：TRUE为显示，默认为显示
      passwordFlag: false, //是否显示修改密码模块
      changeBasicsFlag: false, //是否显示修改资料模块
      basicsBtnFlag: true, //是否显示基本资料模块：TRUE为显示，默认为显示
      passwordBtnFlag: false, //是否显示修改密码模块
      changeBasicsBtnFlag: false, //是否显示修改资料模块
      pageName: '个人中心', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex' //返回按钮跳转到的位置
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
    // next(vm => {
       // 通过 `vm` 访问组件实例
       // console.log('beforeRouteEnter');
    // })
  },
  components: {
    'basics': basics,
    'password': password,
    'changeBasics': changeBasics,
    'basicsOverview': basicsOverview,
  },
  methods: {
      //跟换显示模块的一系列操作
    changeBlock: function changeBlock(name) {
      var tempTimeOut
      var _this = this;
      this.iSsuccess = true;
      this.isLoading = true;
      clearTimeout(tempTimeOut)
      if (name == 'b') {
        _this.passwordFlag = false;
        _this.changeBasicsFlag = false;
        _this.passwordBtnFlag = false;
        _this.changeBasicsBtnFlag = false;
        _this.basicsBtnFlag = true;
        tempTimeOut = setTimeout(function() {
          _this.basicsFlag = true;
          _this.iSsuccess = false;
          _this.isLoading = false;
        }, 260)
      } else if (name == 'p') {
        _this.basicsFlag = false;
        _this.changeBasicsFlag = false;

        _this.passwordBtnFlag = true;
        _this.changeBasicsBtnFlag = false;
        _this.basicsBtnFlag = false;
        tempTimeOut = setTimeout(function() {
          _this.passwordFlag = true;
          _this.iSsuccess = false;
          _this.isLoading = false;
        }, 260)
      } else if (name == 'c') {
        _this.passwordFlag = false;
        _this.basicsFlag = false;

        _this.passwordBtnFlag = false;
        _this.changeBasicsBtnFlag = true;
        _this.basicsBtnFlag = false;
        tempTimeOut = setTimeout(function() {
          _this.changeBasicsFlag = true;
          _this.iSsuccess = false;
          _this.isLoading = false;
        }, 260)
      }
    },
  }
}
</script>
<style>
.transition-box {
  width: 100%;
  background-color: #fff5ee;
}

.centerMainBox {
  min-height: 3.05rem;
}
</style>
