import { INPUTVALUECHANGE, SETBOOKDATA, SETPAGENUM } from './actionTypes'

const defaultState = {
    list: [], // 图书集合
    inputVal: '', //输入框的 value
    pageNum: 1, // 页数
    pageSize: 1, // 每页显示的条数
    total: 1, // 总条数
}

export default (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case INPUTVALUECHANGE:
            newState.inputVal = action.value;
            break;

        case SETBOOKDATA:
            newState.list = action.data.list;
            newState.total = action.data.total;
            break;
        
        case SETPAGENUM: 
              newState.pageNum = action.value;
              break;  

        default:
            break;
    }

    return newState;
}
