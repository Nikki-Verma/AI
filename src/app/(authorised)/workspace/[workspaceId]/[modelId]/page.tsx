"use client";

import WorkspaceModelData from "@/components/Workspace/WorkspaceModelData";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import uiStyles from "../../../../../components/UIComponents/ui.module.scss";
import { Container } from "./style";

const ModelDetails = ({ params }: any) => {
  return (
    <Container>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <Link prefetch href={"/workspace"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <WorkspaceModelData />
    </Container>
  );
};

export default ModelDetails;
