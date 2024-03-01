import { Typography } from "antd";
import { styled } from "styled-components";
const { Text } = Typography;
export const DividerPlayground = styled.div`
  width: 1px;
  height: calc(100vh - 114px);
  background: var(--blue-purple-50, #efeafc);
`;

export const KbChatConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const KbChatConfigHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const KbInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--Text-Color-200, #c7c7c7);
  background: var(--Text-Color-50, #fff);
  box-shadow: 0px 5px 8.4px 3px rgba(173, 173, 173, 0.15);
  .ant-input-affix-wrapper {
    border: 0px !important;
    border-radius: 0 0 10px 10px !important;
    box-shadow: none !important;
  }
`;

export const KbInputTopTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 45px;
  border-radius: 10px 10px 0 0 !important;
  background: #fbfafe;
  padding: 14px 16px;
`;

export const KbInputTopTitle = styled(Text)`
  font-weight: 700;
`;

export const KbChatResponseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EmptyChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  height: 400px;
`;

export const EmptyChattitle = styled.div`
  color: var(--Text-Color-900, #171717);
  text-align: center;
  opacity: 0.5;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ChunkDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const ChunksTitle = styled.div`
  color: var(--Text-Color-700, #444);
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const ChunksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
