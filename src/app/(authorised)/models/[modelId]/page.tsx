"use client";

import ModelData from "@/components/ModelData";
import { ModelPage } from "@/components/ModelData/constant";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import uiStyles from "../../../../components/UIComponents/ui.module.scss";
import { Container } from "./style";

const ModelDetails = ({ params }: any) => {
  const { modelId } = useParams();
  return (
    <Container>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <Link prefetch href={"/models"}>
          <div className={uiStyles.back_button_container}>
            <ArrowLeftOutlined />
          </div>
        </Link>
      </Col>
      <ModelData page={ModelPage.MODELS} modelId={modelId} />
    </Container>
  );
};

export default ModelDetails;
