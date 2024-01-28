import React from 'react'
import { Tag } from "antd";
import { HeartOutlined, HeartFilled} from '@ant-design/icons';
import { ModelCardContainer, ModelHeaderContainer, ModelCardHeading, ModelCardDetail, ModelCard, ModalTags } from "./style";
import Link from 'next/link';

const CardModel = (props : any) => {
  return (
    <Link href={`${props?.goToBaseUrl}/TinyLlama-1.1B-Chat-v1.0`}>
    <ModelCardContainer>
        <ModelCard>
        <ModelHeaderContainer>
            <img 
            src={props?.imageUrl}
            style={{height : '28px',width : '28px'}}
            alt="Model-img" 
            />

            <>
            {false
            ?
            <HeartOutlined style={{color : '#5B5B5B', fontSize : '16px',cursor : 'pointer'}} />
            :
            <HeartFilled style={{color : 'red', fontSize : '16px',cursor : 'pointer'}}/>
            }
            </>
        </ModelHeaderContainer> 
        <ModelCardHeading>
        TinyLlama/TinyLlama-1.1B-Chat-v1.0 
        </ModelCardHeading>
        <ModelCardDetail>
        The TinyLlama project aims to pretrain a 1.1B Llama model on 3 trillion tokens. With some proper optimization, we can achieve this within a span of "just" 90 days using 
        The TinyLlama project aims to pretrain a 1.1B Llama model on 3 trillion tokens. With some proper optimization, we can achieve this within a span of "just" 90 days using 

        </ModelCardDetail>
        </ModelCard>
        <ModalTags>
            <Tag>
            Text Generation
            </Tag>
            <Tag>
            2.78B par
            </Tag>
            <Tag>
            12.3M Run
            </Tag>
            <Tag>
            12.3M Run
            </Tag>
            <Tag>
            12.3M Run
            </Tag>

        </ModalTags>

    </ModelCardContainer>
    </Link>
  )
}

export default CardModel
