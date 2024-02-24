"use client";

import WorkflowIntegrationData from "@/components/WorkflowIntegrationData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useParams, useRouter } from "next/navigation";
import uiStyles from "../../../../../components/UIComponents/ui.module.scss";
import { WorkflowIntegrationContainer } from "./style";

const WorkflowIntegration = ({ params }: any) => {
  const { workflowId } = useParams();
  const router = useRouter();
  return (
    <WorkflowIntegrationContainer>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <WorkflowIntegrationData workflowId={workflowId} />
    </WorkflowIntegrationContainer>
  );
};

export default WorkflowIntegration;
