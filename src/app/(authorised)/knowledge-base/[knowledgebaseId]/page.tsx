"use client";

import KnowledgeBaseDetails from "@/components/KnowledgeBase/KnowledgeBaseDetails";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useRouter } from "next/navigation";
import uiStyles from "../../../../components/UIComponents/ui.module.scss";
import { KnowledgebaseDetailsContainer } from "./style";

const DatasetDetailsPage = ({ params }: any) => {
  const router = useRouter();
  return (
    <KnowledgebaseDetailsContainer>
      <Col span={24}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <KnowledgeBaseDetails />
    </KnowledgebaseDetailsContainer>
  );
};

export default DatasetDetailsPage;
