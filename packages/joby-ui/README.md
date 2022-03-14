# `@cckj/mf-mycj-components`

> mycj 公用组件库
>
> 调整这里的组件必须要确认所有用到的父级容器是否兼容及展示没有问题
>
> 现在用到的父容器如下: 
>
> cj-web-egg (Header, Menu)
>
> mycj-react (Header, Menu)

### 开始

配置好[cj的npm私服](https://www.tapd.cn/66473603/markdown_wikis/show/#1166473603001000814)后运行下面命令:

```
yarn add @cckj/mf-mycj-components
```

如果不是react项目, 需要渲染工具包, 你还需要下载:

```
yarn add @cckj/mf-tools
```

### 如何使用

```html
<!-- html -->
<div id="mycj-leftbar"></div>
```

```javascript
// index.ts
import { Menu } from '@cckj/mf-mycj-components'
import { renderNormal } from '@cckj/mf-tools'

renderNormal({
  el: "mycj-leftbar",
  component: Menu,
  data: {},
});
```

### 开发时调试

在```mf-components```根目录下依次运行

```bash
yarn 
yarn build
yarn workspace @cckj/mf-mycj-components link
yarn workspace @cckj/mf-tools link
yarn workspace @cckj/mf-mycj-components dev
```

在cj-web-egg或者用到这个组件的父级容器中(类似上面```如何使用```的用法用到的地方)依次运行

```bash
yarn link @cckj/mf-mycj-components
yarn link @cckj/mf-tools
yarn dev (yarn dev 是egg项目的运行命令, 这里你要用你项目的启动命令, 或者是yarn start或其他)
```

就可以实时更新了, 不过还是要自己刷新一下 (父容器有热加载就会自动刷新, 比如```webpack-dev-server```或者```umi```)

### 如何提交(重要)

```
git add .
yarn c
```

然后按照步骤来填写

### 相关其他文档

[头部引用注意事项](./docs/1-头部引用注意事项.md)

[按需引入组件](./docs/2-按需引入组件.md)