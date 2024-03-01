"use client";

import KnowledgeBaseList from "@/components/KnowledgeBase/KnowledgeBaseList";
import PageHeading from "@/components/PageHeading";
import { PageContainer } from "@/components/UIComponents/UIComponents.style";
import { useAppStore } from "@/store";
import { Row, Typography } from "antd";
import { useEffect } from "react";

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
    <PageContainer>
      <Row
        gutter={[0, 20]}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <PageHeading
          title="Knowledge base"
          subHeading="The knowledge base serves as a repository of structured or
            unstructured information that an AI system can access to enhance its
            understanding and generate informed responses."
        />
      </Row>
      <KnowledgeBaseList />
    </PageContainer>
  );
};

export default KnowledgeBase;
