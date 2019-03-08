<template>
  <div class="modal-wrap">
    <div class="masklayer" v-if="mask || currentModal"></div>

    <!-- 奖品列表 -->
    <Lottery :currentModal="currentModal"></Lottery>

    <!-- 活动规则 -->
    <div class="dialog-wrap rule" v-if="currentModal == 'rule'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents mainScroll">
        <h3 class="caption">活动名称</h3>
        <p class="text">{{ indexResource.activeName }}</p>
        <h3 class="caption">活动时间</h3>
        <p class="text">{{ indexResource.activeTime }}</p>
        <h3 class="caption">活动规则</h3>
        <div class="text-wrap">
          <ul>
            <li v-for="item in indexResource.activeRule">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 免费开箱 -->
    <div class="dialog-wrap one" v-if="currentModal == 'free'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents" v-if="freeTime[0]">
        <img src="@images/res/lolskin/award.png" alt="" class="img">
        <!-- <img :src="freeTime[0].picUrl" alt="" class="img"> -->
        <p class="text" v-for="(item, index) in freeTime" :key="index">恭喜你获得<span class="c2">{{ item.freeTimes }}次</span>开启{{ item.boxName}}的机会!</p>
        <div class="btn-wrap">
          <button class="btn-sure" @click="closeModal">确定</button>
        </div>
      </div>
    </div>

    <!-- 开十次 -->
    <div class="dialog-wrap ten" v-if="currentModal == 'ten'">
      <i class="i-close" @click="closeRefresh"></i>
      <div class="contents">
        <h3 class="title">恭喜您中奖了   您获得的奖品为</h3>
        <div class="prize-box" style="margin: 0;" v-if="prizeList.length < 6">
          <div class="prize-wrap" v-for="(item, index) in prizeList" :key="index">
            <img :src="'https://static.gameboxmall.com/upload/' + item.picUrl" class="prize-img" alt="">
            <!-- <img src="@images/test-lolskin.png" class="prize-img" alt=""> -->
            <p class="prize-name">{{ item.prizeName }}</p>
            <p class="prize-val">价值{{ item.prizeCnt }}{{ item.prizeUnit }}</p>
          </div>
        </div>
        <a-carousel arrows :slidesToShow="5" :slidesToScroll="5" :infinite="false" :dots="false" v-else>
          <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow">
          </div>
          <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow right">
          </div>
          <div class="prize-wrap" v-for="(item, index) in prizeList" :key="index">
            <img :src="'https://static.gameboxmall.com/upload/' + item.picUrl" class="prize-img" alt="">
            <!-- <img src="@images/test-lolskin.png" class="prize-img" alt=""> -->
            <p class="prize-name">{{ item.prizeName }}</p>
            <p class="prize-val">价值{{ item.prizeCnt }}{{ item.prizeUnit }}</p>
          </div>
        </a-carousel>
        <div class="part">
          <p class="p1" v-if="prizeList.length === 1 && prizeList[0].free">免费开启获得的{{ prizeList[0].prizeName }}将于<span class="c3">{{ prizeList[0].freeExpireTime }}过期</span>，请尽快提取！</p>
          <div class="btn-wrap">
            <button class="btn-sure" style="margin-right: 30px;" @click="closeRefresh">继续抽奖</button>
            <a :href="awardHref" class="btn-sure">前往领奖</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 微信扫码支付 -->
    <div class="dialog-wrap weixin" v-if="currentModal == 'weixin'">
      <i class="i-close" @click="closeModalClear"></i>
      <div class="contents">
        <div class="qrcode"></div>
        <h3 class="title">微信扫码支付</h3>
        <!-- 支付20元购买2000钻石，立即开启黄金宝箱10次 -->
        <p class="p2">支付<span class="c1">{{ weixinPay.payMoney }}元</span>购买{{ weixinPay.payMoney*100 }}钻石即可开启{{ weixinPay.boxName }}<span class="c1">{{ weixinPay.boxNum }}</span>次</p>
      </div>
    </div>

    <!-- 提示弹层 -->
    <div class="dialog-wrap info" v-if="currentModal == 'info'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents">
        <p class="fail">{{ info.message }}</p>
        <div class="btn-wrap">
          <button class="btn-go" v-if="info.type&&info.type==1" @click="closeModalFn">确定</button>
          <button class="btn-go" v-else @click="closeModal">确定</button>
        </div>
      </div>
    </div>
    <!--cdkey弹窗-->
    <div class="dialog-wrap keyCode" v-if="currentModal == 'keyCode'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents" v-if="prizeMsg">
        <p class="p3">您获得的"{{prizeMsg.boxName}}"  cdkey为</p>
        <input type="text" readonly class="cdkey-ipt" :value="prizeMsg.remark.cdkey">
        <p class="p4">过期时间{{prizeMsg.remark.expireTime}}</p>
      </div>
    </div>

    <!--领奖成功-->
    <div class="dialog-wrap getSuccess" v-if="currentModal == 'getSuccess'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents">
        <p class="success"><i></i>领奖信息提交成功！</p>
        <p class="line">请前往领取记录中查看详细进度</p>
        <div class="btn-wrap">
          <button class="btn-go" @click="goToIndex">前往抽奖</button>
          <button class="btn-get" @click="goToRecord">领取记录</button>
        </div>
      </div>
    </div>
    <!--领奖失败/cdKey提取失败-->
    <div class="dialog-wrap failTips" v-if="currentModal == 'failTips'">
      <i class="i-close" @click="closeModal"></i>
      <div class="contents">
        <p class="fail"><i></i>{{failMsg.message}}!</p>
        <div class="btn-wrap">
          <button class="btn-go" @click="closeModal">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Lottery from '@pages/lolskin/Lottery';
