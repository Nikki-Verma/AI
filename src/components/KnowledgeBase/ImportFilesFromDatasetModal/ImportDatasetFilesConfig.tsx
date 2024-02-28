import ChunkPreview from "@/components/ChunkPreview";
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
import { useState } from "react";

import {
  PreviewContainer,
  PreviewSection,
  PreviewTitle,
  RadioOptionContainer,
} from "./style";

const { Paragraph, Text } = Typography;

type ImportDatasetFilesConfigProps = {
  datasetDetails: UnknownObject | undefined;
  form: FormInstance;
  addFilesToDataset: (values: any) => void;
  selectedRowKeys: any[];
  setSelectedRowDetails: (values: any) => void;
};

const ImportDatasetFilesConfig = ({
  datasetDetails,
  form,
  addFilesToDataset,
  selectedRowKeys,
  setSelectedRowDetails,
}: ImportDatasetFilesConfigProps) => {
  const [formUpdated, setFormUpdated] = useState(false);

  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={14}>
        <Form
          form={form}
          preserve={false}
          onFinish={addFilesToDataset}
          layout="vertical"
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
                  onChange={() => setFormUpdated(!formUpdated)}
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
                    name="chunk_overload"
                    label="Chunk overload"
                    rules={[
                      {
                        required: true,
                        message: "Chunk overload is required",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      placeholder="Enter chunk overload"
                      style={{ width: "100%" }}
                    ></InputNumber>
                  </Form.Item>
                </Col>
                <Col>
                  <Button type="primary" disabled>
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
          <PreviewContainer>
            <ChunkPreview />
          </PreviewContainer>
        </PreviewSection>
      </Col>
    </Row>
  );
};

export default ImportDatasetFilesConfig;
