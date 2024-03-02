import { UnknownObject } from '@/utils/types';
import { Button, Col, Modal, Row } from 'antd'
import React from 'react'
import { CancelButton, ModalDescription, SubmitButton } from './style';
import Link from 'next/link';

type IntegrateModalProps = {
    open : boolean;
    setIsOpen : (value : boolean)=>void;
    details : UnknownObject | undefined | null;
}

const IntegrateModal = ({open,setIsOpen,details} : IntegrateModalProps) => {
  return (
    // <ModalContainer>
        <Modal
        open = {open}
        title = 'Integrate your agent'
        onCancel={()=>{
            setIsOpen(false)
        }}
        width = {550}
        centered
        footer = {null}
        destroyOnClose = {true}
        >
            <ModalDescription>
            The OpenAI API key is a unique alphanumeric code provided to users by OpenAI, granting access to their powerful language models and artificial intelligence services.
            </ModalDescription>
            <Row gutter={[12,16]} style={{display : 'flex',justifyContent : 'space-evenly',marginTop : '30px'}}>
            <Col span={6}>
                <Link prefetch href={'/agents'} >
                <CancelButton
                type='default'
                >
                    Later
                </CancelButton>
                </Link>
            </Col>
            <Col span={6}>
                <Link prefetch href={`/integration/agents/${details?.result?.pipeline_id}`} >
                <SubmitButton
                type='primary'
                
                >
                    Connect
                </SubmitButton>
                </Link>
            </Col>
            </Row>
        </Modal>
    // </ModalContainer>
  )
}

export default IntegrateModal
