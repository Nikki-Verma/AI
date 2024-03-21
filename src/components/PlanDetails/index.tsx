import { DollarSymbol } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { Col, Flex, Row, Typography } from "antd";
import FeatureIcon from "../Icons/FeatureIcon";
import {
  BasicPlanConatiner,
  FeatureDescription,
  PlanDescription,
  PlanDuration,
  PlanFeatures,
  PlanName,
  PlanPrice,
  PlanPriceContainer,
  PopularTag,
  PopularTagText,
  PricingMainDetails,
  SuggestedPlanConatiner,
  UpgradeButton,
} from "./style";

const { Text } = Typography;

type PlanDetailsProps = {
  plan: UnknownObject;
  currentPlan: UnknownObject;
  upgradePlanHandler: (values: UnknownObject) => void;
};

const PlanDetails = ({
  plan,
  upgradePlanHandler,
  currentPlan,
}: PlanDetailsProps) => {
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

  const PlanPricing =
    plan?.pricing?.find?.((prices: any) => prices?.pricing_type === "MONTHLY")
      ?.total_price || 0;

  return plan?.suggested ? (
    <SuggestedPlanConatiner>
      <PricingMainDetails>
        <div>
          <Row justify="end">
            <Col>
              <PopularTag>
                <PopularTagText>Most Popular</PopularTagText>
              </PopularTag>
            </Col>
          </Row>
          <PlanName type={plan?.suggested}>{plan?.plan_name}</PlanName>
        </div>
        <PlanDescription type={plan?.suggested}>
          {plan?.description}
        </PlanDescription>
        <PlanPriceContainer type={plan?.suggested}>
          <PlanPrice type={plan?.suggested}>
            {DollarSymbol}
            {PlanPricing}
          </PlanPrice>
          <PlanDuration type={plan?.suggested}>/month</PlanDuration>
        </PlanPriceContainer>
      </PricingMainDetails>
      <PlanFeatures>
        {plan?.features?.map?.((feature: any) => {
          return (
            <Flex justify="flex-start" gap="10px">
              <FeatureIcon />
              <FeatureDescription type={plan?.suggested}>
                {feature?.name}
              </FeatureDescription>
            </Flex>
          );
        })}
      </PlanFeatures>
      <Flex justify="center">
        <UpgradeButton
          type="default"
          onClick={() =>
            upgradePlanHandler({
              type: plan?.suggested,
              amount: PlanPricing,
            })
          }
          disabled={currentPlan?.result?.plan_name === plan?.plan_name}
        >
          {currentPlan?.result?.plan_name === plan?.plan_name
            ? "Selected Plan"
            : "Upgrade Plan"}
        </UpgradeButton>
      </Flex>
    </SuggestedPlanConatiner>
  ) : (
    <BasicPlanConatiner>
      <PricingMainDetails>
        <PlanName type={plan?.suggested}>{plan?.plan_name}</PlanName>
        <PlanDescription type={plan?.suggested}>
          {plan?.description}
        </PlanDescription>
        <PlanPriceContainer type={plan?.suggested}>
          <PlanPrice>
            {DollarSymbol}
            {PlanPricing}
          </PlanPrice>
          <PlanDuration type={plan?.suggested}>/month</PlanDuration>
        </PlanPriceContainer>
      </PricingMainDetails>
      <PlanFeatures>
        {plan?.features?.map?.((feature: any) => {
          return (
            <Flex justify="flex-start" gap="10px">
              <FeatureIcon />
              <FeatureDescription type={plan?.suggested}>
                {feature?.name}
              </FeatureDescription>
            </Flex>
          );
        })}
      </PlanFeatures>
      <Flex justify="center">
        <UpgradeButton
          type="primary"
          onClick={() =>
            upgradePlanHandler({
              type: plan?.suggested,
              amount: PlanPricing,
            })
          }
          disabled={currentPlan?.result?.plan_name === plan?.plan_name}
        >
          {currentPlan?.result?.plan_name === plan?.plan_name
            ? "Selected Plan"
            : "Upgrade Plan"}
        </UpgradeButton>
      </Flex>
    </BasicPlanConatiner>
  );
};

export default PlanDetails;
