"use client";

import ModelData from "@/components/ModelData";
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
      <ModelData page="workspace" />
    </Container>
  );
};

export default ModelDetails;
