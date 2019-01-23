module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['last 5 version', 'not ie <= 8'],
      //是否美化属性值 默认：true
      cascade: true,
      //是否去掉不必要的前缀 默认：true
      remove: true
    },
    // 可以不用 postcss-px2rem 这个插件，转而使用 px2rem-loader
    // "postcss-px2rem": {
    //   remUnit: 192,
    //   remPrecision: 6
    // }
  }
};