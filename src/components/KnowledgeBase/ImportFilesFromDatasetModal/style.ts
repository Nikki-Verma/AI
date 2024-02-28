import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Card, CardProps, Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

interface RadioOptionContainerProps extends CardProps {
  checked: boolean;
}

export const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const PreviewTitle = styled(Text)`
  font-size: 16px !important;
`;

export const PreviewContainer = styled.div`
  border-radius: 10px;
  border: 1px solid #ccd3de;
  padding: 20px 10px;
  max-height: 600px;
  overflow: auto;
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
  background: ${(props: any) => {
    switch (props.checked) {
      case true:
        return `rgb(249, 249, 255) !important`;
      case false:
        return `inherit`;
      default:
        return `inherit`;
    }
  }};
  width: 100%;
  margin: 6px 0 !important;

  &:hover {
    background: rgb(249, 249, 255) !important;
    box-shadow: 0.2px 0.2px 0.5px;
  }
`;
