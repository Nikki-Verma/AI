import { DollarSymbol } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { Flex, FlexProps } from "antd";
import {
  DescriptionItemType,
  LayoutOption,
  LayoutType,
} from "../DescriptionList";
import {
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
  const PricingDetailColumns: DescriptionItemType[] = [
    {
      label: "Plan",
      key: "plan",
      width: "100%",
    },
    {
      label: "Payments",
      key: "payment",
      width: "100%",
      render: (payment: any) => (payment ? `${DollarSymbol}${payment}` : "--"),
    },
    {
      label: "Plan Valid Till",
      key: "expiry_at",
      width: "100%",
    },
    {
      label: "Users",
      key: "users",
      width: "100%",
    },
  ];

  return (
    <PricingPlansContainer>
      <PricingPlansTitle>Your plan details</PricingPlansTitle>
      <PricingDetailsCard>
        <Flex wrap="wrap" justify="space-between" align="center">
          <PricingDetailsDescription
            columns={PricingDetailColumns}
            data={{}}
            gapBetweenItems={62}
          />
          <PlanUpgradeButton type="primary">
            <PlanUpgradeButtonText>Upgrade Plan</PlanUpgradeButtonText>
          </PlanUpgradeButton>
        </Flex>
        <PricingDetailsDivider />
      </PricingDetailsCard>
    </PricingPlansContainer>
  );
};

export default PricingPlans;
