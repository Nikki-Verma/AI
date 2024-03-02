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

import { AgentTags, items, AgentTagObjectType } from "./helper";
import { AgentStatus } from "@/app/(authorisedHeaderLayout)/agents/constants";

type AgentDataParams = {
  agentId?: string | string[] | undefined;
};

const AgentData = ({ agentId }: AgentDataParams) => {
  const { data, isLoading, isError, error, refetch } = useFetchData(
    `${config.agents.details}/${agentId}`,
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
          <PageTitle>{data?.result?.agent_name}</PageTitle>
          {data?.result?.agent_description && (
            <PageAbout>{data?.result?.agent_description}</PageAbout>
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
          {data?.result?.agent_state === AgentStatus.COMPLETED ? (
            <Space>
              <Button type="default">Integration</Button>
              <Link
                prefetch
                href={`/agents/playground/${data?.result?.pipeline_id}`}
              >
                <Button type="primary" icon={<PlayCircleOutlined />}>
                  Playground
                </Button>
              </Link>
            </Space>
          ) : (
            <Link prefetch href={`/agents/edit/${data?.result?.pipeline_id}`}>
              <Button type="primary" icon={<EditOutlined />}>
                Continue Edit
              </Button>
            </Link>
          )}
        </Col>
        <Col span={24}>
          <Row gutter={[0, 10]}>
            {AgentTags?.map(
              (tag: AgentTagObjectType) => {
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

export default AgentData;
