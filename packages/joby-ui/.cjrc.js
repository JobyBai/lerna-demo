const { build } = require('joby-webpack-base').default
const fs = require('fs')

/**
 * 获取组件文件夹名称
 * @returns scopes
 */
function getComponentsName() {
  const dirs = []
  const files = fs.readdirSync('./src/components')
  files.forEach(file => {
    const stat = fs.lstatSync('./src/components/' + file)
    if (stat.isDirectory() === true && file) dirs.push(file)
  })
  return dirs
}

const entrys = {
  app: './src/App.tsx',
}

getComponentsName().forEach(function (dirname) {
  entrys[dirname] = `./src/components/${dirname}/index.tsx`
})

build({
  entrys,
  libraryName: 'mf-mycj-components',
  outputFileName: filename => {
    if (filename.indexOf('app') > -1) return '[name].js'
    return `./components/${filename}/index.js`
  },
  externals: {
    i18next: 'i18next',
    axios: 'axios'
  },
})
