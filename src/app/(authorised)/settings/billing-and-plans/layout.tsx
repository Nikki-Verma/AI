"use client";

import { MediumRadioGroup } from "@/components/UIComponents/UIComponents.style";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BillingContainer } from "./style";
import { BillingOptions, getBillingItemsByKey } from "./utils";

type Props = {
  children: React.ReactNode;
};

const BillingLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [integrationTab, setIntegrationTab] = useState();

  useEffect(() => {
    const navSettingsItem = getBillingItemsByKey(
      pathname,
      "url",
      BillingOptions,
    );
    console.log("🚀 ~ useEffect ~ navSettingsItem:", navSettingsItem);
    if (navSettingsItem?.value) {
      setIntegrationTab(navSettingsItem?.value);
    }
  }, [pathname]);

  return (
    <BillingContainer>
      <MediumRadioGroup
        value={integrationTab}
        onChange={(val: any) => {
          router.push(val?.target?.value);
        }}
        buttonStyle="solid"
        optionType="button"
        options={BillingOptions}
      >
        {/* <RadioButton value={BillingTab.OVERVIEW}>Overview</RadioButton>
        <RadioButton value={BillingTab.PAYMENT_METHODS}>
          Payment Methods
        </RadioButton>
        <RadioButton value={BillingTab.PRICING_PLANS}>
          Pricing Plans
        </RadioButton> */}
      </MediumRadioGroup>
      {children}
    </BillingContainer>
  );
};

export default BillingLayout;
