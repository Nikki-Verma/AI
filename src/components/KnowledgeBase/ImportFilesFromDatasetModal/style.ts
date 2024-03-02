import { PRIMARY_BRAND_COLOR, TEXT_HOVER_BG_COLOR } from "@/_utils/theme.antd";
import { Card, CardProps, Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

interface RadioOptionContainerProps extends CardProps {
  checked: boolean;
  disabled: boolean;
}

export const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const PreviewTitle = styled(Text)`
  font-size: 16px !important;
`;

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
  cursor: ${(props: any) => {
    switch (props.disabled) {
      case true:
        return `no-drop`;
      case false:
        return `pointer`;
      default:
        return `pointer`;
    }
  }};
  &:hover {
    background: ${TEXT_HOVER_BG_COLOR};
  }
`;
