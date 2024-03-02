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
import Link from "next/link";
import { useState } from "react";
import DeployIcon from "../Icons/DeployIcon";
import { AgentStatus } from "@/app/(authorisedHeaderLayout)/agents/constants";
const { Text } = Typography;
const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  state: AgentStatus.COMPLETED,
  ...dynamicState,
});

const IntegrationAgentsList = () => {
  const [filters, setFilters] = useState(initialFilters());
  const {
    data: deployedAgents,
    isLoading,
    isError,
    error,
  } = useFetchData(config.agents.list, {
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
      title: "Agent name",
      dataIndex: "agent_name",
      key: "agent_name",
      width: 250,
      render: (val) => (
        <Text ellipsis style={{ width: 200 }}>
          {val}
        </Text>
      ),
    },
    {
      title: "Description",
      dataIndex: "agent_description",
      key: "agent_description",
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
      title: "Model",
      dataIndex: "model_detail",
      key: "model_detail",
      width: 200,
      render: (val: any) =>
        val ? (
          <Text ellipsis style={{ width: 200 }}>
            {val?.model_name}
          </Text>
        ) : (
          "--"
        ),
    },
    {
      title: "Knowledge base",
      dataIndex: "kb",
      key: "kb",
      width: 200,
      render: (val: any) =>
        val ? (
          <Text ellipsis style={{ width: 200 }}>
            {val?.kb_name}
          </Text>
        ) : (
          "--"
        ),
    },
    {
      title: "Integrated channels",
      dataIndex: "channels",
      key: "channels",
      width: 200,
      render: (val: any) => (val ? <Text>{val}</Text> : "--"),
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
            <Link
              prefetch
              href={`/integration/agents/${dataset?.pipeline_id}`}
            >
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
  if (!isLoading && !deployedAgents?.result?.length) {
    return (
      <Result
        status={403}
        title="No published Agents available"
        extra={
          <Link prefetch href={`/agents`}>
            <Button type="primary" icon={<DeployIcon />}>
              Publish models
            </Button>
          </Link>
        }
      />
    );
  }
  if (isLoading || !!deployedAgents?.result?.length) {
    return (
      <>
        <Table
          columns={columns}
          dataSource={deployedAgents?.result || []}
          rowKey={(data: any) => data?.pipeline_id}
          loading={isLoading}
          scroll={{
            x: "max-content",
            y: deployedAgents?.result?.length > 0 ? 600 : undefined,
          }}
          pagination={{
            current: filters?.page + 1,
            pageSize: filters?.size,
            total: deployedAgents?.totalElements,
            showSizeChanger: false,
          }}
          onChange={tableChangeHandler}
        />
      </>
    );
  }

  return null;
};

export default IntegrationAgentsList;
