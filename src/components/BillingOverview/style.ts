import { Card } from "antd";
import { styled } from "styled-components";

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

export const BillingDetailsAndActions = styled.div``;
