import { UnknownObject } from '@/utils/types';
import { Modal } from 'antd'
import React from 'react'

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
        onCancel={()=>{
            setIsOpen(false)
        }}
        >
            kjsdncksjdnc
        </Modal>
    // </ModalContainer>
  )
}

export default IntegrateModal
