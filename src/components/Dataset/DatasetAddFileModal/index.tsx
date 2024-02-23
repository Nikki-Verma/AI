"use client";

import UploadCard from "@/components/UploadCard";
import { Button, Col, Modal, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { UploadFileType, UPLOAD_FILE_TYPES } from "./constant";
import {
  DatasetUploadTypeContainer,
  UploadTypeDescription,
  UploadTypeHeading,
} from "./style";
import UploadManualFile from "./UploadManualFile";

interface DatasetAddFileModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  addFilesHandler: (values: { [key: string]: any }) => void;
  title?: string;
}

const UploadTypeOptions = [
  {
    imageUrl: "/assets/Images/fileUpload.svg",
    heading: "New file upload",
    details: "Upload any amount of PDF , TXT formats.",
    type: UPLOAD_FILE_TYPES.FILE,
    disabled: false,
  },
  {
    imageUrl: "/assets/Images/directLink.svg",
    heading: "Direct link",
    details:
      "Fetch data from direct link like, remote url, github, google cloud storage",
    type: UPLOAD_FILE_TYPES.DIRECT_LINK,
    disabled: true,
  },
  {
    imageUrl: "/assets/Images/externalResoource.svg",
    heading: "External sources",
    details:
      "Import data from external app like Slack, Notion, Asana, clickup, confluence..",
    type: UPLOAD_FILE_TYPES.EXTERNAL_SOURCE,
    disabled: true,
  },
];

const DatasetAddFileModal = ({
  title,
  open,
  loading,
  onClose,
  addFilesHandler,
}: DatasetAddFileModalProps) => {
  const [form] = useForm();

  const [uploadType, setUploadType] = useState<UploadFileType | undefined>(
    undefined,
  );
  const [fileList, setFileList] = useState<any>([]);

  const getUploadStep = () => {
    switch (uploadType) {
      case UploadFileType.FILE:
        return (
          <UploadManualFile
            form={form}
            addFilesHandler={addFilesHandler}
            fileList={fileList}
            setFileList={setFileList}
            loading={loading}
          />
        );

      default:
        return (
          <DatasetUploadTypeContainer>
            <UploadTypeHeading>
              How do you want to upload your data
            </UploadTypeHeading>
            <UploadTypeDescription>
              We'll create a data table that can be added to any tool or agent.
              Knowledge is used to provide context to the large language model.
            </UploadTypeDescription>
            <Row justify="space-between" align="middle" gutter={[12, 12]}>
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
                  type: UploadFileType;
                  disabled: boolean;
                }) => {
                  return (
                    <Col span={24} sm={12} md={8}>
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

export default DatasetAddFileModal;
