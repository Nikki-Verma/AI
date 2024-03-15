import { Typography } from "antd";
import { styled } from "styled-components";

const { Text, Title } = Typography;

export const PricingPlansContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

export const PlansHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const PlansHeadingTitle = styled(Title)`
  color: var(--Text-Color-900, #171717);
  text-align: center !important;
  font-size: 32px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
  margin: 0 !important;
`;

export const PlansHeadingDescription = styled(Text)`
  color: var(--Text-Color-800, #2e2e2e);
  text-align: center !important;
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
`;

export const PlansContainer = styled.div`
  border-radius: 26px;
  border: 1px solid var(--Stroke, #a6bcda);
  background: #fff;
  width: 100%;
  flex-shrink: 0;
  padding: 24px;
  margin-top: 48px !important;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  //   gap: 12px;
`;

export const PlanDivider = styled.div`
  background: var(--Stroke, #a6bcda);
  width: 1px;
`;
