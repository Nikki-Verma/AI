import { Layout } from "antd";
import { styled } from "styled-components";

const { Sider } = Layout;

export const Container = styled.div`
  .ant-menu-item {
    display: flex !important;
    margin: 25px auto !important;
    height: 40px !important;
  }

  .ant-menu-item-selected {
    border: 0.5px solid $primary-color;
  }
  .ant-menu .ant-menu-item .anticon {
    min-width: 24px !important;
  }
  .ant-menu-vertical .ant-menu-item,
  .ant-menu-light.ant-menu-inline .ant-menu-item {
    padding-inline: 16px !important;
    padding-left: 16px !important;
  }
`;

export const SiderX = styled(Sider)`
  overflow-x: visible;
  height: calc(100vh - 64px);
  position: fixed !important;
  left: 0;
  top: 64px;
  scrollbar-width: thin;
  z-index: 99999;
  transition: all 0.5s;
  box-shadow: 6px 0 6px -2px rgba(0, 0, 0, 0.06);
  background: #ffffff !important;
`;

export const SidebarToggleBtn = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: 700;
  border: 1px solid #0051be;
  color: #0051be;
  background-color: white;
  position: absolute;
  top: 60px;
  right: 0px;
  z-index: 1313131;
  overflow: visible;
  cursor: pointer;
  font-size: medium;

  svg {
    margin: 3px 6px;
    width: 8px;
    height: 12px;
  }
`;
