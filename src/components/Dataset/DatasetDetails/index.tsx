import {
  addConfluenceFilesToDatasetApi,
  deleteDatasetFilesApi,
} from "@/api/dataset";
import {
  addFileToKnowledgeBaseApi,
  createKnowledgeBaseApi,
} from "@/api/knowledgebase";
import EmptyUpload from "@/components/EmptyUpload";
import FileIcon from "@/components/Icons/FileIcon";
import AddFilesToKnowledgeBaseModal from "@/components/KnowledgeBase/AddFilesToKnowledgebaseModal";
import SaDate from "@/components/SaDate/Index";
import {
  PageAbout,
  PageTitle,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import {
  dateTimeFormatWithMilliseconds,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DUMMY_TENANT_ID,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import {
  getErrorFromApi,
  getFilters,
  uploadDatasetFiles,
} from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Result,
  Row,
  Skeleton,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Typography,
} from "antd";
import {
  FilterValue,
  SorterResult,
  TableRowSelection,
} from "antd/es/table/interface";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { v4 } from "uuid";
import DatasetAddFileModal from "../DatasetAddFileModal";
import { DatasetDetailsContainer, DeleteDatasetFileButton } from "./style";
const { Text } = Typography;

interface DataType {
  name: string;
  created_at: number;
  size: string;
}

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const DatasetDetails = (props: any) => {
  const router = useRouter();
  const { datasetId } = useParams();
  const { data: session }: any = useSession();
  const { notification } = useNotify();

  const [filters, setFilters] = usePersistedQueryParams(initialFilters());
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [addFileModalOpen, setAddFileModalOpen] = useState(false);
  const [datasetFilesDeleteLoading, setDatasetFilesDeleteLoading] = useState();
  const [addFileToKnowledgebaseOpen, setAddFileToKnowledgebaseOpen] =
    useState(false);
  const [addFilesLoading, setAddFilesLoading] = useState(false);
  const [addFilesToKnowledgebaseLoading, setAddFilesToKnowledgebaseLoading] =
    useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.dataset.files,
    { ...filters, dataset_id: datasetId },
    {},
  );
  const {
    data: datasetConfig,
    isLoading: datasetLoading,
    isError: datasetHasError,
    error: datasetErrorDetail,
    refetch: refetchDataset,
  } = useFetchData(config.dataset.list, { collectionId: datasetId }, {});

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<any>[],
    extra: any,
  ) => {
    if (pagination?.current === +filters.page + 1) {
      // reset page as with new filters there might not be any data at the current page
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        ...getFilters(Filters),
        page: DEFAULT_PAGE,
        size: pagination?.pageSize,
      }));
    } else {
      // set filters along with page change
      setFilters((state: any) => ({
        ...state,
        ...getFilters(Filters),
        page: (pagination?.current ?? 1) - 1,
        size: pagination?.pageSize,
      }));
    }
  };

  const toggleAddFileModal = () => {
    setAddFileModalOpen((val: boolean) => !val);
  };

  const toggleAddFilesToKnowledgebaseModal = () => {
    setAddFileToKnowledgebaseOpen((val: boolean) => !val);
  };

  const addConfluenceFilesToDataset = async (values: any) => {
    try {
      setAddFilesLoading(true);
      const payload = {
        ...values,
      };

      const addFileToConfluenceResponse = await addConfluenceFilesToDatasetApi({
        source: "confluence",
        payload,
      });
      if (addFileToConfluenceResponse?.status === 200) {
        notification.success({
          message: "Added files to dataset successfully",
        });
        toggleAddFileModal();
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while adding file to dataset",
        description: getErrorFromApi(error),
      });
    } finally {
      setAddFilesLoading(false);
    }
  };

  const addFilesHandler = async (values: any) => {
    try {
      setAddFilesLoading(true);
      const promiseArr = values?.dataset_files?.map((file: any) => {
        return uploadDatasetFiles(file?.originFileObj, {
          vertical_type: "DATASET",
          vertical_id: v4(),
          sub_vertical_type: "COLLECTION",
          sub_vertical_id: v4(),
          file_name: file?.name,
          remarks: "string",
          batch_process_needed: false,
          permanent: true,
          need_to_process: false,
          dataset_collection: datasetId,
        });
      });

      await Promise.allSettled(promiseArr)
        .then((res) => {
          let filesUploadSuccess = 0;
          let filesUploadedFailed = 0;
          res?.map((file: any) => {
            if (file?.status == "rejected") {
              filesUploadedFailed = filesUploadedFailed + 1;
            } else {
              filesUploadSuccess = filesUploadSuccess + 1;
            }
          });
          notification.info({
            message: `${filesUploadSuccess} files added to dataset successfully`,
            description: filesUploadedFailed ? (
              <Text type="danger">{`Failed to add ${filesUploadedFailed} to dataset `}</Text>
            ) : (
              ""
            ),
          });
          refetch();
          setAddFileModalOpen(false);
        })
        .catch((error) => {
          notification.error({
            message: "Error while uploading file",
            description: getErrorFromApi(error),
          });
        });
    } catch (error) {
      notification.error({
        message: "Error while adding file to dataset",
        description: getErrorFromApi(error),
      });
    } finally {
      setAddFilesLoading(false);
    }
  };

  const addFilesToExistingKnowledgeBase = async (values: any) => {
    try {
      setAddFilesToKnowledgebaseLoading(true);

      // Payload to add to knowledgebase
      const payload = {
        tenant_id: DUMMY_TENANT_ID,
        user_id: session?.user?.details?.id,
        document_id: selectedRowKeys,
        knowlede_base_id: values?.id,
      };

      const addFileToKnowledgeBaseResponse = await addFileToKnowledgeBaseApi({
        payload,
      });
      if (addFileToKnowledgeBaseResponse?.status == 200) {
        setSelectedRowKeys([]);
        setAddFileToKnowledgebaseOpen(false);
        setAddFilesToKnowledgebaseLoading(false);
        notification.success({
          message: "Added files to knowledgebase",
        });
        router.push(`/knowledge-base/${values?.id}`);
      }
    } catch (error) {
      notification.error({
        message: "Error while adding files to knowledgebase",
        description: getErrorFromApi(error),
      });
    } finally {
      setAddFilesToKnowledgebaseLoading(false);
    }
  };

  const createAndAddFilesToKnowledgeBase = async (values: any) => {
    try {
      setAddFilesToKnowledgebaseLoading(true);

      const payload = {
        ...values,
        username: session?.user?.details?.name,
        active: true,
      };

      const createKnowledgeBaseResponse = await createKnowledgeBaseApi({
        payload,
      });

      if (createKnowledgeBaseResponse?.status == 200) {
        // Payload to add to knowledgebase

        const payload = {
          tenant_id: DUMMY_TENANT_ID,
          user_id: session?.user?.details?.id,
          document_id: selectedRowKeys,
          knowlede_base_id: createKnowledgeBaseResponse?.data?.result?.id,
        };

        const addFileToKnowledgeBaseResponse = await addFileToKnowledgeBaseApi({
          payload,
        });
        if (addFileToKnowledgeBaseResponse?.status == 200) {
          setSelectedRowKeys([]);
          setAddFileToKnowledgebaseOpen(false);
          setAddFilesToKnowledgebaseLoading(false);
          notification.success({
            message: "Added files to knowledgebase",
          });
          router.push(
            `/knowledge-base/${createKnowledgeBaseResponse?.data?.result?.id}`,
          );
        }
      }
    } catch (error) {
      notification.error({
        message: "Error while adding files to knowledgebase",
        description: getErrorFromApi(error),
      });
    } finally {
      setAddFilesToKnowledgebaseLoading(false);
    }
  };

  const deleteDatasetFilesHandler = async (dataset: UnknownObject) => {
    try {
      setDatasetFilesDeleteLoading(dataset?.id);

      const deleteDatasetFilesResponse = await deleteDatasetFilesApi({
        params: { resource_id: dataset?.resource_id },
      });

      if (deleteDatasetFilesResponse?.status == 200) {
        notification.success({ message: "Dataset files deleted successfully" });
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while deleting dataset",
        description: getErrorFromApi(error),
      });
    } finally {
      setDatasetFilesDeleteLoading(undefined);
    }
  };

  const rowSelection: TableRowSelection<DataType> = {
    type: "checkbox",
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
    columnWidth: 40,
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
      width: 400,
      render: (val) => (
        <Space size="small">
          <FileIcon />{" "}
          <Text ellipsis style={{ width: 350 }}>
            {val}
          </Text>
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "createdAt",
      width: 300,
      render: (val) => {
        return val ? (
          <SaDate
            date={dayjs(val, dateTimeFormatWithMilliseconds)}
            inline
            time={true}
          />
        ) : (
          "--"
        );
      },
    },
    // {
    //   title: "File Size",
    //   dataIndex: "size",
    //   key: "size",
    //   render: (val, row) => {
    //     console.log("🚀 ~ DatasetDetails ~ row:", row);
    //     return val ? formatSizeUnits(val) : "-";
    //   },
    // },
    {
      title: "Actions",
      dataIndex: "",
      align: "center",
      key: "actions",
      width: 100,
      render: (_: any, dataset: UnknownObject) => {
        console.log("🚀 ~ DatasetDetails ~ dataset:", dataset);
        return (
          <Row
            gutter={[0, 0]}
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Col span={20}>
              <DeleteDatasetFileButton
                onClick={() => deleteDatasetFilesHandler(dataset)}
                type="default"
                loading={datasetFilesDeleteLoading === dataset?.id}
                disabled={!!datasetFilesDeleteLoading}
              >
                Delete
              </DeleteDatasetFileButton>
            </Col>
          </Row>
        );
      },
    },
  ];

  if (datasetLoading) {
    return (
      <Card size="default">
        <Skeleton active avatar loading paragraph={{ rows: 12 }} />
      </Card>
    );
  }
  if (datasetHasError) {
    return (
      <Row justify="center">
        <Col>
          <Result
            status="500"
            title={getErrorFromApi(error)}
            subTitle="Please refresh or comeback in sometime"
          />
        </Col>
      </Row>
    );
  }

  return (
    <DatasetDetailsContainer>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Col
          span={props?.page === "models" ? 18 : 16}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <PageTitle>{datasetConfig?.result?.[0]?.name}</PageTitle>
          </div>
          <PageAbout>{datasetConfig?.result?.[0]?.description}</PageAbout>
        </Col>
      </Row>
      {isError && (
        <Row justify="center">
          <Col>
            <Result
              status="500"
              title={getErrorFromApi(error)}
              subTitle="Please refresh or comeback in sometime"
            />
          </Col>
        </Row>
      )}
      {!data?.result?.length && !isLoading && (
        <EmptyUpload
          buttonText="Upload File"
          message="The dataset is empty"
          onClick={toggleAddFileModal}
        />
      )}
      {!isError && (isLoading || !!data?.result?.length) && (
        <>
          <Row justify="space-between" align="middle">
            <Col span={24} sm={6} md={4}>
              {/* <Input
                prefix={<SearchIcon style={{ marginRight: "6px" }} />}
                placeholder="Search by file name"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onPressEnter={() =>
                  //update filters once it is implemented
                  console.log("enter pressed")
                }
              /> */}
            </Col>
            <Col>
              <Space size="middle" align="center">
                {selectedRowKeys?.length > 0 && (
                  <Button
                    size="middle"
                    type="default"
                    icon={<PlusOutlined />}
                    onClick={toggleAddFilesToKnowledgebaseModal}
                  >
                    Add files to knowledgebase
                  </Button>
                )}
                <Button
                  size="middle"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={toggleAddFileModal}
                >
                  Add File
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data?.result || []}
            rowSelection={rowSelection}
            rowKey={(data: any) => data?.id}
            loading={isLoading}
            scroll={{
              x: "max-content",
              y: data?.result?.length > 0 ? 600 : undefined,
            }}
            pagination={{
              hideOnSinglePage: true,
              current: +filters?.page + 1,
              pageSize: +filters?.size,
              total: data?.totalElements,
              showSizeChanger: true,
            }}
            onChange={tableChangeHandler}
          />
        </>
      )}
      <DatasetAddFileModal
        open={addFileModalOpen}
        onClose={toggleAddFileModal}
        addFilesHandler={addFilesHandler}
        loading={addFilesLoading}
        addConfluenceFilesToDataset={addConfluenceFilesToDataset}
        datasetId={datasetId}
      />
      <AddFilesToKnowledgeBaseModal
        open={addFileToKnowledgebaseOpen}
        loading={addFilesToKnowledgebaseLoading}
        onClose={toggleAddFilesToKnowledgebaseModal}
        createAndAddFilesToKnowledgeBase={createAndAddFilesToKnowledgeBase}
        addFilesToExistingKnowledgeBase={addFilesToExistingKnowledgeBase}
        title="Add Files to knowledge base"
      />
    </DatasetDetailsContainer>
  );
};

export default DatasetDetails;
