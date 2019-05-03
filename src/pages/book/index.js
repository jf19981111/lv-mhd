// book 页面的 路由页面组件
// 暴露出去的我们称之为样式组件
import React from 'react'

import { Input, Table, Button } from 'antd'
import { BookWrap, MainWrap } from './style.js'

// 引入 http 封装的 axios
import http from '@/utils/http'
  
  const columns = [{
      key: 'bookId',
      title: 'bookId',
      dataIndex: 'bookId'
  },{
      key: 'bookName',
      title: '图书名',
      dataIndex: 'bookName'
  },{
      key: 'author',
      title: '作者',
      dataIndex: 'author'
  }, {
      key: 'coverurl',
      title: '海报',
      dataIndex: 'coverurl',
      render: (text, record, index) => {
        // console.log(text,record,index)
        return <img src={text} alt="" />
      }
  }];

class Book extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            list: [],
            pageNum: 1,
            pageSize: 1,
        }
        // 搜索
        this.getBookList = this.getBookList.bind(this)
        // 分页器
        this.onPageChange = this.onPageChange.bind(this)
    }

    render() {
        return (
            <React.Fragment>
                <BookWrap>
                    <div className="top">
                        <div className="left">
                            <Input 
                                ref={(el) => this.InputEl = el} 
                                placeholder="请输入...">
                            </Input>
                            <Button type="primary" onClick={this.getBookList}>
                                搜索
                            </Button>
                        </div>
                    </div>

                    <MainWrap>
                        <Table 
                            dataSource={this.state.list} 
                            columns={columns}
                            rowKey="bookId"
                            pagination={{ defaultPageSize: 1, total: 3, onChange: this.onPageChange}}
                        >
                        </Table>
                    </MainWrap>     
                </BookWrap>   
            </React.Fragment>
        )
    }

    /**
     * 发送请求
     */
    componentDidMount() {
       this.getBookList()
    }

    /**
     * 获取图书列表信息 getBookList 搜索
     * 这里有一个小 bug 就是我们搜索的时候还要把 pageNumber 设置为1，
     * 因为在别的页上搜索还是搜索的当前页
     */
    getBookList() {
        // 这里是因为我们使用的 input 不是真实的的 DOM 元素，而是一个组件，所以使用 ref 拿不到对应的 value
        // console.log(this.InputEl)
        let { pageNum, pageSize } = this.state;
        let bookName = this.InputEl.state.value;
        http.get('/api/book', {
            params: {
                bookName,
                pageNum,
                pageSize,
            }
        })
        .then(res => {
            console.log(this.InputEl)
            if (res.code === 0) {
                this.setState(() => ({
                    list: res.data.list,
                }))
                
            }
        })
    }

    /**
     * 分页器的 onChange事件
     */
    onPageChange(page, pageSize) {
        // console.log(page,pageSize)
        this.setState(() => ({
            pageNum: page,
            pageSize: pageSize
        }), () => {
            this.getBookList()
        })
        
    }
}

export default Book
