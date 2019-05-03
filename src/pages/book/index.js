// book 页面的 路由页面组件
// 暴露出去的我们称之为样式组件
import React from 'react'

import { Input, Table } from 'antd'
import { BookWrap, MainWrap } from './style.js'

// 引入 http 封装的 axios
import http from '@/utils/http'

const dataSource = [{
    key: '1',
    name: '李威',
    age: 32,
    address: '西湖区湖底公园1号',
    value: 1
  }, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    value: 2
  }];
  
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    filters: [{
        text: '最帅的',
        value: 1
    }],
    onFilter: (value, record) => {
        console.log(value)
        console.log(record)
        return record.value === value
    }
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: function(a, b) {
        return a.age - b.age
    }
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }];

class Book extends React.Component {
    render() {
        return (
            <React.Fragment>
                <BookWrap>
                    <div className="top">
                        <div className="left">
                            <Input placeholder="请输入..."></Input>
                        </div>
                    </div>

                    <MainWrap>
                        <Table dataSource={dataSource} columns={columns}></Table>
                    </MainWrap>     
                </BookWrap>   
            </React.Fragment>
        )
    }

    /**
     * 发送请求
     */
    componentDidMount() {
        http.get('/api/book')
            .then(res => {
                console.log(res)
            })
    }
}

export default Book
