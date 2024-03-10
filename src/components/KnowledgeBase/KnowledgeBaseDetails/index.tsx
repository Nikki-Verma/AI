import {
  addFileToKnowledgeBaseApi,
  deleteKnowledgebaseFilesApi,
} from "@/api/knowledgebase";
import { DeleteDatasetFileButton } from "@/components/Dataset/DatasetDetails/style";
import FileIcon from "@/components/Icons/FileIcon";
import SaDate from "@/components/SaDate/Index";
import TableEmptyData from "@/components/TableEmptyData";
import Tags from "@/components/Tags";
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
} from "@/utils/constants";
import dayjs from "@/utils/date";
import {
  formatSizeUnits,
  getErrorFromApi,
  getFilters,
} from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { AimOutlined, CloudDownloadOutlined } from "@ant-design/icons";
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
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import ImportFilesFromDatasetModal from "../ImportFilesFromDatasetModal";
import { INJESTION_STATUS } from "./constant";

import { KnowledgeBaseDetailsContainer } from "./style";
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

const KnowledgeBaseDetails = (props: any) => {
  const router = useRouter();
  const { knowledgebaseId } = useParams();
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [filters, setFilters] = usePersistedQueryParams(initialFilters());
  const [importDatasetOpen, setImportDatasetOpen] = useState(false);
  const [importDatasetLoading, setImportDatasetLoading] = useState(false);
  const [knowledgebaseFilesDeleteLoading, setKnowledgebaseFilesDeleteLoading] =
    useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  // const [addFileModalOpen, setAddFileModalOpen] = useState(false);
  // const [addFilesLoading, setAddFilesLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [displayKbSettings, setDisplayKbSettings] = useState(false);
  const { data, isLoading, isRefetching, isError, error, refetch } =
    useFetchData(
      config.knowledgebase.files,
      { ...filters, knowledgebase_id: knowledgebaseId },
      {},
    );

  const {
    data: knowledgebaseConfig,
    isLoading: knowledgebaseLoading,
    isError: knowledgebaseHasError,
    error: knowledgebaseErrorDetail,
    refetch: refetchDataset,
  } = useFetchData(
    config.knowledgebase.list,
    { knowledgeBaseId: knowledgebaseId },
    {},
  );

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
    setImportDatasetOpen((val: boolean) => !val);
  };

  const addFilesHandler = async (values: UnknownObject) => {
    try {
      setImportDatasetLoading(true);

      // Payload to add to knowledgebase
      const payload = {
        tenant_id: session?.user?.details?.tenantId,
        user_id: session?.user?.details?.id,
        knowlede_base_id: knowledgebaseId,
        ...values,
      };

      const addFileToKnowledgeBaseResponse = await addFileToKnowledgeBaseApi({
        payload,
      });
      if (addFileToKnowledgeBaseResponse?.status == 200) {
        setImportDatasetOpen(false);
        notification.success({
          message: "Added files to knowledgebase",
        });
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while adding files to knowledgebase",
        description: getErrorFromApi(error),
      });
    } finally {
      setImportDatasetLoading(false);
    }
  };

  const toggleKbSettings = () => {
    setDisplayKbSettings((prev: boolean) => !prev);
  };

  const deleteKnowledgebaseFilesHandler = async (
    knowledgebase: UnknownObject,
  ) => {
    console.log("🚀 ~ KnowledgeBaseDetails ~ knowledgebase:", knowledgebase);
    try {
      setKnowledgebaseFilesDeleteLoading(knowledgebase?.id);

      const deleteKnowledgebaseFilesResponse =
        await deleteKnowledgebaseFilesApi({
          params: { kb_id: knowledgebaseId, document_id: knowledgebase?.id },
        });

      if (deleteKnowledgebaseFilesResponse?.status == 200) {
        notification.success({
          message: "Knowledge base files deleted successfully",
        });
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while deleting knowledge base files",
        description: getErrorFromApi(error),
      });
    } finally {
      setKnowledgebaseFilesDeleteLoading(undefined);
    }
  };

  const rowSelection: TableRowSelection<DataType> = {
    type: "checkbox",
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const retrievalDisabled = !(
    data?.document_details?.some(
      (document: UnknownObject) => document?.injestion_status === "COMPLETED",
    ) ?? true
  );
  console.log("files data", data);
  console.log(
    "🚀 ~ KnowledgeBaseDetails ~ retrievalDisabled:",
    retrievalDisabled,
  );

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
      title: "File Size",
      dataIndex: "file_size",
      key: "file_size",
      width: 200,
      render: (val) => {
        return val ? formatSizeUnits(val) : "-";
      },
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: 200,
      render: (val) => (
        <Space size="small">
          <Text ellipsis style={{ width: 200 }}>
            {val || "-"}
          </Text>
        </Space>
      ),
    },
    {
      title: "Ingestion Status",
      dataIndex: "injestion_status",
      key: "injestion_status",
      width: 200,
      render: (val: any) => {
        return val ? (
          <Tags
            tag={INJESTION_STATUS?.[val]?.text ?? val}
            tagProps={{
              color: INJESTION_STATUS?.[val]?.color || "",
              background: INJESTION_STATUS?.[val]?.background,
              border: INJESTION_STATUS?.[val]?.border,
            }}
          />
        ) : (
          ""
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "createdAt",
      width: 250,
      render: (val: any, row: any) => {
        console.log("🚀 ~ KnowledgeBaseDetails ~ row:", row);
        console.log("🚀 ~ KnowledgeBaseDetails ~ val:", val);
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
    {
      title: "Actions",
      dataIndex: "",
      align: "center",
      key: "actions",
      width: 100,
      render: (_: any, knowledgebase: UnknownObject) => {
        return (
          <Row
            gutter={[0, 0]}
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Col span={20}>
              <DeleteDatasetFileButton
                onClick={() => deleteKnowledgebaseFilesHandler(knowledgebase)}
                type="default"
                loading={knowledgebaseFilesDeleteLoading === knowledgebase?.id}
                disabled={!!knowledgebaseFilesDeleteLoading}
              >
                Delete
              </DeleteDatasetFileButton>
            </Col>
          </Row>
        );
      },
    },
  ];

  if (knowledgebaseLoading) {
    return (
      <Card size="default">
        <Skeleton active avatar loading paragraph={{ rows: 12 }} />
      </Card>
    );
  }
  if (knowledgebaseHasError) {
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
    <KnowledgeBaseDetailsContainer>
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
            <PageTitle>{knowledgebaseConfig?.result?.[0]?.name}</PageTitle>
          </div>
          <PageAbout>{knowledgebaseConfig?.result?.[0]?.description}</PageAbout>
        </Col>
      </Row>
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
            <Button
              size="middle"
              type="primary"
              icon={<CloudDownloadOutlined />}
              onClick={toggleAddFileModal}
            >
              Import from Dataset
            </Button>
            <Link href={`/knowledge-base/${knowledgebaseId}/playground`}>
              <Button
                size="middle"
                type="default"
                icon={<AimOutlined />}
                disabled={retrievalDisabled}
              >
                Retrieval Testing
              </Button>
            </Link>
            {/* <Button
                  size="middle"
                  type="default"
                  icon={<SettingOutlined />}
                  onClick={toggleKbSettings}
                >
                  Setting
                </Button> */}
          </Space>
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
      {!isError && (
        <Row>
          <Col span={24}>
            <Table
              locale={{
                emptyText() {
                  return (
                    <TableEmptyData
                      message="The knowledgebase is empty"
                      showEmpty={
                        !!(
                          data?.document_details?.length < 1 &&
                          !isLoading &&
                          !isRefetching
                        )
                      }
                    />
                  );
                },
              }}
              columns={columns}
              dataSource={data?.document_details || []}
              // rowSelection={rowSelection}
              rowKey={(data: any) => data?.id}
              loading={isLoading || isRefetching}
              scroll={{
                x: "max-content",
                y: data?.document_details?.length > 0 ? 600 : undefined,
              }}
              pagination={{
                hideOnSinglePage: true,
                current: +filters?.page + 1,
                pageSize: +filters?.size,
                total: data?.total_elements,
                showSizeChanger: true,
              }}
              onChange={tableChangeHandler}
            />
          </Col>
        </Row>
      )}
      <ImportFilesFromDatasetModal
        title="Import files from dataset"
        open={importDatasetOpen}
        loading={importDatasetLoading}
        onClose={toggleAddFileModal}
        addFilesHandler={addFilesHandler}
        knowledgebaseId={knowledgebaseId}
      />
      {/* <KbSettingsModal
        open={displayKbSettings}
        onClose={toggleKbSettings}
        kbDetails={knowledgebaseConfig?.result?.[0] || {}}
      /> */}
    </KnowledgeBaseDetailsContainer>
  );
};

export default KnowledgeBaseDetails;
