"use client";

import { createWorkFlowApi, deletePipelineApi } from "@/api/workflow";
import {
  WorkflowStatus,
  WorkflowStatusType,
} from "@/app/(authorisedHeaderLayout)/workflow/constant";
import CreateWorkflowModal from "@/components/CreateWorkflowModal";
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
  EditOutlined,
  MoreOutlined,
  PlayCircleOutlined,
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
  Tooltip,
  Typography,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WorkflowStatuses } from "./constant";

const { Title, Text, Link: TypographyLink } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});
const fullWidth = { width: "100%" };

const Workflow = () => {
  const { updatePageConfig } = useAppStore();
  const router = useRouter();

  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [workflowDeleteLoading, setWorkflowDeleteLoading] = useState();
  const [createWorkflowLoading, setCreateWorkflowLoading] = useState(false);
  const [filters, setFilters] = usePersistedQueryParams(initialFilters({}));

  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.workflow.list,
    { ...filters },
    {},
  );

  useEffect(() => {
    updatePageConfig({
      pageTitle: "Workspace",
      pageDescription: "Models are your AI powered automations & skills",
    });
  }, []);

  const toggleCreateWorkflowHandler = () => {
    setWorkflowModalOpen((prev: boolean) => !prev);
  };

  const createWorkflowHandler = async (values: UnknownObject) => {
    try {
      setCreateWorkflowLoading(true);
      const payload = {
        ...values,
        pipeline_state: "CREATED",
      };

      const createWorkflowResponse = await createWorkFlowApi({ payload });

      if (createWorkflowResponse?.status == 200) {
        notification.success({ message: "Workflow created successfully" });
        setWorkflowModalOpen(false);
        refetch();
        router.push(
          `/workflow/edit/${createWorkflowResponse?.data?.result?.pipeline_id}`,
        );
      }
    } catch (error) {
      notification.error({
        message: "Error while creating workflow",
        description: getErrorFromApi(error),
      });
    } finally {
      setCreateWorkflowLoading(false);
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

  const deleteWorkflowHandler = async (workflow: UnknownObject) => {
    console.log("🚀 ~ deleteWorkflowHandler ~ workflow:", workflow);
    try {
      setWorkflowDeleteLoading(workflow?.pipeline_id);

      const deleteWorkflowResponse = await deletePipelineApi({
        pipelineId: workflow?.pipeline_id,
      });

      if (deleteWorkflowResponse?.status == 200) {
        notification.success({ message: "Workflow deleted successfully" });
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while deleting workflow",
        description: getErrorFromApi(error),
      });
    } finally {
      setWorkflowDeleteLoading(undefined);
    }
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Workflow name",
      dataIndex: "pipeline_name",
      key: "pipeline_name",
      width: 200,
      render: (val: any, data: any) => (
        <Link prefetch href={`/workflow/view/${data?.pipeline_id}`}>
          {val}
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "pipeline_description",
      key: "pipeline_description",
      width: 200,
      render: (val: any) => (
        <Tooltip title={val}>
          <Text ellipsis style={{ width: 200 }}>
            {val || "--"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "pipeline_state",
      key: "pipeline_state",
      width: 120,
      render: (val: WorkflowStatusType) =>
        val ? (
          <Tags
            tag={WorkflowStatuses?.[val]?.text ?? val}
            tagProps={{
              color: WorkflowStatuses?.[val]?.color || "",
              background: WorkflowStatuses?.[val]?.background,
              border: WorkflowStatuses?.[val]?.border,
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
      title: "Model name",
      dataIndex: "model_detail",
      key: "model_name",
      width: 150,
      render: (val: any) => (
        <Tooltip title={val?.model_name}>
          <Text ellipsis style={{ width: 150 }}>
            {val?.model_name || "--"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Model version",
      dataIndex: "model_detail",
      key: "model_version",
      width: 150,
      render: (val: any) => (
        <Tooltip title={val?.model_version}>
          <Text ellipsis style={{ width: 150 }}>
            {val?.model_version || "--"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Knowledge base",
      dataIndex: "kb",
      key: "kb_name",
      width: 150,
      render: (val: any) => (
        <Tooltip title={val?.kb_name}>
          <Text ellipsis style={{ width: 150 }}>
            {val?.kb_name || "--"}
          </Text>
        </Tooltip>
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
      render: (_: any, workflowData: UnknownObject) => {
        console.log("🚀 ~ Workflow ~ workflowData:", workflowData);
        const completedItems: MenuProps["items"] = [
          {
            key: "integration",
            label: (
              <Link
                prefetch
                href={`/integration/workflow/${workflowData?.pipeline_id}`}
              >
                <Button
                  style={{ color: "#000000b3" }}
                  type="text"
                  disabled={!!workflowDeleteLoading}
                >
                  Integrate
                </Button>
              </Link>
            ),
          },
          {
            key: "delete",
            label: (
              <Button
                onClick={() => deleteWorkflowHandler(workflowData)}
                style={{ color: "#FF0000" }}
                type="text"
                loading={workflowDeleteLoading === workflowData?.pipeline_id}
                disabled={!!workflowDeleteLoading}
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
                onClick={() => deleteWorkflowHandler(workflowData)}
                style={{ color: "#FF0000" }}
                type="text"
                loading={workflowDeleteLoading === workflowData?.pipeline_id}
                disabled={!!workflowDeleteLoading}
              >
                Delete
              </Button>
            ),
          },
        ];

        return (
          <>
            {workflowData?.pipeline_state === WorkflowStatus.COMPLETED ? (
              // <Space>
              <Row
                gutter={[0, 0]}
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Col span={20}>
                  <Link
                    prefetch
                    href={`/workflow/playground/${workflowData?.pipeline_id}`}
                  >
                    <Button
                      style={{ ...fullWidth }}
                      block
                      type="default"
                      icon={<PlayCircleOutlined />}
                      disabled={!!workflowDeleteLoading}
                    >
                      Chat
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
                  <Link
                    prefetch
                    href={`/workflow/edit/${workflowData?.pipeline_id}`}
                  >
                    <Button
                      style={{ ...fullWidth }}
                      block
                      type="default"
                      icon={<EditOutlined />}
                      disabled={!!workflowDeleteLoading}
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
        }}
      >
        <PageHeading
          title="Workflows"
          subHeading="Set up workflows to orchestrate task automation and data processing, enhancing productivity and insights."
        />
      </Row>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col></Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleCreateWorkflowHandler}
              disabled={!!workflowDeleteLoading}
            >
              Create Workflow
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
          buttonText="Create Workflow"
          message="You do not have any workflows yet"
          onClick={toggleCreateWorkflowHandler}
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
      <CreateWorkflowModal
        open={workflowModalOpen}
        onClose={toggleCreateWorkflowHandler}
        loading={createWorkflowLoading}
        createWorkflowHandler={createWorkflowHandler}
      />
    </PageContainer>
  );
};

export default Workflow;
