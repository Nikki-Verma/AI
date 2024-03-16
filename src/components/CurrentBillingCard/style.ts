import { Card, Typography } from "antd";
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
  align-items: flex-start !important;
  gap: 32px !important;
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
  gap: 40px !important;
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
