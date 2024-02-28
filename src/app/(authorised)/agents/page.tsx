"use client";

import EmptyUpload from "@/components/EmptyUpload";
import {
  PageContainer,
} from "@/components/UIComponents/UIComponents.style";
import { useNotify } from "@/providers/notificationProvider";
import { useAppStore } from "@/store";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeading from "@/components/PageHeading";
import CreateAgentModal from "@/components/CreateAgentModal";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { createAgentApi } from "@/api/agents";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dateTimeFormatWithMillisecondsWithoutTimeZone } from "@/utils/constants";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
    ApiOutlined,
    EditOutlined,
    PlayCircleOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
import { LinkContainer } from "./style";
import Link from "next/link";
import { AgentStatuses } from "./constants";
import Tags from "@/components/Tags";
import { AgentStatus, AgentStatusType } from "@/app/(authorisedHeaderLayout)/agents/constants";
import SaDate from "@/components/SaDate/Index";
import dayjs from "@/utils/date";
import { FilterValue, SorterResult } from "antd/es/table/interface";

const { Title, Text, Link: TypographyLink } = Typography;
const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
    page: DEFAULT_PAGE,
    size: DEFAULT_PAGE_SIZE,
    ...dynamicState,
  });
  
const Agents = () => {
  const { updatePageConfig } = useAppStore();
  const router = useRouter();

  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [createAgentflowLoading, setCreateAgentflowLoading] = useState(false);
  const [isCreateAgentModalVisible, setIsCreateAgentModalVisible] = useState<boolean>(false)
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [createWorkflowLoading, setCreateWorkflowLoading] = useState(false);
  const [filters, setFilters] = usePersistedQueryParams(initialFilters({}));
  console.log("🚀 ~ Workflow ~ filters:", filters);
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.agents.list,
    { ...filters },
    {},
  );

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
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

  const toggleCreateAgentHandler = () => {
    setIsCreateAgentModalVisible((prev: boolean) => !prev);
  };

  const createAgentflowHandler = async (values: UnknownObject) => {
    try {
        setCreateAgentflowLoading(true);
      const payload = {
        ...values,
        // agent_state: "CREATED",
      };

      const createAgentflowResponse = await createAgentApi({ payload });
      console.log(`agent creation response`,createAgentflowResponse)

      if (createAgentflowResponse?.status == 200) {
        notification.success({ message: "Agent created successfully" });
        setIsCreateAgentModalVisible(false);
        // refetch();
        router.push(
          `/agents/edit/${createAgentflowResponse?.data?.result?.pipeline_id}`,
        );
      }
    } catch (error) {
      notification.error({
        message: "Error while creating agent",
        description: getErrorFromApi(error),
      });
    } finally {
        setCreateAgentflowLoading(false);
    }
  };

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Agent",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, []);

  const columns: TableProps<any>["columns"] = [
    {
      title: "Agent name",
      dataIndex: "agent_name",
      key: "agent_name",
      width: 200,
      render: (val: any, data: any) => (
        <LinkContainer>
        <Link prefetch href={`/workflow/view/${data?.pipeline_id}`}>
          {val}
        </Link>
        </LinkContainer>
      ),
    },
    {
      title: "Description",
      dataIndex: "agent_description",
      key: "agent_description",
      width: 200,
      render: (val: any) => (
        <Text ellipsis style={{ width: 200 }}>
          {val || "--"}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "agent_state",
      key: "agent_state",
      width: 200,
      render: (val: AgentStatusType) =>
        val ? (
          <Tags
          tag={AgentStatuses?.[val]?.text ?? val}
          tagProps={
            {color :AgentStatuses?.[val]?.color || "", background : AgentStatuses?.[val]?.background, border : AgentStatuses?.[val]?.border}
          }
          />
          // <Tags color={WorkflowStatuses?.[val]?.color || ""}>
          //   {WorkflowStatuses?.[val]?.text ?? val}
          // </TTagsag>
        ) : (
          "--"
        ),
    },
    {
      title: "Model name",
      dataIndex: "model_detail",
      key: "model_name",
      width: 200,
      render: (val: any) => (
        <Text ellipsis style={{ width: 200 }}>
          {val?.model_name || "--"}
        </Text>
      ),
    },
    {
      title: "Model version",
      dataIndex: "model_detail",
      key: "model_version",
      width: 200,
      render: (val: any) => (
        <Text ellipsis style={{ width: 200 }}>
          {val?.model_version || "--"}
        </Text>
      ),
    },
    {
      title: "Knowledge base",
      dataIndex: "kb",
      key: "kb_name",
      width: 200,
      render: (val: any) => (
        <Text ellipsis style={{ width: 200 }}>
          {val?.kb_name || "--"}
        </Text>
      ),
    },
    // {
    //   title: "Knowledge base version",
    //   dataIndex: "kb",
    //   key: "kb_version",
    //   width: 200,
    //   render: (val: any) => (
    //     <Text ellipsis style={{ width: 200 }}>
    //       {val?.kb_version || "--"}
    //     </Text>
    //   ),
    // },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (val: any) =>
        val ? (
          <SaDate
            date={dayjs(val, dateTimeFormatWithMillisecondsWithoutTimeZone)}
            inline
            time
          />
        ) : (
          "--"
        ),
    },
    {
      title: "Actions",
      dataIndex: "",
      align: "left",
      key: "actions",
      width: 160,
      fixed: "right",
      render: (_: any, workflowData: UnknownObject) => (
        <>
          {workflowData?.pipeline_state === AgentStatus.COMPLETED ? (
            <Space>
              <Link
                prefetch
                href={`/workflow/playground/${workflowData?.pipeline_id}`}
              >
                <Button block type="primary" icon={<PlayCircleOutlined />}>
                  Playground
                </Button>
              </Link>
              <Link
                prefetch
                href={`/integration/workflow/${workflowData?.pipeline_id}`}
              >
                <Button block type="default" icon={<ApiOutlined />}>
                  Integration
                </Button>
              </Link>
            </Space>
          ) : (
            <Link prefetch href={`/agents/edit/${workflowData?.pipeline_id}`}>
              <Button block type="primary" icon={<EditOutlined />}>
                Continue edit
              </Button>
            </Link>
          )}
        </>
      ),
    },
  ];


  return (
    <PageContainer>
      <Row
        gutter={[12, 12]}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
      <PageHeading
        title="Agents"
        subHeading="Explore a vast array of meticulously trained and readily deployable
        machine learning models all conveniently centralized in a single
        location."
      />
      </Row>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col>
          
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleCreateAgentHandler}
            >
              Create Agent
            </Button>
          </Col>
        </Row>
      </Col>
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
            buttonText="Create agent"
            message="You do not have any agents yet"
            onClick={toggleCreateAgentHandler}
            />
        )}
        {!isError && (isLoading || !!data?.result?.length) && (
            <>
            <Table
                columns={columns}
                dataSource={data?.result || []}
                rowKey={(data: any) => data?.pipeline_id}
                loading={isLoading}
                scroll={{
                x: "max-content",
                y: data?.result?.length > 0 ? 600 : undefined,
                }}
                pagination={{
                current: +filters?.page + 1,
                pageSize: +filters?.size,
                total: data?.totalElements,
                showSizeChanger: false,
                }}
                onChange={tableChangeHandler}
            />
            </>
        )}


        <CreateAgentModal
        open={isCreateAgentModalVisible}
        onClose={toggleCreateAgentHandler}
        loading={createAgentflowLoading}
        createAgentflowHandler={createAgentflowHandler}
        />
    </PageContainer>
  );
};

export default Agents;
