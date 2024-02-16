"use client";

import CreateChatbotModal from "@/components/CreateChatbot";
import {
  PageContainer,
  PageSubHeading,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Result, Row, Skeleton, Typography } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const { Title } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const AgentPipeline = () => {
  const { updatePageConfig } = useAppStore();

  const { data: session }: any = useSession();
  const [chatbotModalOpen, setChatbotModalOpen] = useState(false);
  const [createChatbotLoading, setCreateChatbotLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters({}));
  const { data, isLoading, isError, error } = useFetchData(
    config.workspace.models,
    { ...filters },
    {},
  );

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Workspace",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, []);

  const toggleChatbotHandler = () => {
    setChatbotModalOpen((prev: boolean) => !prev);
  };

  return (
    <PageContainer>
      <Row
        gutter={[12, 12]}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Col
          span={14}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Title>Tools/Chatbot/App/Pipeline</Title>
          <PageSubHeading>
            Explore a vast array of meticulously trained and readily deployable
            machine learning models all conveniently centralized in a single
            location.
          </PageSubHeading>
        </Col>
        <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Image
            src={"/assets/Images/modelHeaderImage.svg"}
            alt="workspace"
            width={140}
            height={96}
          />
        </Col>
      </Row>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col></Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleChatbotHandler}
            >
              Create Agent
            </Button>
          </Col>
        </Row>
      </Col>

      <Row gutter={[28, 16]} style={{ display: "flex", margin: "24px 0px" }}>
        {isLoading &&
          Array.from({ length: filters?.size }).map((_, i) => (
            <Col
              key={i}
              span={8}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Card key={i}>
                <Skeleton loading active avatar round></Skeleton>
              </Card>
            </Col>
          ))}
        {!(data?.result?.length > 0) && !isLoading && (
          <Col span={24}>
            <Result
              status={404}
              title="You do not have any Tools/Chatbot/App/Pipeline yet"
              subTitle="Start creating new Tools/Chatbot/App/Pipeline now to use models to it's full extent"
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={toggleChatbotHandler}
                >
                  Create Agent
                </Button>
              }
            />
          </Col>
        )}
        {/* {(data?.result || [])?.map(
          (
            model: { name: string; desc: "string"; [key: string]: any },
            index: number,
          ) => {
            return (
              <Col
                key={model?.name}
                span={8}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <CardModel
                  index={index}
                  key={model?.name}
                  imageUrl={"/assets/Images/dummyModel.png"}
                  modelData={{ ...model, id: model?.model_id }}
                  redirectUrl={`/workspace/${model?.id}/${model?.model_id}`}
                />
              </Col>
            );
          },
        )} */}
      </Row>

      <CreateChatbotModal
        open={chatbotModalOpen}
        onClose={toggleChatbotHandler}
        loading={createChatbotLoading}
        createChatbotHandler={() => {
          console.log("hello");
        }}
      />
    </PageContainer>
  );
};

export default AgentPipeline;
