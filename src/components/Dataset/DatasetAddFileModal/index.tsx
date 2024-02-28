"use client";

import { confluenceSpaceDetailsApi, connectConfluenceApi } from "@/api/dataset";
import UploadCard from "@/components/UploadCard";
import { useNotify } from "@/providers/notificationProvider";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { Button, Col, Form, Modal, Row, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import ConfluenceConfig from "./ConfluenceConfig";
import ConfluenceFiles from "./ConfluenceFiles";
import { UploadFileType, UPLOAD_FILE_TYPES } from "./constant";
import { Data_Connectors_Available_Channels } from "./helper";
import SelectExternalSource from "./SelectExternalSource";
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
  addConfluenceFilesToDataset: (values: { [key: string]: any }) => void;
  datasetId: string | string[];
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
    disabled: false,
  },
];

const DatasetAddFileModal = ({
  open,
  loading,
  onClose,
  addFilesHandler,
  addConfluenceFilesToDataset,
  datasetId,
}: DatasetAddFileModalProps) => {
  const [form] = useForm();
  const [title, setTitle] = useState("Add files to dataset");
  const { notification } = useNotify();
  const [uploadType, setUploadType] = useState<UploadFileType | undefined>(
    undefined,
  );
  const [fileList, setFileList] = useState<any>([]);
  const [confluenceConnecting, setConfluenceConnecting] = useState(false);
  const [confluenceConnectionError, setConfluenceConnectionError] = useState<
    undefined | string
  >(undefined);

  const [confluenceConnectionDetails, setconfluenceConnectionDetails] =
    useState<UnknownObject>({});
  const [selectedSpaces, setSelectedSpaces] = useState<any>({});
  const [confluenceSpaceOptions, setConfluenceSpaceOptions] = useState([]);
  const [confluenceDataConectorId, setConfluenceDataConectorId] = useState<
    undefined | string
  >(undefined);

  useEffect(() => {
    form.resetFields();
    setConfluenceConnectionError(undefined);
  }, [uploadType]);

  const changeSelectedSpaces = (newSelectedSpaces: UnknownObject) => {
    setSelectedSpaces(newSelectedSpaces);
  };

  const addFilesFromConfluence = () => {
    if (Object.keys(selectedSpaces || {})?.length < 1) {
      return notification.error({
        message: "Select atleast one page or space",
      });
    }
    addConfluenceFilesToDataset({
      data_connector_id: confluenceDataConectorId,
      parameters: {
        spaces: selectedSpaces,
        dataset_id: datasetId,
      },
    });
  };

  const connectConfluence = async (values: UnknownObject) => {
    try {
      setConfluenceConnecting(true);
      setSelectedSpaces([]);
      const payload = {
        ...values,
      };
      const connectConfluenceResponse = await connectConfluenceApi({
        source: values?.source,
        payload,
      });

      if (connectConfluenceResponse?.status === 200) {
        setConfluenceDataConectorId(
          connectConfluenceResponse?.data?.result?.data_connector_id,
        );
        const confluencePayload = {
          data_connector_id:
            connectConfluenceResponse?.data?.result?.data_connector_id,
        };
        const confluenceSpaceResponse = await confluenceSpaceDetailsApi({
          source: values?.source,
          payload: confluencePayload,
        });
        if (confluenceSpaceResponse?.status === 200) {
          setconfluenceConnectionDetails({ ...values });
          const newPageOptions =
            confluenceSpaceResponse?.data?.result?.spaces?.map((space: any) => {
              const spacePages =
                confluenceSpaceResponse?.data?.result?.pages?.[space?.id]?.map(
                  (singlePage: any) => {
                    return {
                      title: singlePage?.title,
                      value: singlePage?.id,
                      key: singlePage?.id,
                      parent: { ...space },
                      ...singlePage,
                    };
                  },
                ) || [];

              return {
                title: space?.name,
                value: space?.id,
                key: space?.id,
                ...space,
                children: spacePages,
              };
            });

          setConfluenceSpaceOptions(newPageOptions);
          setConfluenceConnectionError(undefined);
          setUploadType(UPLOAD_FILE_TYPES.CONFLUENCE_FILES);
        }
      }
    } catch (error) {
      setConfluenceConnectionError(getErrorFromApi(error));
      setConfluenceDataConectorId(undefined);
      setConfluenceSpaceOptions([]);
    } finally {
      setConfluenceConnecting(false);
    }
  };

  const getUploadStep = () => {
    switch (uploadType) {
      case UPLOAD_FILE_TYPES.FILE:
        return (
          <UploadManualFile
            form={form}
            addFilesHandler={addFilesHandler}
            fileList={fileList}
            setFileList={setFileList}
            loading={loading}
          />
        );
      case UPLOAD_FILE_TYPES.EXTERNAL_SOURCE:
        return (
          <SelectExternalSource
            setUploadType={setUploadType}
            ConnectorAvailableChannel={Data_Connectors_Available_Channels}
          />
        );
      case UPLOAD_FILE_TYPES.CONFLUENCE_CONFIG:
        return (
          <ConfluenceConfig
            form={form}
            connnectConfluence={connectConfluence}
            loading={confluenceConnecting}
            confluenceConnectionError={confluenceConnectionError}
            confluenceConnectionDetails={confluenceConnectionDetails}
          />
        );
      case UPLOAD_FILE_TYPES.CONFLUENCE_FILES:
        return (
          <ConfluenceFiles
            options={confluenceSpaceOptions}
            form={form}
            loading={loading}
            addFilesFromConfluence={addFilesFromConfluence}
            changeSelectedSpaces={changeSelectedSpaces}
          />
          // <Tree
          //   treeData={confluenceSpaceOptions} // Your tree data
          //   style={{ width: "100%" }}
          //   checkable
          //   multiple
          //   treeNodeFilterProp="title"
          // />
        );

      default:
        return (
          <DatasetUploadTypeContainer>
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

  const getActionButtons = () => {
    switch (uploadType) {
      case UPLOAD_FILE_TYPES.FILE:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  type="text"
                  danger
                  disabled={loading}
                  onClick={onClose}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  type="text"
                  disabled={loading}
                  onClick={() => setUploadType(undefined)}
                  style={{ fontWeight: "bold" }}
                >
                  Back
                </Button>
                <Button
                  block
                  type="primary"
                  disabled={!uploadType}
                  onClick={form.submit}
                  loading={loading}
                  style={{ fontWeight: "bold" }}
                >
                  Create
                </Button>
              </Space>
            </Col>
          </Row>
        );
      case UPLOAD_FILE_TYPES.EXTERNAL_SOURCE:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  type="text"
                  danger
                  disabled={loading}
                  onClick={onClose}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  type="text"
                  disabled={loading}
                  onClick={() => setUploadType(undefined)}
                  style={{ fontWeight: "bold" }}
                >
                  Back
                </Button>
                <Button
                  block
                  type="primary"
                  disabled={!uploadType}
                  onClick={form.submit}
                  loading={loading}
                  style={{ fontWeight: "bold" }}
                >
                  Create
                </Button>
              </Space>
            </Col>
          </Row>
        );
      case UPLOAD_FILE_TYPES.CONFLUENCE_CONFIG:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  type="text"
                  danger
                  disabled={confluenceConnecting}
                  onClick={onClose}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  type="text"
                  disabled={confluenceConnecting}
                  onClick={() =>
                    setUploadType(UPLOAD_FILE_TYPES.EXTERNAL_SOURCE)
                  }
                  style={{ fontWeight: "bold" }}
                >
                  Back
                </Button>
                <Form.Item noStyle>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    disabled={!uploadType}
                    onClick={form.submit}
                    loading={confluenceConnecting}
                    style={{ fontWeight: "bold" }}
                  >
                    Connect
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Row>
        );
      case UPLOAD_FILE_TYPES.CONFLUENCE_FILES:
        return (
          <Row justify="space-between">
            <Col>
              <Space>
                <Button
                  block
                  type="text"
                  danger
                  disabled={loading}
                  onClick={onClose}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button
                  type="text"
                  disabled={loading}
                  onClick={() => {
                    setUploadType(UPLOAD_FILE_TYPES.CONFLUENCE_CONFIG);

                    setConfluenceSpaceOptions([]);
                  }}
                  style={{ fontWeight: "bold" }}
                >
                  Back
                </Button>
                <Form.Item noStyle>
                  <Button
                    block
                    type="primary"
                    htmlType="submit"
                    disabled={!uploadType}
                    onClick={form.submit}
                    loading={loading}
                    style={{ fontWeight: "bold" }}
                  >
                    Connect
                  </Button>
                </Form.Item>
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
                  type="text"
                  danger
                  disabled={loading}
                  onClick={onClose}
                  style={{ fontWeight: "bold" }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
            <Col></Col>
          </Row>
        );
    }
  };

  return (
    <Modal
      title={<UploadTypeHeading>{title}</UploadTypeHeading>}
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
      style={{}}
      styles={{
        body: {
          padding: "12px 0",
        },
      }}
      footer={getActionButtons()}
    >
      {getUploadStep()}
    </Modal>
  );
};

export default DatasetAddFileModal;
