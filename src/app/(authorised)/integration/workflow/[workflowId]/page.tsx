"use client";

import WorkflowIntegrationData from "@/components/WorkflowIntegrationData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import uiStyles from "../../../../../components/UIComponents/ui.module.scss";
import { WorkflowIntegrationContainer } from "./style";

const WorkflowIntegration = ({ params }: any) => {
  const { workflowId } = useParams();
  return (
    <WorkflowIntegrationContainer>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <Link prefetch href={"/integration"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <WorkflowIntegrationData workflowId={workflowId} />
    </WorkflowIntegrationContainer>
  );
};

export default WorkflowIntegration;
