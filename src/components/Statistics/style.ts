import { Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

export const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

export const StatisticsDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
`;

export const StatisticsValue = styled(Text)`
  color: var(--Text-Color-850, #222);
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: 16px !important;
`;

export const StatisticsLabel = styled(Text)`
  color: var(--Text-Color-700, #444);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 12px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
`;
