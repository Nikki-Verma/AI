"use client";

import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { Col, Form, InputNumber, Row, Select } from "antd";

interface CreateKnowledgeBaseFormProps {
  onFinish: (values: { [key: string]: any }) => void;
  form: any;
}

const fullWidth = { width: "100%" };

const AddToExistingKnowledgebaseForm = ({
  form,
  onFinish,
}: CreateKnowledgeBaseFormProps) => {
  // Fetch all knowledgebase
  const { data, isLoading, isError } = useFetchData(config.knowledgebase.list, {
    page: DEFAULT_PAGE,
    size: ALL_DATA_PAGE_SIZE,
  });

  return (
    <Form
      form={form}
      layout="vertical"
      preserve={false}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row justify="space-between" gutter={[12, 0]}>
        <Col span={24} md={12}>
          <Form.Item
            name="name"
            label="Select knowledge base"
            rules={[
              {
                required: true,
                message: "Knowledge base is required",
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={
                data?.result?.map((knowledgebase: any) => ({
                  label: knowledgebase?.name,
                  value: knowledgebase?.name,
                  id: knowledgebase?.id,
                })) || []
              }
              onChange={(value: string, option: UnknownObject) => {
                form.setFields([
                  {
                    name: "id",
                    value: option?.id,
                    errors: [],
                  },
                ]);
              }}
              loading={isLoading}
              placeholder="Select vector db"
            />
          </Form.Item>
          <Form.Item name="id" hidden>
            <InputNumber />
          </Form.Item>
        </Col>

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
      </Row>
    </Form>
  );
};

export default AddToExistingKnowledgebaseForm;
