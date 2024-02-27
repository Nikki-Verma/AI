import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Card, CardProps } from "antd";
import { styled } from "styled-components";

interface RadioOptionContainerProps extends CardProps {
  checked: boolean;
}

export const RadioOptionContainer = styled(Card)<RadioOptionContainerProps>`
  border: ${(props: any) => {
    console.log("🚀 ~ props:", props);
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
