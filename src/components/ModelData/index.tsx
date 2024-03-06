import {
  addModelToWorkspaceApi,
  deployModelApi,
  markModelIdleApi,
  removeFromWorkspaceApi,
} from "@/api/workspace";
import DeployIcon from "@/components/Icons/DeployIcon";
import ModelTag from "@/components/ModelTag";
import {
  PageAbout,
  PageTitle,
  RemoveButton,
} from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { DUMMY_TENANT_ID } from "@/utils/constants";
import { getErrorFromApi } from "@/utils/helperFunction";
import {
  ApiOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Flex,
  Image as AntImage,
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
import { useEffect, useState } from "react";
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
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(config.models.detail, { id: modelId }, {});

  console.log("data", data);

  const [addToWrokspaceLoading, setAddToWrokspaceLoading] = useState(false);
  const [deploymentLoading, setDeploymentLoading] = useState(false);
  const [connectModelVisible, setConnectModelVisible] = useState(false);
  const [connectBtnLoading, setConnectBtnLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { notification } = useNotify();

  useEffect(() => {
    router.prefetch("/workspace");
  }, []);

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
        if (data?.result?.type === "Closed source") {
          setConnectBtnLoading(false);
          setConnectModelVisible(true);
        }
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

  const markIdle = async () => {
    try {
      setDeploymentLoading(true);

      const payload = {
        model_id: modelId,
        user_model_id: data?.result?.user_model_id,
      };

      const markModelIdleResponse = await markModelIdleApi({ payload });
      if (markModelIdleResponse?.status === 200) {
        refetch();
        notification.success({
          message: "Model marked idle successfully",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error while model mark idle.",
        description: getErrorFromApi(error),
      });
    } finally {
      setDeploymentLoading(false);
    }
  };

  const removeFromWorkspaceHandler = async () => {
    try {
      setRemoveLoading(true);
      const params = {
        user_model_id: data?.result?.user_model_id,
      };
      const removeFromWorkspaceResponse = await removeFromWorkspaceApi({
        params,
      });
      if (removeFromWorkspaceResponse?.status === 200) {
        router.push("/workspace");
        notification.success({
          message: "Model removed from workspace successfully",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error while removing model from workspace.",
        description: getErrorFromApi(error),
      });
    } finally {
      setRemoveLoading(true);
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
    <Spin spinning={deploymentLoading || isRefetching}>
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
            {data?.result?.weights_file_s3_url ? (
              <AntImage
                src={data?.result?.weights_file_s3_url}
                preview={false}
                alt="Model"
                style={{
                  width: "96px",
                  height: "96px",
                  display: "flex",
                  marginRight: "12px",
                }}
              />
            ) : (
              <Image
                height={96}
                width={96}
                src={"/assets/Images/dummyModel.png"}
                alt="Model"
                style={{
                  display: "flex",
                  marginRight: "12px",
                }}
              />
            )}
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
              {data?.result?.type === "Closed source" &&
                data?.result?.status === "DEPLOYED" && (
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
                )}
              {data?.result?.added ? (
                <Flex gap="12px" align="center">
                  <Link
                    prefetch
                    href={`/workspace/${data?.result?.user_model_id}/${modelId}`}
                  >
                    <Button type="primary">Go to workspace</Button>
                  </Link>
                </Flex>
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
                data?.result?.status !== "DEPLOYED" && (
                  <Button
                    type="primary"
                    onClick={connectModel}
                    loading={connectBtnLoading}
                  >
                    Connect
                  </Button>
                )}
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
                <RemoveButton
                  icon={<DeleteOutlined />}
                  onClick={removeFromWorkspaceHandler}
                  loading={removeLoading}
                >
                  Remove
                </RemoveButton>
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
                <RemoveButton
                  icon={<DeleteOutlined />}
                  onClick={removeFromWorkspaceHandler}
                  loading={removeLoading}
                >
                  Remove
                </RemoveButton>
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
              {data?.result?.type === "Open source" && (
                <RemoveButton onClick={markIdle}>Mark Idle</RemoveButton>
              )}
              <Link
                prefetch
                href={`/model/playground/${modelId}/${data?.result?.user_model_id}`}
              >
                <Button type="primary" icon={<DeployIcon />}>
                  Playground
                </Button>
              </Link>
              <Link
                prefetch
                href={`/integration/model/${modelId}/${data?.result?.user_model_id}`}
              >
                <Button type="default" icon={<ApiOutlined />}>
                  Integration
                </Button>
              </Link>
            </>
          )}
        </Col>
        <Col span={24}>
          <Row gutter={[0, 10]}>
            {(data?.result?.tags || [])?.map((tag: string) => (
              <ModelTag tag={tag} key={tag} />
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
