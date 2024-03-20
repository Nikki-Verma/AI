import { Button, Card, Typography } from "antd";
import Link from "next/link";
import { styled } from "styled-components";

const { Text, Title } = Typography;

export const CurrentBillingCardContainer = styled(Card)`
  border-radius: 10px !important;
  border: 0.8px solid var(--Outline, #d7e1ef) !important;
  background: #fdfeff !important;
`;

export const BillingDetailsAndActions = styled.div`
  display: flex;
  flex-direction: column !important;
  gap: 24px !important;
`;

export const BillingActionHeading = styled(Text)`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
`;

export const BillingStats = styled.div`
  display: flex;
  gap: 56px !important;
`;

export const BillingDetailsLink = styled(Link)`
  color: #602edf;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px; /* 157.143% */
  text-decoration-line: underline;
`;

export const UpgradePlanButton = styled(Button)`
  display: flex !important;
  width: 123px !important;
  padding: 7px 15px !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 10px !important;
  border-radius: 8px !important;

  // Typography
  span {
    color: #fdfeff !important;
    text-align: center !important;
    font-size: 14px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 22px !important; /* 157.143% */
  }
`;
