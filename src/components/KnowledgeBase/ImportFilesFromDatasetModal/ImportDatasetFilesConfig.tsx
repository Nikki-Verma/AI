import { getFileChunksApi } from "@/api/knowledgebase";
import ChunkPreview from "@/components/ChunkPreview";
import { nonZeroPositiveInteger } from "@/utils/regex";
import { UnknownObject } from "@/utils/types";
import {
  Button,
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { PreviewSection, PreviewTitle, RadioOptionContainer } from "./style";

const { Paragraph, Text } = Typography;

type ImportDatasetFilesConfigProps = {
  datasetDetails: UnknownObject | undefined;
  form: FormInstance;
  addFilesToDataset: (values: any) => void;
  selectedRowKeys: any[];
  selectedRowDetails: UnknownObject[];
  knowledgebaseId: string | string[];
};

const ImportDatasetFilesConfig = ({
  datasetDetails,
  form,
  addFilesToDataset,
  selectedRowKeys,
  selectedRowDetails,
  knowledgebaseId,
}: ImportDatasetFilesConfigProps) => {
  console.log("🚀 ~ selectedRowKeys:", selectedRowKeys);
  console.log("🚀 ~ setSelectedRowDetails:", selectedRowDetails);
  const { data: session }: any = useSession();
  const [formUpdated, setFormUpdated] = useState(false);
  const [chunkLoading, setChunkLoading] = useState(false);
  const [chunks, setChunks] = useState<string[]>([]);

  useEffect(() => {
    if (form.getFieldValue("chunk_setting") === "AUTOMATIC") getChunksDetails();
  }, [formUpdated]);

  const getChunksDetails = async () => {
    try {
      if (!form.getFieldValue("chunk_setting")) {
        return setChunks([]);
      }

      if (form.getFieldValue("chunk_setting") === "MANUAL") {
        await form.validateFields();
      }

      setChunkLoading(true);
      const bucketname = selectedRowDetails?.[0]?.s3_url?.split("/")?.[2];
      console.log("🚀 ~ getChunksDetails ~ bucketname:", bucketname);
      const payload = {
        bucket_name: bucketname,
        object_name: selectedRowDetails?.[0]?.file_name,
        chunk_size:
          form.getFieldValue("chunk_setting") !== "AUTOMATIC"
            ? form.getFieldValue("chunk_size")
            : undefined,
        chunk_overlap:
          form.getFieldValue("chunk_setting") !== "AUTOMATIC"
            ? form.getFieldValue("chunk_overlap")
            : undefined,
        segment_identifier:
          form.getFieldValue("chunk_setting") !== "AUTOMATIC" &&
          !!form.getFieldValue("segment_identifier")
            ? form.getFieldValue("segment_identifier")
            : undefined,
        user_id: session?.user?.details?.id,
        username: session?.user?.details?.name,
        document_id: selectedRowKeys?.[0],
        knowledgebase_id: knowledgebaseId ? +knowledgebaseId : undefined,
      };
      const chunkResponse = await getFileChunksApi({ payload });
      console.log("🚀 ~ getChunksDetails ~ chunkResponse:", chunkResponse);
      if (chunkResponse?.data?.chunks) {
        setChunks([...(chunkResponse?.data?.chunks || [])]);
      } else {
        setChunks([]);
      }
    } catch (error) {
      setChunks([]);
    } finally {
      setChunkLoading(false);
    }
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={14}>
        <Form
          form={form}
          preserve={false}
          onFinish={addFilesToDataset}
          layout="vertical"
          disabled={chunkLoading}
          onValuesChange={() => setFormUpdated((prev: boolean) => !prev)}
        >
          <Row gutter={[20, 0]} justify="end">
            <Col span={24}>
              <Form.Item
                name="chunk_setting"
                label="Chunk Setting"
                rules={[
                  { required: true, message: "Chunk setting is required" },
                ]}
              >
                <Radio.Group
                  style={{ width: "100%" }}
                  onChange={() => {
                    setChunks([]);
                    setFormUpdated(!formUpdated);
                  }}
                >
                  <Row justify="space-between" gutter={[12, 0]}>
                    <Col span={24}>
                      <RadioOptionContainer
                        checked={
                          form.getFieldValue("chunk_setting") === "AUTOMATIC"
                        }
                        size="small"
                      >
                        <Radio
                          value="AUTOMATIC"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Flex gap="6px" vertical>
                            <Text>Automatic</Text>
                            <Paragraph style={{ margin: 0 }}>
                              Automatically set chunk and pre-processing rules.
                            </Paragraph>
                          </Flex>
                        </Radio>
                      </RadioOptionContainer>
                    </Col>
                    <Col span={24}>
                      <RadioOptionContainer
                        checked={
                          form.getFieldValue("chunk_setting") === "MANUAL"
                        }
                        size="small"
                      >
                        <Radio
                          value="MANUAL"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Flex gap="6px" vertical>
                            <Text>Manual</Text>
                            <Paragraph style={{ margin: 0 }}>
                              Customize chunk size, preprocessing rules, etc.
                            </Paragraph>
                          </Flex>
                        </Radio>
                      </RadioOptionContainer>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Col>
            {form.getFieldValue("chunk_setting") === "MANUAL" && (
              <>
                <Col span={24} md={8}>
                  <Form.Item
                    name="segment_identifier"
                    label="Segment Identifier"
                    rules={[
                      {
                        required: true,
                        message: "Segment identifier is required",
                      },
                    ]}
                  >
                    <Input placeholder="Enter segment identifier"></Input>
                  </Form.Item>
                </Col>
                <Col span={24} md={8}>
                  <Form.Item
                    name="chunk_size"
                    label="Chunk size"
                    rules={[
                      {
                        required: true,
                        message: "Chunk size is required",
                      },
                      {
                        pattern: nonZeroPositiveInteger,
                        message: "Please enter positive value",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value < 128) {
                            return Promise.reject(
                              "Value should be greated than 128",
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <InputNumber
                      min={0}
                      placeholder="Enter maximum chunk size"
                      style={{ width: "100%" }}
                    ></InputNumber>
                  </Form.Item>
                </Col>
                <Col span={24} md={8}>
                  <Form.Item
                    name="chunk_overlap"
                    label="Chunk overlap"
                    rules={[
                      {
                        required: true,
                        message: "Chunk overlap is required",
                      },
                      {
                        pattern: nonZeroPositiveInteger,
                        message: "Please enter positive value",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      placeholder="Enter chunk overlap"
                      style={{ width: "100%" }}
                    ></InputNumber>
                  </Form.Item>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    htmlType="button"
                    onClick={getChunksDetails}
                  >
                    Confirm & Preview
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Col>
      <Col span={24} md={10}>
        <PreviewSection>
          <PreviewTitle strong>Chunk Preview</PreviewTitle>
          <ChunkPreview chunks={chunks} loading={chunkLoading} />
        </PreviewSection>
      </Col>
    </Row>
  );
};

export default ImportDatasetFilesConfig;
