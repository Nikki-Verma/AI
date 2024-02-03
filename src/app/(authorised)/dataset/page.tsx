"use client"

import { Col, Row, Typography } from 'antd'
import React from 'react'
import { ModelContainer, SubHeading } from './style';

const { Title } = Typography;

const datset = () => {
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
