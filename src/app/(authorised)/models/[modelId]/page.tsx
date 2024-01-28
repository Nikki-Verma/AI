"use client"

import React from 'react'
import { Container } from './style'
import {Col } from 'antd'
import uiStyles from "../../../../components/UIComponents/ui.module.scss";
import { ArrowLeftOutlined} from '@ant-design/icons';
import Link from 'next/link';
import ModelData from '@/components/ModelData';

const ModelDetails = ({params} : any) => {

  return (
    <Container>
        <Col span={24} style={{marginBottom : '24px'}}>
            <Link href={'/models'}>
            <div 
            className={uiStyles.back_button_container}             >
                <ArrowLeftOutlined />
            </div>
            </Link>
        </Col>
        <ModelData page = "models"/>
    </Container>
  )
}

export default ModelDetails
