"use client";

import DatasetList from "@/components/Dataset/DatasetList";
import { useAppStore } from "@/store";
import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { ModelContainer, SubHeading } from "./style";

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
    <ModelContainer>
      <Row
        gutter={[0, 20]}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col
          span={14}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Title>Datasets</Title>
          <SubHeading>
            Explore, analyze, and share quality data. you can select your data
            collection while training your ai model, multi data collection can
            be added in one AI model
          </SubHeading>
        </Col>
      </Row>
      <DatasetList />
    </ModelContainer>
  );
};

export default datset;
