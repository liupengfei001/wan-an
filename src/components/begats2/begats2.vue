<!--
    ============= 系谱图模块 =============
    结构：
    头   部   导   航
         父级树
  有几个子带出现对应的分支（图片）
  子代模块（数据有几个就出现几个）
-->
<template>
<div id="begats2">
    <v-header :title="pageName" :btnFlag="backFlag" :backUrl="backUrl"></v-header>
  <!-- 父级模块 -->
  <div class="begats2C">
      <div class="begats2Box">
          <div class="headRow" style="margin-top:0;margin-bottom:0.1rem;height: 2rem;
          width: 1.77rem;">
            <p>{{Data.username}}</p>
            <p class="begatsPRow">{{Data.name}}</p>
            <p class="begatsPRow">{{Data.mobile}}</p>
            <div class="begatsChangeBtn" @click="ajaxBegatsDeta(Data.username, true)">-</div>
          </div>
          <!-- 分支图片模块 -->
          <div class="branchImgBox">
            <img class="adminTreePic" v-show="boss_child == 1" src="./1.png" alt="">
            <img class="adminTreePic" v-show="boss_child == 2" src="./2.png" alt="" style="width:80%; margin:0 auto;display:block">
            <img class="adminTreePic" v-show="boss_child == 3" src="./3.png" alt="">
          </div>
          <!-- 子代模块 -->
          <div class="allChild">
            <div class="fistChildRow">
              <div class="fistChildDeta" v-for="fistData in Data.child" :key="fistData.key">
                <div class="headRow" style="margin-top:0;margin-bottom:0.1rem;height: 1.5rem;
                    width: 1.3rem;">
                  <p style="font-size:0.3rem;">{{fistData.username}}</p>
                  <p class="begatsPRow begatsPRowfistC">{{fistData.name}}</p>
                  <p class="begatsPRow begatsPRowfistC">{{fistData.mobile}}</p>
                  <div class="begatsChangeBtn" @click="ajaxBegatsDeta(fistData.username, false)">+</div>
                </div>
                <div class="branchImgBox">
                  <img class="adminTreePic" v-show="fistData.child.length == 1" src="./1.png" alt="">
                  <img class="adminTreePic" v-show="fistData.child.length == 2" src="./2.png" alt="" style="width:80%; margin:0 auto;display:block">
                  <img class="adminTreePic" v-show="fistData.child.length == 3" src="./3.png" alt="">
                </div>
                <!--  -->
                <div class="secondChildRow">
                  <div class="secondChildDeta" v-for="secondDeta in fistData.child" :key="secondDeta.key">
                    <div class="headRow" style="margin-top:0;margin-bottom:0.1rem;">
                      <p class="begatsPRow begatsPRowfistC global_txtOver">{{fistData.name}}</p>
                      <p class="begatsPRow begatsPRowfistC global_txtOver">{{fistData.mobile}}</p>
                      <div class="begatsChangeBtn" @click="ajaxBegatsDeta(secondDeta.username, false)" style="height:0.2rem;line-height:0.2rem;padding-right:0.05rem;font-size:0.16rem;">+</div>
                    </div>
                    <div class="branchImgBox">
                      <img class="adminTreePic" v-show="secondDeta.child.length == 1" src="./1.png" alt="">
                      <img class="adminTreePic" v-show="secondDeta.child.length == 2" src="./2.png" alt="" style="width:80%; margin:0 auto;display:block">
                      <img class="adminTreePic" v-show="secondDeta.child.length == 3" src="./3.png" alt="">
                    </div>
                    <div class="lastChildRow">
                      <div class="headRow" v-for="lastDeta in secondDeta.child" :key="lastDeta.key" style="margin-top:0;margin-bottom:0.1rem;height: 0.5rem;
                                width: 0.38rem;">
                        <p style="padding-top:0.05rem;font-size:0.12rem" class="global_txtOver">{{lastDeta.username}}</p>
                        <div class="begatsChangeBtn" @click="ajaxBegatsDeta(lastDeta.username, false)" style="height:0.1rem;line-height:0.1rem;padding-right:0;font-size:0.12rem;">+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
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
  name: "begats2",
  data: function data() {
    return {
      iSsuccess: false,
      isLoading: false,
      pageName: '系谱图', //tiele的名称
      backFlag: true, //是否需要返回按钮，FALSE：不需要   TRUE：需要
      backUrl: '/mainIndex', //返回按钮跳转到的位置
      Data: {},
      boss_child: '', //最上级拥有的子代数量
      TopId: '',
      lastId: '', //上一个Id
      searchId: '',
    }
  },
  methods: {
    //点击请求对应的上翻页或者下翻页
    ajaxBegatsDeta: function ajaxBegatsDeta(Id, upFlag) {
      let up = 0;
      var _this = this;
      // console.log(Id, this.TopId);
      //判断是否翻到了顶部
      if (Id == this.TopId) {
        _this.$message({
          message: '您无法看到您的上级',
          type: 'warning'
        });
        return
      }
      if (upFlag) {
        up = 1;
      }
      this.ajax(_this.port.adminTree, {
          is_api: 1,
        username: Id, //被点击人的ID
        up: up //  若是上翻则是1，下翻是0
      }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.Data = res.data[0];
          _this.boss_child = res.data[0].child.length;
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
  handleIconClick(ev) {
      var _this = this;
      // console.log(_this.searchId);
      if(_this.searchId == ''){
          return
      }else{
          this.ajax(_this.port.adminTree, {
              is_api: 1,
            username: _this.searchId
          }, 'POST', function(res) {
            // console.log(res);
            if (res.code == 1) {
              _this.Data = res.data[0];
              _this.boss_child = res.data[0].child.length
              // console.log(_this.boss_child);
              _this.searchId = '';
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
  },
  mounted: function mounted() {

    var iFrUrl = window.location.href;
    var GetDetaFlag = false;
    var urlKey = iFrUrl.slice((iFrUrl.indexOf('ypxl=') + 5));
    // console.log(urlKey);
    // console.log(iFrUrl);
    if(urlKey == 'j7Fa8nDAkI14DuNqqOyKUErNrWPYRPON'){
        GetDetaFlag = true;
    }
    //do something after mounting vue instance
    var _this = this;
    //初次进入请求，默认请求回来的是登录人ID及以下的子代
    if (true) {
      this.ajax(_this.port.adminTree, {
          is_api: 1
      }, 'POST', function(res) {
        // console.log(res);
        if (res.code == 1) {
          _this.Data = res.data[0];
          _this.TopId = res.data[0].username
          _this.boss_child = res.data[0].child.length
          // console.log(_this.boss_child);
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
        message: '警告！！非法访问！！',
        type: 'warning'
      });
    }

  }
}
</script>
<style scoped>
#begats2 .headRow p {
  padding-top: 0.1rem;
  height: 0.6rem
}

#begats2 .headRow .begatsChangeBtn {
  position: absolute;
  height: 0.36rem;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-right: 0.1rem;
  line-height: 0.36rem;
}

.begats2Pic {
  width: 80%;
  margin: 0 auto;
  height: 1rem;
  display: block;
}

.fistChildRow,
.secondChildRow,
.lastChildRow {
  display: flex;
  justify-content: space-around;
}

.secondChildDeta .begats2Pic {
  height: 0.5rem
}

.fistChildDeta {
  margin: 0 0.2rem;
  width: 29%;
}

.secondChildDeta {
  width: 32%;
}

#begats2 .headRow .secondChildDetaP {
  padding-top: 0.2rem !important;
}
.searchIdBox{
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
    width:185px
}
.begats2C{
    width: 100%;
    height: auto;
    overflow: auto;
}
.begats2Box{
    width: 720px;
    height: 90vh;
    background-color: #999
}
.begatsPRow{
    width: 100%;
    font-size: 0.12rem;
    color: #fff;
    text-align: center;
    padding: 0 !important;
    height: 0.4rem !important;
    line-height: 0.4rem !important;
}
.begatsPRowfistC{
    margin-top: -0.13rem;
}
</style>
