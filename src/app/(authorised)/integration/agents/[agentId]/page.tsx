"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useParams, useRouter } from "next/navigation";
import uiStyles from "../../../../../components/UIComponents/ui.module.scss";
import { AgentIntegrationContainer } from "./style";
import AgentIntegrationData from "@/components/AgentIntegrationData";

const AgentIntegration = ({ params }: any) => {
  const { agentId } = useParams();
  const router = useRouter();
  return (
    <AgentIntegrationContainer>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <AgentIntegrationData agentId={agentId} />
    </AgentIntegrationContainer>
  );
};

export default AgentIntegration;
