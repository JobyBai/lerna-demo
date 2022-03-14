/**
 * mf-mycj-components打包工具
 */

import webpack, { library } from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import config, { isDev } from './base-config'
import pkg from '../package.json'
import ssrWebpack from './ssr-webpack'

// types
import { BuildParams } from './types'

function build({
  moduleFederationOptions = false,
  externals = {},
  entrys = {},
  libraryName = 'MyLibraryName',
  outputFileName = '[name].js',
  analyzer = false,
}: BuildParams) {
  // 生成环境依赖外置
  config.externals = {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    ...externals,
  }

  // config libraryName
  if (!library) throw new Error('libraryName is required.')
  config.output.library['name'] = libraryName

  // output filename
  if (outputFileName) {
    if (typeof outputFileName === 'function') {
      config.output.filename = pathData => {
        return outputFileName(pathData.chunk.name)
      }
    } else if (typeof outputFileName === 'string') {
      config.output.filename = outputFileName
    }
  }

  // 多入口
  for (const key in entrys) {
    const entry = entrys[key]
    config.entry[key] = entry
  }

  // module federation
  if (moduleFederationOptions && typeof moduleFederationOptions === 'object') {
    const { name = 'component', ...otherOptions } = moduleFederationOptions
    // module federation name
    const customName = '@cckj-mf-' + name

    config.plugins.push(
      new webpack.container.ModuleFederationPlugin({
        exposes: {
          './App': './src/App.tsx',
        },
        filename: 'remoteEntry.js',
        shared: {
          react: { eager: true, version: pkg.dependencies.react },
          'react-dom': { eager: true, version: pkg.dependencies['react-dom'] },
        },
        name: customName,
        library: { type: 'umd', name: customName },
        ...otherOptions,
      })
    )
  }

  const clientConfig = config
  const serverConfig = ssrWebpack(config)

  // TODO
  clientConfig.plugins = []
  serverConfig.plugins = []
  // @ts-ignore
  clientConfig.plugins.push(new FriendlyErrorsWebpackPlugin())
  serverConfig.plugins.push(new FriendlyErrorsWebpackPlugin())

  // analyzer
  if (analyzer) {
    console.log('开启analyzer配置')
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    clientConfig.plugins.push(new BundleAnalyzerPlugin())
  }
  let _config = clientConfig
  if (process.env.SSR == '1') {
    console.log('开启ssr配置')
    _config = serverConfig
  }
  const compiler = webpack(_config)

  if (isDev) {
    compiler.watch(
      {
        ignored: ['**/node_modules'],
      },
      () => {}
    )
  } else {
    compiler.run(() => {})
  }
}

export default { build }
