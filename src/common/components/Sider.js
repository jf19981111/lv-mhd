import React from 'react'
import { Layout, Menu, Icon } from 'antd';

// 引入仓库
import store from '../../store'

// 引入 Link
import { Link } from 'react-router-dom'

class Sider extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        menus: store.getState().common.menus,
        defaultMenus: store.getState().common.defaultMenus
      }

      store.subscribe(() => {
        this.setState(() => ({
          menus: store.getState().common.menus,
          defaultMenus: store.getState().common.defaultMenus,
        }))
      })
    }

    render() {
        return (
            <Layout.Sider style={{
                overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
              }}
              >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.defaultMenus}>
                  {
                    this.state.menus.map((item,index) => {
                      return (
                        <Menu.Item key={index + 1}>
                          <Link  to={item.href}>
                            <Icon type={ item.icon } />
                            <span className="nav-text">{ item.name }</span>
                          </Link>
                        </Menu.Item>
                      )
                    })
                  }
                  
                </Menu>
            </Layout.Sider>
        )
    }
}

export default Sider;
