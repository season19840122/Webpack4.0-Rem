import axios from './axios';

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

/* 首页 */
// 获取活动信息
const activityinfo = data => {
  return axios({
    method: 'post',
    url: '/activity/info',
    params: data
  });
};

// 获取箱子
const boxList = data => {
  return axios({
    method: 'post',
    url: '/box/list',
    params: data
  });
};

// 中奖轮播
const getRadio = data => {
  return axios({
    method: 'post',
    url: '/getRadio',
    params: data
  });
};

// 箱子内奖品列表
const getPrizeByBox = data => {
  return axios({
    method: 'post',
    url: '/prize/getPrizeByBox',
    params: data
  });
};

// 账户信息
const userData = data => {
  return axios({
    method: 'post',
    url: '/userData',
    params: data
  });
};

// 开箱子接口
const boxOpen = data => {
  return axios({
    method: 'post',
    url: '/box/open',
    params: data
  });
};

// 获取支付结果接口
const checkFinishedUrl = (url, data) => {
  return axios({
    url: url,
    params: data
  });
};

// 获取支付结果接口
const freeTime = data => {
  return axios({
    url: '/box/freetime',
    params: data
  });
};

/*个人中心的数据*/
//中奖记录
const getPrizeList = data => {
  return axios({
    method: 'post',
    url: '/box/prizeList',
    params: data
  });
};
//领取奖品
const takeAward = data => {
  return axios({
    method: 'post',
    url: '/extractPrize/takeOut',
    params: data
  });
};
//领取记录
const getList = data => {
  return axios({
    method: 'post',
    url: '/boxExtract/list',
    params: data
  });
};
//区服
const getAreaServer = () => {
  return axios({
    method: 'post',
    url: '/extractPrize/areaServer'
  });
};
// 退出登录
const loginOut = () => {
  return axios({
    url: '/logout'
  });
};
// 登录前置
const loginSession = data => {
  return axios({
    url: '/toSetSessionId',
    params: data
  });
};
// 默认全部导出
export default {
  activityinfo,
  boxList,
  getRadio,
  getPrizeByBox,
  userData,
  boxOpen,
  checkFinishedUrl,
  freeTime,
  getPrizeList,
  takeAward,
  getList,
  getAreaServer,
  loginOut,
  loginSession
};
