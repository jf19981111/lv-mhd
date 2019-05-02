# react-router-dom

1. 安装 yarn add react-router-dom

总结：
vue 与 react 的对比？
vue 与 react 路由对比？

提供的组件

1. BrowserRouter
2. HashRouter
上面两个之会在项目中出现一次， 二选一, 包裹在最外层，而且只能有一个根元素
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
