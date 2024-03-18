import { Button, Typography } from "antd";
import { styled } from "styled-components";

const { Text, Title } = Typography;

export const PricingPlansContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PricingPlansTitle = styled(Title)`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis !important;
  font-size: 20px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
`;

export const PricingDetailsCard = styled.div`
  border-radius: 10px;
  border: 0.8px solid var(--Outline, #d7e1ef);
  background: #fff;
  box-shadow: 1px 3px 8px 0px rgba(199, 199, 199, 0.43);
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px 16px;
`;

export const PricingDetailsDivider = styled.div`
  height: 1px;
  background: #c7d1df;
`;

export const PricingDetailsDescriptionItemLabel = styled(Text)<any>`
  color: var(--Text-Color-800, #2e2e2e);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  width: ${(props: any) =>
    props.width
      ? typeof props.width === "number"
        ? `${props.width}px`
        : props.width
      : "9.375rem"};
`;

export const PricingDetailsDescriptionItemValue = styled(Text)<any>`
  color: var(--Text-Color-850, #222);
  font-size: 18px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
  width: ${(props: any) =>
    props.width
      ? typeof props.width === "number"
        ? `${props.width}px`
        : props.width
      : "9.375rem"};
`;

export const PlanUpgradeButton = styled(Button)`
  width: 146px !important;
  padding: 10px 15px !important;
  border-radius: 8px !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  box-sizing: border-box !important;
  /* drop-shadow/button-secondary */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02) !important;
`;

export const PlanUpgradeButtonText = styled(Text)`
  color: #fdfeff !important;
  text-align: center !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: 22px !important; /* 157.143% */
  box-sizing: border-box !important;
`;

export const FeatureItem = styled(Text)`
  color: var(--Text-Color-900, #171717) !important;
  font-size: 16px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
`;
