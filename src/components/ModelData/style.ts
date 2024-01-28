import { styled } from "styled-components";

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