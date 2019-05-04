import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
    render() {
        const { handelLogin } = this.props
        return (
            <div>
                <button
                    onClick={handelLogin}
                >
                    Login in
                </button>
            </div>
            
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        handelLogin: () => {
            // 修改仓库， 派发一个动作
            dispatch({
                type: 'LOGIN',

            })

            // 跳转回首页
            // 取出 url 地址身上的参数
            let redirect = props.location.search.substr(10)
            props.history.replace(redirect)
        }
    }
}


export default connect(null, mapDispatchToProps)(Login)
