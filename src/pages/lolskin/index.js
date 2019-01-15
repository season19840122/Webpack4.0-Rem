// 框架库部分
import '@styles/lib/base.scss';
import '@styles/lib/common.scss';
import $ from 'jquery';
import '@scripts/lib/jquery.qrcode.min';
import '@scripts/lib/listScroll';
import Vue from 'vue';
import store from '../../store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import Cookies from 'js-cookie';
import 'es6-promise/auto';
// 逻辑部分
// 独立成一个文件，或者放在 common 里
// import axios from '@scripts/lib/axios/json'; // 本地
import axios from '@scripts/lib/axios/interface'; // 线上
import common from '@scripts/lib/common';
import '@scripts/lib/vue-filter';
import Tpl from './index.vue';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(vuescroll);

// 全局挂载
window.$ = $;
window.axios = axios;
window.common = common;
window.Cookies = Cookies;
// 资源包配置
window.indexResource = indexResource;

new Vue({
  store,
  render: h => h(Tpl),
}).$mount('#app');
