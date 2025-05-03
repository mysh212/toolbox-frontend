const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'ysh\'s toolbox',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    login: 'src/login/main.js',
    admin: 'src/admin/main.js',
    upload: 'src/upload/main.js',
    user: 'src/user/main.js',
    tainan_bus: 'src/tainan-bus/main.js',
    ncku_bus: 'src/ncku-bus/main.js',
    moodlapi_login: 'src/moodlapi/login/main.js',
    moodlapi: 'src/moodlapi/index/main.js',
    moodlapi2: 'src/moodlapi/index2.0/main.js',
    moodlapi_course: 'src/moodlapi/course/main.js',
    NCKU_database: 'src/NCKU/users/main.js',
    NCKU_courseapi: 'src/courseapi/main.js',
    test: 'src/test/main.js'
  }
})
