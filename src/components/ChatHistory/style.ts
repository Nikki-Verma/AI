import { Divider, Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: 10px;
  border: 0.5px solid #a6bcda;
  background: transparent;
  box-shadow: 0px 2px 6.4px 1px rgba(140, 135, 135, 0.1);
  padding: 12px 16px;
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
  width: 200;
`;
