import { PRIMARY_BRAND_COLOR, TEXT_HOVER_BG_COLOR } from "@/_utils/theme.antd";
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
  cursor: pointer;
  &:hover {
    background: ${TEXT_HOVER_BG_COLOR};
  }
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

export const KbSettingsIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 4px;
  background: var(--blue-purple-50, #efeafc);
  height: 24px;
  width: 24px;
`;

export const KbSettingsRadioTitle = styled.div`
  color: var(--Primary-Color, #141414);
  font-feature-settings:
    "clig" off,
    "liga" off;
  text-overflow: ellipsis;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const KbSettingsRadioDescription = styled.div`
  color: var(--Text-Color-850, #222);
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
`;

export const CustomFieldsContainer = styled.div<any>`
  overflow: hidden;
  transition: all ease 0.5s;
  max-height: ${(props: any) => {
    switch (props.open) {
      case true:
        return "400px";
      case false:
        return 0;
      default:
        return "400px";
    }
  }};
`;
