import { addModelToWorkspaceApi, deployModelApi } from "@/api/workspace";
import DeployIcon from "@/components/Icons/DeployIcon";
import ModelTag from "@/components/ModelTag";
import {
  PageAbout,
  PageTitle,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { DUMMY_TENANT_ID } from "@/utils/constants";
import { getErrorFromApi } from "@/utils/helperFunction";
import { ApiOutlined, CheckCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Result,
  Row,
  Skeleton,
  Spin,
  Tabs,
  Tag,
} from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConnectModal from "../ConnectModal";
import { ModelPage, ModelPageType } from "./constant";
import { items } from "./helper";

type ModelDataParams = {
  page: ModelPageType;
  modelId: string | string[];
  workspaceId?: string | string[] | undefined;
};

const ModelData = ({ page, modelId, workspaceId }: ModelDataParams) => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.models.detail,
    { id: modelId },
    {},
  );
  const [addToWrokspaceLoading, setAddToWrokspaceLoading] = useState(false);
  const [deploymentLoading, setDeploymentLoading] = useState(false);
  const [connectModelVisible, setConnectModelVisible] = useState(false);
  const [connectBtnLoading, setConnectBtnLoading] = useState(false);
  const { notification } = useNotify();

  const deployHandler = async () => {
    try {
      setDeploymentLoading(true);

      const payload = {
        model_id: modelId,
        user_model_id: data?.result?.user_model_id,
      };

      const deploymentResponse = await deployModelApi({ payload });
      if (deploymentResponse?.status === 200) {
        refetch();
        notification.success({
          message: "Model Deployed successfully",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error while deploying model.",
        description: getErrorFromApi(error),
      });
    } finally {
      setDeploymentLoading(false);
    }
  };

  const addToworkspace = async () => {
    try {
      setAddToWrokspaceLoading(true);
      const payload = {
        tenant_id: DUMMY_TENANT_ID,
        user_id: session?.user?.details?.id,
        username: session?.user?.details?.name,
        model_id: data?.result?.id,
        model_name: data?.result?.name,
        model_params: {
          ...data?.result,
        },
      };

      const modelResponse: any = await addModelToWorkspaceApi({
        payload,
      });

      if (modelResponse?.status == 200) {
        refetch();
        notification.success({
          message: "Added to workspace",
        });
        setConnectBtnLoading(false);
        setConnectModelVisible(true);
      }
    } catch (error) {
      notification.error({
        message: "Error while adding model to workspace",
        description: getErrorFromApi(error),
      });
    } finally {
      setAddToWrokspaceLoading(false);
    }
  };
  const connectModel = async (model: any) => {
    setConnectBtnLoading(true);
    if (!data?.result?.added) {
      await addToworkspace();
    } else {
      setConnectBtnLoading(false);
      setConnectModelVisible(true);
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
    <Spin spinning={deploymentLoading}>
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
          {page === ModelPage.MODELS ? (
            <>
              {data?.result?.added ? (
                <Tag
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "32px",
                  }}
                  color="success"
                  icon={<CheckCircleOutlined />}
                >
                  Added To workspace
                </Tag>
              ) : (
                <>
                  {data?.result?.type === "Open source" && (
                    <Button
                      type="primary"
                      onClick={addToworkspace}
                      loading={addToWrokspaceLoading}
                    >
                      Add to workspace
                    </Button>
                  )}
                </>
              )}
              {data?.result?.type === "Closed source" &&
                (data?.result?.status !== "DEPLOYED" ? (
                  <Button
                    type="primary"
                    onClick={connectModel}
                    loading={connectBtnLoading}
                  >
                    Connect
                  </Button>
                ) : (
                  <Tag
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "32px",
                    }}
                    color="success"
                    icon={<CheckCircleOutlined />}
                  >
                    Connected
                  </Tag>
                ))}
            </>
          ) : data?.result?.status !== "DEPLOYED" ? (
            data?.result?.type === "Open source" ? (
              <>
                {/* <Button>Test</Button>
                  <Button
                    onClick={() =>
                      router.push("/train-model/TinyLlama-1.1B-Chat-v1.0")
                    }
                  >
                    Train
                  </Button> */}
                <Button
                  type="primary"
                  icon={<DeployIcon />}
                  onClick={deployHandler}
                >
                  Deploy
                </Button>
              </>
            ) : (
              <>
                {/* <Button>Test</Button>
                  <Button
                    onClick={() =>
                      router.push("/train-model/TinyLlama-1.1B-Chat-v1.0")
                    }
                  >
                    Train
                  </Button> */}
                <Button
                  type="primary"
                  icon={<DeployIcon />}
                  onClick={connectModel}
                  loading={connectBtnLoading}
                >
                  Connect
                </Button>
              </>
            )
          ) : (
            <>
              <Button
                type="primary"
                icon={<DeployIcon />}
                onClick={deployHandler}
              >
                Playground
              </Button>
              <Link
                prefetch
                href={`/integration/model/${modelId}/${data?.result?.user_model_id}`}
              >
                <Button
                  type="default"
                  icon={<ApiOutlined />}
                  onClick={deployHandler}
                >
                  Integration
                </Button>
              </Link>
            </>
          )}
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
      {connectModelVisible && (
        <ConnectModal
          isVisible={connectModelVisible}
          setIsVisible={setConnectModelVisible}
          modelData={data}
          refetch={refetch}
        />
      )}
    </Spin>
  );
};

export default ModelData;
