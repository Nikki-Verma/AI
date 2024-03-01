"use client";

import { useAppStore } from "@/store";
import { Layout, Typography } from "antd";
import dynamic from "next/dynamic";
import { DashboardHeader } from "./style";
const TopbarHeading = dynamic(() => import("./TopbarHeading"));
const TopBarMenu = dynamic(() => import("./TopBarMenu"));
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
