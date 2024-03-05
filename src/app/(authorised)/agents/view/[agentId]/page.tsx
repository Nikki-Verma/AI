"use client";

import uiStyles from "@/components/UIComponents/ui.module.scss";
import WorkflowData from "@/components/WorkflowData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useParams, useRouter } from "next/navigation";
import { AgentDetailsContainer } from "./style";
import AgentData from "@/components/AgentData";

const AgentDetails = ({ params }: any) => {
  const { agentId } = useParams();
  const router = useRouter();
  return (
    <AgentDetailsContainer>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <AgentData agentId={agentId} />
    </AgentDetailsContainer>
  );
};

export default AgentDetails;