import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Tag } from "antd";
import { styled } from "styled-components";


export const LinkContainer = styled.div`
    a{
    color: var(--Text-Color-850, #222) !important;
    font-family: var(--font-dm-sans) !important;
  }
  a:hover{
    color: ${PRIMARY_BRAND_COLOR} !important;
    text-decoration : underline;
  }
`

export const StatusTag = styled(Tag)`
  width : 100%;
  display : flex;
  color : ${(props: any) => {
    switch (props.status) {
      case 'CREATED':
        return "#434343";
      case 'COMPLETED':
        return "#004C00";
      default:
        return "#3A1C86";
    }
  }};
`