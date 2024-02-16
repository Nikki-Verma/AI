import { Typography } from "antd";
import { styled } from "styled-components";
const { Text, Paragraph } = Typography;

export const KnowledgebaseInfoFormContainer = styled.div`
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

export const KnowledgebaseInfoFormTitle = styled(Text)`
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
export const KnowledgebaseInfoFormDescription = styled(Text)`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  font-size: 16px;
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
