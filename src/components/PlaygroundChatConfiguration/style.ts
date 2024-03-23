import { Card, Typography } from "antd";
import { styled } from "styled-components";

const { Text } = Typography;

export const PlaygroundConfigurationContainer = styled(Card)`
  width: 100%;
  height: 100%;
`;


export const SelectedModalHeading = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  line-height: 23.44px;
  text-align: left;
  color: #222222;
  padding-right: 8px;
`

export const SelectedModal = styled(Text)`
  font-family: DM Sans;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.62px;
  text-align: left;
`

export const ModalSelectContainer = styled.div`
  max-height: 30vh;
  // overflow:auto;
  background: #F8FAFC;
  border:1px solid #CFD7DF;
  min-width: 120px;
  max-width: 206px;
  padding: 12px;
  border-radius: 4px;
  :where(.css-dev-only-do-not-override-1lvqh2o).ant-list-split .ant-list-item{
    border:none;
    padding: 8px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 18.23px;
    text-align: left;
    cursor: pointer;
  }
`
export const PlaygroundTypeListContainer = styled.div`
  display:flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`

export const PlaygroundTypeListHeading = styled(Text)`
  display:flex;
  justify-content:space-between;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.23px;
  text-align: left;
`

export const SubMenuContainer = styled.div`
  position: absolute;
  top: 0;
  right:-206px;
  minWidth: 196px; 
`

