import { Select} from "antd";
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

export const WorkflowListContainer = styled.div`
  max-height: 30vh;
  overflow:auto;
  background: #F8FAFC;
  border:1px solid #CFD7DF;
  min-width: 120px;
  padding: 12px;
  border-radius: 4px;
  :where(.css-dev-only-do-not-override-1lvqh2o).ant-list-split .ant-list-item{
    border:none;
    padding: 8px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 18.23px;
    text-align: left;
    cursor: pointer;
  }
`
