"use client";

import AddFilesFromDatasetForm from "@/components/Dataset/AddFilesFromDatasetForm";
import { Button, Col, Modal, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";

interface AddFilesToKnowledgeBaseModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  addFilesHandler: (values: { [key: string]: any }) => void;
  title?: string;
}

const ImportFilesFromDatasetModal = ({
  title,
  open,
  loading,
  onClose,
  addFilesHandler,
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
      <AddFilesFromDatasetForm form={form} addFilesHandler={addFilesHandler} />
    </Modal>
  );
};

export default ImportFilesFromDatasetModal;
