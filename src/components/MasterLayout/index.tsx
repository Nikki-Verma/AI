import React, { useEffect, useLayoutEffect, useState } from "react";

import useAuthorization from "@/Hooks/useAuthorization";
import { useAppStore } from "@/store";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { Divider, Layout, Menu, Typography } from "antd";
import useToken from "antd/es/theme/useToken";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./MasterLayout.module.scss";
import Topbar from "./Topbar";
import { getItemByKey, items } from "./util";

const { Text, Title } = Typography;
// import RechargeWalletModal from '../Dashboard/RechargeWalletModal';
// import ResetPassword from '../Dashboard/ResetPassword';
// import DownloadDrawer from '../DownloadDrawer';

const { Header, Sider, Content } = Layout;

const MasterLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: userSessionDetails }: any = useSession();
  console.log("🚀 ~ MasterLayout ~ userSessionDetails:", userSessionDetails);
  const { userConfig, updatePageConfig } = useAppStore();
  console.log("🚀 ~ MasterLayout ~ userConfig:", userConfig);
  const [collapsed, setCollapsed] = useState(false);
  console.log("🚀 ~ MasterLayout ~ collapsed:", collapsed);
  const [menuItems, setMenuItems] = useState([]);
  const [isAuthorized, permissions] = useAuthorization();
  const pathname = usePathname();
  const [theme, token] = useToken();

  // const [drawerVisible, setDrawerVisible] = useState(false);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState("");
  const [currentItemKey, setCurrentItemKey] = useState(["overview"]);
  const [openItemKey, setOpenItemKey] = useState<string[]>([]);
  console.log("🚀 ~ MasterLayout ~ openItemKey:", openItemKey);

  useLayoutEffect(() => {
    if (permissions) {
      const filteredData = filterListData([...items]);

      filteredData?.map((item: any) => {
        delete item.keyPath;
        delete item.permissionType;
        return item;
      });

      setMenuItems(filteredData);
    }
  }, [permissions]);

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Dashboard",
      pageDescription: " Dashboard description",
    });
  }, []);

  useEffect(() => {
    const navItem = getItemByKey(pathname, "url", items);

    if (navItem?.keyPath?.length) {
      setOpenItemKey(navItem.keyPath);
      setCurrentItemKey(navItem.keyPath);
    }
  }, [pathname]);

  useEffect(() => {
<<<<<<< HEAD
    updateUserConfig({ siderLocked: false });
  }, []);
=======
    if (userConfig?.siderLocked) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }, [userConfig.siderLocked]);
>>>>>>> main

  const filterListData = (items: any) => {
    const newItems = items.map((list: any) => {
      if (
        list.permissions &&
        !isAuthorized(list.permissions, list.permissionType)
      ) {
        return null;
      }
      const filteredList =
        list?.children?.filter((route: any) => {
          return isAuthorized(route.permissions, route.permissionType);
        }) || [];
      if (filteredList?.length > 0 && list?.children?.length > 0) {
        return { ...list, children: [...filteredList] };
      } else if (filteredList?.length === 0 && !list?.children?.length) {
        return { ...list };
      } else {
        return null;
      }
    });
    return newItems;
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setDefaultSelectedKey(pathname);
  }, [pathname]);
<<<<<<< HEAD
=======

>>>>>>> main
  const { SubMenu } = Menu;

  const handleOpenChange = (openKeys: string[]) => {
    setOpenItemKey(openKeys?.slice(-1));
  };

  const profileMenu = (
    <Menu style={{ padding: 4 }}>
      <Menu.Item icon={<EditOutlined />}>Change Password</Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
    </Menu>
  );

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
              console.log("config check enter", userConfig);
              setCollapsed(false);
            }
          }}
          onMouseLeave={() => {
            if (!userConfig.siderLocked) {
              console.log("config check out", userConfig);
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
