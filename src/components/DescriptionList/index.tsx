import { UnknownObject } from "@/utils/types";
import { Flex, FlexProps, Typography } from "antd";
import { ReactNode } from "react";
import { DescriptionItemLabel, DescriptionItemValue } from "./style";

const { Text } = Typography;

enum LayoutType {
  "vertical" = "vertical",
  "horizontal" = "horizontal",
}

const LayoutOption = {
  vertical: LayoutType.vertical,
  horizontal: LayoutType.horizontal,
};

type DescriptionListProps = {
  layout?: LayoutType;
  colon?: boolean;
  columns: DescriptionItemType[];
  data: UnknownObject;
  gapBetweenItems?: FlexProps["gap"];
  gapBetweenLabelAndValue?: FlexProps["gap"];
};

export type DescriptionItemType = {
  label: string | ReactNode;
  key: string;
  width?: string | number | undefined | null;
  render?: (
    value: any,
    data: any,
  ) => ReactNode | string | number | null | undefined;
};

const DescriptionList = ({
  layout = LayoutOption.vertical,
  colon = false,
  columns = [],
  data = {},
  gapBetweenItems = "small",
  gapBetweenLabelAndValue = "small",
}: DescriptionListProps) => {
  return (
    <Flex gap={gapBetweenItems} wrap="wrap">
      {columns?.map((DescriptionItem: DescriptionItemType) => {
        return (
          <Flex
            vertical={layout === LayoutOption.vertical}
            gap={gapBetweenLabelAndValue}
          >
            <DescriptionItemLabel width={DescriptionItem?.width}>
              {DescriptionItem?.label}
              {colon && " :"}
            </DescriptionItemLabel>
            <DescriptionItemValue width={DescriptionItem?.width}>
              {DescriptionItem?.render
                ? DescriptionItem?.render(data[DescriptionItem?.key], data)
                : data[DescriptionItem?.key] ?? "--"}
            </DescriptionItemValue>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default DescriptionList;
