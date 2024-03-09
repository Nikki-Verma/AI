import { UnknownObject } from "@/utils/types";
import { Button, Col, Modal, Progress, Row, Space, Typography } from "antd";
import Image from "next/image";
import { useState } from "react";
import MarkdownComponent from "../Markdown";
import {
  ChunkContainer,
  ChunkData,
  ChunkMetadata,
  ChunkMetedataDivider,
} from "./style";
const { Paragraph, Text } = Typography;

type ChunkProps = {
  chunk: UnknownObject;
};

const Chunk = ({ chunk }: ChunkProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState("");
  return (
    <>
      <ChunkContainer
        key={chunk?.text}
        onClick={() => {
          setIsModalOpen(true);
          setSelectedChunk(chunk?.text);
        }}
      >
        <ChunkData>
          <Paragraph ellipsis={{ rows: 3, expandable: false, symbol: "..." }}>
            {chunk?.text ?? ""}
          </Paragraph>
        </ChunkData>
        <ChunkMetadata>
          <Row justify="space-between" gutter={[48, 48]}>
            <Col span={11}>
              <Space align="center">
                <Image
                  src="/assets/Images/pdfImage.png"
                  alt="pdf"
                  width={16}
                  height={16}
                />
                <Text ellipsis style={{ width: "250px" }}>
                  {chunk?.metadata?.file_name ?? ""}
                </Text>
              </Space>
            </Col>
            <ChunkMetedataDivider />
            <Col span={11}>
              <Progress
                percent={chunk?.similarity ? +chunk?.similarity * 100 : 0}
                format={(val) => (
                  <div>
                    {chunk?.similarity ? +chunk?.similarity?.toFixed(2) : 0}
                  </div>
                )}
              />
            </Col>
          </Row>
        </ChunkMetadata>
      </ChunkContainer>
      <Modal
        title="Chunk Preview"
        open={isModalOpen}
        onCancel={() => {
          setSelectedChunk("");
          setIsModalOpen(false);
        }}
        width="60%"
        styles={{
          body: {
            maxHeight: "600px",
            overflow: "auto",
          },
        }}
        footer={
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setSelectedChunk("");
                setIsModalOpen(false);
              }}
            >
              Done
            </Button>
          </Space>
        }
      >
        <MarkdownComponent markdown={selectedChunk} />
      </Modal>
    </>
  );
};

export default Chunk;
