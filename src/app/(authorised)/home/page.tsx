"use client";

import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import {  CardDescription, CardHeader, CardHeading, HomeContainer, HomeNavigateCards } from "./style";
import PageHeading from "@/components/PageHeading";
import { useSession } from "next-auth/react";
import { Col, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

function HomePage() {
  const { data: session } : any = useSession();
  const { updatePageConfig } = useAppStore();

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Home",
      pageDescription: " Home description",
    });
  }, []);

  return (
    <HomeContainer>
      <PageHeading
      title = {`Hi, ${session?.user?.details?.name ?? 'User'}`}
      subHeading = 'Start experimenting with our platform'
      />
      <Row gutter={[20,16]} style={{display : 'flex',width : '100%',marginTop : '24px'}}>
        <Col span={12}>
          <Link prefetch href={'/models?page=0&size=20&type=OPEN'}>
            <HomeNavigateCards>
              <CardHeader>
                <CardHeading>
                  Discover open source models
                </CardHeading>
                <ArrowRightOutlined style={{color : "#d5d5d5"}} />
              </CardHeader>
              <CardDescription>
  sdkjcnksdjcbskjdcn  skdcbskjdbc sdjkhcgsbjdhc  sdckjbsdckjsbdc
              </CardDescription>
            </HomeNavigateCards>
          </Link>
        </Col>
        <Col span={12}>
          <Link prefetch href={'/models?page=0&size=20&type=CLOSED'}>
            <HomeNavigateCards>
            <CardHeader>
              <CardHeading>
              Connect closed source models
              </CardHeading>
              <ArrowRightOutlined style={{color : "#d5d5d5"}} />
            </CardHeader>
            </HomeNavigateCards>
          </Link>
        </Col>
        <Col span={12}>
          <Link prefetch href={'/knowledge-base'}>
            <HomeNavigateCards>
            <CardHeader>
              <CardHeading>
                Create a knowledge base
              </CardHeading>
              <ArrowRightOutlined style={{color : "#d5d5d5"}} />
            </CardHeader>
            </HomeNavigateCards>
          </Link>
        </Col>
        <Col span={12}>
          <Link prefetch href={'/workflow'}>
            <HomeNavigateCards>
            <CardHeader>
              <CardHeading>
                Create a workflow
              </CardHeading>
              <ArrowRightOutlined style={{color : "#d5d5d5"}} />
            </CardHeader>
            </HomeNavigateCards>
          </Link>
        </Col>
      </Row>
    </HomeContainer>
  );
}

export default HomePage;
