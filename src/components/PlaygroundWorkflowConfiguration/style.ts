import { Select } from "antd";
import { styled } from "styled-components";

export const PlaygroundWorkflowConfigurationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

export const WorkflowSelect = styled(Select)`
  height: 44px !important;
  .ant-select-selector {
    display: flex !important;
    width: 100% !important;
    height: 44px !important;
    padding: 12px !important;
    justify-content: center !important;
    align-items: center !important;
    gap: -16px !important;
    flex-shrink: 0 !important;
  }
  .ant-select-arrow {
    margin-top: 0;
  }
`;
