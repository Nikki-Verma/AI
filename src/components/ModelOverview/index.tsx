import { Col, Descriptions, Row, Space } from "antd";
import { DescriptionsProps } from "antd/es/descriptions";
import ModelPointIcon from "../Icons/ModelPointIcon";
import MarkdownComponent from "../Markdown";

import {
  Container,
  ModelDetailsDescriptionLabel,
  ModelDetailsDescriptionValue,
  ModelDetailTitle,
} from "./style";
const ModelOverView = ({ markdown, modelDetails }: any) => {
  console.log("🚀 ~ ModelOverView ~ modelDetails:", modelDetails);
  const ModelInformationItems: DescriptionsProps["items"] = [
    {
      key: "model_type",
      label: (
        <ModelDetailsDescriptionLabel>Model Type</ModelDetailsDescriptionLabel>
      ),
      children: (
        <ModelDetailsDescriptionValue>
          {modelDetails?.type || "--"}
        </ModelDetailsDescriptionValue>
      ),
    },
    {
      key: "model_architecture",
      label: (
        <ModelDetailsDescriptionLabel>
          Model architecture
        </ModelDetailsDescriptionLabel>
      ),
      children: (
        <ModelDetailsDescriptionValue>
          {modelDetails?.architecture || "--"}
        </ModelDetailsDescriptionValue>
      ),
    },
    {
      key: "censorship",
      label: (
        <ModelDetailsDescriptionLabel>Censorship</ModelDetailsDescriptionLabel>
      ),
      children: (
        <ModelDetailsDescriptionValue>
          {modelDetails?.censorship || "--"}
        </ModelDetailsDescriptionValue>
      ),
    },
  ];

  const ModelRequirementItems: DescriptionsProps["items"] = [
    {
      key: "cpu",
      label: (
        <ModelDetailsDescriptionLabel>
          CPU Required
        </ModelDetailsDescriptionLabel>
      ),
      children: (
        <ModelDetailsDescriptionValue>
          {modelDetails?.cpu_required ? "Yes" : "No"}
        </ModelDetailsDescriptionValue>
      ),
    },
    {
      key: "ram",
      label: (
        <ModelDetailsDescriptionLabel>
          RAM Required
        </ModelDetailsDescriptionLabel>
      ),
      children: (
        <ModelDetailsDescriptionValue>
          {modelDetails?.ram_required ? "Yes" : "No"}
        </ModelDetailsDescriptionValue>
      ),
    },
  ];

  return (
    <Container>
      <Row gutter={[12, 0]}>
        <Col
          span={24}
          style={{
            borderBottom: "2px solid #ECF1F9",
            padding: "20px",
            overflow: "hidden",
          }}
        >
          <Row justify="start" align="top">
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <Space align="start">
                <ModelPointIcon />
                <ModelDetailTitle>Model Information</ModelDetailTitle>
              </Space>

              <Descriptions
                items={ModelInformationItems}
                column={1}
                size="small"
              />
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <Space align="start">
                <ModelPointIcon />
                <ModelDetailTitle>Model Requirement</ModelDetailTitle>
              </Space>
              <Descriptions
                items={ModelRequirementItems}
                column={1}
                size="small"
              />
            </Col>
          </Row>
        </Col>
        <Col span={24} style={{ padding: "10px", overflow: "hidden" }}>
          {markdown && <MarkdownComponent markdown={markdown} />}
        </Col>
      </Row>
    </Container>
  );
};

export default ModelOverView;
