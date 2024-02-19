import { Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;
export const DescriptionItemLabel = styled(Text)<any>`
  color: var(--Text-Color-900, #171717);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 700;
  width: ${(props: any) =>
    props.width
      ? typeof props.width === "number"
        ? `${props.width}px`
        : props.width
      : "9.375rem"};
`;

export const DescriptionItemValue = styled(Text)<any>`
  overflow: hidden;
  color: var(--Primary-Color, #141414);
  white-space: nowrap;
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 400;
  width: ${(props: any) =>
    props.width
      ? typeof props.width === "number"
        ? `${props.width}px`
        : props.width
      : "9.375rem"};
`;
