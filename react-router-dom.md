# react-router-dom

1. 安装 yarn add react-router-dom

总结：
vue 与 react 的对比？
vue 与 react 路由对比？

提供的组件

1. BrowserRouter
2. HashRouter
上面两个会在项目中出现一次， 二选一, 包裹在最外层，而且只能有一个根元素
3. Route
4. Link
上面有 to 属性， 它会自动的匹配是 hash 路由 还有 history 路由
5. NavLink
与 link 是一样的，只不过它身上有 高亮的类
6. Redirect
...
语法
<Redirect from="/" to="/book"></Redirect>
从哪里去哪里
PS:
<Redirect to="/book"></Redirect>
Redirect 不加 from 属性 就默认初始化，


可以使用 render 渲染，也可以使用 component 渲染

```js
<Route 
    exact
    path="/book"
    render={() => '图书管理'}
></Route>
```

```js
<Route 
    exact
    path="/book"
    component={BookPage}
></Route>
```

PS: 使用 Redirect 组建时， 需要配合另外一个组件 Switch 来使用

Switch 作用就是， 只匹配一条规则


# styled-components

目前采用的样， 然后会有冲突，会影响别的组件的样式

所以 提供了这个样式
1. 安装 yarn add styled-components

2. 使用 需要一个 style.js

<!-- style.js -->
```js
// 只在 book 中使用的样式文件
// 暴露出去的我们称之为样式组件
import styled from 'styled-components'

export const BookWrap = styled.div`
    .top {
        display: flex;
        height: 40px;
        justify-content: space-between;
    }
`
```
<!-- index.js -->
在要用的地方引入
```js

// book 页面的 路由页面组件
import React from 'react'

import { Input } from 'antd'
import { BookWrap } from './style.js'

class Book extends React.Component {
    render() {
        return (
            <BookWrap>
                <div className="top">
                    <div className="left">
                        <Input placeholder="请输入..."></Input>
                    </div>
                </div>     
            </BookWrap>
        )
    }
}

export default Book
```
