# 使用 antd 来做模板

1. 安装 yarn add antd

2. 按需引入

我们需要重写配置
引入 react-app-rewired 并修改 package.json 里的启动配置。由于新的 react-app-rewired@2.x 版本的关系，你还需要安装 customize-cra。

$ yarn add react-app-rewired customize-cra

3. 然后修改
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",
}

4. 然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};

5. 使用 babel-plugin-import#
babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理），现在我们尝试安装它并修改 config-overrides.js 文件。

```
$ yarn add babel-plugin-import
+ const { override, fixBabelImports } = require('customize-cra');

- module.exports = function override(config, env) {
-   // do stuff with the webpack config...
-   return config;
- };
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd',
+     libraryDirectory: 'es',
+     style: 'css',
+   }),
+ );
```
6. 然后移除前面在 src/App.css 里全量添加的 @import '~antd/dist/antd.css'; 样式代码，并且按下面的格式引入模块。
```
  // src/App.js
  import React, { Component } from 'react';
- import Button from 'antd/lib/button';
+ import { Button } from 'antd';
  import './App.css';

  class App extends Component {
    render() {
      return (
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      );
    }
  }

  export default App;
```

7. 最后重启 yarn start 访问页面，antd 组件的 js 和 css 代码都会按需加载，你在控制台也不会看到这样的警告信息。关于按需加载的原理和其他方式可以阅读这里。


# React 中使用 create-react-app 创建的项目，配置正向代理

1. 在 package.json 中配置 proxy 选项
```
// package.json

"proxy": "http://localhost:8080"
```

PS： 注意，我们在 这里配置的路径只能配置为字符串
所以有一些局限性，只能配置一个，然后也不能使用 什么pathwrite 重写的作用

2. 可以使用 src/setupProxy.js, 在这个文件中写 nodejs 正向代理的配置

- 使用步骤
  1. 安装 yarn add http-proxy-middleware

  2. 在 src/setupProxy.js
```
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api', { target: 'http://localhost:8080/' }));
};

```

# 别名的配置
在重写webpack的文件中，引入 addWebpackAlias, 这是一个按需的引入方式
```
// config-overrides.js
addWebpackAlias({
    '@': path.resolve(__dirname, './src')
})
```

# 支持 less 的话
在这个项目中默认支持 scss，只不过要安装 node-sass

如果要支持 less，那么
  1. 安装 yarn add less less-loader -D
  2. 修改 config-overrides.js
    引入 addLessLoader
    然后 addLessLoader() 就ok
