import { styled } from "styled-components";

export const UploadCardContainer = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : space-between;
    gap : 12px;
    border-radius: 10px;
    border: 0.8px solid var(--Text-Color-150, #D5D5D5);
    background: #FFF;
    padding : 30px;
    height : 100%;
    cursor : pointer;
`

export const Heading = styled.div`
    color: var(--Text-Color-900, #171717);
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

export const UploadDetail = styled.div`
    color: var(--Text-Color-900, #171717);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`