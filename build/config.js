module.exports = {
  HTMLDirs: [{
      page: 'lolskin', // LOL VC版
      title: '活动中心'
    },
    // {
    //   page: 'list',
    //   title: '列表页',
    //   dir: 'content' // 支持设置多级目录
    // },
  ],
  // publicPath: './', // 本地相对路径
  publicPath: '//static.gameboxmall.com/show/lolskin/', // 正式静态资源域名
  devServerOutputPath: '../dist',
  cssOutputPath: 'css',
  jsOutputPath: 'js',
  imgOutputPath: '../img', // 正式
  // imgOutputPath: '//static.gameboxmall.com/show/lolskin/img', // 配合 NProxy 图片；路径测试
  fontOutputPath: 'font',
};

// url: http://localhost:8080/lolskin.html?activityName=lolskin&source=111
