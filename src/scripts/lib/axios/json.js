import axios from './axios';

/**
 * 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 */

// 单独导出
/* export const list = id => {
  return axios({
    url: `/list${id}`,
    method: 'get'
  })
}

export const upload = data => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
} */

/* 首页 */
// 获取活动信息
const activityinfo = data => {
  return axios({
    url: '/mock/activityinfo.json',
    params: data
  });
};

// 获取箱子
const boxList = data => {
  return axios({
    url: '/mock/boxList.json',
    params: data
  });
};

// 中奖轮播
const getRadio = data => {
  return axios({
    url: '/mock/getRadio.json',
    params: data
  });
};

// 箱子内奖品列表
const getPrizeByBox = data => {
  return axios({
    url: '/mock/getPrizeByBox.json',
    params: data
  });
};

// 账户信息
const userData = data => {
  return axios({
    url: '/mock/userData.json',
    params: data
  });
};

// 开箱子接口
const boxOpen = data => {
  return axios({
    url: '/mock/boxOpen.json',
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
    url: '/mock/freeTime.json',
    params: data
  });
};

/*个人中心的数据*/
//获取活动信息
//中奖记录
const getPrizeList = data => {
  return axios({
    method: 'get',
    url: '/mock/prizeList.json',
    params: data
  });
};
//领取记录
const getList = data => {
  return axios({
    method: 'get',
    url: '/mock/getList.json',
    params: data
  });
};
//领取奖品
const takeAward = data => {
  return axios({
    method: 'get',
    url: '/mock/takeAward.json',
    params: data
  });
};

//区服
const getAreaServer = () => {
  return axios({
    method: 'get',
    url: '/mock/getAreaServer.json'
  });
};


// 退出登录
const loginOut = () => {
  return axios({
    url: '/mock/logout.json'
  });
};
// 登录前置
const loginSession = data => {
  return axios({
    url: '/mock/toSetSessionId.json',
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
