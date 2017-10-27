<!--
    ============= 头部模块 =============
    需要获取到调用时传入的：
    btnFlat:是否显示返回按钮
    title:居中的title名称
    backUrl:返回的路径
-->
<template>
      <div class="baseHeadBox">
          <router-link :to="backUrl">
              <span class="headerBtnBox" v-if="btnFlag" >
                  <i class="iconfont icon-fanhui"></i>
                  返回
              </span>
          </router-link>

          <div class="baseHeadTitle">
              {{title}}
          </div>
      </div>
    </div>
</template>
<script>
export default {
  props: ['title','btnFlag','backUrl'],

}
</script>
<style>
</style>
