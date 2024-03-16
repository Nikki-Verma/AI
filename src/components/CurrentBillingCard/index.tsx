import { Button, Col, Flex, Row, Skeleton, Typography } from "antd";
import { useState } from "react";
import WalletIcon from "../Icons/WalletIcon";
import Statistics from "../Statistics";
import {
  BillingActionHeading,
  BillingDetailsAndActions,
  BillingDetailsLink,
  BillingStats,
  CurrentBillingCardContainer,
} from "./style";

const { Text } = Typography;

const CurrentBillingCard = () => {
  const [billingBasicStats, setBillingBasicStats] = useState([
    {
      label: "Credits",
      value: "1000",
      icon: (
        <WalletIcon
          style={{ height: "24px", width: "24px", fontSize: "24px" }}
        />
      ),
    },
    { label: "Trail Ends", value: "30 March 2024" },
    { label: "users", value: "1 user" },
  ]);
  const [billingAdvanceStats, setBillingAdvanceStats] = useState([
    { label: "Available Credits", value: "100" },
    { label: "Used Credits", value: "100" },
  ]);
  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={{ span: 16 }}>
        <CurrentBillingCardContainer
          styles={{
            body: {
              padding: "16px 16px 26px",
            },
          }}
          style={{ flex: 1 }}
        >
          <Skeleton paragraph={{ rows: 3 }} active loading={false}>
            <BillingDetailsAndActions>
              <Flex gap="16px" align="baseline">
                <BillingActionHeading>Current Plan- Free</BillingActionHeading>
                <BillingDetailsLink href="/">View details</BillingDetailsLink>
              </Flex>
              <BillingStats>
                {billingBasicStats?.map((billingStat: any) => {
                  return <Statistics stats={billingStat} />;
                })}
              </BillingStats>
              <Button type="primary">Upgrade Plan</Button>
            </BillingDetailsAndActions>
          </Skeleton>
        </CurrentBillingCardContainer>
      </Col>
      <Col span={24} md={{ span: 8 }}>
        <CurrentBillingCardContainer
          styles={{
            body: {
              padding: "16px 16px 26px",
            },
          }}
        >
          <Skeleton paragraph={{ rows: 3 }} active loading={false}>
            <BillingDetailsAndActions style={{ marginRight: "64px" }}>
              <BillingActionHeading>Credit Metrics</BillingActionHeading>
              <BillingStats>
                {billingAdvanceStats?.map((billingStat: any) => {
                  return <Statistics stats={billingStat} />;
                })}
              </BillingStats>
              <Button type="default">Upgrade Plan</Button>
            </BillingDetailsAndActions>
          </Skeleton>
        </CurrentBillingCardContainer>
      </Col>
    </Row>
  );
};

export default CurrentBillingCard;