export default {
  name: 'modal',
  components: {
    Lottery
  },
  data () {
    return {
      mask: null,
      indexResource: indexResource
    };
  },
  computed: {
    ...mapGetters(['currentModal', 'info', 'prizeMsg', 'failMsg', 'indexHref', 'awardHref', 'prizeList', 'freeTime', 'weixinPay','pageHref', 'flag']),
    loginUrl(){
      return this.pageHref+'qqLogin?url='+encodeURIComponent(window.location.href);
    },
  },
  methods: {
    ...mapActions([
      'getCurrentModal',
      'getInfoModal',
      'getPrizeMsgFn',
      'getAsyncRefresh'
    ]),
    closeModal (callBack) {
      this.mask = false;
      this.getCurrentModal(null);
      if (typeof callBack == 'function') callBack();
    },
    closeModalClear(){
      clearInterval(this.flag.poll);
      this.closeModal();
    },
    closeRefresh(){
      this.closeModal();
      location.reload();
    },
    closeModalFn(){
      var t=this;
      location.href = t.loginUrl;
    },
    goToIndex(){
      window.open(this.indexHref,'_self');
    },
    goToRecord(){
      location.hash = '#flag=2';
      location.reload();
    },
    getQrcode(url){
      this.$nextTick(() => {
        $('.qrcode').qrcode({
          // width: 296,
          // height: 296,
          text: url
        });
      });
    }
  },
  watch: {
    weixinPay(newVal, oldVal){
      // console.log(newVal,oldVal);
      this.getQrcode(newVal.codeUrl);
    }
  },
  mounted () {
  }
};
</script>

