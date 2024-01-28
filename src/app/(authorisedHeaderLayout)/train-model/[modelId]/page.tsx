"use client"

import React, { useState } from 'react'
import { Container, StepDivContainer } from './style'
import { Button, Col, Row, Steps } from 'antd'
import UploadTrainingData from '@/components/UploadTraingingData'

const steps = [
    {
      title: 'Select data',
      content: <UploadTrainingData />,
    },
    {
      title: 'Training',
      content: 'Second-content',
    },
    {
      title: 'Completed',
      content: 'Last-content',
    },
  ]

const ModelTrain = () => {

    const [current, setCurrent] = useState(0)
  return (
    <Container>
        <Row gutter={[12,12]} style={{display : 'flex',width : '100%',justifyContent : 'center'}}>
            <Col 
                xl={18}
                lg={18}
                md={18}
                sm={24}
                xs={24}
                style={{display : 'flex',flexDirection : 'column',alignItems : 'center'}}
            >
                <Row gutter={[12,12]} style={{display : 'flex',width : '100%',justifyContent : 'center',marginBottom : '24px'}}>
                    <Col 
                        xl={14}
                        lg={16}
                        md={18}
                        sm={24}
                        xs={24}
                        style={{display : 'flex',flexDirection : 'column',alignItems : 'center'}}
                    >
                        <Steps 
                        size='small'
                        current={current}
                        items={[
                            {
                                title : 'Select data',
                                // status : 'finish'
                            },
                            {
                                title : 'Training',
                                // status : 'process'
                            },
                            {
                                title : 'Completed',
                                // status : 'process'
                            }
                        ]}
                        />
                    </Col>
                </Row>
                <StepDivContainer>
                    {steps[current].content}
                </StepDivContainer>
            </Col>
        </Row>      
    </Container>
  )
}

export default ModelTrain
