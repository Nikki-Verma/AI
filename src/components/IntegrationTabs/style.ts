import { Radio, Typography } from "antd";
import { styled } from "styled-components";
const { Text, Paragraph } = Typography;

export const IntegrationTabsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RadioButton = styled(Radio.Button)`
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
`;
