// book 组件的 容器组件
// 暴露出去的我们称之为样式组件
import React from 'react'
// 引入 UI 组件
import BookUI from './ui'




// 引入 http 封装的 axios
// import http from '@/utils/http'

// 引入 book 中的仓库数据
import store from '@/store'
import { inputChange, getBookListAction, searchBookAction, pageClickAction } from './store/createActions'
  
const columns = [
    {
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
  }
];

class Book extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            list: store.getState().book.list,
            inputVal: store.getState().book.inputVal,
            pageNum: store.getState().book.pageNum, // 页数
            pageSize: store.getState().book.pageSize, // 每页显示的条数
            pagination: { 
                defaultPageSize: store.getState().book.pageSize, 
                total: store.getState().book.total, // 总条数
                onChange: this.onPageChange.bind(this)
            }
        }
        // 监听
        store.subscribe(() => {
            this.setState(() => ({
                list: store.getState().book.list,
                inputVal: store.getState().book.inputVal,
                pageNum: store.getState().book.pageNum, // 页数
                pageSize: store.getState().book.pageSize, // 每页显示的条数
                pagination: { 
                    pageSize: store.getState().book.pageSize, 
                    total: store.getState().book.total, // 总条数
                    onChange: this.onPageChange.bind(this)
                }
            }))
        })


        // 搜索
        // this.getBookList = this.getBookList.bind(this)
        // // 输入框
        // this.onInputChange = this.onInputChange.bind(this)
        // 分页器
        this.onPageChange = this.onPageChange.bind(this)
    }

    render() {
        return (
            <BookUI 
                inputVal={ this.state.inputVal }
                inputValChange={
                    (e) => { 
                        let value = e.target.value;
                        store.dispatch(inputChange(value)) 
                    } 
                }
                searchBtnClick={
                    () => { store.dispatch(searchBookAction()) }
                }
                list={ this.state.list }
                columns={ columns }
                pagination={ this.state.pagination }
            />
        )
    }

    /**
     * 发送请求
     */
    componentDidMount() {
    //    this.getBookList()
        store.dispatch(getBookListAction())
    }

    /**
     * 获取图书列表信息 getBookList 搜索
     * 这里有一个小 bug 就是我们搜索的时候还要把 pageNum 设置为1，
     * 因为在别的页上搜索还是搜索的当前页
     * 
     * 所以 这里定义了一个变量
     * @param {Boolean} isSearch 是否是搜索操作
     */
    // async getBookList(isSearch) {
    //     if (isSearch) {
    //         // 搜索操作 将 pageNum 设置为 1
    //         // 但是呢 setState 还是异步的，所以使用 async与 await
    //        await this.setState(() => ({
    //             pageNum: 1
    //         }))
    //     }

    //     store.dispatch(getBookListAction())

        // 这里是因为我们使用的 input 不是真实的的 DOM 元素，而是一个组件，所以使用 ref 拿不到对应的 value
        // console.log(this.InputEl)
        // let { pageNum, pageSize } = this.state;
        // // let bookName = this.InputEl.state.value;
        // let bookName = this.state.inputVal;
        // http.get('/api/book', {
        //     params: {
        //         bookName,
        //         pageNum,
        //         pageSize,
        //     }
        // })
        // .then(res => {
        //     console.log(this.InputEl)
        //     if (res.code === 0) {
        //         this.setState((prevState) => ({
        //             list: res.data.list,
        //             pagination: {
        //                 ...prevState.pagination,
        //                 total: res.data.total
        //             }
        //         }))
                
        //     }
        // })
        
    //}

    /**
     * 输入框事件
     * onInputChange
     */
    // onInputChange(e) {
    //     let val = e.target.value;
    //     store.dispatch(inputChange(val))
    // }

    /**
     * 分页器的 onChange事件
     */
    onPageChange(page, pageSize) {

        store.dispatch(pageClickAction(page))
        // console.log(page,pageSize)
        // this.setState(() => ({
        //     pageNum: page,
        //     pageSize: pageSize
        // }), () => {
        //     this.getBookList()
        // })
        
    }
}

export default Book
