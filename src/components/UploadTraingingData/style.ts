import { styled } from "styled-components"


export const Container = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    height : 100%;
    .ant-input{
        display: flex;
        height: 40px;
        padding: 12px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        border-radius: 5px;
        border: 1px solid var(--Blue_grey-400, #A6BCDA);
        background: var(--Neutral-white, #FFF);
        color: var(--Primary-Color, #141414);
        font-feature-settings: 'clig' off, 'liga' off;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: 18px; /* 150% */
    }
    .ant-select {
        display: flex;
        height: 40px !important;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 5px !important;
        // border: 1px solid var(--Blue_grey-400, #A6BCDA) !important;
        background: #FFF !important;
        color: var(--Primary-Color, #141414) !important;
        font-size: 14px !important;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .ant-select-selector{
        display: flex;
        height: 40px !important;
        padding: 12px;
        justify-content: center;
        align-items: center;
        align-self: stretch;
        border-radius: 5px !important;
        border: 1px solid var(--Blue_grey-400, #A6BCDA) !important;
        background: #FFF !important;
        color: var(--Primary-Color, #141414) !important;
        font-size: 14px !important;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .ant-upload-wrapper .ant-upload-drag{
        height : 100px;
        border-radius: 12px;
        border: 1px dashed var(--Text-Color-200, #C7C7C7);
        background: #F8F6FE;
    }
`

export const Heading = styled.div`
    color: var(--Text-Color-900, #171717);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom : 12px;
`

export const Detail = styled.div`
    display : flex;
    color: var(--Text-Color-900, #171717);
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom : 32px;
`

export const Label = styled.div`
    overflow: hidden;
    color: var(--Primary-Color, #141414);
    font-feature-settings: 'clig' off, 'liga' off;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom : 8px;
`

export const UploadTextContainer = styled.div`
    color: var(--Text-Color-900, #171717);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
`
export const UploadSubTextContainer = styled.div`
    color: var(--Text-Color-800, #2E2E2E);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
`

export const FooterContainer = styled.div`
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding : 0px 24px;
    height: 71px;
    flex-shrink: 0;
    border-radius: 0px 0px 10px 10px;
    border-top: 0.8px solid var(--Text-Color-150, #D5D5D5);
    background: #F8F9FA;
    box-shadow: 0px -4px 4px 0px rgba(218, 217, 217, 0.25);
`

