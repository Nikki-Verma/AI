import { AgentStatus } from "@/app/(authorisedHeaderLayout)/agents/constants";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { EyeFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Result,
  Row,
  Table,
  TablePaginationConfig,
  TableProps,
  Typography,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeployIcon from "../Icons/DeployIcon";

const { Text } = Typography;
const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  state: AgentStatus.COMPLETED,
  ...dynamicState,
});

const IntegrationAgentsList = () => {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters());
  const { data: session }: any = useSession();
  const {
    data: deployedAgents,
    isLoading,
    isError,
    error,
  } = useFetchData(
    session?.user?.permissions?.includes?.("ADMIN")
      ? config.agents.listAll
      : config.agents.list,
    {
      ...filters,
    },
  );

  useEffect(() => {
    router.prefetch(`/agents`);
    router.prefetch(`/integration/agents/[agentId]`);
  }, []);

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
      title: "Agent Name",
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
      title: "Knowledge Base",
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
      title: "Integrated Channels",
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
      width: 160,
      render: (_: any, dataset: UnknownObject) => {
        return (
          // <Space>
          <Row
            gutter={[0, 0]}
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Col span={20}>
              <Link href={`/integration/agents/${dataset?.pipeline_id}`}>
                <Button
                  style={{ width: "100%" }}
                  block
                  type="default"
                  icon={<EyeFilled />}
                >
                  View
                </Button>
              </Link>
            </Col>
          </Row>
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
          <Link href={`/agents`}>
            <Button type="primary" icon={<DeployIcon />}>
              Create Agents
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
            hideOnSinglePage: true,
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
