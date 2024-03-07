"use client";

import { getKbPlaygroundResponseApi } from "@/api/knowledgebase";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE } from "@/utils/constants";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { HddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Result,
  Row,
  Skeleton,
  Slider,
  SliderSingleProps,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import Chunk from "../Chunk";
import { PageSubHeading } from "../UIComponents/UIComponents.style";
import {
  ChunkDetailsContainer,
  ChunksContainer,
  ChunksTitle,
  DividerPlayground,
  EmptyChatContainer,
  EmptyChattitle,
  KbChatConfigContainer,
  KbChatConfigHeading,
  KbChatResponseContainer,
  KbInputContainer,
  KbInputTopTitle,
  KbInputTopTitleContainer,
} from "./style";

const { Title } = Typography;
const { TextArea } = Input;

type KbPlaygroundDetailsProps = {
  knowledgebaseId: string | string[];
};

const marks: SliderSingleProps["marks"] = {
  0.5: "0.5",
  1: "1",
};

const topKMarks: SliderSingleProps["marks"] = {
  1: "1",
  10: "10",
};

const KbPlaygroundDetails = ({ knowledgebaseId }: KbPlaygroundDetailsProps) => {
  const router = useRouter();
  const {
    data: knowledgebaseConfig,
    isLoading: knowledgebaseLoading,
    isError: knowledgebaseHasError,
    error: knowledgebaseErrorDetail,
    refetch: refetchDataset,
  } = useFetchData(
    config.knowledgebase.list,
    { knowledgeBaseId: knowledgebaseId },
    {},
  );

  const { data: filesData, isLoading: filesDataLoading } = useFetchData(
    config.knowledgebase.files,
    {
      page: DEFAULT_PAGE,
      size: ALL_DATA_PAGE_SIZE,
      knowledgebase_id: knowledgebaseId,
    },
    {},
  );

  console.log(
    "🚀 ~ KbPlaygroundDetails ~ knowledgebaseConfig:",
    knowledgebaseConfig,
  );
  const [form] = useForm();
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [chunks, setChunks] = useState<UnknownObject[]>([]);
  const [chunkNotFound, setChunkNotFound] = useState(false);
  console.log("🚀 ~ KbPlaygroundDetails ~ chunks:", chunks);
  const [chunkLoading, setChunkLoading] = useState(false);

  useEffect(() => {
    router.prefetch("knowledge-base/[knowledgebaseId]");
  }, []);

  useLayoutEffect(() => {
    if (!filesDataLoading) {
      const retrievalDisabled = !(
        filesData?.document_details?.some(
          (document: UnknownObject) =>
            document?.injestion_status === "COMPLETED",
        ) ?? true
      );
      if (retrievalDisabled) {
        router.push(`/knowledge-base/${knowledgebaseId}`);
      }
    }
  }, [filesData, filesDataLoading]);

  const getChunks = async (values: any) => {
    try {
      setChunkLoading(true);

      const payload = {
        ...values,
        vector_db_name: knowledgebaseConfig?.result?.[0]?.vector_db,
        embed_model_name: knowledgebaseConfig?.result?.[0]?.embed_model_name,
        user_id: session?.user?.details?.id,
        username: session?.user?.details?.name,
        collection_name: knowledgebaseConfig?.result?.[0]?.name,
      };
      const KbPlaygroundResponse = await getKbPlaygroundResponseApi({
        payload,
      });
      if (KbPlaygroundResponse?.status == 200) {
        const newChunks =
          KbPlaygroundResponse?.data?.nodes?.map((node: any, index: any) => ({
            ...node,
            similarity: KbPlaygroundResponse?.data?.similarities?.[index],
          })) || [];

        setChunks([...newChunks]);
        if (newChunks?.length > 0) {
          setChunkNotFound(false);
        } else {
          setChunkNotFound(true);
        }
      } else {
        setChunkNotFound(true);
        setChunks([]);
      }
      console.log(
        "🚀 ~ getChunks ~ KbPlaygroundResponse:",
        KbPlaygroundResponse,
      );
    } catch (error) {
      console.log("🚀 ~ getChunks ~ error:", error);
      setChunks([]);
      setChunkNotFound(true);
      notification.error({
        message: "Error while fetching chunks",
        description: getErrorFromApi(error),
      });
    } finally {
      setChunkLoading(false);
    }
  };

  if (knowledgebaseHasError) {
    return (
      <Row justify="center">
        <Col>
          <Result
            status="500"
            title={getErrorFromApi(knowledgebaseErrorDetail)}
            subTitle="Please refresh or comeback in sometime"
          />
        </Col>
      </Row>
    );
  }
  return (
    <Skeleton
      loading={knowledgebaseLoading}
      active
      avatar
      paragraph={{ rows: 12 }}
    >
      <Row justify="start" gutter={[48, 24]}>
        <Col span={24} md={{ span: 12 }}>
          <Form form={form} onFinish={getChunks} layout="vertical">
            <KbChatConfigContainer>
              <KbChatConfigHeading>
                <Title>
                  {knowledgebaseConfig?.result?.[0]?.name
                    ? `${knowledgebaseConfig?.result?.[0]?.name}'s playground`
                    : "Knowledge base playground"}
                </Title>
                <PageSubHeading>
                  Use this playground to vector search queries against the
                  knowledge base and check if the most relevant chunks are
                  retrieved.
                </PageSubHeading>
              </KbChatConfigHeading>
              <KbInputContainer>
                <KbInputTopTitleContainer>
                  <KbInputTopTitle>Source Text</KbInputTopTitle>
                </KbInputTopTitleContainer>
                <Form.Item name="query_str" noStyle>
                  <TextArea
                    placeholder="Type your message here..."
                    autoSize={{ minRows: 12, maxRows: 12 }}
                    showCount
                    onKeyPress={(event: any) => {
                      if (event.which === 13) {
                        event.preventDefault();
                        form.submit();
                      }
                    }}
                  />
                </Form.Item>
              </KbInputContainer>
              <Row gutter={[16, 16]}>
                <Col span={24} md={{ span: 12 }}>
                  <Row gutter={[12, 12]}>
                    <Col flex={1}>
                      <Form.Item name="threshold" label="Similarity Threshold">
                        <Slider min={0.5} max={1} step={0.01} marks={marks} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item name="threshold">
                        <InputNumber
                          min={0.5}
                          max={1}
                          step={0.01}
                          style={{ marginTop: "30px" }}
                          placeholder="Similarity Threshold"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24} md={{ span: 12 }}>
                  <Row gutter={[12, 12]}>
                    <Col flex={1}>
                      <Form.Item name="topK" label="Tok K Results">
                        <Slider min={1} max={10} step={1} marks={topKMarks} />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item name="topK">
                        <InputNumber
                          step={1}
                          min={0}
                          max={10}
                          style={{ marginTop: "30px" }}
                          placeholder="Top K Results"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Flex justify="flex-end">
                <Form.Item noStyle>
                  <Button htmlType="submit" type="primary">
                    Get Chunks
                  </Button>
                </Form.Item>
              </Flex>
            </KbChatConfigContainer>
          </Form>
        </Col>
        <DividerPlayground />
        <Col span={24} md={{ span: 11 }}>
          <KbChatResponseContainer>
            {!chunkLoading && chunks?.length < 1 ? (
              chunkNotFound ? (
                <EmptyChatContainer>
                  <Empty
                    description={
                      <EmptyChattitle>
                        No chunks found. Please verify file content and chunk
                        settings
                      </EmptyChattitle>
                    }
                  />
                </EmptyChatContainer>
              ) : (
                <EmptyChatContainer>
                  <HddOutlined
                    style={{
                      fontSize: "86px",
                      color: "var(--Text-Color-900, #171717)",
                      opacity: "0.5",
                    }}
                  />
                  <EmptyChattitle>
                    Knowledge base playground results will show here
                  </EmptyChattitle>
                </EmptyChatContainer>
              )
            ) : (
              <Skeleton loading={chunkLoading} active paragraph={{ rows: 12 }}>
                <ChunkDetailsContainer>
                  <ChunksTitle>Chunks</ChunksTitle>
                  <ChunksContainer>
                    {chunks?.map((chunk: UnknownObject) => {
                      return <Chunk key={chunk?.title} chunk={chunk} />;
                    })}
                  </ChunksContainer>
                </ChunkDetailsContainer>
              </Skeleton>
            )}
          </KbChatResponseContainer>
        </Col>
      </Row>
    </Skeleton>
  );
};

export default KbPlaygroundDetails;
