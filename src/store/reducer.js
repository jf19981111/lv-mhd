// 主 reducer
import {combineReducers} from 'redux'
// 引入其余的子 reducer
import  commonReducer  from '../common/store/reducer'
import bookReducer from '@/pages/book/store/reducer'

export default combineReducers({
    common: commonReducer,
    book: bookReducer,
})
