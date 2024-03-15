import { Typography } from "antd";
import { styled } from "styled-components";

const { Text, Title } = Typography;
export const BillingOverviewContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const BillingHistoryTitle = styled(Title)`
  color: var(--Text-Color-900, #171717);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
  margin: 0px !important;
`;
