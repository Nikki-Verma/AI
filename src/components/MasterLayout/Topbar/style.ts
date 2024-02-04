import { styled } from "styled-components";

export const PageHeader = styled.div`
    display : flex;
    flex-direction : column;
    width : max-content;
    height : 100%;
    justify-content : center;
`

export const HeaderTitle = styled.div`
    color: var(--Text-Color-850, #222);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`

export const HeaderSubTitle = styled.div`
    color: var(--Text-Color-600, #5B5B5B);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
export const TopBarMenuContainer = styled.div`
    display : flex;
    gap : 12px;
    height : 100%;
    overflow : hidden;
    align-items : center;
    line-height : normal;
`

export const IconContainer = styled.div`
    display : flex;
    background: #E6EAF5;
    justify-content : center;
    align-items : center;
    min-height : 40px;
    min-width : 40px;
    border-radius : 50%;
    color: var(--Primary-Color, #602EDF);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 200% */
    letter-spacing: 0.12px;
`