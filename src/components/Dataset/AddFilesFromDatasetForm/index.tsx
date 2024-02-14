"use client";

import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { Col, Form, InputNumber, Row, Select } from "antd";
import { useState } from "react";

interface AddFilesFromDatasetFormProps {
  addFilesHandler: (values: { [key: string]: any }) => void;
  form: any;
}

const fullWidth = { width: "100%" };

const AddFilesFromDatasetForm = ({
  form,
  addFilesHandler,
}: AddFilesFromDatasetFormProps) => {
  const [selectedDataset, setSelectedDataset] = useState(undefined);

  const {
    data: datasets,
    isLoading: datasetLoading,
    isError: datasetError,
  } = useFetchData(config.dataset.list, {
    page: DEFAULT_PAGE,
    size: ALL_DATA_PAGE_SIZE,
  });
  console.log("🚀 ~ datasets:", datasets);

  const {
    data: datasetFiles,
    isLoading: datasetFilesLoading,
    isError: datasetFilesError,
  } = useFetchData(
    config.dataset.files,
    {
      ...{
        page: DEFAULT_PAGE,
        size: ALL_DATA_PAGE_SIZE,
        dataset_id: selectedDataset,
      },
    },
    {},
    !!selectedDataset,
  );

  console.log("🚀 ~ datasetFiles:", datasetFiles);

  return (
    <Form
      form={form}
      layout="vertical"
      preserve={false}
      onFinish={addFilesHandler}
      scrollToFirstError
    >
      <Row justify="space-between" gutter={[12, 0]}>
        <Col span={24} md={12}>
          <Form.Item
            name="name"
            label="Dataset"
            rules={[
              {
                required: true,
                message: "Dataset is required",
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              loading={datasetLoading}
              options={
                datasets?.result?.map((dataset: any) => ({
                  label: dataset?.name,
                  value: dataset?.name,
                  id: dataset?.id,
                })) || []
              }
              placeholder="Select dataset"
              onChange={(val: string, option: UnknownObject) => {
                form.setFields([
                  {
                    name: "id",
                    value: option?.id,
                    errors: [],
                  },
                  {
                    name: "files",
                    value: undefined,
                    errors: [],
                  },
                ]);
                setSelectedDataset(option?.id);
              }}
            />
          </Form.Item>
          <Form.Item name="id" hidden>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={24} md={12}>
          <Form.Item
            name="files"
            label="Files"
            rules={[
              {
                required: true,
                message: "Files are required",
              },
            ]}
          >
            <Select
              showSearch
              mode="multiple"
              optionFilterProp="label"
              loading={datasetFilesLoading}
              options={
                datasetFiles?.result?.map((files: any) => ({
                  label: files?.file_name,
                  value: files?.id,
                })) || []
              }
              maxTagCount="responsive"
              placeholder="Select dataset"
            />
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
            label="Chunk Overload (File chunk overload)"
          >
            <InputNumber
              style={{ ...fullWidth }}
              min={0}
              placeholder="Enter chunk overload"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddFilesFromDatasetForm;
