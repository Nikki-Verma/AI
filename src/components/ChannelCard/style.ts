import { Typography } from "antd";
import { styled } from "styled-components";
const { Text } = Typography;
export const ChannelCardContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 0.5px solid var(--Text-Color-150, #d5d5d5);
  background: var(--Text-Color-50, #fff);
  width: 130px;
  height: 110px;
  flex-shrink: 0;
  cursor: ${(props: any) => {
    switch (props.disabled) {
      case true:
        return "no-drop";
      case false:
        return "pointer";
      default:
        return "pointer";
    }
  }};
`;

export const ChannelCardTitle = styled(Text)`
  text-align: center;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
