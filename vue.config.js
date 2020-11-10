// path 模块是node.js中处理路径的核心模块。可以很方便的处理关于文件路径的问题。
// join() 将多个参数值合并成一个路径
'use strict'
const path = require('path')

const defaultSettings = require('./src/settings.js')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'admin'

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

module.exports = {
  /*
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */

  publicPath: '/',
  // publicPath: process.env.NODE_ENV === 'development' ? '/' : '/app/', //router history模式使用 需要区分生产环境和开发环境，不然build会报错
  /* 打包输出文件目录 */
  outputDir: 'dist',
  /* 打包静态资源目录 (js, css, img, fonts) */
  assetsDir: 'static',
  /* 保存时检查代码 */
  lintOnSave: process.env.NODE_ENV === 'development',
  /* 生产环境 source map，设置为 false 以加速生产环境构建 */
  productionSourceMap: false,
  /* webpack-dev-server 相关配置 */
  devServer: {
    port: port, // 端口号
    open: true, // 自动打开浏览器
    overlay: {
      // 浏览器输出编译错误
      warnings: false,
      errors: true
    },
    after: require('./mock/mock-server.js')
  },
  // webpack配置 可基于环境有条件地配置行为 Type：Object | Function
  /* 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
       如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    */
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        // 别名
        '@': resolve('src')
      }
    }
  },
  /* 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作) */
  chainWebpack(config) {
    // 资源预加载preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 资源预读取prefetch
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    // 第一步：让其他svg loader不要对src/icons下的svg进行操作
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    // 第二步：使用svg-sprite-loader对src/icons下的svg进行操作
    config.module
      .rule('icons')
      .test(/\.svg$/) // 匹配所有以.svg结束的文件
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      // 定义规则 使用时<svg class="icon"><use xlink:href="#icon-svg文件名"></use></svg>
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            //
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      // 打包项目分割文件，优化页面加载
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            // 分割出的js名
            name: 'chunk-elementUI', // split elementUI into a single package
            // 权重，需要比libs和app的配置大，不然会分到libs或app里面去
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            // 匹配node_modules下的目录，不确定可以去目录中找一下
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          echarts: {
            name: 'chunk-echarts', // split echarts into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?echarts(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single') // 设定 runtime 代码单独抽取打包
    })
  }
}
