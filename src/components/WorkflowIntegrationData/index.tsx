import { integrateChannelApi } from "@/api/integrate";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { ApiOutlined } from "@ant-design/icons";
import { Button, Card, Col, Result, Row, Skeleton, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import IntegrateChannelModal from "../IntegrateChannelModal";
import ModelTag from "../ModelTag";
import { PageAbout, PageTitle } from "../UIComponents/UIComponents.style";
import { WorkflowTagObjectType, WorkflowTags } from "../WorkflowData/helper";
import { items } from "./helper";

type WorkflowIntegrationDataProps = {
  workflowId: string | string[];
};

const WorkflowIntegrationData = ({
  workflowId,
}: WorkflowIntegrationDataProps) => {
  const { notification } = useNotify();
  const [form] = useForm();
  const [showIntegrateChannel, setShowIntegrateChannel] = useState(false);
  const [integratechannelLoading, setIntegratechannelLoading] = useState(false);
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(`${config.workflow.details}/${workflowId}`);

  const integrateChannelHandler = async (values: UnknownObject) => {
    try {
      setIntegratechannelLoading(true);

      const payload = {
        ...values,
        pipeline_id_or_model_id: workflowId,
      };

      const integrateChannelResponse = await integrateChannelApi({ payload });

      if (integrateChannelResponse?.status === 200) {
        setShowIntegrateChannel(false);
        refetch();
        notification.success({
          message: "Channel integration successful",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error while integrating channel",
        description: getErrorFromApi(error),
      });
    } finally {
      setIntegratechannelLoading(false);
    }
  };

  const toggleChannelIntegrate = () => {
    setShowIntegrateChannel((prev: boolean) => !prev);
  };

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
          <PageAbout>{data?.result?.pipeline_description}</PageAbout>
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
          <Button
            type="primary"
            icon={<ApiOutlined />}
            onClick={toggleChannelIntegrate}
          >
            Integrate channel
          </Button>
        </Col>
        <Col span={24}>
          <Row gutter={[0, 10]}>
            {WorkflowTags?.map((tag: WorkflowTagObjectType) => {
              return (
                data?.result?.[tag?.key] && (
                  <ModelTag tag={tag?.getValue(data?.result?.[tag?.key])} />
                )
              );
            })}
          </Row>
        </Col>
      </Row>
      <Tabs
        items={items(data, workflowId, toggleChannelIntegrate, isRefetching)}
      />
      <IntegrateChannelModal
        open={showIntegrateChannel}
        onClose={toggleChannelIntegrate}
        title={"Integrate Channel"}
        loading={integratechannelLoading}
        form={form}
        integrateChannelHandler={integrateChannelHandler}
      />
    </>
  );
};

export default WorkflowIntegrationData;
