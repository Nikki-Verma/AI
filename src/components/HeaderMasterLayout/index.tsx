import { Layout } from "antd";
import React from "react";
import styles from "./HeaderMasterLayout.module.scss";
import Topbar from "./Topbar";

const { Content } = Layout;

const HeaderMasterLayout = ({ children }: { children: React.ReactNode }) => {
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
