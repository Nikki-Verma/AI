"use client";

import uiStyles from "@/components/UIComponents/ui.module.scss";
import WorkflowData from "@/components/WorkflowData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { WorkflowDetailsContainer } from "./style";

const WorkflowDetails = ({ params }: any) => {
  const { workflowId } = useParams();
  return (
    <WorkflowDetailsContainer>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <Link prefetch href={"/workflow"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <WorkflowData workflowId={workflowId} />
    </WorkflowDetailsContainer>
  );
};

export default WorkflowDetails;
