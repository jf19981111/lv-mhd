import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom'


/**
 * 定义一个高阶组件,私有路由组件
 * props.component 是接收到的一个组件
 */
const PrivateRoute = ({ component: Component, ...reset} ) => {
    // console.log(reset)
    // let render = null;

    return (
        <Route
            {...reset}
            render={() => {
                if (reset.isLogin) {
                    //有登录
                    return <Component />
                } else {
                    return <Redirect from={reset.path} to="/login" />
                }
            }}
        >
            
        </Route>
    )




    // if (isLogin) {
    //     render = <Route path={path} component={Component}></Route>
    // } else {
    //     render = '未登录'
    // }
    // return (
    //     <div>
    //         { render }
    //     </div>
    // )
}




class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLogin: false, // 是否登录
        }
    }

    render() {
        const {isLogin} = this.state;
        return (
            <Router>
                <div>
                    <h1>是否登录: { isLogin ? 'ok': 'no' }</h1>
                    <button 
                        onClick={() => {
                            this.setState({
                                isLogin: !isLogin
                            })
                        }}
                    >
                    Login
                    </button>
                    <ul>
                        <li><Link to="/public">公开的页面</Link></li>
                        <li><Link to="/protected">私有页面，需要登录</Link></li>
                    </ul>

                    {/* 这里放具体的页面 */}
                    <Route path="/public" component={ PublicPage }></Route>
                    <Route path="/login" component={ LoginPage }></Route>
                    
                    <PrivateRoute
                        isLogin={isLogin}
                        path="/protected"
                        component={ProtectedPage}
                    ></PrivateRoute>

                    {/* <Route path="/protected" component={ ProtectedPage }></Route> */}

                    {/* 最简单的方式做判断 */}
                    {/* {
                        isLogin ? (<Route path="/protected" component={ ProtectedPage }></Route>) : null
                    } */}

                    {/* {   
                        // 高阶函数
                        this.fn(ProtectedPage)
                    } */}



                </div>
            </Router>
        )
    }

    /**
     * 高阶函数
     * @param {Component} component 接收到的组件
     */
    // fn(component) {
    //     if (this.state.isLogin) {
    //         // 这里有一个 小 bug 没有 path ，只要他有 就会渲染出来
    //         return <Route component={ component }></Route>;
    //     } else {
    //         return null;
    //     }
    // }
}

const PublicPage = () => {
    return (
        <h2>PublicPage</h2>
    )
}

const ProtectedPage = () => {
    return (
        <h2>ProtectedPage 需要登录才能进来</h2>
    )
}

const LoginPage = () => {
    return (
        <div>
            <h2>登录页面</h2>
            <button>Login in</button>
        </div>
    )
}


// =================================
ReactDOM.render(
    <App />,
    document.getElementById('root')
)


/**
 * react-router-dom 实现路由拦截
 * 
 * 1. 实现一个高阶组件（高阶函数），
 *  
 *   何为高阶组件： 组件接收一个组件，返回新的组件
 *    
 * ```
 * function gaojie(component) {
 *      if (sss) {
 *          return component
 *      } else {
 *          return null;
 *      }
 * }
 * ```
 * 
 * 
 * 
 */
