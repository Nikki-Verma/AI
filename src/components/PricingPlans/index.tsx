import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  dateFormatForFrontend,
  DollarSymbol,
  tokenDateFormat,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { UnknownObject } from "@/utils/types";
import { Flex, FlexProps, Skeleton, Space } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  DescriptionItemType,
  LayoutOption,
  LayoutType,
} from "../DescriptionList";
import TickIcon from "../Icons/TickIcon";
import UpgradePlanModal from "../UpgradePlanModal";
import {
  FeatureItem,
  PlanUpgradeButton,
  PlanUpgradeButtonText,
  PricingDetailsCard,
  PricingDetailsDescriptionItemLabel,
  PricingDetailsDescriptionItemValue,
  PricingDetailsDivider,
  PricingPlansContainer,
  PricingPlansTitle,
} from "./style";

type PricingDetailsDescriptionProps = {
  layout?: LayoutType;
  colon?: boolean;
  columns: DescriptionItemType[];
  data: UnknownObject;
  gapBetweenItems?: FlexProps["gap"];
  gapBetweenLabelAndValue?: FlexProps["gap"];
  vertical?: boolean;
};

const PricingDetailsDescription = ({
  layout = LayoutOption.vertical,
  colon = false,
  columns = [],
  data = {},
  gapBetweenItems = "small",
  gapBetweenLabelAndValue = "small",
  vertical = false,
}: PricingDetailsDescriptionProps) => {
  return (
    <Flex gap={gapBetweenItems} wrap="wrap" vertical={vertical}>
      {columns?.map((DescriptionItem: DescriptionItemType) => {
        return (
          <Flex
            vertical={layout === LayoutOption.vertical}
            gap={gapBetweenLabelAndValue}
          >
            <PricingDetailsDescriptionItemLabel width={DescriptionItem?.width}>
              {DescriptionItem?.label}
              {colon && " :"}
            </PricingDetailsDescriptionItemLabel>
            <PricingDetailsDescriptionItemValue width={DescriptionItem?.width}>
              {DescriptionItem?.render
                ? DescriptionItem?.render(data?.[DescriptionItem?.key], data)
                : data?.[DescriptionItem?.key] ?? "--"}
            </PricingDetailsDescriptionItemValue>
          </Flex>
        );
      })}
    </Flex>
  );
};

const PricingPlans = () => {
  const { data: session }: any = useSession();
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(config.subscription.currentPlan, {
      tenant_id: session?.user?.details?.tenantId,
      additional_fields: "feature,pricing",
    });

  console.log("🚀 ~ PricingPlans ~ data:", data);

  const toggleUpgradeModal = () => {
    setDisplayUpgradeModal((prev: boolean) => !prev);
  };

  const PricingDetailColumns: DescriptionItemType[] = [
    {
      label: "Plan",
      key: "plan_name",
      width: "100%",
    },
    {
      label: "Payments",
      key: "tenant_plan_price",
      width: "100%",
      render: (payment: any) => `${DollarSymbol}${payment}`,
    },
    {
      label: "Plan Valid Till",
      key: "expiry_at",
      width: "100%",
      render: (expiry_at: any) => {
        return expiry_at
          ? dayjs(data?.result?.expiry_at, tokenDateFormat).format(
              dateFormatForFrontend,
            )
          : "--";
      },
    },
    {
      label: "Users",
      key: "features",
      width: "100%",
      render: (features: any) => {
        return `${
          features?.find(
            (feature: UnknownObject) => feature?.name === "User accounts",
          )?.max_limit ?? 0
        } users`;
      },
    },
  ];

  return (
    <PricingPlansContainer>
      <PricingPlansTitle>Your plan details</PricingPlansTitle>
      <PricingDetailsCard>
        <Skeleton active loading={isLoading} paragraph={{ rows: 4 }}>
          <Flex wrap="wrap" justify="space-between" align="center">
            <PricingDetailsDescription
              columns={PricingDetailColumns}
              data={data?.result || {}}
              gapBetweenItems={62}
            />
            <PlanUpgradeButton type="primary">
              <PlanUpgradeButtonText onClick={toggleUpgradeModal}>
                Upgrade Plan
              </PlanUpgradeButtonText>
            </PlanUpgradeButton>
          </Flex>
          <PricingDetailsDivider />
          <Flex gap="24px" wrap="wrap">
            {data?.result?.features?.map((feature: any) => (
              <Space size={6} align="start" key={feature?.id}>
                <TickIcon /> <FeatureItem>{feature?.name}</FeatureItem>
              </Space>
            ))}
          </Flex>
        </Skeleton>
      </PricingDetailsCard>
      <UpgradePlanModal
        open={displayUpgradeModal}
        onClose={toggleUpgradeModal}
      />
    </PricingPlansContainer>
  );
};

export default PricingPlans;
