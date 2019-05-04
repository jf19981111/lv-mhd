// 这是一个全新的 Book 容器组件
import React from 'react'
import { inputChange, searchBookAction, pageClickAction, getBookListAction } from './store/createActions'
import { connect } from 'react-redux'
import BookUI from './ui'

// 这是为了解决无法再 mapStateToProps 使用 mapDispatchToProps
import store from '@/store'


/**
 * 返回一个对象， 返回的内容就是 UI 组件 props 内容
 * @param {Object} state 仓库的state数据
 */
const mapStateToProps = (state) => {
    return {
        inputVal: state.book.inputVal,
        list: state.book.list,
        columns: [
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
        ],
        pagination: {
            pageSize: state.book.pageSize, 
            total: state.book.total, // 总条数
            onChange: (page, pageSize) => {
                store.dispatch(pageClickAction(page))
            }
        }
    }
}

/**
 * mapDispatchToProps
 * 返回一个对象，每个 key 都是方法，UI 组件可以通过 props 得到
 * @param {Function} dispatch store.dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        // 改变v输入框的 value
        inputValChange: (e) => {
            let value = e.target.value;
            dispatch(inputChange(value))
        },
        // 搜索点击
        searchBtnClick: () => {
            dispatch(searchBookAction())
        },
        // 获取图书列表
        getBookList: () => {
            dispatch(getBookListAction())
        }

    }
}



// 第一个括号里面有两个参数
// mapStateToProps 与 mapDispatchToProps
// mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示(UI)组件的 props 中
// mapDispatchToProps 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
// 第二个括号里面接收一个 UI 组件

// 暴露出去的是一个容器组件
export default connect(mapStateToProps,mapDispatchToProps)(BookUI)
