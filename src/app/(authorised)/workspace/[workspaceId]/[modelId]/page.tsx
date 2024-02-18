"use client";

import ModelData from "@/components/ModelData";
import { ModelPage } from "@/components/ModelData/constant";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import uiStyles from "../../../../../components/UIComponents/ui.module.scss";
import { Container } from "./style";

const ModelDetails = ({ params }: any) => {
  const { modelId, workspaceId } = useParams();
  return (
    <Container>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <Link prefetch href={"/workspace"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <ModelData
        page={ModelPage.WORKSPACE}
        modelId={modelId}
        workspaceId={workspaceId}
      />
    </Container>
  );
};

export default ModelDetails;
