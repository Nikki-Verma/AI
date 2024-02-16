"use client";

import { PAGE_MODE } from "@/utils/constants";
import { PageModeEnum } from "@/utils/types";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

interface CreateWorkflowModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  createWorkflowHandler: (values: { [key: string]: any }) => void;
  mode?: PageModeEnum;
  workflowDetails?: {
    id?: string | number | undefined;
    name: string;
    description?: string | undefined | null;
  };
}

const CreateWorkflowModal = ({
  open,
  loading,
  onClose,
  createWorkflowHandler,
  mode = PAGE_MODE.CREATE,
  workflowDetails,
}: CreateWorkflowModalProps) => {
  const [form] = useForm();

  useEffect(() => {
    if (mode === PAGE_MODE.EDIT) {
      form.setFields([
        {
          name: "name",
          value: workflowDetails?.name,
          errors: [],
        },
        {
          name: "description",
          value: workflowDetails?.description,
          errors: [],
        },
      ]);
    }
  }, [mode]);

  return (
    <Modal
      title={
        mode === PAGE_MODE.CREATE
          ? "Create workflow"
          : mode === PAGE_MODE.CREATE
            ? "Edit workflow details"
            : ""
      }
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
            <Button size="large" block type="default" disabled={loading}>
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
              {mode === PAGE_MODE.CREATE
                ? "Create"
                : mode === PAGE_MODE.EDIT
                  ? "Edit"
                  : ""}
            </Button>
          </Col>
        </Row>
      }
    >
      <Form
        form={form}
        layout="vertical"
        preserve={false}
        onFinish={createWorkflowHandler}
      >
        <Form.Item
          name="pipeline_name"
          label="Workflow Name"
          rules={[
            {
              required: true,
              message: "Workflow name is required",
            },
          ]}
        >
          <Input placeholder="Enter workflow name" />
        </Form.Item>
        <Form.Item name="pipeline_description" label="Workflow description">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="A short description of what this workflow is about. (Optional)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateWorkflowModal;
