<template>
  <div class="record-wrap">
    <div class="record">
      <h2 class="caption ti">中奖获取记录</h2>
      <div class="content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <ul>
                <li v-for="(item, index) in records" :key="index">
                  恭喜&nbsp;&nbsp;&nbsp;&nbsp;{{ item.userName }}&nbsp;&nbsp;&nbsp;获得了&nbsp;&nbsp;&nbsp;&nbsp;{{ item.prizeName }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'record',
  data(){
    return {
      records: []
    };
  },
  computed: {
    ...mapGetters(['activityName']),
  },
  methods: {
    ...mapActions(['getCurrentModal', 'getFailModal']),
    // 获取箱子
    getRadio(){
      // let arr = ['qb', 'lol', 'dnf', 'cd'];
      axios.getRadio({
        activityUrl: this.activityName
      }).then(res => {
        if(res && res.success) {
          this.records = res.data;
          this.showListScroll();
        } else {
          this.getFailModal({
            message: res.message
          });
        }
      });
    },
    showListScroll: function() {
      this.$nextTick(function() {
        $('.swiper-slide').listScroll({
          dir: 'top',
          speed: 500,
          interval: 1000,
          row: 1
        });
      });
    },
    init() {
      this.getRadio();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.record-wrap {
  margin-top: 53px;
  .record {
    height: 275px;
    overflow: hidden;
    .caption {
      width: 237px;
      height: 28px;
      background: url(~@images/res/dungeon/record.png) no-repeat;
      margin: 0 auto;
    }
    .content {
      padding-top: 30px;
      @include center(660px);
      color: #747077;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      .swiper-container {
          width: 100%;
          height: 145px;
          overflow: hidden;
          position: relative;
          // text-align: center;
        }
        .swiper-wrapper {
          width: 100%;
          height: 145px;
          display: inline-block;
          text-align: center;
          .swiper-slide {
            width: 100%;
            margin: 0 auto;
            ul {
              overflow: hidden;
              margin: 0;
              padding: 0;
              li {
                width: 45%;
                float: left;
                text-align: left;
                overflow: hidden;
                @include eps;
                &:nth-of-type(even) {
                  margin-left: 10%;
                }
              }
            }
          }
        }
    }
  }
}
</style>
