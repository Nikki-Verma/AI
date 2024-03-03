"use client";

import { createDatasetApi } from "@/api/dataset";
import EmptyUpload from "@/components/EmptyUpload";
import { useFetchData, usePostData } from "@/Hooks/useApi";
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
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { EyeFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
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
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import FolderIcon from "../../Icons/FolderIcon";
import SaDate from "../../SaDate/Index";
import CreateDatasetModal from "../CreateDatasetModal";
import { DatasetListContainer } from "./style";

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

const DatasetList = () => {
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [createDatasetOpen, setCreateDatasetOpen] = useState(false);
  const [createDatasetLoading, setCreateDatasetLoading] = useState(false);
  const { mutate } = usePostData(["createDataset"]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([]);
  const [filters, setFilters] = usePersistedQueryParams(initialFilters());
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.dataset.list,
    { ...filters },
    {},
  );

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
    sorter: SorterResult<DataType> | SorterResult<any>[],
    extra: any,
  ) => {
    if (pagination?.current !== +filters.page + 1) {
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
        notification.success({
          message: "Dataset created successfully",
        });
        refetch();
      }
    } catch (error) {
      notification.error({
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
      align: "left",
      key: "actions",
      width: 160,
      fixed: "right",
      render: (_: any, dataset: UnknownObject) => {
        return (
          // <Space>
          <Row gutter={[0,0]} style={{alignItems : 'center',justifyContent : 'space-between'}}>
                <Col span={20}>
            <Link prefetch href={`/dataset/${dataset?.id}`}>
              <Button style={{width : '100%'}} icon={<EyeFilled />}>View</Button>
            </Link>
            </Col>
            {/* <Col span={3} style={{display : 'flex',justifyContent : 'center'}}>
            <MoreOutlined style={{ fontSize: "21px", fontWeight: "bold", cursor : 'pointer' }} />
            </Col> */}
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
    columnWidth : 40
  };

  return (
    <DatasetListContainer>
      {isError && (
        <Result
          status="500"
          title="Something went wrong"
          subTitle={getErrorFromApi(error)}
        />
      )}
      {!data?.result?.length && !isError && !isLoading && (
        <EmptyUpload
          buttonText="Create your dataset"
          message="It seems like you have not created dataset yet."
          onClick={showDatasetModal}
        />
      )}
      {!isError && (!!data?.result?.length || isLoading) && (
        <>
          <Row justify="space-between" align="middle">
            <Col span={24} sm={6} md={4}>
              {/* <Input
                prefix={<SearchIcon style={{ marginRight: "6px" }} />}
                placeholder="Search by Dataset name, file name"
              /> */}
            </Col>
            <Col>
              <Space size="middle" align="center">
                {selectedRowKeys?.length > 0 && (
                  <Button
                    size="middle"
                    type="default"
                    disabled
                    icon={<PlusOutlined />}
                    onClick={addToKnowledgebaseHandler}
                  >
                    Add to knowledgebase
                  </Button>
                )}
                <Button
                  size="middle"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showDatasetModal}
                >
                  Create Dataset
                </Button>
              </Space>
            </Col>
          </Row>

          <Table
            columns={columns}
            dataSource={data?.result || []}
            rowSelection={rowSelection}
            loading={isLoading}
            rowKey={(data: any) => data?.id}
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
      <CreateDatasetModal
        open={createDatasetOpen}
        loading={createDatasetLoading}
        onClose={closeDatasetModel}
        createDatasetHandler={createDatasetHandler}
        title="Create your data collection set"
      />
    </DatasetListContainer>
  );
};

export default DatasetList;
