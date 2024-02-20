"use client";

import ModelIntegrationData from "@/components/ModelIntegrationData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import uiStyles from "../../../../../components/UIComponents/ui.module.scss";
import { ModelIntegrationContainer } from "./style";

const ModelIntegration = ({ params }: any) => {
  const { modelId } = useParams();
  return (
    <ModelIntegrationContainer>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <Link prefetch href={"/integration"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <ModelIntegrationData modelId={modelId} />
    </ModelIntegrationContainer>
  );
};

export default ModelIntegration;
