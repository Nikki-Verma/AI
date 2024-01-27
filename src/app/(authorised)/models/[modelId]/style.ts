import styled from 'styled-components'

export const Container = styled.div`
    display : flex;
    flex-direction : column;
    .ant-tag{
        display: flex;
        width : max-content;
        height: 36px;
        padding: 0px 14px;
        justify-content: center;
        align-items: center;
        gap: 6px;
        flex-shrink: 0;
        border-radius: 20px;
        border: 0.3px solid var(--Text-Color-150, #D5D5D5);
        background: inherit;

        /* drop-shadow/button-secondary */
        box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);

        // font styling

        color: var(--Text-Color-900, #171717);
        text-align: center;
        font-family: var(--font-dm-sans);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
    }

`

export const ModelTitle = styled.div`
    display : flex;
    color: var(--Text-Color-900, #171717);
    font-family: var(--font-dm-sans);
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-right : 22px;
`
export const ModelAbout = styled.div`
    display : flex;
    color: var(--Text-Color-850, #222);
    text-overflow: ellipsis;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 154%; /* 24.64px */
`