<style lang="scss">
  .ant-carousel {
    height: 491px;
  }
  .ant-carousel /deep/ .slick-slider {
    text-align: center;
    width: 1277px;
    height: 491px;
    margin: 0 auto;
  }
  .ant-carousel /deep/ .custom-slick-arrow {
    width: 48px;
    height: 89px;
    transform: translateY(-50%);
    background: url(~@images/res/lolskin/left-arrow.png) no-repeat;
    background-size: contain;
    left: -71px;
    z-index: 1;
    &.right, &.right:hover {
      background: url(~@images/res/lolskin/right-arrow.png) no-repeat;
      background-size: contain;
      left: auto;
      right: -71px;
    }
  }
  .ant-carousel /deep/ .custom-slick-arrow:before {
    display: none;
  }
  .ant-carousel /deep/ .custom-slick-arrow:hover {
    background: url(~@images/res/lolskin/left-arrow.png) no-repeat;
    background-size: contain;
    opacity: 0.5;
  }
  .prize-box {
    display: flex;
    justify-content: center;
    height: 491px;
    margin-bottom: 50px;
  }
  .prize-wrap{
    background: url(~@images/res/lolskin/award-box.png) no-repeat;
    background-size: contain;
    width: 253px;
    height: 503px;
    margin-right: 6px;
    padding: 9px;
    position: relative;
    text-align: center;
    .prize-img {
      width: 234px;
      height: 483px;
      display: block;
    }
    p {
      margin: 0;
    }
    .prize-name {
      background: url(~@images/res/lolskin/name-bg.png) no-repeat;
      background-size: contain;
      width: 187px;
      height: 49px;
      line-height: 49px;
      position: absolute;
      left: 50%;
      bottom: 86px;
      transform: translateX(-50%);
      color: #fff0be;
      font-size: 22px;
    }
    .prize-val {
      background: rgba(0,0,0,.5);
      height: 52px;
      line-height: 52px;
      position: absolute;
      left: 9px;
      right: 12px;
      bottom: 9px;
      color: #ffd323;
      font-size: 22px;
    }
  }
  .modal-wrap {
    // 弹层
    .masklayer {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      background: #000;
      opacity: 0.5;
    }
    $w: 1304px;
    $h: 742px;
    .dialog-wrap {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      width: $w;
      height: $h;
      @include bs;
      &.rule {
        background: url(~@images/res/lolskin/dialog-rule.png) no-repeat;
        background-size: contain;
        .contents {
          margin: 134px 130px;
          padding-right: 30px;
          width: 1135px;
          height: 546px;
          overflow-x: hidden;
        }
      }
      &.one {
        background: url(~@images/res/lolskin/dialog-weixin.png) no-repeat;
        background-size: contain;
        width: 793px;
        height: 608px;
        padding: 98px 18px;
        .contents {
          padding: 0;
          @include br;
          height: 480px;
          position: relative;
          .img {
            width: 246px;
            height: 246px;
            display: block;
            margin: 0 auto 30px;
          }
          .text {
            text-align: center;
            color: #fff0be;
            font-size: 30px;
            .c2 {
              color: #ffd038;
            }
          }
          .btn-wrap {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 20px;
          }
        }
      }
      &.ten {
        background: url(~@images/res/lolskin/dialog-ten.png) no-repeat;
        background-size: contain;
        width: 1485px;
        height: 794px;
        padding: 33px 104px;
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
      &.weixin {
        background: url(~@images/res/lolskin/dialog-weixin.png) no-repeat;
        background-size: contain;
        width: 793px;
        height: 608px;
        padding: 83px 18px;
        .contents {
          padding: 0;
          position: relative;
          .title {
            color: #fff0be;
            font-size: 38px;
            text-align: center;
          }
          .p2 {
            color: #fff0be;
            font-size: 30px;
            text-align: center;
            margin-bottom: 20px;
            .c1 {
              color: #ffd200;
            }
          }
          .qrcode {
            width: 300px;
            height: 300px;
            margin: 0 auto;
            border: 2px solid #282425;
            @include br(2px);
            background: #ffffff;
            canvas {
              width: 296px;
              height: 296px;
            }
          }
        }
      }
      /*&.info {
        height: 200px;
        .contents {
          padding: 0;
          .p3 {
            margin-top: 60px;
            text-align: center;
            font-size: 16px;
          }
          .btn-wrap {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 20px;
          }
        }
      }*/
      &.keyCode{
        background: #0f1319;
        border: 1px solid #463714;
        width: 368px;
        font-size: 14px;
        .contents{
          color: #a19b8e;
          text-align: center;
          .p3{
            margin-bottom: 10px;
          }
          input{
            width: 220px;
            height: 40px;
            outline: none;
            border: none;
            background: #34393f;
            text-align: center;
            line-height: 40px;
            font-size: 16px;
            color: #cdbf91;
            padding: 0 5px;
          }
          .p4{
            margin-top: 10px;
          }
        }
        .i-close {
          background: url(~@images/close-center.png) no-repeat;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 8px;
          top: 8px;
          cursor: pointer;
        }
      }
      &.getSuccess,&.failTips,&.info{
        background: #0f1319;
        border: 1px solid #463714; /*no*/
        width: 368px; /*no*/
        height: 200px; /*no*/
        font-size: 14px; /*no*/
        color: #5a5a56;
        text-align: center;
        padding: 50px; /*no*/
        .p3 {
          margin-top: 60px; /*no*/
          text-align: center;
          font-size: 16px; /*no*/
        }
        .success{
          font-size: 16px; /*no*/
          color: #a19b8e;
          position: relative;
          margin-bottom: 0;
          line-height: 34px; /*no*/
          i{
            background: url(~@images/success.png) no-repeat;
            width: 34px; /*no*/
            height: 34px; /*no*/
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px; /*no*/
          }
        }
        .fail{
          font-size: 16px; /*no*/
          color: #a19b8e;
          position: relative;
          line-height: 34px; /*no*/
          margin: 0 0 20px 0; /*no*/
          i{
            background: url(~@images/fail.png) no-repeat;
            width: 34px; /*no*/
            height: 34px; /*no*/
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px; /*no*/
          }
        }
        .line{
          margin: 20px 0 20px 0; /*no*/
          color: #5a5a56;
        }
        .i-close {
          background: url(~@images/close-center.png) no-repeat;
          width: 13px; /*no*/
          height: 13px; /*no*/
          position: absolute;
          right: 8px; /*no*/
          top: 8px; /*no*/
          cursor: pointer;
        }
        .btn-wrap{
          margin: 0 auto;
          button{
            width: 95px; /*no*/
            height: 32px; /*no*/
            text-align: center;
            line-height: 32px; /*no*/
            outline: none;
            border: none;
            border-radius: 2px; /*no*/
            display: inline-block;
            vertical-align: bottom;
            margin: 0 10px; /*no*/
            &.btn-go{
              background: #c89b3c;
              color: #333;
              &:hover{
                background: #dfae45;
              }
            }
            &.btn-get{
              background: #3b4653;
              color: #828588;
              &:hover{
                background: #445262;
                color: #9099a3;
              }
            }
          }
        }
      }
      .i-close {
        background: url(~@images/res/lolskin/btn-close.png) no-repeat;
        background-size: contain;
        width: 46px;
        height: 45px;
        position: absolute;
        right: 21px;
        top: 25px;
        cursor: pointer;
      }
      .contents {
        color: #282425;
        .caption {
          // width: 84px;
          height: 35px;
          line-height: 35px;
          color: #ffe8a7;
          font-size: 30px;
          text-align: left;
          margin-bottom: 15px;
          @include br;
        }
        .text {
          color: #8eadb5;
          font-size: 26px;
          line-height: 1;
          margin-bottom: 15px;
          &.c1 {
            color: #70665d;
          }
        }
        .form-wrap {
          .formitem {
            @include cf;
            width: 340px;
            overflow: hidden;
            margin-bottom: 20px;
            .lbl {
              float: left;
              width: 96px;
              height: 34px;
              line-height: 34px;
              text-align: right;
              margin-right: 10px;
            }
            .ipt-text {
              width: 340px;
              height: 42px;
              line-height: 22px;
              padding: 10px;
              border: 1px solid #d9dade;
              @include br(2px);
              font-size: 14px;
              &.s {
                width: 220px;
              }
              &.m {
                width: 230px;
                height: 34px;
                line-height: 32px;
              }
            }
          }
        }
      }
      .text-wrap {
        li {
          font-size: 26px;
          line-height: 2;
          color: #8eadb5;
        }
      }
      .btn-wrap {
        text-align: center;
      }
      .btn-sure {
        display: inline-block;
        width: 223px;
        height: 71px;
        line-height: 71px;
        background: url(~@images/res/lolskin/btn-sure.png) no-repeat;
        background-size: contain;
        color: #463315;
        font-weight: bold;
        font-size: 34px;
        &:hover {
          background: url(~@images/res/lolskin/btn-sure-hover.png) no-repeat;
          background-size: contain;
        }
        &.disable {
          background: url(~@images/res/lolskin/btn-sure-disable.png) no-repeat;
          background-size: contain;
        }
      }
    }
  }
</style>


