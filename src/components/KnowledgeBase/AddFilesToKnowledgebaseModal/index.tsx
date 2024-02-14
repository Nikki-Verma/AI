"use client";

import UploadCard from "@/components/UploadCard";
import { Button, Col, Modal, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import AddToExistingKnowledgebaseForm from "../AddToExistingKnowledgebaseForm";
import CreateKnowledgeBaseForm from "../CreateKnowledgeBaseForm";
import {
  KnowledgebaseOptionType,
  KNOWLEDGEBASE_SELECT_OPTIONS,
} from "./constant";
import {
  DatasetUploadTypeContainer,
  UploadTypeDescription,
  UploadTypeHeading,
} from "./style";

interface AddFilesToKnowledgeBaseModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  createAndAddFilesToKnowledgeBase: (values: { [key: string]: any }) => void;
  addFilesToExistingKnowledgeBase: (values: { [key: string]: any }) => void;
  title?: string;
}

const UploadTypeOptions = [
  {
    imageUrl: "/assets/Images/fileUpload.svg",
    heading: "Create New",
    details: "A new Knowledge base will be created. ",
    type: KNOWLEDGEBASE_SELECT_OPTIONS.CREATE,
    disabled: false,
  },
  {
    imageUrl: "/assets/Images/existingData.svg",
    heading: "Add to existing",
    details: "Add dataset to existing knowledge base",
    type: KNOWLEDGEBASE_SELECT_OPTIONS.EXISTING,
    disabled: false,
  },
];

const AddFilesToKnowledgeBaseModal = ({
  title,
  open,
  loading,
  onClose,
  createAndAddFilesToKnowledgeBase,
  addFilesToExistingKnowledgeBase,
}: AddFilesToKnowledgeBaseModalProps) => {
  const [form] = useForm();

  const [uploadType, setUploadType] = useState<
    KnowledgebaseOptionType | undefined
  >(undefined);

  useEffect(() => {
    form.resetFields();
  }, [uploadType]);

  const getUploadStep = () => {
    switch (uploadType) {
      case KnowledgebaseOptionType.CREATE:
        return (
          <CreateKnowledgeBaseForm
            form={form}
            createKnowledgeBaseHandler={createAndAddFilesToKnowledgeBase}
          />
        );

      case KNOWLEDGEBASE_SELECT_OPTIONS.EXISTING:
        return (
          <AddToExistingKnowledgebaseForm
            form={form}
            onFinish={addFilesToExistingKnowledgeBase}
          />
        );

      default:
        return (
          <DatasetUploadTypeContainer>
            <UploadTypeHeading>Add dataset to knowledge base</UploadTypeHeading>
            <UploadTypeDescription>
              You can create a new knowledge base or can add to existing
              knowledge base
            </UploadTypeDescription>
            <Row justify="start" align="middle" gutter={[12, 12]}>
              {UploadTypeOptions.map(
                ({
                  heading,
                  details,
                  imageUrl,
                  type,
                  disabled,
                }: {
                  heading: string;
                  details: string;
                  imageUrl: any;
                  type: KnowledgebaseOptionType;
                  disabled: boolean;
                }) => {
                  return (
                    <Col span={24} sm={12} md={12}>
                      <UploadCard
                        imageUrl={imageUrl}
                        heading={heading}
                        details={details}
                        disabled={disabled}
                        onClick={() => {
                          setUploadType(type);
                        }}
                      />
                    </Col>
                  );
                },
              )}
            </Row>
          </DatasetUploadTypeContainer>
        );
    }
  };

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
      afterClose={() => setUploadType(undefined)}
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

              {!!uploadType && (
                <Button
                  type="default"
                  disabled={loading}
                  onClick={() => setUploadType(undefined)}
                >
                  Back
                </Button>
              )}
            </Space>
          </Col>
          <Col>
            <Button
              block
              type="primary"
              disabled={!uploadType}
              onClick={form.submit}
              loading={loading}
            >
              Create
            </Button>
          </Col>
        </Row>
      }
    >
      {getUploadStep()}
    </Modal>
  );
};

export default AddFilesToKnowledgeBaseModal;
