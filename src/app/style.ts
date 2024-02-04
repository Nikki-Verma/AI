import { Button } from "antd"
import { styled } from "styled-components"

export const Container = styled.div`
    display : flex;
    flex-direction : column;
    min-height : 100vh;
    padding : 0px 80px;
    color : #fff;

    .ant-btn {
        margin-top : 32px;
        display: inline-flex;
        padding: 10px 37px 12px 44px;
        justify-content: flex-end;
        align-items: center;
        border-radius: 8px;
        border: 1px solid #DFDFDF !important;
        background: #1A152D !important;
        color: rgba(255, 255, 255, 0.97) !important;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    
        /* drop-shadow/button-secondary */
        box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
    }
`

export const SubHeading = styled.div`
    text-align: center;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: linear-gradient(169deg, #FBF4FF 21.36%, #C9EDE6 53.01%, #5B35AD 90.55%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export const Heading = styled.div`
    text-align: center;
    font-size: 94px;
    font-weight: 700;
    background: linear-gradient(170deg, #FBF4FF 21.08%, #5B35AD 73.87%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export const Detail = styled.div`
    color: #E3E3E3;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 35px; /* 145.833% */
`
