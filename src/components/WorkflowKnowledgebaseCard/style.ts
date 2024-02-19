import { Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;
export const WorkflowKnowledgebaseContainer = styled.div`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const KnowledgebaseCardParameterHeading = styled(Text)`
  color: var(--Text-Color-900, #171717);
  font-size: 1rem !important;
  font-style: normal;
  font-weight: 700;
`;
