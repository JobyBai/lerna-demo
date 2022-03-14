/**
 * @description ssr 的一些处理
 */
import webpack from 'webpack'
import path from 'path'
import deepClone from './deep-clone'

const ssrWebpack = (initialConfig: webpack.Configuration) => {
  const config = deepClone(initialConfig)
  /** loader 处理 */
  config.module.rules.forEach((loader: webpack.RuleSetRule, i: number) => {
    /** 去掉style-loader 样式这块在客户端渲染即可 */
    if ((loader.test as RegExp).test('.css') || (loader.test as RegExp).test('.less')) {
      // 说明是css处理loader系列
      const uses = loader.use as webpack.RuleSetUseItem[]
      const findCssLoaderIndex = uses.findIndex(_ => {
        let loaderName = _
        if (typeof _ === 'object') loaderName = _.loader
        return loaderName === 'css-loader'
      })
      if (findCssLoaderIndex > -1) {
        uses[findCssLoaderIndex]['options']['esModule'] = false // 使用commonjs语法
        loader.use = uses.slice(findCssLoaderIndex, uses.length)
        loader.use.unshift('isomorphic-style-loader')
        config.module.rules[i] = loader
      }
    }
  })

  /** 更改输出目录 */
  config.output.path = path.resolve('./cjs')

  /** 输出为node使用 */
  /* const { library } = config.output
  if (typeof library === 'object') {
    ;(config.output.library as webpack.LibraryOptions).type = 'commonjs2'
  } */
  config.target = 'node'

  /** 去掉主入口index或者app文件编译 */
  if (typeof config.entry === 'object') {
    // 说明是多入口打包
    // 找到index和app的入口删除其入口
    config.entry['app'] && delete config.entry['app']
    config.entry['index'] && delete config.entry['index']
  }
  return config
}

export default ssrWebpack
