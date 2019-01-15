const getters = {
  publicPath: state => state.app.publicPath,
  currentModal: state => state.app.currentModal,
  prizeMsg: state => state.app.prizeMsg,
  templateType: state => state.app.templateType,
  awardHref: state => state.app.awardHref,
  indexHref: state => state.app.indexHref,
  failMsg: state => state.app.failMsg,
  activityName: state => state.app.activityName,
  sources: state => state.app.sources,
  info: state => state.app.info,
  boxInfo: state => state.app.boxInfo,
  prizeList: state => state.app.prizeList,
  freeTime: state => state.app.freeTime,
  asyncRefresh: state => state.app.asyncRefresh,
  weixinPay: state => state.app.weixinPay,
  flag: state => state.app.flag,
  activityInfo: state => state.activity.activityInfo,
  pageHref: state => state.app.pageHref,
  userName: state => state.app.userName,
  userDataInfo: state => state.activity.userData
};
export default getters;
