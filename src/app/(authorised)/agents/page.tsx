"use client";

import { createAgentApi, deleteAgentApi } from "@/api/agents";
import {
  AgentStatus,
  AgentStatusType,
} from "@/app/(authorisedHeaderLayout)/agents/constants";
import CreateAgentModal from "@/components/CreateAgentModal";
import EmptyUpload from "@/components/EmptyUpload";
import PageHeading from "@/components/PageHeading";
import SaDate from "@/components/SaDate/Index";
import Tags from "@/components/Tags";
import { PageContainer } from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
import { useNotify } from "@/providers/notificationProvider";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import {
  dateTimeFormatWithMillisecondsWithoutTimeZone,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import {
  ApiOutlined,
  EditOutlined,
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
import { AgentStatuses } from "./constants";
import { LinkContainer } from "./style";

const { Title, Text, Link: TypographyLink } = Typography;
const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const Agents = () => {
  const { updatePageConfig } = useAppStore();
  const router = useRouter();
  const fullWidth = { width: "100%" };

  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [createAgentLoading, setCreateAgentLoading] = useState(false);
  const [agentDeleteLoading, setAgentDeleteLoading] = useState();
  const [isCreateAgentModalVisible, setIsCreateAgentModalVisible] =
    useState<boolean>(false);
  const [filters, setFilters] = usePersistedQueryParams(initialFilters({}));
  console.log("🚀 ~ Workflow ~ filters:", filters);
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.agents.list,
    { ...filters },
    {},
  );

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Agent",
      pageDescription: "Models are your AI powered automations & skills",
    });
    router.prefetch(`/agents/view/[agentId]`);
    router.prefetch(`/agents/edit/[agentId]`);
    router.prefetch(`/integration/agents/[agentId]`);
  }, []);

  const toggleCreateAgentHandler = () => {
    setIsCreateAgentModalVisible((prev: boolean) => !prev);
  };

  const createAgentHandler = async (values: UnknownObject) => {
    try {
      setCreateAgentLoading(true);
      const payload = {
        ...values,
        agent_state: "CREATED",
      };

      const createAgentResponse = await createAgentApi({ payload });
      console.log(`agent creation response`, createAgentResponse);

      if (createAgentResponse?.status == 200) {
        notification.success({ message: "Agent created successfully" });
        setIsCreateAgentModalVisible(false);
        refetch();
        router.push(
          `/agents/edit/${createAgentResponse?.data?.result?.pipeline_id}`,
        );
      }
    } catch (error) {
      notification.error({
        message: "Error while creating agent",
        description: getErrorFromApi(error),
      });
    } finally {
      setCreateAgentLoading(false);
    }
  };

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

  const deleteAgentHandler = async (agent: UnknownObject) => {
    try {
      setAgentDeleteLoading(agent?.agent_id);

      const deleteAgentResponse = await deleteAgentApi({
        agentId: agent?.pipeline_id,
      });

      if (deleteAgentResponse?.status == 200) {
        notification.success({ message: "Agent deleted successfully" });
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while deleting agent",
        description: getErrorFromApi(error),
      });
    } finally {
      setAgentDeleteLoading(undefined);
    }
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Agent Name",
      dataIndex: "agent_name",
      key: "agent_name",
      width: 200,
      render: (val: any, data: any) => (
        <LinkContainer>
          <Link href={`/agents/view/${data?.pipeline_id}`}>{val}</Link>
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
            tagProps={{
              color: AgentStatuses?.[val]?.color || "",
              background: AgentStatuses?.[val]?.background,
              border: AgentStatuses?.[val]?.border,
            }}
          />
        ) : (
          // <Tags color={WorkflowStatuses?.[val]?.color || ""}>
          //   {WorkflowStatuses?.[val]?.text ?? val}
          // </TTagsag>
          "--"
        ),
    },
    {
      title: "Model Name",
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
      title: "Model Version",
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
      title: "Knowledge Base",
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
      render: (_: any, agentData: UnknownObject) => {
        const completedItems: MenuProps["items"] = [
          {
            key: "edit",
            label: (
              <Link href={`/agents/edit/${agentData?.pipeline_id}`}>
                <Button
                  style={{ color: "#000000b3" }}
                  type="text"
                  disabled={!!agentDeleteLoading}
                >
                  Edit
                </Button>
              </Link>
            ),
          },
          {
            key: "view",
            label: (
              <Link href={`/agents/view/${agentData?.pipeline_id}`}>
                <Button
                  style={{ color: "#000000b3" }}
                  type="text"
                  disabled={!!agentDeleteLoading}
                >
                  View
                </Button>
              </Link>
            ),
          },
          {
            key: "delete",
            label: (
              <Button
                onClick={() => deleteAgentHandler(agentData)}
                style={{ color: "#FF0000" }}
                type="text"
                loading={agentDeleteLoading === agentData?.agent_id}
                disabled={!!agentDeleteLoading}
              >
                Delete
              </Button>
            ),
          },
        ];

        const progressItems: MenuProps["items"] = [
          {
            key: "delete",
            label: (
              <Button
                onClick={() => deleteAgentHandler(agentData)}
                style={{ color: "#FF0000" }}
                type="text"
                loading={agentDeleteLoading === agentData?.agent_id}
                disabled={!!agentDeleteLoading}
              >
                Delete
              </Button>
            ),
          },
        ];
        return (
          <>
            {agentData?.agent_state === AgentStatus.COMPLETED ? (
              // <Space>
              <Row
                gutter={[0, 0]}
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Col span={20}>
                  <Link href={`/integration/agents/${agentData?.pipeline_id}`}>
                    <Button
                      style={{ ...fullWidth }}
                      block
                      type="default"
                      icon={<ApiOutlined />}
                      disabled={!!agentDeleteLoading}
                    >
                      Integrate
                    </Button>
                  </Link>
                </Col>
                <Col
                  span={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Dropdown
                    menu={{ items: completedItems }}
                    placement="bottomLeft"
                  >
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
            ) : (
              // </Space>
              <Row
                gutter={[0, 0]}
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Col span={20}>
                  <Link href={`/agents/edit/${agentData?.pipeline_id}`}>
                    <Button
                      style={{ ...fullWidth }}
                      block
                      type="default"
                      icon={<EditOutlined />}
                      disabled={!!agentDeleteLoading}
                    >
                      Edit
                    </Button>
                  </Link>
                </Col>
                <Col
                  span={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Dropdown
                    menu={{ items: progressItems }}
                    placement="bottomLeft"
                  >
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
            )}
          </>
        );
      },
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
          subHeading="Craft intelligent automations using Large Language Models to streamline tasks and enhance decision-making."
        />
      </Row>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col></Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleCreateAgentHandler}
              disabled={!!agentDeleteLoading}
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
              hideOnSinglePage: true,
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
        loading={createAgentLoading}
        createAgentHandler={createAgentHandler}
      />
    </PageContainer>
  );
};

export default Agents;
