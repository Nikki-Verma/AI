import { Flex } from "antd";
import { useState } from "react";
import Statistics from "../Statistics";
import {
  BillingActionHeading,
  BillingDetailsAndActions,
  BillingOverviewContainer,
  BillingStats,
  CurrentBillingCard,
} from "./style";

const BillingOverview = () => {
  const [billingBasicStats, setBillingBasicStats] = useState([
    { label: "Credits", value: "1000" },
    { label: "Trail Ends", value: "30 March 2024" },
    { label: "users", value: "1 user" },
  ]);

  return (
    <BillingOverviewContainer>
      <CurrentBillingCard
        styles={{
          body: {
            padding: "16px",
          },
        }}
      >
        <Flex justify="space-between" align="center" wrap="wrap">
          <BillingDetailsAndActions>
            <BillingActionHeading>Current Plan- Free</BillingActionHeading>
            <BillingStats>
              {billingBasicStats?.map((billingStat: any) => {
                return <Statistics stats={billingStat} />;
              })}
            </BillingStats>
          </BillingDetailsAndActions>
          <BillingDetailsAndActions>
            <BillingActionHeading>Credit Metrics</BillingActionHeading>
          </BillingDetailsAndActions>
        </Flex>
      </CurrentBillingCard>
    </BillingOverviewContainer>
  );
};

export default BillingOverview;
