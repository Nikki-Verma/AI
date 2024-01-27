"use client";

import { useAppStore } from "@/store";
import { HeartFilled, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Input, Row, Select, Tag, Typography } from "antd";
import { useEffect } from "react";
import {
  Heading,
  ModalTags,
  ModelCard,
  ModelCardContainer,
  ModelCardDetail,
  ModelCardHeading,
  ModelContainer,
  ModelHeaderContainer,
  SubHeading,
} from "./style";

const { Title } = Typography;

const Models = () => {
  const { updatePageConfig } = useAppStore();
  useEffect(() => {
    updatePageConfig({
      pageTitle: "Models",
      pageDescription: " Models Description",
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
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
        <Col span={8}>
          <ModelCardContainer>
            <ModelCard>
              <ModelHeaderContainer>
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                  style={{ height: "28px", width: "28px" }}
                  alt="Model-img"
                />

                <>
                  {true ? (
                    <HeartOutlined
                      style={{ color: "#5B5B5B", fontSize: "16px" }}
                    />
                  ) : (
                    <HeartFilled style={{ color: "red", fontSize: "16px" }} />
                  )}
                </>
              </ModelHeaderContainer>
              <ModelCardHeading>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
              </ModelCardHeading>
              <ModelCardDetail>
                The TinyLlama project aims to pretrain a 1.1B Llama model on 3
                trillion tokens. With some proper optimization, we can achieve
                this within a span of "just" 90 days using
              </ModelCardDetail>
            </ModelCard>
            <ModalTags>
              <Tag>Text Generation</Tag>
              <Tag>2.78B params</Tag>
              <Tag>12.3M Run</Tag>
            </ModalTags>
          </ModelCardContainer>
        </Col>
      </Row>
    </ModelContainer>
  );
};

export default Models;
