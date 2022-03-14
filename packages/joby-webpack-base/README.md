# `@cckj/mf-webpack-base`

> 可以打包出可以上传至npm的包和module federation导出的包

## 快速使用

### npm使用

```
yarn add @cckj/mf-webpack-base -D
```

根目录的```.cjrc.js```来配置以下代码

```javascript
const { build } = require('@cckj/mf-webpack-base').default
const isDev = process.env.NODE_ENV == 'development'
build({ 
  isDev,
  moduleFederationOptions: {
    name: 'template'
  }
})
```

