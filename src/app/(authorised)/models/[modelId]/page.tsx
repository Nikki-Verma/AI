"use client";

import ModelData from "@/components/ModelData";
import { ModelPage } from "@/components/ModelData/constant";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Col } from "antd";
import { useParams, useRouter } from "next/navigation";
import uiStyles from "../../../../components/UIComponents/ui.module.scss";
import { Container } from "./style";

const ModelDetails = ({ params }: any) => {
  const { modelId } = useParams();
  const router = useRouter();
  return (
    <Container>
      <Col span={24} style={{ marginBottom: "24px" }}>
        <div
          className={uiStyles.back_button_container}
          onClick={() => router.back()}
        >
          <ArrowLeftOutlined />
        </div>
      </Col>
      <ModelData page={ModelPage.MODELS} modelId={modelId} />
    </Container>
  );
};

export default ModelDetails;
