"use client";

import { PAGE_MODE } from "@/utils/constants";
import { PageModeEnum } from "@/utils/types";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

interface CreateAgentflowModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  createAgentHandler: (values: { [key: string]: any }) => void;
  mode?: PageModeEnum;
  agentFlowDetails?: any;
}

const CreateAgentModal = ({
  open,
  loading,
  onClose,
  createAgentHandler,
  mode = PAGE_MODE.CREATE,
  agentFlowDetails,
}: CreateAgentflowModalProps) => {
  console.log("🚀 ~ agentFlowDetails:", agentFlowDetails);
  const [form] = useForm();
  const [formUpdated, setFormUpdated] = useState(false);

  const agentName = Form.useWatch("agent_name", form);
  console.log("🚀 ~ agentName:", agentName);

  useEffect(() => {
    if (mode === PAGE_MODE.EDIT) {
      console.log("🚀 ~ agentFlowDetails useeffect:", agentFlowDetails);
      form.setFields([
        {
          name: "agent_name",
          value: agentFlowDetails?.agent_name,
          errors: [],
        },
        {
          name: "agent_description",
          value: agentFlowDetails?.agent_description,
          errors: [],
        },
      ]);
    }
    setFormUpdated((prev: boolean) => !prev);
  }, [mode, open]);

  console.log("agent form details", form.getFieldsValue());

  return (
    <Modal
      title={
        mode === PAGE_MODE.CREATE
          ? "Create agent"
          : mode === PAGE_MODE.EDIT
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
      width="40%"
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
                  ? "Update"
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
