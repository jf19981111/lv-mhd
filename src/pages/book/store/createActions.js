// book 创建动作的文件
import http from '@/utils/http'
import { INPUTVALUECHANGE, SETBOOKDATA, SETPAGENUM } from './actionTypes'


/**
 * 创建 inputVal 修改的动作
 * @param {String} value 输入的内容
 */
export const inputChange = (value) => {
    return {
        type: INPUTVALUECHANGE,
        value
    }
}


/**
 * 创建 获取 图书列表的动作
 * 异步的操作都写在 createActions 这个文件中
 * 因为异步的，所以 要返回一个函数
 */
export const getBookListAction = () => {
    return (dispatch, getState) => {
        let {  inputVal, pageNum, pageSize } = getState().book;
        http.get('/api/book', {
            params: {
                bookName: inputVal,
                pageNum,
                pageSize,
            }
        })
        .then(res => {
            if (res.code === 0) {
                console.log(res.data)
                // 操作仓库
                dispatch({
                    type: SETBOOKDATA,
                    data: res.data
                })                
            }
        })
    }
}


/**
 * 创建 搜索的动作
 */
export const searchBookAction = () => {
    return (dispatch) => {
        // 1. 先将 pageNum 设置为1
        dispatch({
            type: SETPAGENUM,
            value: 1
        })

        // 2. 发送 ajax 请求
        dispatch(getBookListAction())
    }
}


/***
 * 创建 分页点击时候的操作
 * @param {Number} page 当前点击的页码
 */
export const pageClickAction = (page) => {
    return (dispatch) => {
        // 1. 将 pageNum 设置为点击的页码
        dispatch({
            type: SETPAGENUM,
            value: page
        })

        // 2. 发送 ajax请求
        dispatch(getBookListAction())
    }
}
