import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}

const About = () => {
    return (
        <div>
            <h1>About</h1>
        </div>
    )
}

const Detail = (props) => {
    // console.log(props)
    return (
        <div>
            <h2>详情页</h2>
            {/* 
                react中，当前匹配上的路由对象，可以通过 props身上的某个数据来获取

                如果某个组件是路由组件，react路由会自动给你这个组件传递3个prop
                - history  能帮我们实现编程式导航 （js来控制路由的跳转）
                - location  location.search 获取查询字符串的参数
                - match     match.param 获取路由动态参数
            */}
            <p>当前商品的ID：{props.match.params.id}</p>
        </div>
    )
}

const Hello = (props) => {
    // console.log(props)
    return (
        <div>
            我是一个非路由组件
        </div>
    )
}

const Topics = ({match}) => {
    return (
        <div>
            <h1>Topics</h1>
            <ul>
                <li>
                    <Link to="/topics/rendering">Rendering with React</Link>
                </li>
                <li>
                    <Link to="/topics/components">Components</Link>
                </li>
                <li>
                    <Link to="/topics/props">Props v. State</Link>
                </li>
            </ul>
            {/* 这个下面又要根据不同的 Link 来渲染不同的文字 */}
            <Route
                exact
                path={`${match.path}`}
                render={() => <h2>Please select a topic.</h2>}
            >
            </Route>
            <Route
                path={`${match.path}/:id(rendering|components|props)`}
                component={Detail}
            >

            </Route>
            <Hello></Hello>
        </div>
    )
}

ReactDOM.render(
    <Router>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/topics">Topics</Link>
            </li>
        </ul>

        <Route path="/" exact component={Home}></Route>
        <Route path="/about"  component={About}></Route>
        <Route path="/topics"  component={Topics}></Route>

    </Router>,
    document.getElementById('root')
)
