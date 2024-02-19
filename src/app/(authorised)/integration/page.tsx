"use client";

import IntegrationTabs from "@/components/IntegrationTabs";
import PageHeading from "@/components/PageHeading";
import { useAppStore } from "@/store";
import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { IntegrationContainer } from "./style";

const { Title } = Typography;

const datset = () => {
  const { updatePageConfig } = useAppStore();

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Datasets",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, [updatePageConfig]);

  return (
    <IntegrationContainer>
      <Row
        gutter={[0, 20]}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col span={14}>
          <PageHeading
            title="Integration"
            subHeading="Explore a vast array of meticulously trained and readily deployable machine learning models all conveniently centralized in a single location."
          />
        </Col>
      </Row>
      <IntegrationTabs />
    </IntegrationContainer>
  );
};

export default datset;
