"use client";

import KnowledgeBaseList from "@/components/KnowledgeBase/KnowledgeBaseList";
import PageHeading from "@/components/PageHeading";
import { useAppStore } from "@/store";
import { Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { ModelContainer } from "./style";

const { Title } = Typography;

const KnowledgeBase = () => {
  const { updatePageConfig } = useAppStore();

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Knowledge base",
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
        <Col span={14}>
          <PageHeading
            title="Knowledge base"
            subHeading="The knowledge base serves as a repository of structured or
            unstructured information that an AI system can access to enhance its
            understanding and generate informed responses."
          />
        </Col>
      </Row>
      <KnowledgeBaseList />
    </ModelContainer>
  );
};

export default KnowledgeBase;
