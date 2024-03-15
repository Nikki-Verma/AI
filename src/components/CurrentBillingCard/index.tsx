import { Button, Flex, Skeleton } from "antd";
import { useState } from "react";
import Statistics from "../Statistics";
import {
  BillingActionHeading,
  BillingDetailsAndActions,
  BillingStats,
  CurrentBillingCardContainer,
} from "./style";

const CurrentBillingCard = () => {
  const [billingBasicStats, setBillingBasicStats] = useState([
    { label: "Credits", value: "1000" },
    { label: "Trail Ends", value: "30 March 2024" },
    { label: "users", value: "1 user" },
  ]);
  const [billingAdvanceStats, setBillingAdvanceStats] = useState([
    { label: "Available Credits", value: "100" },
    { label: "Used Credits", value: "100" },
  ]);
  return (
    <CurrentBillingCardContainer
      styles={{
        body: {
          padding: "16px 16px 26px",
        },
      }}
    >
      <Skeleton paragraph={{ rows: 3 }} active loading={false}>
        <Flex justify="space-between" align="flex-start" wrap="wrap">
          <BillingDetailsAndActions>
            <BillingActionHeading>Current Plan- Free</BillingActionHeading>
            <BillingStats>
              {billingBasicStats?.map((billingStat: any) => {
                return <Statistics stats={billingStat} />;
              })}
            </BillingStats>
            <Button type="primary">Upgrade Plan</Button>
          </BillingDetailsAndActions>
          <BillingDetailsAndActions style={{ marginRight: "64px" }}>
            <BillingActionHeading>Credit Metrics</BillingActionHeading>
            <BillingStats>
              {billingAdvanceStats?.map((billingStat: any) => {
                return <Statistics stats={billingStat} />;
              })}
            </BillingStats>
            <Button type="default">Upgrade Plan</Button>
          </BillingDetailsAndActions>
        </Flex>
      </Skeleton>
    </CurrentBillingCardContainer>
  );
};

export default CurrentBillingCard;
