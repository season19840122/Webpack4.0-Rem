<template>
  <div class="header-wrap">
    <div class="header">
      <!-- <div class="logo">
        <a :href="indexHref">
          <img src="@images/logo.png" alt="logo">
        </a>
      </div> -->
      <div class="account">
         <div v-if="flag.isLogin">您好，请<a :href="loginUrl" class="not">[登录]</a></div>
         <div class="login" v-else>
          <div class="p3">
            欢迎您，{{ userName }}
            <a href="javascript:void(0)" class="btn-exit" @click="handleExit">退出</a>
          </div>
          <div class="p4">
            <span v-if="!isCdKey">{{activityInfo.receiveTemplate}}：<template v-if="!userDataInfo.userPrizeInfo">0</template><template v-else>{{userDataInfo.userPrizeInfo.prizeCnt+userDataInfo.userPrizeInfo.freePrizeCnt}}{{userDataInfo.userPrizeInfo.prizeUnit}}</template></span>
            <a :href="awardHref" class="btn-extract" v-if="!isCdKey">立即提取</a>
            <!-- <span class="line" v-if="!isCdKey">|</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Header',
  props: {
    msg: String,
  },
  data() {
    return {
      indexUrl:'',
    };
  },
  computed: {
    ...mapGetters(['awardHref', 'indexHref','pageHref','userName','flag','activityInfo','userDataInfo']),
    loginUrl:function(){
      return this.pageHref+'qqLogin?url='+encodeURIComponent(window.location.href);
    },
    isCdKey:function () {
      if(this.activityInfo.receiveTemplate=='cdkey'){
        return true;
      }
      return false;
    }
  },
  methods: {
    ...mapActions(['getFailModal']),
    handleExit() {
      //退出登录
      var t=this;
      axios.loginOut().then(res => {
        if (res && res.success) {
          location.reload();
        } else {
          t.getFailModal(res);
        }
      });
    },
    //登录前置请求
    toSetSessionId(){
      axios.loginSession({
        url:encodeURIComponent(window.location.href)
      });
    },
    init(){
      this.toSetSessionId();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
.header-wrap {
  .header {
    position: relative;
    .account {
      color: #fff0b7;
      position: absolute;
      left: 86px;
      top: 20px;
      width: 50%;
      font-size: 24px;
      line-height: 42px;
      z-index: 100;
      .not {
        color: #def3a5;
        &:hover {
          color: #987637;
        }
        .i-account {
          width: 13px;
          height: 13px;
          display: inline-block;
          // background: url(~images/sprite-recycle.png) no-repeat;
          margin-right: 10px;
          vertical-align: -2px;
        }
      }
      .login {
        font-size: 24px;
        line-height: 42px;
        color: #def3a5;
        .btn-extract {
          color: #987637;
          margin: 0 10px;
        }
        .line {
          color: #3c3f43;
          margin: 0 10px 0 0;
        }
        .btn-exit {
          color: #9fa1a3;
          &:hover {
            color: #987637;
          }
        }
      }
    }
  }
}
</style>
