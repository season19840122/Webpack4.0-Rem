<template>
  <div class="home-wrap">
    <div class="home">
      <div class="btn-wrap">
        <a href="javascript:void(0);" class="btn-rule" @click="getCurrentModal('rule')"></a>
        <a :href="awardHref" class="btn-award"></a>
      </div>
      <div class="content-wrap cf">
        <Can/>
        <!-- <Lottery/> -->
      </div>
      <!-- <Record/> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Can from './Can';
export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    Can
  },
  computed: {
    ...mapGetters(['awardHref', 'activityName', 'flag']),
  },
  methods: {
    ...mapActions(['getCurrentModal', 'getInfoModal', 'getFailModal', 'getActivityInfo', 'getAwardHref', 'getFreeTime', 'setFlag', 'getUserDataInfo']),
    // 获取活动模板信息
    doActivityinfo(){
      var t = this;
      // let arr = ['qb', 'lol', 'dnf', 'cd'];
      axios.activityinfo({
        activityName: this.activityName
      }).then(res => {
        if(res && res.success) {
          // console.log(res);
          t.getActivityInfo(res.data);
          // 获取领奖 flag
          t.getFlag(res.data.receiveTemplate);
          // 登录判断，如果要测试可以取反 !t.flag.isLogin
          if(t.flag.isLogin) {
            t.doFreeTime(res.data.activityId);
            t.getUserData(res.data.activityId,res.data.gameId);
          }
        } else {
          t.getInfoModal({
            message: '获取不到模版类型',
            modal: 'info'
          });
        }
      });
    },
    // 登录后获取免费箱子
    doFreeTime(activityId){
      axios.freeTime({
        activityId: activityId
      }).then(res => {
        if(res && res.success) { 
          if(res.data.length > 0) {
            this.getFreeTime(res.data);
            // this.setFlag({
            //   isFree: true
            // });
            this.getCurrentModal('free');
          }
        } else {
          this.getFailModal({
            message: res.message
          });
        }
      });
    },
    // 获取活动名称
    getFlag(receiveTemplate){
      var flag = 1;
      if(receiveTemplate === 'cdkey'){
        flag = 0;
      }
      this.getAwardHref(`${indexResource.domain}activity/center?activityName=${common.business.getActivityName()}&sources=${common.business.getSources()}#flag=${flag}`);
    },
    //账户信息
    getUserData(activityId,gameId){
      //加载最后一次记录
      var t=this;
      axios.userData({
        activityId: activityId,
        gameId: gameId
      }).then(res => {
        if (res && res.success) {
          var _data=res.data;
          t.getUserDataInfo(_data);
        } else {
          t.getFailModal(res);
        }
      });
    },
    init() {
      this.doActivityinfo();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.home-wrap {
  height: 910px;
  background: #000 url(~@images/res/lolskin/bg-index.jpg) no-repeat center top;
  background-size: contain;
  .home {
    @include center;
    padding-top: 94px;
    position: relative;
    .btn-wrap {
      .btn-rule,
      .btn-award {
        position: absolute;
        left: -141px;
        top: 103px;
        width: 216px;
        height: 55px;
        background: url(~@images/res/lolskin/btn-award.png) no-repeat;
        background-size: contain;
      }
      .btn-rule {
        position: absolute;
        left: auto;
        right: 166px;
        top: 94px;
        width: 168px;
        height: 49px;
        background: url(~@images/res/lolskin/btn-rule.png) no-repeat;
        background-size: contain;
      }
    }
    .content-wrap {
      margin-top: 125px;
    }
  }
}
</style>
