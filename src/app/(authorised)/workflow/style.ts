import { Tag } from "antd";
import { styled } from "styled-components";

export const StatusTag = styled(Tag)`
  width: 100%;
  display: flex;
  color: ${(props: any) => {
    switch (props.status) {
      case "CREATED":
        return "#434343";
      case "COMPLETED":
        return "#004C00";
      default:
        return "#3A1C86";
    }
  }};
`;
