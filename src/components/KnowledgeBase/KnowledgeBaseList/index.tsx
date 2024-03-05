"use client";

import {
  createKnowledgeBaseApi,
  deleteKnowledgebaseApi,
} from "@/api/knowledgebase";
import EmptyUpload from "@/components/EmptyUpload";
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
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import {
  DatabaseFilled,
  EyeFilled,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  MenuProps,
  Result,
  Row,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import {
  FilterValue,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SaDate from "../../SaDate/Index";
import CreateKnowledgeBaseModal from "../CreateKnowledgeBaseModal";
import { KNOWLEDGEBASE_SETTING } from "./constant";

import { KnowledgeBaseListContainer } from "./style";

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
  const router = useRouter();
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [createKnowledgeBaseOpen, setCreateKnowledgeBaseOpen] = useState(false);
  const [knowledgebaseDeleteLoading, setKnowledgebaseDeleteLoading] =
    useState();
  const [createKnowledgeBaseLoading, setCreateKnowledgeBaseLoading] =
    useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [filters, setFilters] = usePersistedQueryParams(initialFilters());
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.knowledgebase.list,
    { ...filters },
    {},
  );

  useEffect(() => {
    router.prefetch(`/knowledge-base/[knowledgebaseId]`);
  }, []);

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
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

  const showKnowledgeBaseModal = () => {
    setCreateKnowledgeBaseOpen(true);
  };

  const closeKnowledgeBaseModel = () => {
    setCreateKnowledgeBaseOpen(false);
  };

  const createKnowledgeBaseHandler = async (values: any) => {
    try {
      setCreateKnowledgeBaseLoading(true);

      const payload = {
        ...values,
        username: session?.user?.details?.name,
        active: true,
      };

      const knowledgeBaseResponse = await createKnowledgeBaseApi({ payload });

      if (knowledgeBaseResponse?.status === 200) {
        setCreateKnowledgeBaseOpen(false);
        notification.success({
          message: "Knowledge base created successfully",
        });
        router.push(
          `/knowledge-base/${knowledgeBaseResponse?.data?.result?.id}`,
        );
      }
    } catch (error) {
      notification.error({
        message: "Error while creating knowledge base",
        description: getErrorFromApi(error),
      });
    } finally {
      setCreateKnowledgeBaseLoading(false);
    }
  };

  const knowledgebaseDatasetHandler = async (knowledgebase: UnknownObject) => {
    try {
      setKnowledgebaseDeleteLoading(knowledgebase?.id);

      const deleteKnowledgebaseResponse = await deleteKnowledgebaseApi({
        params: { id: knowledgebase?.id },
      });

      if (deleteKnowledgebaseResponse?.status == 200) {
        notification.success({
          message: "Knowledge base deleted successfully",
        });
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while deleting knowledge base",
        description: getErrorFromApi(error),
      });
    } finally {
      setKnowledgebaseDeleteLoading(undefined);
    }
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "File Name",
      dataIndex: "name",
      key: "name",
      width: 400,
      render: (val) => (
        <Space size={2}>
          <DatabaseFilled /> {val}
        </Space>
      ),
    },
    // {
    //   title: "File Size",
    //   dataIndex: "size",
    //   key: "size",
    //   width : 200,
    //   render : (val) => {
    //     return(
    //       val ? formatSizeUnits(val) : '-'

    //     )
    //   },
    // },
    {
      title: "KB setting",
      dataIndex: "kb_setting",
      key: "kb_setting",
      width: 200,
      render: (val) => {
        return val ? KNOWLEDGEBASE_SETTING[val] ?? val : "-";
      },
    },
    {
      title: "Embedding model",
      dataIndex: "embed_model_name",
      key: "embed_model_name",
      width: 250,
      render: (val) => {
        return val ?? "-";
      },
    },
    {
      title: "Vector DB",
      dataIndex: "vector_db",
      key: "vector_db",
      width: 250,
      render: (val) => {
        return val ?? "-";
      },
    },
    {
      title: "Top K Results",
      dataIndex: "top_kresults",
      key: "top_kresults",
      width: 150,
      render: (val) => {
        return val ?? "-";
      },
    },
    {
      title: "Similarities percentage",
      dataIndex: "similarities_percentage",
      key: "similarities_percentage",
      width: 250,
      render: (val) => {
        return val ? `${val}%` : "-";
      },
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
      title: "Created by",
      dataIndex: "username",
      key: "username",
      width: 250,
      render: (val) => {
        return val ?? "-";
      },
    },
    {
      title: "Last updated At",
      dataIndex: "updated_at",
      key: "updated_at",
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
      title: "Last updated by",
      dataIndex: "updated_by_name",
      key: "updated_by_name",
      width: 250,
      render: (val) => {
        return val ?? "-";
      },
    },
    {
      title: "Actions",
      dataIndex: "",
      align: "left",
      key: "actions",
      fixed: "right",
      width: 160,
      render: (_: any, knowledgebase: UnknownObject) => {
        console.log("🚀 ~ DatasetList ~ dataset:", knowledgebase);
        const extraItems: MenuProps["items"] = [
          {
            key: "delete",
            label: (
              <Button
                onClick={() => knowledgebaseDatasetHandler(knowledgebase)}
                style={{ color: "#FF0000" }}
                type="text"
                loading={knowledgebaseDeleteLoading === knowledgebase?.id}
                disabled={!!knowledgebaseDeleteLoading}
              >
                Delete
              </Button>
            ),
          },
        ];
        return (
          // <Space>
          <Row
            gutter={[0, 0]}
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Col span={20}>
              <Link prefetch href={`/knowledge-base/${knowledgebase?.id}`}>
                <Button
                  style={{ width: "100%" }}
                  icon={<EyeFilled />}
                  disabled={!!knowledgebaseDeleteLoading}
                >
                  View
                </Button>
              </Link>
            </Col>
            <Col span={3} style={{ display: "flex", justifyContent: "center" }}>
              <Dropdown menu={{ items: extraItems }} placement="bottomLeft">
                <MoreOutlined
                  style={{
                    fontSize: "21px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
              </Dropdown>
            </Col>
          </Row>
          // </Space>
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
    columnWidth: 40,
  };

  return (
    <KnowledgeBaseListContainer>
      {/* <ProgressBar>
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
      </ProgressBar> */}
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
          onClick={showKnowledgeBaseModal}
        />
      )}
      {!isError && (!!data?.result?.length || isLoading) && (
        <>
          <Row justify="space-between" align="middle">
            <Col span={24} sm={6} md={4}>
              {/* <Input
                prefix={<SearchIcon style={{ marginRight: "6px" }} />}
                placeholder="Search by file name"
              /> */}
            </Col>
            <Col>
              <Space size="middle" align="center">
                <Button
                  size="middle"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showKnowledgeBaseModal}
                >
                  Create Knowledge Base
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
      <CreateKnowledgeBaseModal
        title="Create Knowledge Base"
        loading={createKnowledgeBaseLoading}
        open={createKnowledgeBaseOpen}
        onClose={closeKnowledgeBaseModel}
        createKnowledgeBaseHandler={createKnowledgeBaseHandler}
      />
    </KnowledgeBaseListContainer>
  );
};

export default KnowledgeBaseList;
