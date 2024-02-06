"use client";

import { Button, Col, Input, message, Row, Select } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";
import UploadCard from "../UploadCard";
import {
  Container,
  Detail,
  FooterContainer,
  Heading,
  Label,
  UploadSubTextContainer,
  UploadTextContainer,
} from "./style";

const UploadTrainingData = () => {
  const [uploadType, setUploadType] = useState<any>("");

  const props = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info: any) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {},
  };
  return (
    <Container>
      {uploadType ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px",
            }}
          >
            <Heading>Upload training data for model training</Heading>
            <Detail>
              We'll create a data table that can be added to any tool or agent.
              Knowledge is used to provide context to the large language model.
            </Detail>
            <Row
              gutter={[12, 12]}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Col span={11}>
                <Label>
                  Collection name ( a new collection will be created)Collection
                  name ( a new collection will be created)
                </Label>
                <Input placeholder="Enter collection name" />
              </Col>
              <Col
                span={2}
                style={{ display: "flex", justifyContent: "center" }}
              >
                Or
              </Col>
              <Col span={11}>
                <Label>Select existing collection</Label>
                <Select placeholder="Enter collection name" />
              </Col>
              <Col span={24}>
                <Label>Selected model</Label>
                <Select placeholder="Enter collection name" />
              </Col>
              <Col span={24}>
                <Label>Upload your file</Label>
                <Dragger {...props}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        "/assets/Images/uploadImg.svg"
                      }
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <UploadTextContainer>
                        Drop and Drag your files here or Browse (uplaod only
                        .text or .pdf format)
                      </UploadTextContainer>
                      <UploadSubTextContainer>
                        Supported formats: .text & .pdf
                      </UploadSubTextContainer>
                    </div>
                  </div>
                </Dragger>
              </Col>
            </Row>
          </div>
          <FooterContainer>
            <Button
              onClick={() => {
                setUploadType("");
              }}
            >
              back
            </Button>
            <Button type="primary">Start training</Button>
          </FooterContainer>
        </>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", padding: "24px" }}
        >
          <Heading>Upload training data for model training</Heading>
          <Detail>
            We'll create a data table that can be added to any tool or agent.
            Knowledge is used to provide context to the large language model.
          </Detail>
          <Row gutter={[18, 24]} style={{ display: "flex" }}>
            <Col span={8}>
              <UploadCard
                imageUrl={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/assets/Images/fileUpload.svg"
                }
                heading={"New file upload"}
                details={"Upload any amount of PDF , TXT formats."}
                onClick={() => {
                  setUploadType("newfile");
                }}
              ></UploadCard>
            </Col>
            <Col span={8}>
              <UploadCard
                imageUrl={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/assets/Images/existingData.svg"
                }
                heading={"Existing Data"}
                details={"Upload any amount of PDF , TXT formats."}
              ></UploadCard>
            </Col>
            <Col span={8}>
              <UploadCard
                imageUrl={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/assets/Images/directLink.svg"
                }
                heading={"Direct link"}
                details={
                  "Fetch data from direct link like, remote url, github, google cloud storage"
                }
              ></UploadCard>
            </Col>
            <Col span={8}>
              <UploadCard
                imageUrl={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/assets/Images/externalResoource.svg"
                }
                heading={"External sources"}
                details={
                  "Import data from external app like Slack, Notion, Asana, clickup, confluence.."
                }
              ></UploadCard>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default UploadTrainingData;
