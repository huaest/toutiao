module.exports = {
  plugins: {
    // vue-cli 以及配置了

    // autoprefixer: {
    //   browsers: ['Android>=4.0', 'IOS>=8']
    // },

    'postcss-pxtorem': {
      // 动态的设置，也可以直接设置
      rootValue({ file }) {
        if (file.indexOf('vant') !== -1) {
          return 37.5
        }
        return 75
      },
      //   要转换的css的属性，height，width等，*代表所有
      propList: ['*'],
      exclude: 'art-markdown'
    }
  }
}
