"use client";

import { createDatasetApi } from "@/api/dataset";
import EmptyUpload from "@/components/EmptyUpload";
import FolderIcon from "@/components/Icons/FolderIcon";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  dateTimeFormatWithMilliseconds,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DUMMY_TENANT_ID,
} from "@/utils/constants";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { EyeFilled, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  notification,
  Progress,
  Result,
  Row,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import SearchIcon from "../../Icons/SearchIcon";
import SaDate from "../../SaDate/Index";

import { KnowledgeBaseListContainer, ProgressBar } from "./style";

const { Title } = Typography;

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

const KnowledgeBaseList = () => {
  const { data: session }: any = useSession();
  const [api, contextHolder] = notification.useNotification();
  const [createDatasetOpen, setCreateDatasetOpen] = useState(false);
  const [createDatasetLoading, setCreateDatasetLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [filters, setFilters] = useState(initialFilters());
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.knowledgebase.list,
    { ...filters },
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

  const showDatasetModal = () => {
    setCreateDatasetOpen(true);
  };

  const closeDatasetModel = () => {
    setCreateDatasetOpen(false);
  };

  const createDatasetHandler = async (values: any) => {
    try {
      setCreateDatasetLoading(true);

      const payload = {
        name: values?.dataset_name,
        description: values?.dataset_description,
        tenant_id: DUMMY_TENANT_ID,
        user_id: session?.user?.details?.id,
        username: session?.user?.details?.name,
        files_count: 0,
        size: 0,
        active: true,
      };

      const datasetResponse = await createDatasetApi({ payload });

      if (datasetResponse?.status === 200) {
        setCreateDatasetOpen(false);
        api.success({
          message: "Dataset created successfully",
        });
        refetch();
      }
    } catch (error) {
      api.error({
        message: "Error while creating dataset",
        description: getErrorFromApi(error),
      });
    } finally {
      setCreateDatasetLoading(false);
    }
  };

  const addToKnowledgebaseHandler = () => {
    console.log(
      "user row selection to add the selected rows to knwoledge base",
    );
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (val) => (
        <Space size="small">
          <FolderIcon /> {val}
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "createdAt",
      width: 250,
      render: (val) => {
        return (
          <SaDate
            date={dayjs(val, dateTimeFormatWithMilliseconds)}
            inline
            time={true}
          />
        );
      },
    },
    {
      title: "File Size",
      dataIndex: "size",
      key: "size",
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
            <Link href={`/knowledge-base/${knowledgebase?.id}`}>
              <Button icon={<EyeFilled />}>View</Button>
            </Link>
            <MoreOutlined style={{ fontSize: "28px", fontWeight: "bold" }} />
          </Space>
        );
      },
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    type: "checkbox",
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <KnowledgeBaseListContainer>
      {contextHolder}
      <ProgressBar>
        <Progress percent={70} />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#727272",
              fontSize: "14px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            File upload limit
          </span>
          <div style={{ display: "flex", gap: "11px" }}>
            <span
              style={{
                color: "#727272",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "24px",
              }}
            >
              10 kb / 50 GB
            </span>
            <a
              style={{
                textDecoration: "underline",
                color: "#602EDF",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "24px",
                cursor: "pointer",
              }}
            >
              Upgrade space
            </a>
          </div>
        </div>
      </ProgressBar>
      {isError && (
        <Result
          status="500"
          title="Something went wrong"
          subTitle={getErrorFromApi(error)}
        />
      )}
      {!data?.result?.length && !isError && !isLoading && (
        <EmptyUpload
          buttonText="Create your knowledge base"
          message="It seems like you have not created knowledge base yet."
          onClick={showDatasetModal}
        />
      )}
      {!isError && (
        <Row justify="space-between" align="middle">
          <Col span={24} sm={6} md={4}>
            <Input
              prefix={<SearchIcon style={{ marginRight: "6px" }} />}
              placeholder="Search by file name"
            />
          </Col>
          <Col>
            <Space size="middle" align="center">
              <Button
                size="middle"
                type="primary"
                icon={<PlusOutlined />}
                onClick={showDatasetModal}
              >
                Create Knowledge Base
              </Button>
            </Space>
          </Col>
        </Row>
      )}
      {!isError && (
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
      )}
    </KnowledgeBaseListContainer>
  );
};

export default KnowledgeBaseList;
