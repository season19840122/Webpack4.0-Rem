module.exports = {
  HTMLDirs: [
    {
      page: 'lolskin', // LOL VC版
      title: '活动中心'
    },
    // {
    //   page: 'list',
    //   title: '列表页',
    //   dir: 'content' // 支持设置多级目录
    // },
  ],
  // publicPath: '//static.gameboxmall.com/show/lolskin/', // 正式
  publicPath: '/', // 测试
  devServerOutputPath: '../dist',
  cssPublicPath: '../',
  cssOutputPath: './css/styles.css',
  imgOutputPath: 'img', // 正式
  // imgOutputPath: '//static.gameboxmall.com/show/lolskin/img', // 配合 NProxy 图片；路径测试
  fontOutputPath: 'font',
};