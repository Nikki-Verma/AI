import { Button } from "antd";
import styled from "styled-components";

export const DatasetDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100% !important;
  .ant-input-affix-wrapper {
    height: 40px;
    border-radius: 8px;
    border: 1px solid var(--Text-Color-150, #d5d5d5);
    background: var(--Text-Color-50, #fff);
  }
  .ant-input-affix-wrapper > input.ant-input {
    color: var(--Text-Color-900, #171717);
    font-family: var(--font-dm-sans);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const DeleteDatasetFileButton = styled(Button)`
  color: #ff0000 !important;
  border-color: #ff0000 !important;
  &:hover {
    background-color: #ff0000 !important;
    color: #fff !important;
  }
`;
