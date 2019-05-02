import React from 'react'
import { Layout } from 'antd';

import Sider from './common/components/Sider'
import Header from './common/components/Header'

// 引入路由
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'

// 引入路由页面的组件
import BookPage from './pages/book/index'
import UserPage from './pages/user/index'


class App extends React.Component {
    render() {
        return (
          <HashRouter>
              <Layout>
                <Sider />
                <Layout style={{ marginLeft: 200 }}>
                  <Header />
                  <Layout.Content style={{padding: 20}}>
                    <Switch>
                      {/* 右侧的内容 */}
                      {/* 1. 图书管理 */}
                      <Route 
                        exact
                        path="/book"
                        component={BookPage}
                      ></Route>
                      {/* 2. 用户管理 */}
                      <Route
                        exact
                        path="/user"
                        component={UserPage}
                      ></Route>
                      {/* 重定向 */}
                      <Redirect to="/book"></Redirect>
                    </Switch>
                  </Layout.Content>
                </Layout>
              </Layout>
            </HashRouter>
          );
    }
}

export default App;
