import { Flex } from "antd";
import {
  BillingDetailsAndActions,
  BillingOverviewContainer,
  CurrentBillingCard,
} from "./style";

const BillingOverview = () => {
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
          <BillingDetailsAndActions>hello there</BillingDetailsAndActions>
        </Flex>
      </CurrentBillingCard>
    </BillingOverviewContainer>
  );
};

export default BillingOverview;
