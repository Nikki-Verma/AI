import React from 'react'
import { EmptyMessage, EmptyUploadContainer } from './style'
import Image from 'next/image'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const EmptyUpload = (props : any) => {
  return (
    <EmptyUploadContainer>
        <Image
        src={
            process.env.NEXT_PUBLIC_BASE_URL +
            "/assets/Images/emptyBox.svg"
          }
        height={120}
        width={120}
        alt='empty-box'
        />
        <EmptyMessage>
        {props?.message}
        </EmptyMessage>

        <Button
        onClick={()=>props?.onClick()}
        icon = {<PlusOutlined />}
        >
            {props?.buttonText}
        </Button>
      
    </EmptyUploadContainer>
  )
}

export default EmptyUpload
