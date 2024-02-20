import { Typography } from "antd";
import { styled } from "styled-components";
const { Text } = Typography;
export const IntegrateSlackCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const IntegrateSlackCardTitle = styled(Text)`
  color: var(--Text-Color-700, #444);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
