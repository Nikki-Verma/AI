import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { dateFormatForFrontend, tokenDateFormat } from "@/utils/constants";
import dayjs from "@/utils/date";
import { UnknownObject } from "@/utils/types";
import { Col, Flex, Row, Skeleton, Typography } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BuyCreditsModal from "../BuyCreditsModal";
import CalendarIcon from "../Icons/CalendarIcon";
import CustomWalletIcon from "../Icons/CustomWalletIcon";
import UserIcon from "../Icons/UserIcon";
import Statistics from "../Statistics";
import UpgradePlanModal from "../UpgradePlanModal";
import {
  BillingActionHeading,
  BillingDetailsAndActions,
  BillingDetailsLink,
  BillingStats,
  CurrentBillingCardContainer,
  UpgradePlanButton,
} from "./style";

const { Text } = Typography;

const CurrentBillingCard = () => {
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);
  const [displayCreditsModal, setDisplayCreditsModal] = useState(false);

  const { data: session }: any = useSession();

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(config.subscription.currentPlan, {
      tenant_id: session?.user?.details?.tenantId,
      additional_fields: "feature,pricing",
    });
  console.log("🚀 ~ CurrentBillingCard ~ data:", data);
  console.log("🚀 ~ CurrentBillingCard ~ error:", error);

  const [billingBasicStats, setBillingBasicStats] = useState([
    {
      label: "Credits",
      value: 0,
      icon: <CustomWalletIcon />,
    },
    { label: "Trail Ends", value: "--", icon: <CalendarIcon /> },
    {
      label: "users",
      value: "--",
      icon: <UserIcon />,
    },
  ]);
  const [billingAdvanceStats, setBillingAdvanceStats] = useState([
    { label: "Available Credits", value: "1000", icon: <CustomWalletIcon /> },
  ]);

  useEffect(() => {
    if (data) {
      const planCredits =
        data?.result?.features?.find(
          (feature: UnknownObject) => feature?.name === "Credits Usage Rate",
        )?.max_limit ?? 0;
      const planUserLimit =
        data?.result?.features?.find(
          (feature: UnknownObject) => feature?.name === "User accounts",
        )?.max_limit ?? 0;
      const planEndDate = data?.result?.expiry_at
        ? dayjs(data?.result?.expiry_at, tokenDateFormat).format(
            dateFormatForFrontend,
          )
        : "--";

      setBillingBasicStats([
        {
          label: "Credits",
          value: planCredits,
          icon: <CustomWalletIcon />,
        },
        { label: "Trail Ends", value: planEndDate, icon: <CalendarIcon /> },
        {
          label: "users",
          value: `${planUserLimit} users`,
          icon: <UserIcon />,
        },
      ]);
    }
  }, [data]);

  const toggleCreditsModal = () => {
    setDisplayCreditsModal((prev: boolean) => !prev);
  };

  const toggleUpgradeModal = () => {
    setDisplayUpgradeModal((prev: boolean) => !prev);
  };

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
          <Skeleton paragraph={{ rows: 1 }} active loading={isLoading}>
            <BillingDetailsAndActions>
              <Flex gap="16px" align="baseline" flex={1}>
                <BillingActionHeading>{`Current Plan- ${data?.result?.plan_name}`}</BillingActionHeading>
                <BillingDetailsLink href="/">View details</BillingDetailsLink>
              </Flex>
              <Flex justify="space-between">
                <BillingStats>
                  {billingBasicStats?.map((billingStat: any) => {
                    return <Statistics stats={billingStat} />;
                  })}
                </BillingStats>
                <UpgradePlanButton type="primary" onClick={toggleUpgradeModal}>
                  Upgrade Plan
                </UpgradePlanButton>
              </Flex>
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
            <BillingDetailsAndActions>
              <BillingActionHeading>Credit Metrics</BillingActionHeading>
              <Flex justify="space-between">
                <BillingStats>
                  {billingAdvanceStats?.map((billingStat: any) => {
                    return <Statistics stats={billingStat} />;
                  })}
                </BillingStats>
                <UpgradePlanButton type="primary" onClick={toggleCreditsModal}>
                  Buy Credits
                </UpgradePlanButton>
              </Flex>
            </BillingDetailsAndActions>
          </Skeleton>
        </CurrentBillingCardContainer>
      </Col>
      <UpgradePlanModal
        open={displayUpgradeModal}
        onClose={toggleUpgradeModal}
      />
      <BuyCreditsModal
        open={displayCreditsModal}
        onClose={toggleCreditsModal}
      />
    </Row>
  );
};

export default CurrentBillingCard;
