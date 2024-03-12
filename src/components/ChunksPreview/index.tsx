import {
  Button,
  Card,
  Col,
  Flex,
  Modal,
  Result,
  Row,
  Skeleton,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useState } from "react";
import MarkdownComponent from "../Markdown";
import { ChunkCount, ChunkPreview, ChunkPreviewContainer } from "./style";
import Image from "next/image";
import { FileNameWithoutTimestamp } from "@/utils/helperFunction";
import {DatabaseFilled} from "@ant-design/icons";

const { Paragraph, Text } = Typography;

type ChunkPreviewProps = {
  chunks: string[];
  loading?: boolean;
  chunkFileName?: string;
};

const ChunksPreview = ({ chunks, loading = false, chunkFileName }: ChunkPreviewProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState("");

  return (
    <ChunkPreviewContainer>
      {loading ? (
        Array.from({ length: 2 }).map((_, i) => (
          <Card size="small" key={i}>
            <Skeleton
              loading
              active
              avatar
              round
              paragraph={{ rows: 2 }}
            ></Skeleton>
          </Card>
        ))
      ) : chunks?.length > 0 ? (
        chunks?.map((chunk: string) => (
          <>
            <ChunkPreview
              key={chunk}
              onClick={() => {
                setIsModalOpen(true);
                setSelectedChunk(chunk);
              }}
            >
              <Paragraph ellipsis={{ rows: 2 }}>{chunk}</Paragraph>
              <Flex justify="space-between" align="center">
                {chunkFileName &&
                  <div style={{alignItems : 'flex-start',lineHeight : 'normal'}}>
                  <Image
                    src="/assets/Images/pdfImage.png"
                    alt="pdf"
                    width={16}
                    height={16}
                    style={{marginRight : '4px'}}
                  />
                  <Tooltip title = {FileNameWithoutTimestamp(chunkFileName)} placement="topLeft">
                  <Text ellipsis style={{ width: "250px" }}>
                    {FileNameWithoutTimestamp(chunkFileName)}
                  </Text>
                  </Tooltip>
                </div>
                }
                <ChunkCount
                  disabled
                >{`${chunk?.length} characters`}</ChunkCount>
              </Flex>
            </ChunkPreview>
          </>
        ))
      ) : (
        <Row justify="center">
          <Col>
            <Result
              icon={null}
              title="No Chunks Available"
              subTitle="Generate chunks to be displayed here"
            />
          </Col>
        </Row>
      )}
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
    </ChunkPreviewContainer>
  );
};

export default ChunksPreview;
