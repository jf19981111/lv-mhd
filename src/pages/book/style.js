// 只在 book 中使用的样式文件
import styled from 'styled-components'

export const BookWrap = styled.div`
    background: antiquewhite;
    .top {
        display: flex;
        height: 40px;
        align-items: center;
        justify-content: space-between;

        .left {
            margin: 20px 0 0 20px;
            display: flex;

            button {
                margin-left: 10px;
            }
        }
    }
`

export const MainWrap = styled.section`
    padding: 20px;
    background: antiquewhite;
    img {
        width: 40px;
        height: 50px;
    }
`
