// 这是一个全新的 Book 容器组件
import React from 'react'

import { connect } from 'react-redux'
import { getBookListAction } from './store/createActions'

// Book 是一个 UI 组件
const Book = (props) => {
    console.log(props)
    return (
        <div>
            我的天
            <p>仓库中的pageNum：{ props.pageNum }</p>
            <button onClick={ props.fn }>点我</button>
        </div>
    )
}


/**
 * 返回一个对象， 返回的内容就是 UI 组件 props 内容
 * @param {Object} state 仓库的state数据
 */
const mapStateToProps = (state) => {
    console.log(state)
    return {
        pageNum: state.book.pageNum
    }
}

/**
 * mapDispatchToProps
 * 返回一个对象，每个 key 都是方法，UI 组件可以通过 props 得到
 * @param {Function} dispatch store.dispatch
 */
const mapDispatchToProps = (dispatch) => {
    return {
        fn: () => {
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
export default connect(mapStateToProps,mapDispatchToProps)(Book)
