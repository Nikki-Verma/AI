"use client";

import HomePageHeading from "@/components/HomePageHeading";
import PipelineIcon from "@/components/Icons/AgentPipelineIcon";
import KnowledgeBaseIcon from "@/components/Icons/KnowledgeBaseIcon";
import ModelsIcon from "@/components/Icons/ModelsIcon";
import { useAppStore } from "@/store";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import {
  CardDescription,
  CardHeader,
  CardHeading,
  HomeContainer,
  HomeNavigateCards,
  ModelDetails,
} from "./style";

type Props = {
  params: {
    id: string;
  };
};

function HomePage() {
  const { data: session }: any = useSession();
  const { updatePageConfig } = useAppStore();

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Home",
      pageDescription: " Home description",
    });
  }, []);

  return (
    <HomeContainer>
      <HomePageHeading
        title={`Hi, ${session?.user?.details?.name ?? "User"}`}
        subHeading="Start experimenting with our platform"
      />
      <Row
        gutter={[20, 16]}
        style={{
          display: "flex",
          width: "100%",
          marginTop: "24px",
          alignContent: "stretch  ",
        }}
      >
        <Col span={12}>
          <Link prefetch href={"/models?page=0&size=20&type=OPEN"}>
            <HomeNavigateCards hoverable>
              <ModelsIcon />
              <ModelDetails>
                <CardHeader>
                  <CardHeading>Discover Open Source AI</CardHeading>
                  <ArrowRightOutlined style={{ color: "#d5d5d5" }} />
                </CardHeader>
                <CardDescription>
                  Find the ideal open source model and deploy it to start using
                  it in your applications.
                </CardDescription>
              </ModelDetails>
            </HomeNavigateCards>
          </Link>
        </Col>
        <Col span={12}>
          <Link prefetch href={"/models?page=0&size=20&type=CLOSED"}>
            <HomeNavigateCards hoverable>
              <ModelsIcon />
              <ModelDetails>
                <CardHeader>
                  <CardHeading>Use Proprietary AI Services</CardHeading>
                  <ArrowRightOutlined style={{ color: "#d5d5d5" }} />
                </CardHeader>
                <CardDescription>
                  Access models from OpenAI, Cohere, Google by entering your API
                  key for seamless application integration.
                </CardDescription>
              </ModelDetails>
            </HomeNavigateCards>
          </Link>
        </Col>
        <Col span={12}>
          <Link prefetch href={"/knowledge-base"}>
            <HomeNavigateCards hoverable>
              <KnowledgeBaseIcon />
              <ModelDetails>
                <CardHeader>
                  <CardHeading>Craft Your AI Knowledge Base</CardHeading>
                  <ArrowRightOutlined style={{ color: "#d5d5d5" }} />
                </CardHeader>
                <CardDescription>
                  Transform text into vectors for RAG-enhanced applications, by
                  uploading your data or connecting platforms like Confluence.
                </CardDescription>
              </ModelDetails>
            </HomeNavigateCards>
          </Link>
        </Col>
        <Col span={12}>
          <Link prefetch href={"/workflow"}>
            <HomeNavigateCards hoverable>
              <PipelineIcon />
              <ModelDetails>
                <CardHeader>
                  <CardHeading>Design Intelligent Workflows</CardHeading>
                  <ArrowRightOutlined style={{ color: "#d5d5d5" }} />
                </CardHeader>
                <CardDescription>
                  Link models and knowledge bases, fine-tune with
                  hyperparameters, and set preambles for targeted outputs.
                </CardDescription>
              </ModelDetails>
            </HomeNavigateCards>
          </Link>
        </Col>
      </Row>
    </HomeContainer>
  );
}

export default HomePage;
