import React, { useEffect, useMemo, useState } from "react";

import useAuthorization from "@/Hooks/useAuthorization";
import { useAppStore } from "@/store";
import { Divider, Layout, Menu, Typography } from "antd";
import useToken from "antd/es/theme/useToken";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./MasterLayout.module.scss";
import Topbar from "./Topbar";
import { getItemByKey, getMenuItems, items } from "./util";

const { Text, Title } = Typography;
// import RechargeWalletModal from '../Dashboard/RechargeWalletModal';
// import ResetPassword from '../Dashboard/ResetPassword';
// import DownloadDrawer from '../DownloadDrawer';

const { Header, Sider, Content } = Layout;

const MasterLayout = ({ children }: { children: React.ReactNode }) => {
  const { userConfig } = useAppStore();
  const [collapsed, setCollapsed] = useState(true);

  const [isAuthorized] = useAuthorization();
  const menuItems = useMemo(() => getMenuItems(isAuthorized), [isAuthorized]);
  const pathname = usePathname();
  const [theme, token] = useToken();
  const [currentItemKey, setCurrentItemKey] = useState(["overview"]);
  const [openItemKey, setOpenItemKey] = useState<string[]>([]);

  useEffect(() => {
    const navItem = getItemByKey(pathname, "url", items);
    if (navItem?.keyPath?.length) {
      setOpenItemKey(navItem.keyPath);
      setCurrentItemKey(navItem.keyPath);
    }
  }, [pathname]);

  useEffect(() => {
    if (userConfig?.siderLocked) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [userConfig.siderLocked]);

  const handleOpenChange = (openKeys: string[]) => {
    setOpenItemKey(openKeys?.slice(-1));
  };

  return (
    <Layout>
      <Topbar />
      <Layout
        style={{
          marginLeft: collapsed
            ? "65px"
            : userConfig?.siderLocked
              ? "195px"
              : "65px",
          transition: "all 0.2s",
        }}
      >
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          id="layout-sider"
          onMouseEnter={() => {
            if (!userConfig.siderLocked) {
              setCollapsed(false);
            }
          }}
          onMouseLeave={() => {
            if (!userConfig.siderLocked) {
              setCollapsed(true);
            }
          }}
          width={195}
          collapsedWidth={65}
          style={{
            overflow: "auto",
            height: "calc(100vh - 64px)",
            position: "fixed",
            left: 0,
            top: "64px",
            scrollbarWidth: "thin",
            boxShadow: "6px 0 6px -2px rgba(0, 0, 0, 0.06)",
            zIndex: 1,
          }}
        >
          <div className={styles.logo_container}>
            <Image
              src="/assets/Logos/simplaiLogo.svg"
              width={38}
              height={38}
              style={{
                margin: "16px 10px",
              }}
              alt="SimplAi"
            />
            <Title level={3} style={{ color: token.colorPrimary }}>
              Simplai.ai
            </Title>
          </div>
          <Divider style={{ margin: "0 0 10px" }} />
          <Menu
            // theme="light"
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            defaultOpenKeys={["order-management"]}
            selectedKeys={currentItemKey}
            openKeys={openItemKey}
            style={{
              borderInlineEnd: "none",
            }}
            items={menuItems}
            onOpenChange={handleOpenChange}
          />
        </Sider>
        <Content className={styles.content_x} style={{ marginTop: "64px" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MasterLayout;
