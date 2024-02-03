"use client";

import { useAppStore } from "@/store";
import { HeartFilled, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Tag, Typography } from "antd";
import { Heading, ModelCardContainer, ModelHeaderContainer, ModelContainer, SubHeading, ModelCardHeading, ModelCardDetail, ModelCard, ModalTags } from "./style";
import CardModel from "@/components/CardModel";
import { useEffect } from "react";

const { Title } = Typography;

const Models = () => {
  const { updatePageConfig } = useAppStore();
  useEffect(() => {
    updatePageConfig({
      pageTitle: "Models",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, []);

  return (
    <ModelContainer>
      <Row
        gutter={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Col
          span={14}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Title>Models</Title>
          <SubHeading>
            Explore a vast array of meticulously trained and readily deployable
            machine learning models all conveniently centralized in a single
            location.
          </SubHeading>
        </Col>
        <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            src={
              process.env.NEXT_PUBLIC_BASE_URL +
              "/assets/Images/modelHeaderImage.svg"
            }
          />
        </Col>
      </Row>
      <Row gutter={[12, 12]} style={{ display: "flex", margin: "30px 0px" }}>
        <Col span={24}>
          <Input
            prefix={
              <SearchOutlined
                style={{
                  color: "#727272",
                  fontSize: "20px",
                  margin: "0px 12px",
                }}
              />
            }
            placeholder="Search models"
          />
        </Col>
        <Col>
          <Select placeholder="Model type" />
        </Col>
        <Col>
          <Select placeholder="Model size" />
        </Col>
        <Col>
          <Select placeholder="Dataset type" />
        </Col>
        <Col>
          <Select placeholder="Model type" />
        </Col>
        <Col>
          <Select placeholder="Dataset type" />
        </Col>
        <Col>
          <Select placeholder="Model type" />
        </Col>
      </Row>
      <Col span={24}>
        <Heading>Trending Models</Heading>
      </Col>
        <Row gutter={[28, 16]} style={{ display: "flex", margin: "16px 0px" }}>
            <Col span={8} style={{display : 'flex',flexDirection  : 'column'}}>
                <CardModel
                imageUrl = {
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                }
                modelData = {{}}
                goToBaseUrl = "/models"
                />
            </Col>

        </Row>
        </ModelContainer>
    )

}

export default Models
