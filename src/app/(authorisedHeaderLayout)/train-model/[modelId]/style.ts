import styled from "styled-components";

export const Container = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    .ant-steps{
        display : flex;
        align-items : center;
        justify-content : center;
    }
    .ant-steps .ant-steps-item-title::after{
        background: rgba(213, 213, 213, 0.50);
        height : 2px;
    }
`

export const StepDivContainer = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    width : 100%;
    border-radius: 10px;
    border: 0.8px solid var(--Text-Color-150, #D5D5D5);
    background: #FFF;
    box-shadow: 0px 3px 8px 0px rgba(158, 158, 158, 0.15);
    min-height : 80vh;
`