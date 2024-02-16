"use client";

import { useAppStore } from "@/store";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Space, Typography } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
const TopbarCustomHeading = dynamic(() => import("./TopbarCustomHeading"), {
  ssr: false,
});

const { Title, Text } = Typography;
const { Header, Sider, Content } = Layout;

const Topbar = () => {
  const { resetHeaderTitle, headerTitle } = useAppStore();
  const router = useRouter();

  useLayoutEffect(() => {
    return () => {
      resetHeaderTitle();
    };
  }, []);

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
      <Row justify="space-between">
        <Col>
          <Button type="text" onClick={router.back}>
            <Space>
              <ArrowLeftOutlined />
              Back
            </Space>
          </Button>
        </Col>
        <Col style={{ marginRight: "85px" }}>
          <TopbarCustomHeading />
        </Col>
        <Col></Col>
      </Row>
    </Header>
  );
};

export default Topbar;
