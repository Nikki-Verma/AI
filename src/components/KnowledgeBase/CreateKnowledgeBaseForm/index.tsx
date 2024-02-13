"use client";

import { Col, Form, Input, Row } from "antd";

interface CreateKnowledgeBaseFormProps {
  createKnowledgeBaseHandler: (values: { [key: string]: any }) => void;
  form: any;
}

const CreateKnowledgeBaseForm = ({
  form,
  createKnowledgeBaseHandler,
}: CreateKnowledgeBaseFormProps) => {
  return (
    <Form
      form={form}
      layout="vertical"
      preserve={false}
      onFinish={createKnowledgeBaseHandler}
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
          <Form.Item
            name="index_key"
            label="Index Key"
            rules={[
              {
                required: true,
                message: "Index key is required",
              },
            ]}
          >
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
            <Input placeholder="Select vector db" />
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
            <Input placeholder="Select emnedding model" />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name="size"
            label="Chunk size"
            rules={[
              {
                required: true,
                message: "Chunk size is required",
              },
            ]}
          >
            <Input placeholder="Enter chunk size" />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name="allowed_size"
            label="Chunk Overload"
            rules={[
              {
                required: true,
                message: "Chunk overload is required",
              },
            ]}
          >
            <Input placeholder="Enter chunk overload" />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name="temperature"
            label="Temprature"
            rules={[
              {
                required: true,
                message: "Temprature is required",
              },
            ]}
          >
            <Input placeholder="Enter temprature" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateKnowledgeBaseForm;
