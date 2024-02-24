"use client";

import ModelIntegrationData from "@/components/ModelIntegrationData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useParams, useRouter } from "next/navigation";
import uiStyles from "../../../../../../components/UIComponents/ui.module.scss";
import { ModelIntegrationContainer } from "./style";

const ModelIntegration = ({ params }: any) => {
  const { modelId, userModelId } = useParams();
  const router = useRouter();
  return (
    <ModelIntegrationContainer>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <ModelIntegrationData modelId={modelId} userModelId={userModelId} />
    </ModelIntegrationContainer>
  );
};

export default ModelIntegration;
