import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import {
  Button,
  Col,
  Result,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Typography,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DeployIcon from "../Icons/DeployIcon";
const { Text } = Typography;
const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  status: "DEPLOYED",
  ...dynamicState,
});

const IntegrationModelsList = () => {
  const [filters, setFilters] = useState(initialFilters());
  const {
    data: deployedModels,
    isLoading,
    isError,
    error,
  } = useFetchData(config.models.list, {
    ...filters,
  });

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
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

  const columns: TableProps<any>["columns"] = [
    {
      title: "Model name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (val) => (
        <Space size="small" align="center">
          <Image
            src={"/assets/Images/dummyModel.png"}
            height={32}
            width={32}
            alt="Model"
          />{" "}
          <Text ellipsis style={{ width: 200 }}>
            {val}
          </Text>
        </Space>
      ),
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      width: 200,
      render: (val: any) =>
        val ? (
          <Text ellipsis style={{ width: 200 }}>
            {val}
          </Text>
        ) : (
          "--"
        ),
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: 400,
      render: (val: any) =>
        val ? (
          <Text ellipsis style={{ width: 400 }}>
            {val}
          </Text>
        ) : (
          "--"
        ),
    },
    {
      title: "Integrated channels",
      dataIndex: "channels",
      key: "channels",
      render: (val: any) => (val ? <Text>{val} MB</Text> : "--"),
    },
    {
      title: "Actions",
      dataIndex: "",
      align: "left",
      fixed: "right",
      key: "actions",
      width: 100,
      render: (_: any, dataset: UnknownObject) => {
        return (
          <Space>
            <Link prefetch href={`/integration/model/${dataset?.id}`}>
              <Button type="primary">View Details</Button>
            </Link>
          </Space>
        );
      },
    },
  ];

  if (isError) {
    <Row justify="center">
      <Col>
        <Result
          status="500"
          title={getErrorFromApi(error)}
          subTitle="Please refresh or comeback in sometime"
        />
      </Col>
    </Row>;
  }
  if (!isLoading && !deployedModels?.result?.length) {
    return (
      <Result
        status={403}
        title="No deployed models available"
        extra={
          <Link prefetch href={`/workspace`}>
            <Button type="primary" icon={<DeployIcon />}>
              Deploy Models
            </Button>
          </Link>
        }
      />
    );
  }
  if (isLoading || !!deployedModels?.result?.length) {
    return (
      <>
        <Table
          columns={columns}
          dataSource={deployedModels?.result || []}
          rowKey={(data: any) => data?.pipeline_id}
          loading={isLoading}
          scroll={{
            x: "max-content",
            y: deployedModels?.result?.length > 0 ? 600 : undefined,
          }}
          pagination={{
            current: filters?.page + 1,
            pageSize: filters?.size,
            total: deployedModels?.totalElements,
            showSizeChanger: false,
          }}
          onChange={tableChangeHandler}
        />
      </>
    );
  }

  return null;
};

export default IntegrationModelsList;
