import { styled } from "styled-components";

export const EmptyUploadContainer = styled.div`
    display : flex;
    flex-direction : column;
    min-height : max-content;
    height : 100%;
    align-items : center;
    justify-content : center; 
    border-radius: 10px;
    border: 1px solid var(--Text-Color-100, #F8F8F8);
    background: var(--Support, #F8FAFC);
    gap : 24px;
    flex-grow : 1;
    padding : 40px;

    .ant-btn{
        display: flex;
        height: 40px;
        padding: 4px 15px;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        border-radius: 8px;
        border: 1px solid var(--blue-purple-700, #3A1C86) !important;
        background: var(--blue-purple-700, #3A1C86)  !important;

        /* drop-shadow/button-primary */
        box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.04)  !important;
        color: var(--character-primary-inverse, #FFF) !important;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px; /* 157.143% */
    }
`

export const EmptyMessage = styled.div`
    color: var(--Text-Color-900, #171717);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`