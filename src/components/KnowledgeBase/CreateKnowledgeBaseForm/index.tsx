"use client";

import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { embeddingModelsOptions, vectorDbOptions } from "./constant";

interface CreateKnowledgeBaseFormProps {
  createKnowledgeBaseHandler: (values: { [key: string]: any }) => void;
  form: any;
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
  return (
    <Form
      form={form}
      layout="vertical"
      preserve={false}
      onFinish={createKnowledgeBaseHandler}
      scrollToFirstError
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
            <Select options={vectorDbOptions} placeholder="Select vector db" />
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
                label="Chunk Overload (File chunk overload)"
              >
                <InputNumber
                  style={{ ...fullWidth }}
                  min={0}
                  placeholder="Enter chunk overload"
                />
              </Form.Item>
            </Col>
          </>
        )}
        <Col span={24} md={12}>
          <Form.Item name="temperature" label="Temperature">
            <InputNumber
              min={0}
              max={1}
              precision={2}
              style={{ ...fullWidth }}
              placeholder="Enter temperature"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateKnowledgeBaseForm;
