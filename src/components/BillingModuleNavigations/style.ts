import { Typography } from "antd";
import { styled } from "styled-components";

const { Text, Title } = Typography;
export const BillingNavigationsCard = styled.div`
  border-radius: 10px;
  border: 1px solid #d7e1ef;
  background: #fff;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  &:hover {
    border: 1px solid var(--G1, #c266e7);
    background: #fdfeff;
    box-shadow: 0px 2px 3px 1px rgba(120, 120, 120, 0.15);
  }
`;

export const BillingNavigationsCardTitle = styled(Text)`
  color: var(--Text-Color-900, #171717) !important;
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
`;

export const BillingNavigationsCardDescription = styled(Text)`
  color: var(--Text-Color-700, #444) !important;
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
`;
