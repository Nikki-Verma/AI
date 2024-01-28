import { styled } from "styled-components";

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
    ul{
        display : flex;
        flex-direction : column;
        margin : 0 !important;
        padding-left : 20px; 
        margin-bottom : 30px !important;
    }
`

export const Heading = styled.div`
    color: var(--Text-Color-900, #171717);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom : 10px;
`

export const Para = styled.div`
    display : flex;
    color: var(--Text-Color-850, #222);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 197%; /* 31.52px */
    margin-bottom : 20px;
`