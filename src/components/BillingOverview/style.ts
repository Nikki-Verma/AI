import { Card, Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;
export const BillingOverviewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

export const CurrentBillingCard = styled(Card)`
  border-radius: 10px !important;
  border: 0.8px solid var(--Outline, #d7e1ef) !important;
  background: #fdfeff !important;
`;

export const BillingDetailsAndActions = styled.div`
  display: flex;
  flex-direction: column !important;
  gap: 20px !important;
`;

export const BillingActionHeading = styled(Text)`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis;
  font-size: 18px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
`;

export const BillingStats = styled.div`
  display: flex;
  gap: 20px !important;
`;
