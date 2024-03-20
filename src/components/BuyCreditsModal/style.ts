import { Button, Typography } from "antd";
import { styled } from "styled-components";

const { Title, Text } = Typography;

export const TopUpCreditTitle = styled(Title)`
  color: var(--headings, #000b34) !important;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
`;

export const TopUpCreditDescription = styled(Text)`
  color: var(--Text-Color-850, #222);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
`;

export const CreditBreakdownTitle = styled(Text)`
  color: var(--Text-Color-700, #444) !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400;
  line-height: normal !important;
`;

export const CreditBreakdownDescription = styled(Text)`
  color: var(--Text-Color-850, #222) !important;
  text-align: right;
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400;
  line-height: normal !important;
`;

export const CreditsBreakdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const BuyCreditActionButton = styled(Button)`
  display: flex !important;
  padding: 13px 15px !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 10px !important;
  height: 48px !important;

  border-radius: 8px;

  /* drop-shadow/button-secondary */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
`;
