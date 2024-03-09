import { WorkflowStatus } from "@/app/(authorisedHeaderLayout)/workflow/constant";
import ModelTag from "@/components/ModelTag";
import {
  PageAbout,
  PageTitle,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Result, Row, Skeleton, Space, Tabs } from "antd";
import Link from "next/link";

import { items, WorkflowTagObjectType, WorkflowTags } from "./helper";

type WorkflowDataParams = {
  workflowId?: string | string[] | undefined;
};

const WorkflowData = ({ workflowId }: WorkflowDataParams) => {
  const { data, isLoading, isError, error, refetch } = useFetchData(
    `${config.workflow.details}/${workflowId}`,
  );

  if (isLoading) {
    return (
      <Card size="default">
        <Skeleton active avatar loading paragraph={{ rows: 12 }} />
      </Card>
    );
  }
  if (isError) {
    return (
      <Row justify="center">
        <Col>
          <Result
            status="500"
            title={getErrorFromApi(error)}
            subTitle="Please refresh or comeback in sometime"
          />
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row
        justify="space-between"
        gutter={[20, 20]}
        style={{ marginBottom: "24px" }}
      >
        <Col
          span={16}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <PageTitle>{data?.result?.pipeline_name}</PageTitle>
          {data?.result?.pipeline_description && (
            <PageAbout>{data?.result?.pipeline_description}</PageAbout>
          )}
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            gap: "20px",
          }}
        >
          {data?.result?.pipeline_state === WorkflowStatus.COMPLETED ? (
            <Space>
              <Link
                prefetch
                href={`/integration/workflow/${data?.result?.pipeline_id}`}
              >
                <Button type="default">Integrate</Button>
              </Link>
              <Link
                prefetch
                href={`/workflow/playground/${data?.result?.pipeline_id}`}
              >
                <Button type="primary" icon={<PlayCircleOutlined />}>
                  Playground
                </Button>
              </Link>
            </Space>
          ) : (
            <Link prefetch href={`/workflow/edit/${data?.result?.pipeline_id}`}>
              <Button type="primary" icon={<EditOutlined />}>
                Continue Edit
              </Button>
            </Link>
          )}
        </Col>
        <Col span={24}>
          <Row gutter={[0, 10]}>
            {WorkflowTags?.map(
              (tag: WorkflowTagObjectType) => {
                return (
                  data?.result?.[tag?.key] && (
                    <ModelTag tag={tag?.getValue(data?.result?.[tag?.key])} />
                  )
                );
              },

              // <Tag key={tag}>{tag}</Tag>
            )}
          </Row>
        </Col>
      </Row>
      {/* Modify to get items dynamically based on the workspace current status  */}
      <Tabs defaultActiveKey="model_details" items={items(data)} />
    </>
  );
};

export default WorkflowData;
