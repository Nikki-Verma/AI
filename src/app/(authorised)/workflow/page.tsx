"use client";

import { createWorkFlowApi } from "@/api/workflow";
import CreateWorkflowModal from "@/components/CreateWorkflowModal";
import EmptyUpload from "@/components/EmptyUpload";
import {
  PageContainer,
  PageSubHeading,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import { useAppStore } from "@/store";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { PlusOutlined } from "@ant-design/icons";
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
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { Title, Text, Link: TypographyLink } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  // page: DEFAULT_PAGE,
  // size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const Workflow = () => {
  const { updatePageConfig } = useAppStore();
  const router = useRouter();

  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [workflowModalOpen, setWorkflowModalOpen] = useState(false);
  const [createWorkflowLoading, setCreateWorkflowLoading] = useState(false);
  const [filters, setFilters] = useState(initialFilters({}));
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.workflow.list,
    { ...filters },
    {},
  );
  console.log("data : ", data);
  console.log("Loading : ", isLoading);

  useEffect(() => {
    console.log("🚀 ~ Workflow ~ data:", data);
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
      console.log(
        "🚀 ~ createWorkflowHandler ~ createWorkflowResponse:",
        createWorkflowResponse,
      );
      if (createWorkflowResponse?.status == 200) {
        notification.success({ message: "Workflow created successfully" });
        setWorkflowModalOpen(false);
        refetch();
        router.push(
          `/workflow/${createWorkflowResponse?.data?.result?.pipeline_id}/edit`,
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

  const columns: TableProps<any>["columns"] = [
    {
      title: "Workflow name",
      dataIndex: "pipeline_name",
      key: "pipeline_name",
      width: 400,
      render: (val: any, data: any) => (
        <Space size="small">
          {data?.pipeline_state != "COMPLETED" ? (
            <Link href={`/workflow/${data?.pipeline_id}/edit`}>{val}</Link>
          ) : (
            <Text ellipsis style={{ width: 350 }}>
              {val}
            </Text>
          )}
        </Space>
      ),
    },
    {
      title: "Workflow description",
      dataIndex: "pipeline_description",
      key: "pipeline_description",
      width: 400,
      render: (val: any) => (
        <Space size="small">
          <Text ellipsis style={{ width: 350 }}>
            {val}
          </Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "pipeline_state",
      key: "pipeline_state",
      width: 400,
      render: (val: any) => (
        <Space size="small">
          <Text ellipsis style={{ width: 350 }}>
            {val}
          </Text>
        </Space>
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
        <Col
          span={14}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Title>Workflows</Title>
          <PageSubHeading>
            Explore a vast array of meticulously trained and readily deployable
            machine learning models all conveniently centralized in a single
            location.
          </PageSubHeading>
        </Col>
        <Col span={6} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Image
            src={"/assets/Images/modelHeaderImage.svg"}
            alt="workspace"
            width={140}
            height={96}
          />
        </Col>
      </Row>
      <Col span={24}>
        <Row justify="space-between" align="middle">
          <Col></Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleCreateWorkflowHandler}
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
            // pagination={{
            //   current: filters?.page + 1,
            //   pageSize: filters?.size,
            //   total: data?.totalElements,
            //   showSizeChanger: true,
            // }}
            // onChange={tableChangeHandler}
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
