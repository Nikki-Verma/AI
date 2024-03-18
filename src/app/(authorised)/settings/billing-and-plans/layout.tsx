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
      />
      {children}
    </BillingContainer>
  );
};

export default BillingLayout;
