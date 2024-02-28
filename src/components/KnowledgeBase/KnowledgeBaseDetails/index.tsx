import { addFileToKnowledgeBaseApi } from "@/api/knowledgebase";
import EmptyUpload from "@/components/EmptyUpload";
import FileIcon from "@/components/Icons/FileIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
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
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DUMMY_TENANT_ID,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import {
  CloudDownloadOutlined,
  MoreOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
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
import ImportFilesFromDatasetModal from "../ImportFilesFromDatasetModal";
import KnowledgebasePlaygroundDrawer from "../KnowledgebasePlaygroundDrawer";

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
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  // const [addFileModalOpen, setAddFileModalOpen] = useState(false);
  // const [addFilesLoading, setAddFilesLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [displayKbPlayground, setDisplayKbPlayground] = useState(false);
  const { data, isLoading, isError, error, refetch } = useFetchData(
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
        tenant_id: DUMMY_TENANT_ID,
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

  const toggleKbPlayground = () => {
    setDisplayKbPlayground((prev: boolean) => !prev);
  };

  const rowSelection: TableRowSelection<DataType> = {
    type: "checkbox",
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
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
      width: 250,
      render: (val) => {
        return val ? <SaDate date={dayjs(val)} inline time={true} /> : "--";
      },
    },
    {
      title: "File Size",
      dataIndex: "size",
      key: "size",
      width: 200,
      render: (val) => (val ? <Text>{val} MB</Text> : "--"),
    },
    {
      title: "Actions",
      dataIndex: "",
      align: "center",
      key: "actions",
      width: 100,
      render: (_: any, knowledgebase: UnknownObject) => {
        return (
          <Space>
            <MoreOutlined style={{ fontSize: "28px", fontWeight: "bold" }} />
          </Space>
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
      {/* TODO: Follow this pattern everywhere for loader/error/data */}
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
      {!isError && !data?.document_details?.length && !isLoading && (
        <EmptyUpload
          buttonText="Add files from dataset"
          message="The knowledgebase is empty"
          onClick={toggleAddFileModal}
        />
      )}
      {!isError && (isLoading || !!data?.document_details?.length) && (
        <>
          <Row justify="space-between" align="middle">
            <Col span={24} sm={6} md={4}>
              <Input
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
              />
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
                <Button
                  size="middle"
                  type="default"
                  icon={<PlayCircleOutlined />}
                  onClick={toggleKbPlayground}
                >
                  Knowledge base playground
                </Button>
              </Space>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={data?.document_details || []}
            // rowSelection={rowSelection}
            rowKey={(data: any) => data?.id}
            loading={isLoading}
            scroll={{
              x: "max-content",
              y: data?.document_details?.length > 0 ? 600 : undefined,
            }}
            pagination={{
              current: +filters?.page + 1,
              pageSize: +filters?.size,
              total: data?.total_elements,
              showSizeChanger: true,
            }}
            onChange={tableChangeHandler}
          />
        </>
      )}
      <ImportFilesFromDatasetModal
        title="Import files from dataset"
        open={importDatasetOpen}
        loading={importDatasetLoading}
        onClose={toggleAddFileModal}
        addFilesHandler={addFilesHandler}
        knowledgebaseId={knowledgebaseId}
      />
      <KnowledgebasePlaygroundDrawer
        open={displayKbPlayground}
        onClose={toggleKbPlayground}
        kbDetails={knowledgebaseConfig?.result?.[0] || {}}
      />
    </KnowledgeBaseDetailsContainer>
  );
};

export default KnowledgeBaseDetails;
