import CurrentBillingCard from "../CurrentBillingCard";
import PlanDetails from "../PlanDetails";
import {
  PlanDivider,
  PlansContainer,
  PlansHeading,
  PlansHeadingDescription,
  PlansHeadingTitle,
  PricingPlansContainer,
} from "./style";

const PricingPlans = () => {
  const types = ["Suggested", "basic", "basic", "basic"];

  return (
    <PricingPlansContainer>
      <CurrentBillingCard />
      <PlansHeading>
        <PlansHeadingTitle level={4}>
          Get started with SimplAI today
        </PlansHeadingTitle>
        <PlansHeadingDescription>
          Volume-based pricing with transparency in mind. Only pay for what you
          use.
        </PlansHeadingDescription>
      </PlansHeading>
      <PlansContainer>
        {types?.map((type: string, index: number) => {
          return (
            <>
              <PlanDetails type={type} />
              {index != types?.length - 1 && <PlanDivider />}
            </>
          );
        })}
      </PlansContainer>
    </PricingPlansContainer>
  );
};

export default PricingPlans;
