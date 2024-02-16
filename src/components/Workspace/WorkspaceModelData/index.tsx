import { deployModelApi } from "@/api/workspace";
import DeployIcon from "@/components/Icons/DeployIcon";
import ModelTag from "@/components/ModelTag";
import {
  PageAbout,
  PageTitle,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { getErrorFromApi } from "@/utils/helperFunction";
import { Button, Card, Col, Result, Row, Skeleton, Tabs } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { items } from "./helper";

const WorkspaceModelData = (props: any) => {
  const router = useRouter();
  const { modelId, workspaceId } = useParams();

  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.models.detail,
    { id: modelId },
    {},
  );

  const [deploymentLoading, setDeploymentLoading] = useState(false);

  const deployHandler = async () => {
    try {
      setDeploymentLoading(true);

      const payload = {
        model_id: modelId,
        user_model_id: workspaceId,
      };

      const deploymentResponse = await deployModelApi({ payload });
      console.log(
        "🚀 ~ deployHandler ~ deploymentResponse:",
        deploymentResponse,
      );
    } catch (error) {
    } finally {
      setDeploymentLoading(false);
    }
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
    <div>
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
          style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
        >
          <Button>Test</Button>
          <Button
            onClick={() => router.push("/train-model/TinyLlama-1.1B-Chat-v1.0")}
          >
            Train
          </Button>
          <Button type="primary" icon={<DeployIcon />} onClick={deployHandler}>
            Deploy
          </Button>
        </Col>
        <Col span={24}>
          <Row gutter={[0, 10]}>
            {(data?.result?.tags || [])?.map((tag: string) => (
              <ModelTag tag={tag} />
              // <Tag key={tag}>{tag}</Tag>
            ))}
          </Row>
        </Col>
      </Row>
      {/* Modify to get items dynamically based on the workspace current status  */}
      <Tabs defaultActiveKey="model_details" items={items(data)} />
    </div>
  );
};

export default WorkspaceModelData;
