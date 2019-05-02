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
