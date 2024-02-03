"use client";

import { useAppStore } from "@/store";
import { MenuOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";
import dynamic from "next/dynamic";
const TopbarHeading = dynamic(() => import("./TopbarHeading"), { ssr: false });
const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;

const Topbar = () => {
  const { userConfig, updateUserConfig } = useAppStore();

  const toggleSiderFixed = () => {
    updateUserConfig({ siderLocked: !userConfig?.siderLocked });
  };

  return (
    <Header
      style={{
        padding: "0 24px",
        background: "#fff",
        boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.06)",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "64px",
        lineHeight: "64px",
        zIndex: 99,
      }}
    >
      <MenuOutlined onClick={toggleSiderFixed} />
      <TopbarHeading />
    </Header>
  );
};

export default Topbar;
