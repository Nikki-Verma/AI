import React, { useEffect, useMemo, useState } from "react";

import useAuthorization from "@/Hooks/useAuthorization";
import { useAppStore } from "@/store";
import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Layout, Menu, Typography } from "antd";
import useToken from "antd/es/theme/useToken";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./MasterLayout.module.scss";
import { Container, SidebarToggleBtn, SiderX } from "./style";
import Topbar from "./Topbar";
import { getItemByKey, getMenuItems, items } from "./util";

const { Text, Title } = Typography;
// import RechargeWalletModal from '../Dashboard/RechargeWalletModal';
// import ResetPassword from '../Dashboard/ResetPassword';
// import DownloadDrawer from '../DownloadDrawer';

const { Header, Sider, Content } = Layout;

const MasterLayout = ({ children }: { children: React.ReactNode }) => {
  const { userConfig, updateUserConfig } = useAppStore();
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
    <Container>
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
        <SiderX
          // theme="light"
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
        >
          <div className={styles.logo_container}>
            <Image
              src="/assets/Logos/simplaiLogo.svg"
              width={38}
              height={38}
              style={{
                margin: "16px 10px",
              }}
              alt="SimplAI"
            />
            <Title level={3} style={{ color: token.colorPrimary }}>
              SimplAI
            </Title>
          </div>
          <SidebarToggleBtn
            onClick={() => {
              if (collapsed) {
                setCollapsed(!collapsed);
              } else {
                setCollapsed(false);
              }
              updateUserConfig({ siderLocked: !userConfig.siderLocked });
            }}
          >
            {!collapsed && !userConfig.siderLocked ? (
              <svg
                width="5"
                height="8"
                viewBox="0 0 5 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8687 7.68697C4.06396 7.88223 4.38054 7.88223 4.5758 7.68697C4.77107 7.49171 4.77106 7.17512 4.5758 6.97986L3.8687 7.68697ZM4.5758 1.0203C4.77107 0.82504 4.77107 0.508457 4.5758 0.313195C4.38054 0.117933 4.06396 0.117933 3.8687 0.313195L4.5758 1.0203ZM0.959626 4.07079L0.606073 4.42435L0.959626 4.07079ZM0.959626 3.92937L0.606073 3.57582L0.959626 3.92937ZM4.5758 6.97986L1.31318 3.71724L0.606073 4.42435L3.8687 7.68697L4.5758 6.97986ZM1.31318 4.28292L4.5758 1.0203L3.8687 0.313195L0.606073 3.57582L1.31318 4.28292ZM1.31318 3.71724C1.46939 3.87345 1.46939 4.12671 1.31318 4.28292L0.606073 3.57582C0.371759 3.81013 0.371758 4.19003 0.606073 4.42435L1.31318 3.71724Z"
                  fill={PRIMARY_BRAND_COLOR}
                />
              </svg>
            ) : (
              <svg
                width="5"
                height="9"
                viewBox="0 0 5 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.14297 8.42399C0.954373 8.6257 0.637968 8.63632 0.436263 8.44772C0.234557 8.25912 0.223931 7.94272 0.41253 7.74101L1.14297 8.42399ZM0.412529 1.294C0.223931 1.0923 0.234556 0.775893 0.436262 0.587294C0.637968 0.398696 0.954372 0.409321 1.14297 0.611027L0.412529 1.294ZM4.04722 4.58581L3.682 4.24432L4.04722 4.58581ZM4.04722 4.44921L3.682 4.7907L4.04722 4.44921ZM0.41253 7.74101L3.682 4.24432L4.41245 4.92729L1.14297 8.42399L0.41253 7.74101ZM3.682 4.7907L0.412529 1.294L1.14297 0.611027L4.41245 4.10772L3.682 4.7907ZM3.682 4.24432C3.53824 4.39807 3.53824 4.63694 3.682 4.7907L4.41245 4.10772C4.62809 4.33836 4.62809 4.69666 4.41245 4.92729L3.682 4.24432Z"
                  fill={PRIMARY_BRAND_COLOR}
                />
              </svg>
            )}
          </SidebarToggleBtn>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            defaultOpenKeys={["order-management"]}
            selectedKeys={currentItemKey}
            openKeys={openItemKey}
            // style={{
            //   borderInlineEnd: "none",
            // }}
            items={menuItems}
            onOpenChange={handleOpenChange}
          />
        </SiderX>
        <Content className={styles.content_x} style={{ marginTop: "64px" }}>
          {children}
        </Content>
      </Layout>
    </Container>
  );
};

export default MasterLayout;
