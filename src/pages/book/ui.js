// 这是 book 的 ui 组件
import React from 'react'
import { BookWrap, MainWrap } from './style.js'

import { Input, Table, Button } from 'antd'

class BookUI extends React.Component {
    render() {
        const { 
            inputVal, 
            inputValChange, 
            searchBtnClick, 
            list,
            columns,
            pagination 
        } = this.props;
        return (
            <React.Fragment>
                <BookWrap>
                    <div className="top">
                        <div className="left">
                            <Input 
                                value={ inputVal }
                                onChange={ inputValChange }
                                placeholder="请输入...">
                            </Input>
                            <Button type="primary" onClick={ searchBtnClick }>
                                搜索
                            </Button>
                        </div>
                    </div>

                    <MainWrap>
                        <Table 
                            dataSource={ list } 
                            columns={ columns }
                            rowKey="bookId"
                            pagination={ pagination }
                        >
                        </Table>
                    </MainWrap>     
                </BookWrap>   
            </React.Fragment>
        )
    }
}


export default BookUI;
