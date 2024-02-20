import { integrateChannelApi } from "@/api/integrate";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Result, Row, Skeleton, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { useState } from "react";
import IntegrateChannelModal from "../IntergrateChannelModal";
import ModelTag from "../ModelTag";
import { PageAbout, PageTitle } from "../UIComponents/UIComponents.style";
import { items } from "./helper";

type ModelIntegrationDataProps = {
  modelId: string | string[];
  userModelId: string | string[];
};

const ModelIntegrationData = ({
  modelId,
  userModelId,
}: ModelIntegrationDataProps) => {
  const { notification } = useNotify();
  const [form] = useForm();
  const [showIntegrateChannel, setShowIntegrateChannel] = useState(false);
  const [integratechannelLoading, setIntegratechannelLoading] = useState(false);
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(config.models.detail, { id: modelId });
  console.log("🚀 ~ ModelIntegrationData ~ data:", data);

  const integrateChannelHandler = async (values: UnknownObject) => {
    try {
      setIntegratechannelLoading(true);

      const payload = {
        ...values,
        model_id: userModelId,
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
      notification.error({ message: "Error while integrating channel" });
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
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
              justifyContent: "flex-start",
            }}
          >
            <Image
              src={"/assets/Images/dummyModel.png"}
              alt="models"
              height={96}
              width={96}
              style={{
                display: "flex",
                marginRight: "12px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <PageTitle>{data?.result?.name}</PageTitle>
              <PageAbout>{data?.result?.desc}</PageAbout>
            </div>
          </div>
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
            icon={<PlusOutlined />}
            onClick={toggleChannelIntegrate}
          >
            Integrate channel
          </Button>
        </Col>
        <Col span={24}>
          <Row gutter={[0, 10]}>
            {(data?.result?.tags || [])?.map((tag: string) => (
              <ModelTag tag={tag} />
            ))}
          </Row>
        </Col>
      </Row>
      <Tabs
        items={items(data, userModelId, toggleChannelIntegrate, isRefetching)}
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

export default ModelIntegrationData;
