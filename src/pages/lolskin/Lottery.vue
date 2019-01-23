<template>
  <div class="lottery-wrap">
    <!-- 普通 -->
    <div class="dialog-wrap lottery" v-if="currentModal == 'commonCan'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents">
        <div class="prize-box" v-if="commonCan.length < 6">
          <div class="prize-wrap" v-for="(item, index) in commonCan" :key="index">
            <img :src="'https://static.gameboxmall.com/upload/' + item.picUrl" class="prize-img" alt="">
            <!-- <img src="@images/test-lolskin.png" class="prize-img" alt=""> -->
            <p class="prize-name">{{ item.prizeName }}</p>
            <p class="prize-val">中奖概率 {{ item.showProbability*100 | saveTwoDigit}}%</p>
          </div>
        </div>
        <a-carousel arrows :slidesToShow="5" :slidesToScroll="5" :infinite="false" :dots="false" v-else>
          <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow">
          </div>
          <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow right">
          </div>
          <div class="prize-wrap" v-for="(item, index) in commonCan" :key="index">
            <img :src="'https://static.gameboxmall.com/upload/' + item.picUrl" class="prize-img" alt="">
            <!-- <img src="@images/test-lolskin.png" class="prize-img" alt=""> -->
            <p class="prize-name">{{ item.prizeName }}</p>
            <p class="prize-val">中奖概率 {{ item.showProbability*100 | saveTwoDigit}}%</p>
          </div>
        </a-carousel>
      </div>
    </div>

    <!-- 黄金 -->
    <div class="dialog-wrap lottery" v-if="currentModal == 'goldenCan'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents">
        <div class="prize-box" v-if="goldenCan.length < 6">
          <div class="prize-wrap" v-for="(item, index) in goldenCan" :key="index">
            <img :src="'https://static.gameboxmall.com/upload/' + item.picUrl" class="prize-img" alt="">
            <!-- <img src="@images/test-lolskin.png" class="prize-img" alt=""> -->
            <p class="prize-name">{{ item.prizeName }}</p>
            <p class="prize-val">中奖概率 {{ item.showProbability*100 | saveTwoDigit}}%</p>
          </div>
        </div>
        <a-carousel arrows :slidesToShow="5" :slidesToScroll="5" :infinite="false" :dots="false" v-else>
          <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow">
          </div>
          <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow right">
          </div>
          <div class="prize-wrap" v-for="(item, index) in goldenCan" :key="index">
            <img :src="'https://static.gameboxmall.com/upload/' + item.picUrl" class="prize-img" alt="">
            <!-- <img src="@images/test-lolskin.png" class="prize-img" alt=""> -->
            <p class="prize-name">{{ item.prizeName }}</p>
            <p class="prize-val">中奖概率 {{ item.showProbability*100 | saveTwoDigit}}%</p>
          </div>
        </a-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'lottery',
  data() {
    return {
      commonCan: [],
      goldenCan: []
    };
  },
  computed: {
    ...mapGetters(['boxInfo', 'currentModal'])
  },
  methods: {
    ...mapActions(['getCurrentModal', 'getFailModal']),
    closeModal (callBack) {
      this.mask = false;
      this.getCurrentModal(null);
      if (typeof callBack == 'function') callBack();
    },
    closeRefresh(){
      this.closeModal();
      location.reload();
    },
    // 获取箱子
    getPrizeByBox(boxid, callback){
      if(boxid) {
        axios.getPrizeByBox({
          boxId: boxid
        }).then(res => {
          // clearInterval(flag);
          if(res && res.success) {
            callback(res.data);
          } else {
            this.getFailModal({
              message: res.message
            });
          }
        });
      }
    },
    init() {
    }
  },
  watch: {
    boxInfo(){
      var t = this;
      this.getPrizeByBox(this.boxInfo[0].boxId, function(data){
        t.commonCan = data;
      });
      this.getPrizeByBox(this.boxInfo[1].boxId, function(data){
        t.goldenCan = data;
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
  .modal-wrap .lottery-wrap .lottery {
    background: url(~@images/res/lolskin/dialog-award.png) no-repeat;
    background-size: contain;
    width: 1488px;
    height: 608px;
    padding: 56px 110px;
    .contents {
      padding: 0;
      min-height: 160px;
      @include br;
      position: relative;
      .title {
        color: #ffda44;
        font-size: 48px;
        text-align: center;
      }
      .ul {
        padding-top: 10px;
        li {
          font-size: 16px;
          line-height: 30px;
          color: #70665d;
          text-align: center;
        }
      }
      .part {
        width: 100%;
        height: 120px;
        .btn-wrap {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
      .p1 {
        border-top: 1px solid #45340d;
        color: #70665d;
        font-size: 14px;
        text-align: center;
        padding: 10px 10px 0;
        .c3 {
          color: #ffca00;
        }
      }
    }
  }
</style>
