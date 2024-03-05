"use client";

import { getKbPlaygroundResponseApi } from "@/api/knowledgebase";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { HddOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Result,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useSession } from "next-auth/react";
import { useState } from "react";
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

const KbPlaygroundDetails = ({ knowledgebaseId }: KbPlaygroundDetailsProps) => {
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
  const [form] = useForm();
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [chunks, setChunks] = useState<UnknownObject[]>([]);
  console.log("🚀 ~ KbPlaygroundDetails ~ chunks:", chunks);
  const [chunkLoading, setChunkLoading] = useState(false);

  const getChunks = async (values: any) => {
    try {
      setChunkLoading(true);

      const payload = {
        vector_db_name: knowledgebaseConfig?.result?.[0]?.vector_db,
        embed_model_name: knowledgebaseConfig?.result?.[0]?.embed_model_name,
        query_str: values?.chunkText,
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
      } else {
        setChunks([]);
      }
      console.log(
        "🚀 ~ getChunks ~ KbPlaygroundResponse:",
        KbPlaygroundResponse,
      );
    } catch (error) {
      setChunks([]);
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
          <Form form={form} onFinish={getChunks}>
            <KbChatConfigContainer>
              <KbChatConfigHeading>
                <Title>
                  {knowledgebaseConfig?.result?.[0]?.name
                    ? `${knowledgebaseConfig?.result?.[0]?.name}'s playground`
                    : "Knowledge base playground"}
                </Title>
                <PageSubHeading>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </PageSubHeading>
              </KbChatConfigHeading>
              <KbInputContainer>
                <KbInputTopTitleContainer>
                  <KbInputTopTitle>Source Text</KbInputTopTitle>
                </KbInputTopTitleContainer>
                <Form.Item name="chunkText" noStyle>
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
