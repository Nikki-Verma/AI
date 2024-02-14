"use client";

import { Button, Col, Modal, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import CreateKnowledgeBaseForm, {
  KnowledgeBaseCreateType,
} from "../CreateKnowledgeBaseForm";

interface AddFilesToKnowledgeBaseModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  createKnowledgeBaseHandler: (values: { [key: string]: any }) => void;
  title?: string;
}

const CreateKnowledgeBaseModal = ({
  title,
  open,
  loading,
  onClose,
  createKnowledgeBaseHandler,
}: AddFilesToKnowledgeBaseModalProps) => {
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
      maskClosable={false}
      centered
      width={"50%"}
      destroyOnClose
      closable
      styles={{
        body: {
          padding: "12px 0",
        },
      }}
      footer={
        <Row justify="space-between">
          <Col>
            <Space>
              <Button block type="default" disabled={loading} onClick={onClose}>
                Cancel
              </Button>
            </Space>
          </Col>
          <Col>
            <Button
              block
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
      <CreateKnowledgeBaseForm
        form={form}
        createKnowledgeBaseHandler={createKnowledgeBaseHandler}
        type={KnowledgeBaseCreateType.ADD}
      />
    </Modal>
  );
};

export default CreateKnowledgeBaseModal;
