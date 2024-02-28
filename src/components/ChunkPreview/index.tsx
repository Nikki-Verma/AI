import {
  Button,
  Card,
  Col,
  Modal,
  Result,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import MarkdownComponent from "../Markdown";
import { ChunkPreviewContainer } from "./style";

const { Paragraph } = Typography;

type ChunkPreviewProps = {
  chunks: string[];
  loading?: boolean;
};

const ChunkPreview = ({ chunks, loading = false }: ChunkPreviewProps) => {
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
            <Card
              size="small"
              key={chunk}
              hoverable
              onClick={() => {
                setIsModalOpen(true);
                setSelectedChunk(chunk);
              }}
            >
              <Paragraph ellipsis={{ rows: 2 }}>{chunk}</Paragraph>
            </Card>
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
        title="Basic Modal"
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

export default ChunkPreview;
