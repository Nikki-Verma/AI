"use client";

import { useAppStore } from "@/store";
import { Layout, Typography } from "antd";
import { DashboardHeader } from "./style";
import TopbarHeading from "./TopbarHeading";
import TopBarMenu from "./TopBarMenu";

const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;

const Topbar = () => {
  const { userConfig, updateUserConfig } = useAppStore();

  const toggleSiderFixed = () => {
    updateUserConfig({ siderLocked: !userConfig?.siderLocked });
  };

  return (
    <DashboardHeader>
      {/* <MenuOutlined onClick={toggleSiderFixed} /> */}
      <TopbarHeading />
      <TopBarMenu />
    </DashboardHeader>
  );
};

export default Topbar;
