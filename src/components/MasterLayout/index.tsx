import React, { useEffect, useMemo, useState } from "react";

import useAuthorization from "@/Hooks/useAuthorization";
import { useAppStore } from "@/store";
import { Layout, Menu, Typography } from "antd";
import useToken from "antd/es/theme/useToken";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CollapseSiderIcon from "../Icons/CollapseSiderIcon";
import ExpandSiderIcon from "../Icons/ExpandSiderIcon";
import styles from "./MasterLayout.module.scss";
import { CollapseToggleContainer, Container, SiderX } from "./style";
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
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["/dashboard"]}
            defaultOpenKeys={["order-management"]}
            selectedKeys={currentItemKey}
            openKeys={openItemKey}
            style={{
              overflow: "auto",
              height: "calc(100% - 120px)",
            }}
            items={menuItems}
            onOpenChange={handleOpenChange}
          />
          <CollapseToggleContainer
            onClick={() => {
              if (collapsed) {
                setCollapsed(!collapsed);
              } else {
                setCollapsed(false);
              }
              updateUserConfig({ siderLocked: !userConfig.siderLocked });
            }}
          >
            {userConfig.siderLocked ? (
              <CollapseSiderIcon style={{ margin: "10px 22px" }} />
            ) : (
              <ExpandSiderIcon style={{ margin: "10px 22px" }} />
            )}
            {/* <Image
                src="/assets/Logos/simplaiLogo.svg"
                width={38}
                height={38}
                style={{
                  margin: "16px 10px",
                }}
                alt="SimplAI"
              /> */}
            <Text ellipsis strong>
              {userConfig.siderLocked ? "Unlock sider" : "Lock sider"}
            </Text>
          </CollapseToggleContainer>
        </SiderX>
        <Content className={styles.content_x} style={{ marginTop: "64px" }}>
          {children}
        </Content>
      </Layout>
    </Container>
  );
};

export default MasterLayout;
