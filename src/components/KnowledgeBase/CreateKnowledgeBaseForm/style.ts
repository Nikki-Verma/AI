import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Card, CardProps, Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

interface RadioOptionContainerProps extends CardProps {
  checked: boolean;
}

export const RadioOptionContainer = styled(Card)<RadioOptionContainerProps>`
  border: ${(props: any) => {
    switch (props.checked) {
      case true:
        return `1.5px solid ${PRIMARY_BRAND_COLOR} !important`;
      case false:
        return `1.5px solid transparent`;
      default:
        return `1.5px solid transparent`;
    }
  }};
  margin: 6px 0 !important;
`;

export const KbSettingsLabel = styled(Text)`
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
