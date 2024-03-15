import { Button, Tag, Typography } from "antd";
import { styled } from "styled-components";

const { Text, Title } = Typography;

export const SuggestedPlanConatiner = styled.div`
  position: relative;
  top: -80px !important;
  border-radius: 26px;
  background: linear-gradient(180deg, #8640a2 0%, #602edf 100%);
  box-shadow: 0px 22px 34px 0px rgba(82, 67, 194, 0.3);
  width: 292px;

  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 14px 14px 28px;
`;

export const PopularTag = styled(Tag)`
  border-radius: 13.5px !important;
  background: var(--blue-purple-600, #602edf) !important;
  border: 2px solid var(--blue-purple-600, #602edf) !important;
  padding: 4px 20px !important;
`;

export const PopularTagText = styled(Text)`
  color: #fff !important;
  text-align: center;
  font-size: 12px !important;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const PlanName = styled(Text)<any>`
  color: ${(props: any) => {
    switch (props.type) {
      case "Suggested":
        return "#fff !important;";
      default:
        return "#000 !important;";
    }
  }};
  font-size: 32px !important;
  font-style: normal !important;
  font-weight: 700 !important;
  line-height: normal !important;
`;

export const PlanPrice = styled(Text)<any>`
  color: ${(props: any) => {
    switch (props.type) {
      case "Suggested":
        return "var(--Text-Color-50, #fff) !important;";
      default:
        return "var(--Text-Color-50, #000) !important;";
    }
  }};
  font-size: 26px !important;
  font-style: normal !important;
  font-weight: 500 !important;
  line-height: normal !important;
`;

export const PlanDuration = styled(Text)<any>`
  color: ${(props: any) => {
    switch (props.type) {
      case "Suggested":
        return "var(--Text-Color-50, #fff) !important;";
      default:
        return "var(--Text-Color-50, #000) !important;";
    }
  }};
  font-size: 17px !important;
  font-style: normal !important;
  font-weight: 500 !important;
  line-height: normal !important;
`;

export const PricingMainDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const PlanDescription = styled(Text)<any>`
  color: ${(props: any) => {
    switch (props.type) {
      case "Suggested":
        return "var(--Text-Color-50, #fff) !important;";
      default:
        return "var(--Text-Color-50, #000) !important;";
    }
  }};
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
  margin-right: 18px !important;
`;

export const PlanFeatures = styled.div`
  height: 300px !important;
  max-height: 400px !important;
  overflow: auto !important;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 12px 0 0 !important;
`;

export const FeatureDescription = styled(Text)<any>`
  color: ${(props: any) => {
    switch (props.type) {
      case "Suggested":
        return "var(--Text-Color-50, #fff) !important;";
      default:
        return "var(--Text-Color-50, #000) !important;";
    }
  }};
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
`;

export const UpgradeButton = styled(Button)`
  border-radius: 20px !important;
  /* drop-shadow/button-secondary */
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02);
  width: 208px;
  display: flex !important;
  padding: 18px 15px !important;
  justify-content: center !important;
  align-items: center !important;
  gap: 10px !important;
  flex-shrink: 0 !important;
`;

export const BasicPlanConatiner = styled.div`
  border-radius: 26px;
  width: 292px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 14px 14px 28px;
`;
