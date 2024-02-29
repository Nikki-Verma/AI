"use client";

import { PAGE_MODE } from "@/utils/constants";
import { PageModeEnum } from "@/utils/types";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

interface CreateAgentflowModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  createAgentHandler: (values: { [key: string]: any }) => void;
  mode?: PageModeEnum;
  agentFlowDetails?: {
    id?: string | number | undefined;
    name: string;
    description?: string | undefined | null;
  };
}

const CreateAgentModal = ({
  open,
  loading,
  onClose,
  createAgentHandler,
  mode = PAGE_MODE.CREATE,
  agentFlowDetails,
}: CreateAgentflowModalProps) => {
  const [form] = useForm();

  useEffect(() => {
    if (mode === PAGE_MODE.EDIT) {
      form.setFields([
        {
          name: "name",
          value: agentFlowDetails?.name,
          errors: [],
        },
        {
          name: "description",
          value: agentFlowDetails?.description,
          errors: [],
        },
      ]);
    }
  }, [mode]);

  return (
    <Modal
      title={
        mode === PAGE_MODE.CREATE
          ? "Create agent"
          : mode === PAGE_MODE.CREATE
            ? "Edit agent details"
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
        onFinish={createAgentHandler}
      >
        <Form.Item
          name="agent_name"
          label="Agent Name"
          rules={[
            {
              required: true,
              message: "Agent name is required",
            },
          ]}
        >
          <Input placeholder="Enter agent name" />
        </Form.Item>
        <Form.Item name="agent_description" label="Agent description">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            placeholder="A short description of what this agent is about. (Optional)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAgentModal;
