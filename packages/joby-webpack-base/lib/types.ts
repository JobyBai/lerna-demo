/**
 * build参数
 */
export interface BuildParams {
  /**
   * module federation 配置
   */
  moduleFederationOptions?: ModuleFederationOptions | boolean

  /**
   * externals 不打包进源码的包 类似 react: 'React'
   */
  externals?: any

  /** 开发时用启动的服务端口 */
  port?: number

  /** 配置多入口 */
  entrys?: {
    [key: string]: string
  }

  /** libraryName 类似 React */
  libraryName: string

  /** output filename */
  outputFileName?: string | ((filename: string) => string)

  /** 是否需要生成index.html */
  needHtml?: boolean

  /** 是否开启ssr模式 */
  ssr?: boolean

  /** 开启可视化打包大小以方便优化性能 */
  analyzer?: boolean
}

type ModuleFederationOptions = {
  /**
   * 名称 例子: @cckj-mf-left-bar
   */
  name: string
}
