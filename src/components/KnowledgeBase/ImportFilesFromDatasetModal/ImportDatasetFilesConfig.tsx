import { getFileChunksApi } from "@/api/knowledgebase";
import ChunksPreview from "@/components/ChunksPreview";
import KbCustomIcon from "@/components/Icons/KbCustomIcon";
import KbDefaultIcon from "@/components/Icons/KbDefaultIcon";
import { nonZeroPositiveInteger } from "@/utils/regex";
import { UnknownObject } from "@/utils/types";
import {
  Button,
  Col,
  Flex,
  Form,
  FormInstance,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  KbSettingsIconsContainer,
  KbSettingsRadioDescription,
  KbSettingsRadioTitle,
} from "../CreateKnowledgeBaseForm/style";
import { SegmentIdentifierOptions } from "./constant";

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
  const chunkSetting = Form.useWatch("chunk_setting", form);
  useEffect(() => {
    if (chunkSetting === "AUTOMATIC") getChunksDetails();
  }, [chunkSetting]);

  const getChunksDetails = async () => {
    try {
      if (!chunkSetting) {
        return setChunks([]);
      }

      if (chunkSetting === "MANUAL") {
        await form.validateFields();
      }

      setChunkLoading(true);
      const bucketname = selectedRowDetails?.[0]?.s3_url?.split("/")?.[2];
      console.log("🚀 ~ getChunksDetails ~ bucketname:", bucketname);
      const payload = {
        bucket_name: bucketname,
        object_name: selectedRowDetails?.[0]?.file_name,
        chunk_size:
          chunkSetting !== "AUTOMATIC"
            ? form.getFieldValue("chunk_size")
            : undefined,
        chunk_overlap:
          chunkSetting !== "AUTOMATIC"
            ? form.getFieldValue("chunk_overlap")
            : undefined,
        segment_identifier:
          chunkSetting !== "AUTOMATIC" &&
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
      <Col span={24} md={10}>
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
                        checked={chunkSetting === "AUTOMATIC"}
                        size="small"
                        disabled={chunkLoading}
                        onClick={() => {
                          chunkSetting === "AUTOMATIC" || chunkLoading
                            ? null
                            : form.setFields([
                                {
                                  name: "chunk_setting",
                                  value: "AUTOMATIC",
                                  errors: [],
                                },
                              ]);
                          setFormUpdated((prev: boolean) => !prev);
                        }}
                      >
                        <Flex gap="24px" align="center" justify="space-between">
                          <Flex align="center" gap="12px">
                            <KbSettingsIconsContainer>
                              <KbDefaultIcon />
                            </KbSettingsIconsContainer>
                            <Flex gap="2px" vertical>
                              <KbSettingsRadioTitle>
                                Automatic
                              </KbSettingsRadioTitle>
                              <KbSettingsRadioDescription>
                                Automatically establishing chunk and
                                preprocessing rules is advisable for users who
                                are not familiar with them.
                              </KbSettingsRadioDescription>
                            </Flex>
                          </Flex>
                          <Radio
                            value="AUTOMATIC"
                            style={{ display: "flex", alignItems: "center" }}
                          ></Radio>
                        </Flex>
                      </RadioOptionContainer>
                    </Col>
                    <Col span={24}>
                      <RadioOptionContainer
                        checked={chunkSetting === "MANUAL"}
                        size="small"
                        disabled={chunkLoading}
                        onClick={() => {
                          chunkSetting === "MANUAL" || chunkLoading
                            ? null
                            : form.setFields([
                                {
                                  name: "chunk_setting",
                                  value: "MANUAL",
                                  errors: [],
                                },
                              ]);
                          setFormUpdated((prev: boolean) => !prev);
                        }}
                      >
                        <Flex gap="24px" align="center" justify="space-between">
                          <Flex align="center" gap="12px">
                            <KbSettingsIconsContainer>
                              <KbCustomIcon />
                            </KbSettingsIconsContainer>
                            <Flex gap="2px" vertical>
                              <KbSettingsRadioTitle>
                                Manual
                              </KbSettingsRadioTitle>
                              <KbSettingsRadioDescription>
                                Manually set chunk and preprocessing rules.
                                Unfamiliar users are recommended to select.
                              </KbSettingsRadioDescription>
                            </Flex>
                          </Flex>
                          <Radio
                            value="MANUAL"
                            style={{ display: "flex", alignItems: "center" }}
                          ></Radio>
                        </Flex>
                      </RadioOptionContainer>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Col>
            {chunkSetting === "MANUAL" && (
              <>
                <Col span={24}>
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
                    <Select
                      placeholder="Select segment identifier"
                      showSearch
                      optionFilterProp="label"
                      options={SegmentIdentifierOptions}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
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
                              "Value should be greater than 128",
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
                <Col span={24} md={12}>
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
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (value < 20) {
                            return Promise.reject(
                              "Value should be greater than 20",
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
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
      <Col span={24} md={14}>
        <PreviewSection>
          <PreviewTitle strong>Chunk Preview</PreviewTitle>
          <ChunksPreview chunks={chunks} loading={chunkLoading} />
        </PreviewSection>
      </Col>
    </Row>
  );
};

export default ImportDatasetFilesConfig;
