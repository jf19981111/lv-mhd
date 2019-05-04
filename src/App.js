import React from 'react'
import { Layout } from 'antd';

import Sider from '@/common/sider/Sider.js'
import Header from '@/common/header/Header.js'

// 引入路由
import {  Route, Redirect, Switch } from 'react-router-dom'

// 引入路由页面的组件
import BookPage from './pages/book/index'
import UserPage from './pages/user/index'

// 引入私有组件
import PrivateRoute from './common/privateRoute'

class App extends React.Component {
    render() {
        return (
            
                <Layout>
                  <Sider />
                  <Layout style={{ marginLeft: 200 }}>
                    <Header />
                    <Layout.Content style={{padding: 20}}>
                      <Switch>
                        {/* 右侧的内容 */}
                        {/* 1. 图书管理 */}
                        <PrivateRoute 
                          exact
                          path="/book"
                          component={BookPage}
                        ></PrivateRoute>
                        {/* 2. 用户管理 */}
                        <PrivateRoute
                          exact
                          path="/user"
                          component={UserPage}
                        ></PrivateRoute>
                        {/* 重定向 */}
                        <Redirect to="/book"></Redirect>
                      </Switch>
                    </Layout.Content>
                  </Layout>
                </Layout>
          );
    }
}

export default App;
