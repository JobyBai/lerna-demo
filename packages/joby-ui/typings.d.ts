declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.jpeg'
declare module '*.json'
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}

declare let CJMsg: any

declare let lottie: any

declare let layer: any

declare let $global_tracking: any

declare let cjUtils: any

declare let i18next: {
  t: (val: string) => string
  language: string
  [key: string]: any
}

interface SFC<P = {}> extends React.FC<P> {
  getInitialProps?(object): Promise<any>
  /** window变量名 用于存储getInitialProps返回的变量 */
  variableName?: string

  /** 获取css */
  getCss?: (insertCss: Function) => void
}
