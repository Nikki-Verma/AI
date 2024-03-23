import { Divider, Typography, Button } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
  border: 0.5px solid #a6bcda;
  background: transparent;
  box-shadow: 0px 2px 6.4px 1px rgba(140, 135, 135, 0.1);
  // padding: 0 16px;
  background:#F8FAFC;

  :where(.css-dev-only-do-not-override-1lvqh2o).ant-btn-default:not(:disabled):not(.ant-btn-disabled):hover{
    background: #ffffff !important
  }
`;

export const ChatHeader = styled.div`
  color: var(--Text-Color-800, #2e2e2e);
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ChatHistoryTextContainer = styled.div`
  width: 272px;
  height: 43px;
  flex-shrink: 0;
  cursor: pointer; 
`;

export const HistoryDivider = styled(Divider)`
  margin: 6px 0 !important;
  padding: 10px;
`;
export const ChatHistoryText = styled(Text)`
  width: 196px;
  padding-left:6px;
`;

export const NewChatButton  = styled(Button)`
  border: .5px solid #A6BCDA !important;
  color: #2E2E2E !important;
  height: 36px !important;
  position:fixed;
  margin-bottom: 8px;
  :hover{
    background: #ffffff !important
  } 
`

export const HistayDay = styled(Text)`
  padding-top: 16px;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.62px;
  text-align: left;
  border-bottom:1px solid #EEEEEE;
  width: 100%;
  display:inline-block;
  margin-bottom: 12px;
  padding-bottom: 2px;
`

export const LoaderContainer = styled.div`
  display:flex;
  justify-content:center;
  align-items: center;
  height: 100%
`
