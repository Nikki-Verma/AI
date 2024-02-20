import { Button } from "antd";
import { styled } from "styled-components";

export const Container = styled.div`
    display : flex;
    flex-direction : column;
    .ant-modal .ant-modal-title{
        font-size: 20px;
        font-weight: 700;
        line-height: 26px;
        letter-spacing: 0px;
        text-align: left;
    }
    .ant-input{
        display: flex;
        min-height: 50px;
        padding: 12px;
        align-items: center;
        flex-shrink: 0;
        border-radius: 5px;
        border: 1px solid var(--Stroke, #A6BCDA);
        background: var(--Neutral-white, #FFF);
    }
`
export const ModalTitle = styled.div`
    color: var(--headings, #000B34);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

export const ModalDescription = styled.div`
    font-feature-settings: 'clig' off, 'liga' off;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export const SubmitButton = styled(Button)`
    display: flex !important;
    padding: 15px 40px !important;
    width : 100%;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    margin-top : 30px;
    min-height : 50px;
    color: var(--White, #FFF) !important;
    text-align: center;
    font-size: 16px !important;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 125% */
`

export const ModalContainer = styled.div`
    display : flex;
    flex-direction : column;
    .ant-modal .ant-modal-title{
        font-size: 20px;
        font-weight: 700;
        line-height: 26px;
        letter-spacing: 0px;
        text-align: left;
    }
    .ant-input{
        display: flex;
        min-height: 50px;
        padding: 12px;
        align-items: center;
        flex-shrink: 0;
        border-radius: 5px;
        border: 1px solid var(--Stroke, #A6BCDA);
        background: var(--Neutral-white, #FFF);
    }
    .ant-form-item-label{
        overflow: hidden;
        color: var(--Primary-Color, #141414);
        font-feature-settings: 'clig' off, 'liga' off;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
`