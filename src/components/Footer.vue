<template>
  <div class="footer-wrap" v-cloak>
    <div class="footer">
      <p class="link">
        <a :href="domain + '/about?flag=1'" target="_blank">公司简介</a>
        <span>-</span>
        <a :href="domain + '/about?flag=2'" target="_blank">联系我们</a>
        <span>-</span>
        <a :href="domain + '/about?flag=3'" target="_blank">隐私策略</a>
        <span>-</span>
        <a :href="domain + '/about?flag=4'" target="_blank">免责申明</a>
      </p>
      <p class="txt">杭州会网雨科技有限公司 版权所有 © 2018 - 2019 <a href="javascript:void(0)" target="_blank"><img src="@assets/images/ghs.png" alt="">备案号：浙ICP备18043152号-1</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      domain: indexResource.domain
    };
  }
};
</script>

<style scoped lang="scss">
  .footer-wrap {
    min-width: 1200px;
    background: #282725;
    border-top: 1px solid #33363d;
    .footer {
      padding-top: 20px;
      padding-bottom: 20px;
      text-align: center;
      clear: both;
      min-width: 1200px;
      font-size: 12px;
      line-height: 20px;
      color: #8b8f96;
      .link, .txt {
        margin-bottom: 0;
        a{
          color: #8b8f96;
          cursor: pointer;
          img{
            vertical-align: middle;
            margin-right: 5px;
          }
        }
        span {
          margin: 0 10px
        }
      }
      .txt{
        a{
          margin-left: 10px;
        }
      }
    }
  }
</style>
