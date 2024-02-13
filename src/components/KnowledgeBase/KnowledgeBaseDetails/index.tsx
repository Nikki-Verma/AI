import EmptyUpload from "@/components/EmptyUpload";
import FileIcon from "@/components/Icons/FileIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import SaDate from "@/components/SaDate/Index";
import {
  PageAbout,
  PageTitle,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  dateTimeFormatWithMilliseconds,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/utils/constants";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  notification,
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
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

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
  const [api, contextHolder] = notification.useNotification();

  const [filters, setFilters] = useState(initialFilters());
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  // const [addFileModalOpen, setAddFileModalOpen] = useState(false);
  // const [addFilesLoading, setAddFilesLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
    if (pagination?.current === filters.page + 1) {
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

  // const toggleAddFileModal = () => {
  //   setAddFileModalOpen((val: boolean) => !val);
  // };

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
      title: "File Size",
      dataIndex: "size",
      key: "size",
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
      {contextHolder}
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
      {!isError && !data?.result?.length && !isLoading && (
        <EmptyUpload
          buttonText="Upload File"
          message="The knowledgebase is empty"
          // onClick={toggleAddFileModal}
        />
      )}
      {!isError && (isLoading || !!data?.result?.length) && (
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
                {selectedRowKeys?.length > 0 && (
                  <Button
                    size="middle"
                    type="default"
                    icon={<PlusOutlined />}
                    onClick={() => console.log("add files to knowledge base")}
                  >
                    Add files to knowledgebase
                  </Button>
                )}
                <Button
                  size="middle"
                  type="primary"
                  icon={<PlusOutlined />}
                  // onClick={toggleAddFileModal}
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
              current: filters?.page + 1,
              pageSize: filters?.size,
              total: data?.totalElements,
              showSizeChanger: true,
            }}
            onChange={tableChangeHandler}
          />
        </>
      )}
    </KnowledgeBaseDetailsContainer>
  );
};

export default KnowledgeBaseDetails;
