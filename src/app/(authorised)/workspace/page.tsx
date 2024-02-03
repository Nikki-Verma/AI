"use client";

import { Col, Input, Radio, Row, Select, Tag, Typography } from "antd";
import {SearchOutlined, HeartOutlined, HeartFilled} from '@ant-design/icons';
import { Heading, WorkspaceContainer, SubHeading } from "./style";
import CardModel from "@/components/CardModel";
import { useEffect } from "react";
import { useAppStore } from "@/store";


const {Title} = Typography

const Workspace = () => {
    const { userConfig, updatePageConfig } = useAppStore();

    useEffect(() => {
        updatePageConfig({
          pageTitle: "Workspace",
          pageDescription: "Models are your AI powered automations & skills",
        });
      }, []);

    return(
        <WorkspaceContainer>
            <Row gutter={12} style={{display : 'flex',justifyContent : 'space-between',marginBottom : '24px'}}>
                <Col span={14} style={{display : 'flex',flexDirection : 'column', gap : '12px'}}>
                    <Title>
                    Workspace
                    </Title>
                    <SubHeading>
                    Explore a vast array of meticulously trained and readily deployable machine learning models all conveniently centralized in a single location.
                    </SubHeading>
                </Col>
                <Col span={6} style={{display : 'flex',justifyContent : 'flex-end'}}>
                    <img
                    src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        "/assets/Images/modelHeaderImage.svg"
                      }
                      />
                </Col>
            </Row>
            <Col span={24}>
            <Radio.Group defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">Added Models</Radio.Button>
            <Radio.Button value="b">Trained Models</Radio.Button>
            <Radio.Button value="c">Deployed Models</Radio.Button>
            <Radio.Button value="d">Inactive models</Radio.Button>
            </Radio.Group>
            </Col>

            <Row gutter={[28,16]} style={{display : 'flex',margin : '24px 0px'}}>

                <Col span={8} style={{display : 'flex',flexDirection  : 'column'}}>
                    <CardModel
                    imageUrl = {
                        process.env.NEXT_PUBLIC_BASE_URL +
                        "/assets/Images/modelHeaderImage.svg"
                    }
                    modelData = {{}}
                    goToBaseUrl = "/workspace"
                    />
                </Col>

            </Row>
        </WorkspaceContainer>
    )

}

export default Workspace