"use client";

import KnowledgeBaseDetails from "@/components/KnowledgeBase/KnowledgeBaseDetails";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import uiStyles from "../../../../components/UIComponents/ui.module.scss";
import { KnowledgebaseDetailsContainer } from "./style";

const DatasetDetailsPage = ({ params }: any) => {
  return (
    <KnowledgebaseDetailsContainer>
      <Col span={24}>
        <Link prefetch href={"/knowledge-base"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <KnowledgeBaseDetails />
    </KnowledgebaseDetailsContainer>
  );
};

export default DatasetDetailsPage;
