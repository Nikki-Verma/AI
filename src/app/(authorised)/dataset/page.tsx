"use client"

import { Col, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { ModelContainer, SubHeading } from './style';
import { useAppStore } from '@/store';

const { Title } = Typography;

const datset = () => {
  const { userConfig, updatePageConfig } = useAppStore();

  useEffect(() => {
      updatePageConfig({
        pageTitle: "Datasets",
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
        </Row>
    </ModelContainer>
  )
}

export default datset
