import { Col, Flex, Row } from "antd";
import FeatureIcon from "../Icons/FeatureIcon";
import {
  BasicPlanConatiner,
  FeatureDescription,
  PlanDescription,
  PlanDuration,
  PlanFeatures,
  PlanName,
  PlanPrice,
  PopularTag,
  PopularTagText,
  PricingMainDetails,
  SuggestedPlanConatiner,
  UpgradeButton,
} from "./style";

type PlanDetailsProps = {
  type: string;
};

const PlanDetails = ({ type }: PlanDetailsProps) => {
  const PlanFetaure = [
    "400,000 credits/month",
    "Basic ingestion integrations like databases",
    "Pro+",
    "5 GB of datasets",
    "Model evaluation",
    "More integration options for output",
    "Priority Support",
    "15 Users",
  ];
  return type === "Suggested" ? (
    <SuggestedPlanConatiner>
      <PricingMainDetails>
        <Row justify="end">
          <Col>
            <PopularTag>
              <PopularTagText>Most Popular</PopularTagText>
            </PopularTag>
          </Col>
        </Row>
        <PlanName type={type}>Team</PlanName>
        <PlanPrice type={type}>
          $50 <PlanDuration type={type}>/month</PlanDuration>
        </PlanPrice>
        <PlanDescription type={type}>
          For most businesses that want to otpimize web queries
        </PlanDescription>
      </PricingMainDetails>
      <PlanFeatures>
        {PlanFetaure?.map((feature: any) => {
          return (
            <Flex justify="flex-start" gap="10px">
              <FeatureIcon />
              <FeatureDescription type={type}> {feature}</FeatureDescription>
            </Flex>
          );
        })}
      </PlanFeatures>
      <Flex justify="center">
        <UpgradeButton type="default">Upgrade Plan</UpgradeButton>
      </Flex>
    </SuggestedPlanConatiner>
  ) : (
    <BasicPlanConatiner>
      <PricingMainDetails>
        <PlanName type={type}>Team</PlanName>
        <PlanPrice type={type}>
          $50 <PlanDuration type={type}>/month</PlanDuration>
        </PlanPrice>
        <PlanDescription type={type}>
          For most businesses that want to otpimize web queries
        </PlanDescription>
      </PricingMainDetails>
      <PlanFeatures>
        {PlanFetaure?.map((feature: any) => {
          return (
            <Flex justify="flex-start" gap="10px">
              <FeatureIcon />
              <FeatureDescription type={type}>{feature}</FeatureDescription>
            </Flex>
          );
        })}
      </PlanFeatures>
      <Flex justify="center">
        <UpgradeButton type="primary">Upgrade Plan</UpgradeButton>
      </Flex>
    </BasicPlanConatiner>
  );
};

export default PlanDetails;
