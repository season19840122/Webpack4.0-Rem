const activity = {
  state: {
    activityInfo: {},
    userData:{}
  },

  mutations: {
    m_activityInfo: (state, activityInfo) => {
      state.activityInfo = activityInfo;
    },
    m_userDataInfo: (state, userDataInfo) => {
      state.userData = userDataInfo;
    }
  },

  actions: {
    getActivityInfo: ({commit}, activityInfo) => {
      commit('m_activityInfo', activityInfo);
    },
    getUserDataInfo: ({commit}, userDataInfo) => {
      commit('m_userDataInfo', userDataInfo);
    },
  }
};

export default activity;
