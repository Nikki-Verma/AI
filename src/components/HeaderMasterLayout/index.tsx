import { useAppStore } from "@/store";
import { Layout } from "antd";
import React, { useEffect } from "react";
import styles from "./HeaderMasterLayout.module.scss";
import Topbar from "./Topbar";

const { Content } = Layout;

const HeaderMasterLayout = ({ children }: { children: React.ReactNode }) => {
  const { updatePageConfig } = useAppStore();

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Dashboard",
      pageDescription: " Dashboard description",
    });
  }, []);

  return (
    <Layout>
      <Topbar />
      <Content className={styles.content_x} style={{ marginTop: "64px" }}>
        {children}
      </Content>
    </Layout>
  );
};

export default HeaderMasterLayout;
