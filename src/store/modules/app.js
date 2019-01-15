import common from '@scripts/lib/common';

const app = {
  state: {
    // publicPath: '//127.0.0.1/',
    currentModal: '',
    prizeMsg:{},
    templateType:'',
    awardHref: '',
    indexHref: `${indexResource.domain}activity/index?activityName=${common.business.getActivityName()}&sources=${common.business.getSources()}`,
    failMsg: {},
    info: {},
    activityName: common.business.getActivityName(),
    sources: common.business.getSources(),
    boxInfo: {},
    prizeList: [],
    freeTime: [],
    asyncRefresh: false,
    weixinPay: {},
    flag: {
      isLogin: common.business.isLoginFn(),
      isFree: false,
      isClose: false,
      poll: ''
    },
    userName:common.business.getUserNameFn(),
    pageHref: indexResource.domain,
  },

  mutations: {
    m_publicPath: (state, payload) => {
      state.count += payload.amount;
    },
    m_info: (state, info) => {
      state.info = info;
    },
    m_currentModal: (state, modal) => {
      state.currentModal = modal;
    },
    m_prizeMsg: (state, value) => {
      state.prizeMsg = value;
    },
    m_templateType: (state, value) => {
      state.templateType = value;
    },
    m_awardHref: (state, href) => {
      state.awardHref = href;
    },
    m_indexHref: (state, href) => {
      state.indexHref = href;
    },
    m_failMsg: (state, failMsg) => {
      state.failMsg = failMsg;
    },
    m_boxInfo: (state, boxInfo) => {
      state.boxInfo = boxInfo;
    },
    m_prizeList: (state, prizeList) => {
      state.prizeList = prizeList;
    },
    m_freeTime: (state, freeTime) => {
      state.freeTime = freeTime;
    },
    m_asyncRefresh: (state, asyncRefresh) => {
      state.asyncRefresh = asyncRefresh;
    },
    m_weixinPay: (state, weixinPay) => {
      state.weixinPay = weixinPay;
    },
    m_flag: (state, flag) => {
      Object.keys(flag).forEach(function (key) {
        state.flag[key] = flag[key];
      });
    },
  },

  actions: {
    a_PublicPath: ({ commit }, payload) => {
      commit('m_publicPath', {
        amount: payload.num
      });
    },
    getCurrentModal: ({ commit }, modal) => {
      commit('m_currentModal', modal);
    },
    getInfo: ({ commit }, info) => {
      commit('m_info', info);
    },
    getInfoModal: ({ dispatch, commit }, info) => {
      dispatch('getInfo', info).then(() => {
        commit('m_currentModal', info.modal);
      });
    },
    getPrizeMsgFn: ({ commit }, value) => {
      commit('m_prizeMsg', value);
    },
    getPrizeModal: ({ dispatch, commit }, prizeMsg) => {
      dispatch('getPrizeMsgFn', prizeMsg).then(() => {
        commit('m_currentModal', 'keyCode');
      });
    },
    getTemplateType: ({ commit }, value) => {
      commit('m_templateType', value);
    },
    getAwardHref: ({ commit }, href) => {
      commit('m_awardHref', href);
    },
    getIndexHref: ({ commit }, href) => {
      commit('m_indexHref', href);
    },
    getFailMsg: ({ commit }, failMsg) => {
      commit('m_failMsg', failMsg);
    },
    getFailModal: ({ dispatch, commit }, failMsg) => {
      dispatch('getFailMsg', failMsg).then(() => {
        commit('m_currentModal', 'failTips');
      });
    },
    getBoxInfo: ({ commit }, boxInfo) => {
      commit('m_boxInfo', boxInfo);
    },
    getPrizeList: ({ commit }, prizeList) => {
      commit('m_prizeList', prizeList);
    },
    getFreeTime: ({ commit }, freeTime) => {
      commit('m_freeTime', freeTime);
    },
    getAsyncRefresh: ({ commit }, asyncRefresh) => {
      commit('m_asyncRefresh', asyncRefresh);
    },
    getWeixinPay: ({ commit }, weixinPay) => {
      commit('m_weixinPay', weixinPay);
    },
    setFlag: ({ commit }, flag) => {
      commit('m_flag', flag);
    },
  }
};

export default app;

