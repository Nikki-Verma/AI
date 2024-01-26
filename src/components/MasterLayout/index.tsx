import React, { useEffect, useLayoutEffect, useState } from "react";

import useAuthorization from "@/Hooks/useAuthorization";
import { EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { Divider, Layout, Menu, Typography } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import uiStyles from "../UIComponents/ui.module.scss";
import styles from "./MasterLayout.module.scss";
import { getItemByKey, items } from "./util";

const { Text } = Typography;
// import RechargeWalletModal from '../Dashboard/RechargeWalletModal';
// import ResetPassword from '../Dashboard/ResetPassword';
// import DownloadDrawer from '../DownloadDrawer';

const { Header, Sider, Content } = Layout;

const MasterLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: userSessionDetails }: any = useSession();
  console.log("🚀 ~ MasterLayout ~ userSessionDetails:", userSessionDetails);

  const [collapsed, setCollapsed] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  const [isAuthorized, permissions] = useAuthorization();
  const pathname = usePathname();
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
    console.log("🚀 ~ useEffect ~ pathname:", pathname);
    const navItem = getItemByKey(pathname, "url", items);
    console.log("🚀 ~ useEffect ~ navItem:", navItem);

    if (navItem?.keyPath?.length) {
      setOpenItemKey(navItem.keyPath);
      setCurrentItemKey(navItem.keyPath);
    }
  }, [pathname]);

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
    setDefaultSelectedKey(location.pathname);
  }, [location.pathname]);
  const { SubMenu } = Menu;

  const handleOpenChange = (openKeys: string[]) => {
    console.log("🚀 ~ handleOpenChange ~ openKeys:", openKeys);
    setOpenItemKey(openKeys?.slice(-1));
  };

  const profileMenu = (
    <Menu style={{ padding: 4 }}>
      <Menu.Item icon={<EditOutlined />}>Change Password</Menu.Item>
      <Menu.Item icon={<LogoutOutlined />}>Logout</Menu.Item>
      {/* <ResetPassword setVisible={setChangePasswordModalVisible} /> */}
    </Menu>
  );

  return (
    <Layout>
      <Header
        style={{
          padding: "0 24px",
          background: "#fff",
          boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.06)",
          position: "fixed",
          top: 0,
          width: "100vw",
          zIndex: 1,
        }}
      >
        <div
          className={uiStyles.space_between_container}
          style={{ height: "64px" }}
        >
          <div className={uiStyles.flex_container}>
            {true && (
              <span
                className={styles.nav_links}
                style={{ marginRight: "48px" }}
              >
                0
              </span>
            )}
          </div>
        </div>
      </Header>

      <Layout
        style={{
          marginLeft: collapsed ? "80px" : "150px",
          transition: "all 0.5s",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onMouseEnter={() => (collapsed ? setCollapsed(false) : null)}
          onMouseLeave={() => (!collapsed ? setCollapsed(true) : null)}
          width={150}
          style={{
            backgroundColor: "#fff",
            overflow: "auto",
            height: "calc(100vh - 64px)",
            position: "fixed",
            left: 0,
            top: "64px",
            boxShadow: "6px 0 6px -2px rgba(0, 0, 0, 0.06)",
            transition: "all .5s",
            // borderRight: "1px solid red",
          }}
        >
          <div className={styles.logo_container}>
            <Image
              src="/assets/productLogos/simplaiLogo.svg"
              width={42}
              height={42}
              style={{
                // height: "32px",
                margin: "18px 10px 6px",
              }}
              alt="logo"
            />

            {/* <Text style={{ overflow: "hidden", textWrap: "nowrap" }}>
              Simplai
            </Text> */}
          </div>
          <Divider style={{ margin: "12px 0" }} />
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
