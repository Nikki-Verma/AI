import React from 'react'
import { Heading, UploadCardContainer, UploadDetail } from './style';

const UploadCard = (props: any) => {
  return (
    <UploadCardContainer onClick = {props?.onClick}>
      {props?.imageUrl &&
      <img
      src={props?.imageUrl}
      style={{width : '68px',height : '68px'}}
      />
      }
      <Heading>
      {props?.heading}
      </Heading>
      <UploadDetail>
      {props?.details}
      </UploadDetail>      
    </UploadCardContainer>
  )
}

export default UploadCard;
