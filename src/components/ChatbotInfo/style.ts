import { Typography } from "antd";
import { styled } from "styled-components";
const { Text, Paragraph } = Typography;
export const WorkflowInfoContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  border-radius: 10px;
  padding: 16px;
  border: 0.8px solid var(--Text-Color-150, #d5d5d5);
  background: #fdfeff;
`;

export const WorkflowInfoFormContainer = styled.div`
  width: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 10px;
  padding: 16px;
  border: 0.8px solid var(--Text-Color-150, #d5d5d5);
  background: #fdfeff;
`;

export const WorkflowInfoFormTitle = styled(Text)`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const WorkflowInfoFormDescription = styled(Text)`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const WorkflowName = styled(Text)`
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const WorkflowDescription = styled(Text)`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const SelectOptionDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SelectOptionName = styled(Text)`
  color: var(--Text-Color-900, #171717);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const SelectOptionDescription = styled(Text)`
  color: var(--Text-Color-600, #5b5b5b);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const AdvancedOptionsContainer = styled.div<any>`
  width: 100%;
  overflow: hidden;
  margin-top: 16px;
  transition: all ease 1s;
  max-height: ${(props: any) => {
    switch (props.open) {
      case true:
        return "200px";
      case false:
        return 0;
      default:
        return "200px";
    }
  }};
`;
