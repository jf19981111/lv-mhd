# react-redux

react 项目中只使用 redux 的话， 会很不舒服， 组件中要去使用仓库的数据，都要 getState(),还有 subscribe()

推荐项目使用 redux 之外在结合 react-redux 一起使用

#### UI组件 与 容器组件

- UI 组件 它只负责组件的渲染，不参与仓库的操作 （傻瓜组件）

- 容器组件 它只负责数据的处理（与仓库的沟通），不涉及 ui 的展示 （聪明组件）

UI 组件的数据都由容器组件通过 prop 传递过来， 它没有 state，所有的数据来源都是 props

#### react-redux

它能帮我们主动创建出基于某个UI组件的容器组件， 并且在它身上能很好的去使用仓库的数据

使用步骤：

1. 安装 yarn add react-redux
2. 在项目的最外层使用 Provider 组件将 store全局传递下来
3. 将容器组件删了， 只留UI组件。容器组件可以通过 react-redux 主动创建出来，通过 connect 方法

```
import { connect } from 'react-redux

// 定义了一个 UI组件
const Book = () => {
    return (
        <div>我的天</div>
    )
}

// 第一个括号里面有两个参数
mapStateToProps 与 mapDispatchToProps
// 第二个括号里面接收一个 UI 组件

export default connect()();

// 像这样调用的
function abc() {
    return () => {
        
    }
}
abc()()
```
