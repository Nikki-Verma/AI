"use client";

import {
  Col,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import { embeddingModelsOptions, vectorDbOptions } from "./constant";
import { KbSettingsLabel, RadioOptionContainer } from "./style";

const { Text, Paragraph } = Typography;
interface CreateKnowledgeBaseFormProps {
  createKnowledgeBaseHandler: (values: { [key: string]: any }) => void;
  form: FormInstance;
  type?: createTypeEnum;
}

export enum createTypeEnum {
  "ADD" = "ADD",
  "ADD_AND_UPDATE" = "ADD_AND_UPDATE",
}

export const KnowledgeBaseCreateType = {
  ADD: createTypeEnum.ADD,
  ADD_AND_UPDATE: createTypeEnum.ADD_AND_UPDATE,
};

const fullWidth = { width: "100%" };

const CreateKnowledgeBaseForm = ({
  form,
  createKnowledgeBaseHandler,
  type = KnowledgeBaseCreateType.ADD_AND_UPDATE,
}: CreateKnowledgeBaseFormProps) => {
  const [formUpdated, setFormUpdated] = useState(false);

  return (
    <Form
      form={form}
      layout="vertical"
      preserve={false}
      onFinish={createKnowledgeBaseHandler}
      scrollToFirstError
      initialValues={{ kb_setting: "DEFAULT" }}
    >
      <Row justify="space-between" gutter={[12, 0]}>
        <Col span={24} md={12}>
          <Form.Item
            name="name"
            label="Knowledge base name"
            rules={[
              {
                required: true,
                message: "Knowledge base name is required",
              },
            ]}
          >
            <Input placeholder="Enter knowledge base name" />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item name="description" label="Description">
            <Input placeholder="Enter knowledge base description" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="kb_setting"
            label={<KbSettingsLabel>Knowledge Base Setting</KbSettingsLabel>}
            rules={[
              {
                required: true,
                message: "Knowledge base setting is required",
              },
            ]}
          >
            <Radio.Group onChange={() => setFormUpdated(!formUpdated)}>
              <Row justify="space-between" gutter={[12, 0]}>
                <Col span={24} md={12}>
                  <RadioOptionContainer
                    checked={form.getFieldValue("kb_setting") === "DEFAULT"}
                    size="small"
                  >
                    <Radio
                      value="DEFAULT"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Flex gap="6px" vertical>
                        <Text>Default</Text>
                        <Paragraph style={{ margin: 0 }}>
                          Default set chunk and preprocessing rules. Unfamiliar
                          users are recommended to select this.
                        </Paragraph>
                      </Flex>
                    </Radio>
                  </RadioOptionContainer>
                </Col>
                <Col span={24} md={12}>
                  <RadioOptionContainer
                    checked={form.getFieldValue("kb_setting") === "CUSTOM"}
                    size="small"
                  >
                    <Radio
                      value="CUSTOM"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Flex gap="6px" vertical>
                        <Text>Custom</Text>
                        <Paragraph style={{ margin: 0 }}>
                          Manually set chunk and preprocessing rules. Unfamiliar
                          users are recommended to select.
                        </Paragraph>
                      </Flex>
                    </Radio>
                  </RadioOptionContainer>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Col>
        {form.getFieldValue("kb_setting") === "CUSTOM" && (
          <>
            <Col span={24} md={12}>
              <Form.Item name="index_key" label="Index Key">
                <Input placeholder="Enter index key" />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                name="vector_db"
                label="Vector DB"
                rules={[
                  {
                    required: true,
                    message: "Vector DB is required",
                  },
                ]}
              >
                <Select
                  options={vectorDbOptions}
                  placeholder="Select vector db"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                name="embed_model_name"
                label="Deployed embedding model"
                rules={[
                  {
                    required: true,
                    message: "embedding model is required",
                  },
                ]}
              >
                <Select
                  options={embeddingModelsOptions}
                  placeholder="Select emnedding model"
                />
              </Form.Item>
            </Col>
            {type === KnowledgeBaseCreateType.ADD_AND_UPDATE && (
              <>
                <Col span={24} md={12}>
                  <Form.Item name="size" label="Chunk size (File chunk size)">
                    <InputNumber
                      min={0}
                      style={{ ...fullWidth }}
                      placeholder="Enter chunk size"
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item
                    name="allowed_size"
                    label="Chunk Overlap (File chunk overlap)"
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      min={0}
                      placeholder="Enter chunk overlap"
                    />
                  </Form.Item>
                </Col>
              </>
            )}
          </>
        )}
      </Row>
    </Form>
  );
};

export default CreateKnowledgeBaseForm;
