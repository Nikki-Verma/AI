
import { Button, Col, Row, Tabs, Tag } from 'antd'
import { ModelAbout, ModelTitle } from './style'
import React from 'react'
import uiStyles from "../../components/UIComponents/ui.module.scss";
import { HeartOutlined, HeartFilled} from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import ModelOverView from '../ModelOverview';
import { useRouter } from 'next/navigation';

const ModelData = (props : any) => {

    const router = useRouter()

  return (
    <div>
        <Row style={{display : 'flex',justifyContent : 'space-between',marginBottom : '24px'}}>
        <Col span={props?.page === "models" ? 18 : 16} style={{display : 'flex',flexDirection : 'column', gap : '14px'}}>
            <div style={{display : 'flex',alignItems : 'center'}}>
                <img
                src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assets/Images/modelHeaderImage.svg"
                  }
                style={{display : 'flex',height : '32px',width : '32px',marginRight : '12px'}}
                />
                <ModelTitle>
                TinyLlama/TinyLlama-1.1B-Chat-v1.0
                </ModelTitle>
                <div className={uiStyles.like_button_container}>
                {true
                ?
                <HeartOutlined style={{color : '#5B5B5B', fontSize : '16px',cursor : 'pointer'}} />
                :
                <HeartFilled style={{color : 'red', fontSize : '16px',cursor : 'pointer'}}/>
                }

                <div style={{color : 'var(--Text-Color-850, #222)',fontSize : '14px',fontWeight : 500, lineHeight : '22pxs'}}>
                Like | 2.61ks
                </div>
                </div>
            </div>
            <ModelAbout>
            The TinyLlama project aims to pretrain a 1.1B Llama model on 3 trillion tokens. With some proper optimization, we can achieve this within a span of "just" 90 days using 
            </ModelAbout>
            <Row gutter={[0,10]}>
            <Tag>
                sdkhbcskdj
            </Tag>
            <Tag>
                sdkjnksjdnc
            </Tag>
            <Tag>
                jnkjndvkdfns
            </Tag>
            <Tag>
                sdkhbcskdj
            </Tag>
            <Tag>
                sdkhbcskdj
            </Tag>
            </Row>
        </Col>
        <Col span={props?.page === "models" ? 6 : 8} style={{display : 'flex', justifyContent : 'flex-end',gap : '20px'}}>
            {props?.page === "models" 
            ?
                <Button type='primary'>
                Add to workspace
                </Button>
            :
            <>
                <Button >
                Test
                </Button>
                <Button
                onClick={()=>router.push('/train-model/TinyLlama-1.1B-Chat-v1.0')}
                >
                Train
                </Button>
                <Button type='primary'>
                Deploy
                </Button>
            </>
            }
        </Col>
        </Row>
        <Tabs
        defaultActiveKey='files'
        >
            <TabPane
            tab = "Files and versions"
            key={'files'}
            >
                <ModelOverView
                />
            </TabPane>
            <TabPane
            tab = "Files and versions"
            key={'files1'}
            >

            </TabPane>
            <TabPane
            tab = "Run"
            key={'files2'}
            >

            </TabPane>
        </Tabs>
    </div>
  )
}

export default ModelData
