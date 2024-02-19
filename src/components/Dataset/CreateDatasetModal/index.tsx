"use client";

import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";

interface CreateDatasetModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  createDatasetHandler: (values: { [key: string]: any }) => void;
  title?: string;
}

const CreateDatasetModal = ({
  title,
  open,
  loading,
  onClose,
  createDatasetHandler,
}: CreateDatasetModalProps) => {
  const [form] = useForm();

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => {
        if (!loading) {
          onClose();
        }
      }}
      centered
      maskClosable={false}
      destroyOnClose
      closable
      footer={
        <Row justify="space-between">
          <Col>
            <Button
              size="large"
              block
              type="default"
              disabled={loading}
              onClick={onClose}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              block
              size="large"
              type="primary"
              onClick={form.submit}
              loading={loading}
            >
              Create
            </Button>
          </Col>
        </Row>
      }
    >
      <Form
        form={form}
        layout="vertical"
        preserve={false}
        onFinish={createDatasetHandler}
      >
        <Form.Item
          name="dataset_name"
          label="Dataset Name"
          rules={[
            {
              required: true,
              message: "Dataset name is required",
            },
          ]}
        >
          <Input placeholder="Enter dataset name" />
        </Form.Item>
        <Form.Item name="dataset_description" label="Dataset description">
          <Input placeholder="A short description of data collection set (Optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDatasetModal;
