import { Button, Typography } from "antd";
import { styled } from "styled-components";
const { Text } = Typography;
export const IntegrateTelegramCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const IntegrateTelegramCardTitle = styled(Text)`
  color: var(--Text-Color-700, #444);
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const UploadBoxButton = styled(Button)`
  width: 100px !important;
  height: 100px !important;
`;

export const UploadHintLabel = styled(Text)`
  color: var(--Neutral-9, #434343);
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px; /* 183.333% */
`;

export const UploadHintValue = styled(Text)`
  color: var(--Neutral-9, #434343);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`;
