"use client"
 import React, { useState } from 'react'
import { Container, ModalContainer, ModalDescription, ModalTitle, SubmitButton } from './style'
import { UnknownObject } from '@/utils/types';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { connectClosedModel, deployModelApi } from '@/api/workspace';
import { useNotify } from '@/providers/notificationProvider';
import { getErrorFromApi } from '@/utils/helperFunction';

type ConnectModalParams = {
    isVisible: boolean;
    setIsVisible : (prop : boolean)=>void;
    modelData?: UnknownObject | undefined | null;
    refetch:()=>void;
  };
 
 const ConnectModal = (props : ConnectModalParams) => {

    const [connectModelLoading,setConnectModelLoading] = useState<boolean>(false)
    const { notification } = useNotify();

    const [form] = Form.useForm()

    const handleConnectModel = async(value : UnknownObject) => {
        try {
            setConnectModelLoading(true);
            const payload = {
                "access_token": value?.ApiKey,
                "model_id": props?.modelData?.result?.user_model_id,
                "model_name": props?.modelData?.result?.name,
                "model_version": props?.modelData?.result?.version,
                "is_active": true,
                'model_provider' : props?.modelData?.result?.model_provider
            }
      
            const connectResponse: any = await connectClosedModel({
              payload,
            });      
            if (connectResponse?.status == 200) {
                const payload = {
                    model_id: props?.modelData?.result?.id,
                    user_model_id: props?.modelData?.result?.user_model_id,
                  };
                    try{
                        const deploymentResponse = await deployModelApi({ payload });
                        if(deploymentResponse?.status == 200){
                            props?.refetch();
                            notification.success({
                                message: "Model connected successfully",
                            });
                            setConnectModelLoading(false);
                            props?.setIsVisible(false)
                        }
                    }catch (error) {
                        notification.error({
                          message: "Error while connecting model.",
                          description: getErrorFromApi(error),
                        });
                        setConnectModelLoading(false);
                    }
            }
          } catch (error) {
            notification.error({
              message: "Error while connecting model.",
              description: getErrorFromApi(error),
            });
            setConnectModelLoading(false);
          }
    }

    return (
        <Container>
            <Modal
            open = {props?.isVisible}
            title = {<ModalTitle>Enter Open API key</ModalTitle>}
            width={700}
            onCancel={()=>{
                props?.setIsVisible(false)
            }}
            footer = {null}
            destroyOnClose = {true}
            >
                <ModalContainer>
                <Form layout='vertical' form={form} onFinish={handleConnectModel}>
                <Row gutter={[12,40]}>
                <ModalDescription>
                The OpenAI API key is a unique alphanumeric code provided to users by OpenAI, granting access to their powerful language models and artificial intelligence services.
                </ModalDescription>
                <Col span={18}>
                <Form.Item
                label = "Enter API key"
                name='ApiKey'
                >
                    <Input placeholder='Enter chatbot name' />
                </Form.Item>
                </Col>
                <Col span={6}>
                    <SubmitButton 
                    type='primary'
                    htmlType='submit'
                    loading = {connectModelLoading}
                    >
                        Connect
                    </SubmitButton>
                </Col>
                </Row>
                </Form>
                </ModalContainer>
            </Modal>
        </Container>
    )
 }
 
 export default ConnectModal
 