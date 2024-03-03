import { Collapse, Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

export const PlaygroundConfigContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  overflow: auto;
  background: #fdfeff;
  border-left: 0.8px solid var(--Text-Color-150, #d5d5d5);
`;

export const PlaygroundConfigCollapseContainer = styled.div`
  flex: 1;
`;

export const PlaygroundActionContainer = styled.div`
  height: 64px;
  padding: 12px;
  border-top: 0.8px solid var(--Text-Color-150, #d5d5d5);
  position: sticky;
  bottom: 0;
  background: #fdfeff;
  z-index: 99;
`;

export const ParameterTitle = styled.div`
  color: var(--Text-Color-850, #222);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ParamterCollapse = styled(Collapse)`
  background: #fdfeff;
  border-radius: 0;
  .ant-collapse-content {
    background: #f6f8fb !important;
  }
  .ant-collapse-content-box {
    padding: 12px !important;
  }
`;

export const ParamTitle = styled(Text)`
  color: var(--Text-Color-900, #171717) !important;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 20px 0;
`;
