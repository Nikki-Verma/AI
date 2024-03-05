import { Card } from "antd";
import { styled } from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction : column;
  min-height : calc(100vh - 64px);
  justify-content : center;
  align-items : flex-start;
  padding: 20px 80px;
`;


export const HomeNavigateCards = styled(Card)`
  display : flex;
  width : 100%;
  min-height : 80px;
  border-radius: 10px;
  border: 0.8px solid var(--Text-Color-150, #D5D5D5);
  background: #FFFFFF;
  cursor : pointer;
  height : 100%;
  .ant-card-body{
    display : flex;
    height : 100%;
    width : 100%;
    align-items: flex-start;
    padding : 24px 12px !important;
  }
`

export const CardHeader = styled.div`
  display : flex;
  gap : 18px;
  align-items : center;
  width : 100%;
  justify-content : space-between;
`

export const CardHeading = styled.div`
  display: flex;
  color: var(--Text-Color-900, #171717);
  font-family: var(--font-dm-sans);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const CardDescription = styled.div`
  display: flex;
  color: #14141480;
  font-family: var(--font-dm-sans);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

export const ModelDetails = styled.div`
  display : flex;
  flex-direction : column;
  align-items : space-between;
  width : 100%;
  margin-left : 8px;
  gap : 5px;
`