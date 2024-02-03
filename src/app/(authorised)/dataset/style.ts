import styled from 'styled-components';

export const ModelContainer = styled.div` 
    display: flex;
    flex-direction: column;
    .ant-input-affix-wrapper{
        border-radius: 20px;
        border: 1px solid var(--Text-Color-150, #D5D5D5);
        background: #FFF;
        height : 60px;
    }
    .ant-input-affix-wrapper >input.ant-input{
        color: var(--Text-Color-900, #171717);
        font-family: var(--font-dm-sans);
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .ant-select-selector{
        display: flex;
        height: 36px;
        padding: 0px 7px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 20px;
        border: 1px solid var(--Text-Color-150, #D5D5D5);
        background: var(--Text-Color-50, #FFF);

        /* drop-shadow/button-secondary */
        box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
    }
`
export const SubHeading = styled.div`
    color: var(--Text-Color-900, #171717);
    font-family: var(--font-dm-sans);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

