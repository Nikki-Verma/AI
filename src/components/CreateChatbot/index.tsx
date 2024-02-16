"use client";

import { PAGE_MODE } from "@/utils/constants";
import { PageModeEnum } from "@/utils/types";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

interface CreateChatbotModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  createChatbotHandler: (values: { [key: string]: any }) => void;
  mode?: PageModeEnum;
  chatbotData?: {
    id?: string | number | undefined;
    name: string;
    description?: string | undefined | null;
  };
}

const CreateChatbotModal = ({
  open,
  loading,
  onClose,
  createChatbotHandler,
  mode = PAGE_MODE.CREATE,
  chatbotData,
}: CreateChatbotModalProps) => {
  const [form] = useForm();

  useEffect(() => {
    if (mode === PAGE_MODE.EDIT) {
      form.setFields([
        {
          name: "name",
          value: chatbotData?.name,
          errors: [],
        },
        {
          name: "description",
          value: chatbotData?.description,
          errors: [],
        },
      ]);
    }
  }, [mode]);

  return (
    <Modal
      title={
        mode === PAGE_MODE.CREATE
          ? "Create Chatbot"
          : mode === PAGE_MODE.CREATE
            ? "Edit Chatbot"
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
        onFinish={createChatbotHandler}
      >
        <Form.Item
          name="name"
          label="Chatbot Name"
          rules={[
            {
              required: true,
              message: "Chatbot name is required",
            },
          ]}
        >
          <Input placeholder="Enter chatbot name" />
        </Form.Item>
        <Form.Item name="description" label="Chatbot description">
          <Input placeholder="A short description of what this chatbot is supposed to do. (Optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateChatbotModal;
