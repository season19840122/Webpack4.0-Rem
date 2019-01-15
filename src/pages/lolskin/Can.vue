<template>
  <div class="can-wrap">
    <div class="can-common" v-if="boxInfo[0]" @click="openAward('commonCan')">
      <div class="img-wrap">
        <img src="@images/res/lolskin/common.png" alt="" :title="boxInfo[0].boxName" />
        <p class="box-name">{{ boxInfo[0].boxName }}</p>
      </div>
      <div class="btn-wrap">
        <button class="btn-open" @click="openBox(boxInfo[0], 1)" v-if="boxInfo[0].isHasFree">免费开启</button>
        <button class="btn-open" @click="openBox(boxInfo[0], 1)" v-else>开一次</button>
        <button class="btn-open" @click="openBox(boxInfo[0], 10)">开十次</button>
      </div>
      <div class="text-wrap">
        <p class="text" v-if="boxInfo[0].isHasFree">消耗<span class="c1">0</span>钻石</p>
        <p class="text" v-else>消耗<span class="c1">{{ boxInfo[0].boxPrice*100 }}</span>钻石</p>
        <p class="text">消耗<span class="c1">{{ boxInfo[0].boxPrice*10*100 }}</span>钻石</p>
      </div>
    </div>
    <div class="can-golden" v-if="boxInfo[1]" @click="openAward('goldenCan')">
      <div class="img-wrap">
        <img src="@images/res/lolskin/golden.png" alt="" :title="boxInfo[1].boxName" />
        <p class="box-name">{{ boxInfo[1].boxName }}</p>
      </div>
      <div class="btn-wrap">
        <button class="btn-open" @click="openBox(boxInfo[1], 1)" v-if="boxInfo[1].isHasFree">免费开启</button>
        <button class="btn-open" @click="openBox(boxInfo[1], 1)" v-else>开一次</button>
        <button class="btn-open" @click="openBox(boxInfo[1], 10)">开十次</button>
      </div>
      <div class="text-wrap">
        <p class="text" v-if="boxInfo[1].isHasFree">消耗<span class="c1">0</span>钻石</p>
        <p class="text" v-else>消耗<span class="c1">{{ boxInfo[1].boxPrice*100 }}</span>钻石</p>
        <p class="text">消耗<span class="c1">{{ boxInfo[1].boxPrice*10*100 }}</span>钻石</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'can',
  data(){
    return {
      boxInfo: [],
      poll:''
    };
  },
  computed: {
    ...mapGetters(['sources', 'asyncRefresh', 'flag', 'activityName'])
  },
  methods: {
    ...mapActions(['getCurrentModal', 'getFailModal', 'getInfoModal', 'getBoxInfo', 'getPrizeList', 'getAsyncRefresh', 'getWeixinPay', 'setFlag']),
    // 获取箱子
    getBoxList(){
      // let arr = ['qb', 'lol', 'dnf', 'cd'];
      axios.boxList({
        activity: this.activityName
      }).then(res => {
        if(res && res.success) {
          this.boxInfo = res.data;
          this.getBoxInfo(this.boxInfo);
        } else {
          this.getFailModal({
            message: res.message
          });
        }
      });
    },
    openBox(boxInfo, boxNum){
      // 登录判断，如果要测试可以注释掉这部分
      // if (!this.flag.isLogin) {
      //   this.getInfoModal({
      //     message: '请先登录！',
      //     type: 1,
      //     modal: 'info'
      //   });
      //   return;
      // }
      if(boxInfo.boxId !== 0 && boxNum) {
        axios.boxOpen({
          boxId: boxInfo.boxId,
          boxNum: boxNum,
          sources: this.sources
        }).then(res => {
          if(res && res.success) {
            if(res.code === 0) {
              this.getPrizeList(res.data);
              this.getCurrentModal('ten');
            } else if (res.code === 10000) {
              this.getCurrentModal('weixin')
                .then(()=>{
                  var obj = res.data;
                  obj['boxNum'] = boxNum;
                  obj['boxName'] = boxInfo.boxName;
                  this.getWeixinPay(obj);
                  this.poll = setInterval(() => {
                    this.checkFinishedUrl(obj.checkFinishedUrl);
                  }, 3000);
                  this.setFlag({
                    poll: this.poll
                  });
                });
            }
          } else {
            this.getFailModal({
              message: res.message
            });
          }
        });
      } 
    },
    openAward(modal){
      this.getCurrentModal(modal);
    },
    checkFinishedUrl(url){
      axios.checkFinishedUrl(url)
        .then(res => {
          if(res && res.success) {
            clearInterval(this.flag.poll);
            // 删除 canvas
            $('canvas').remove();
            this.getPrizeList(res.data);
            this.getCurrentModal('ten');
          } else {
            // this.getFailModal({
            //   message: res.message
            // });
          }
        });
    },
    init() {
      this.getBoxList();
    }
  },
  watch: {
    asyncRefresh(newVal, oldVal){
      if(newVal) {
        this.getBoxList();
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.can-wrap {
  @include center;
  display: flex;
  justify-content: space-between;
  .can-common, .can-golden {
    width: 651px;
    height: 533px;
    background: url(~@images/res/lolskin/can.png) no-repeat;
    background-size: contain;
    padding: 26px 28px;
    .img-wrap {
      img {
        width: 599px;
        height: 419px;
        display: block;
        cursor: pointer;
      }
      .box-name{
        color: #f7da9d;
        font-size:28px;
        height: 59px;
        line-height: 59px;
        text-align: center;
        @include eps;
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
      .btn-open {
        width: 212px;
        height: 75px;
        background: url(~@images/res/lolskin/btn-open.png) no-repeat;
        background-size: contain;
        color: #463315;
        font-weight: bold;
        font-size: 28px;
        &:hover {
          background: url(~@images/res/lolskin/btn-open-hover.png) no-repeat;
          background-size: contain;
        }
        &.disable {
          background: url(~@images/res/lolskin/btn-open-disable.png) no-repeat;
          background-size: contain;
        }
      }
    }
    .text-wrap {
      display: flex;
      justify-content: space-around;
      margin-top: 6px;
      width: 100%;
      .text {
        width: 212px;
        color: #fae3b3;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        .c1 {
          color: #ff0000;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
