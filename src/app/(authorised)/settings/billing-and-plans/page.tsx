"use client";

import BillingOverview from "@/components/BillingOverview";
import { MediumRadioGroup } from "@/components/UIComponents/UIComponents.style";
import { useState } from "react";
import { RadioButton } from "../../models/style";
import { BillingTab } from "./constant";
import { BillingContainer } from "./style";

const BillingPage = () => {
  const [integrationTab, setIntegrationTab] = useState(BillingTab.OVERVIEW);

  const getCurrentTabDetails = () => {
    switch (integrationTab) {
      case BillingTab.OVERVIEW:
        return <BillingOverview />;

      case BillingTab.BILLING_HISTORY:
        return <div> billing history</div>;

      case BillingTab.PAYMENT_METHODS:
        return <div> payment methods</div>;

      case BillingTab.PRICING_PLANS:
        return <div> Pricing plans</div>;

      default:
        return <div> default pricing</div>;
    }
  };

  return (
    <BillingContainer>
      <MediumRadioGroup
        value={integrationTab}
        onChange={(val: any) => {
          setIntegrationTab(val?.target?.value);
        }}
        buttonStyle="solid"
      >
        <RadioButton value={BillingTab.OVERVIEW}>Overview</RadioButton>
        <RadioButton value={BillingTab.BILLING_HISTORY}>
          Billing History
        </RadioButton>
        <RadioButton value={BillingTab.PAYMENT_METHODS}>
          Payment Methods
        </RadioButton>
        <RadioButton value={BillingTab.PRICING_PLANS}>
          Pricing Plans
        </RadioButton>
      </MediumRadioGroup>
      {getCurrentTabDetails()}
    </BillingContainer>
  );
};

export default BillingPage;
