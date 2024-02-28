"use client";

import { useNotify } from "@/providers/notificationProvider";
import { UnknownObject } from "@/utils/types";
import { Button, Col, Modal, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { FilesFromDatasetOptions, FilesFromDatasetStep } from "./constant";
import ImportDatasetFileList from "./ImportDatasetFileList";
import ImportDatasetFilesConfig from "./ImportDatasetFilesConfig";
import ImportDatasetFolderList from "./ImportDatasetFolderList";

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
  const { notification } = useNotify();
  const [currentStep, setCurrentStep] = useState<FilesFromDatasetStep>(
    FilesFromDatasetOptions.FOLDER,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);

  const [selectedRowDetails, setSelectedRowDetails] = useState<any>([]);

  const [selectedDataset, setSelectedDataset] = useState<
    undefined | UnknownObject
  >();

  const closeModal = () => {
    onClose();
    setSelectedDataset(undefined);
    setSelectedRowKeys([]);
    setSelectedRowDetails([]);
    setCurrentStep(FilesFromDatasetOptions.FOLDER);
  };

  const selectFolder = (values: any) => {
    setSelectedDataset(values);
    setCurrentStep(FilesFromDatasetOptions.FILES);
  };

  const addDatasetFilesToKnowledgebaseHandler = (values: UnknownObject) => {
    if (selectedRowKeys?.length < 1) {
      return notification.error({ message: "Select atleast one file" });
    }
    setCurrentStep(FilesFromDatasetOptions.FILE_CONFIG);
  };

  const addFilesToDataset = async (values: UnknownObject) => {
    const payload = {
      ...values,
      document_id: selectedRowKeys,
    };
    addFilesHandler(payload);
  };

  const getCurrentStep = () => {
    switch (currentStep) {
      case FilesFromDatasetOptions.FOLDER:
        return <ImportDatasetFolderList selectFolder={selectFolder} />;

      case FilesFromDatasetOptions.FILES:
        return (
          <ImportDatasetFileList
            datasetDetails={selectedDataset}
            form={form}
            addDatasetFilesToKnowledgebaseHandler={
              addDatasetFilesToKnowledgebaseHandler
            }
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            setSelectedRowDetails={setSelectedRowDetails}
          />
        );

      case FilesFromDatasetOptions.FILE_CONFIG:
        return (
          <ImportDatasetFilesConfig
            datasetDetails={selectedDataset}
            form={form}
            addFilesToDataset={addFilesToDataset}
            selectedRowKeys={selectedRowKeys}
            setSelectedRowDetails={setSelectedRowDetails}
          />
        );

      default:
        return <div>hello</div>;
    }
  };

  const getActionButtons = () => {
    switch (currentStep) {
      case FilesFromDatasetOptions.FOLDER:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  danger
                  type="text"
                  disabled={loading}
                  onClick={closeModal}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col></Col>
          </Row>
        );

      case FilesFromDatasetOptions.FILES:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  danger
                  type="text"
                  disabled={loading}
                  onClick={closeModal}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  block
                  type="text"
                  disabled={loading}
                  onClick={() => {
                    setSelectedDataset(undefined);
                    setCurrentStep(FilesFromDatasetOptions.FOLDER);
                    setSelectedRowKeys([]);
                  }}
                  style={{ fontWeight: "bold" }}
                >
                  Back
                </Button>
                <Button
                  block
                  type="primary"
                  loading={loading}
                  onClick={form.submit}
                  style={{ fontWeight: "bold" }}
                >
                  Confirm & Proceed
                </Button>
              </Space>
            </Col>
          </Row>
        );

      case FilesFromDatasetOptions.FILE_CONFIG:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  danger
                  type="text"
                  disabled={loading}
                  onClick={closeModal}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  block
                  type="text"
                  disabled={loading}
                  onClick={() => {
                    setCurrentStep(FilesFromDatasetOptions.FILES);
                  }}
                  style={{ fontWeight: "bold" }}
                >
                  Back
                </Button>
                <Button
                  block
                  type="primary"
                  loading={loading}
                  onClick={form.submit}
                  style={{ fontWeight: "bold" }}
                >
                  Confirm & Import Files
                </Button>
              </Space>
            </Col>
          </Row>
        );

      default:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  type="default"
                  disabled={loading}
                  onClick={closeModal}
                >
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
        );
    }
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={() => {
        if (!loading) {
          closeModal();
        }
      }}
      maskClosable={false}
      centered
      width={"80%"}
      destroyOnClose
      closable
      afterClose={() => {
        setSelectedDataset(undefined);
        setSelectedRowKeys([]);
        setSelectedRowDetails([]);
        setCurrentStep(FilesFromDatasetOptions.FOLDER);
      }}
      styles={{
        body: {
          padding: "12px 0",
        },
      }}
      footer={getActionButtons()}
    >
      {getCurrentStep()}
    </Modal>
  );
};

export default ImportFilesFromDatasetModal;
