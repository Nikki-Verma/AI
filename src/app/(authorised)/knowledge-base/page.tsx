"use client"

import { Col, Progress, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { ModelContainer, SubHeading } from './style';
import { useAppStore } from '@/store';
import EmptyUpload from '@/components/EmptyUpload';

const { Title } = Typography;

const KnowledgeBase = () => {
  const { userConfig, updatePageConfig } = useAppStore();

  useEffect(() => {
      updatePageConfig({
        pageTitle: "Knowledge base",
        pageDescription: "Models are your AI powered automations & skills",
      });
    }, []);
  return (
    <ModelContainer>
        <Row
        gutter={[0,20]}
        style={{ display: "flex", justifyContent: "space-between", marginBottom : '24px'}}
        >
        <Col
            span={14}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
            <Title>Knowledge base</Title>
            <SubHeading>
            The knowledge base serves as a repository of structured or unstructured information that an AI system can access to enhance its understanding and generate informed responses.
            </SubHeading>
        </Col>
        <Col span={24}>
          <Progress percent={30} />
          <div style={{display : 'flex',width : '100%',justifyContent : 'space-between',alignItems : 'center'}}>
            <span style={{color : '#727272',fontSize : '14px',fontWeight: '500',lineHeight : '24px'}}>
            File upload limit
            </span>
            <div style={{display : 'flex',gap : '11px'}}>
              <span style={{color : '#727272',fontSize : '14px',fontWeight: '500',lineHeight : '24px'}}>
              10 kb / 50 GB
              </span>
              <a style={{textDecoration : 'underline',color : '#602EDF',fontSize : '14px',fontWeight : '700',lineHeight : '24px',cursor : 'pointer'}}>
              Upgrade space
              </a>
            </div>
          </div>
        </Col>
        </Row>
        <EmptyUpload
        buttonText = 'Import from Dataset'
        message = 'It seems like you have not created a knowledge base yet.'
        onClick = {()=>{console.log(`button Clicked`)}}

        />
    </ModelContainer>
  )
}

export default KnowledgeBase
