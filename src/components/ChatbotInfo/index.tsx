import { updatePipelineApi } from "@/api/workflow";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE, PAGE_MODE } from "@/utils/constants";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CreateWorkflowModal from "../CreateWorkflowModal";
import EditIcon from "../Icons/EditIcon";
import InfoIconTooltip from "../InfoIconTooltip";
import {
  AdvancedOptionsContainer,
  SelectOptionDescription,
  SelectOptionDetail,
  SelectOptionName,
  WorkflowDescription,
  WorkflowInfoContainer,
  WorkflowInfoFormContainer,
  WorkflowInfoFormDescription,
  WorkflowInfoFormTitle,
  WorkflowName,
} from "./style";

const { Text } = Typography;
const fullWidth = { width: "100%" };

type WorkflowInfoProps = {
  details: UnknownObject | undefined | null;
  form: FormInstance;
  onFininsh: (values: any) => void;
  refetch: () => void;
  onUpdateWorkflowBasicDetails: (values: any) => void;
  workflowId: string | string[];
};

const WorkflowInfo = ({
  details,
  form,
  onFininsh,
  onUpdateWorkflowBasicDetails,
  refetch,
  workflowId,
}: WorkflowInfoProps) => {
  const router = useRouter();
  const { notification } = useNotify();
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const { data, isLoading } = useFetchData(config.workspace.models, {
    modelStatus: "DEPLOYED",
    page: DEFAULT_PAGE,
    size: ALL_DATA_PAGE_SIZE,
  });
  const [showEditDetails, setShowEditDetails] = useState(false);
  const [updateDetailsLoading, setUpdateDetailsLoading] = useState(false);

  const toggleAdvanceOptions = () => {
    setAdvancedOptionsOpen((prev: boolean) => !prev);
  };

  const toggleEditDetailsModal = () => {
    setShowEditDetails((prev: boolean) => !prev);
  };

  const updateWorkflowDetails = async (values: any) => {
    try {
      console.log("🚀 ~ updateAgentDetails ~ values:", values);
      setUpdateDetailsLoading(true);

      const payload = {
        ...(details?.result || {}),
        ...values,
        pipeline_id: workflowId,
      };

      const updatePipelineResponse = await updatePipelineApi({ payload });

      if (updatePipelineResponse?.status === 200) {
        toggleEditDetailsModal();
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "error updating agent details",
        description: getErrorFromApi(error),
      });
    } finally {
      setUpdateDetailsLoading(false);
    }
  };

  return (
    <Row gutter={[6, 20]}>
      <Col span={24}>
        <WorkflowInfoContainer>
          <Row gutter={[6, 16]}>
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <WorkflowName>
                    {details?.result?.pipeline_name ??
                      details?.result?.agent_name}
                  </WorkflowName>
                </Col>
                <Col>
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={toggleEditDetailsModal}
                  />
                  {showEditDetails && (
                    <CreateWorkflowModal
                      loading={updateDetailsLoading}
                      onClose={toggleEditDetailsModal}
                      open={showEditDetails}
                      workflowDetails={details?.result || {}}
                      mode={PAGE_MODE.EDIT}
                      createWorkflowHandler={updateWorkflowDetails}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Col>
              <WorkflowDescription>
                {details?.result?.pipeline_description ??
                  details?.result?.agent_description}
              </WorkflowDescription>
            </Col>
          </Row>
        </WorkflowInfoContainer>
      </Col>
      <Col>
        <WorkflowInfoFormContainer>
          <WorkflowInfoFormTitle>Model</WorkflowInfoFormTitle>
          <WorkflowInfoFormDescription>
            Select the core AI that generates text, using retrieved information
            to enhance accuracy and creativity.
          </WorkflowInfoFormDescription>
          <Form
            preserve={false}
            layout="vertical"
            form={form}
            onFinish={onFininsh}
          >
            <Form.Item
              name={["model_detail", "model_name"]}
              rules={[{ required: true, message: "Model is required" }]}
              label="Model"
            >
              <Select
                placeholder="Select Model"
                loading={isLoading}
                showSearch
                optionFilterProp="label"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />

                    <Button
                      block
                      style={{ width: "100%" }}
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => router.push("/workspace")}
                    >
                      Deploy new Model or connect model API
                    </Button>
                  </>
                )}
                optionRender={(option: any) => (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      gap: "6px",
                      // alignItems: "center",
                    }}
                  >
                    <Image
                      height={36}
                      width={36}
                      src={"/assets/Images/dummyModel.png"}
                      alt="model image"
                    />
                    <SelectOptionDetail>
                      <SelectOptionName>{option?.data?.name}</SelectOptionName>
                      <SelectOptionDescription>
                        {option?.data?.desc}
                      </SelectOptionDescription>
                    </SelectOptionDetail>
                  </div>
                )}
                onChange={(val: any, option: any) => {
                  form.setFields([
                    {
                      name: ["model_detail", "model_id"],
                      value: option?.id,
                      errors: [],
                    },
                    {
                      name: ["model_detail", "model_version"],
                      value: option?.version,
                      errors: [],
                    },
                  ]);
                }}
                options={
                  data?.result?.map((data: any) => ({
                    label: data?.name,
                    value: data?.name,
                    id: data?.id,
                    ...data,
                  })) || []
                }
              />
            </Form.Item>
            <Form.Item name={["model_detail", "model_id"]} hidden>
              <Input></Input>
            </Form.Item>
            <Form.Item name={["model_detail", "model_version"]} hidden>
              <Input></Input>
            </Form.Item>
            <Space style={{ cursor: "pointer" }} onClick={toggleAdvanceOptions}>
              <DownOutlined />
              <Text>Advance options</Text>
            </Space>
            <AdvancedOptionsContainer open={advancedOptionsOpen}>
              <Row gutter={[12, 12]}>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "n_predict"]}
                    label="Tokens to generate"
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Tokens to generate"
                      precision={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "temp"]}
                    label={
                      <Space>
                        <Text>Temperature</Text>
                        <InfoIconTooltip title="Controls creativity of outputs. Low values make text predictable; high values increase novelty and diversity. Example: 0.1 (very predictable) vs 1.0 (highly creative, but possibly nonsensical.)." />
                      </Space>
                    }
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Temperature"
                      min={0}
                      max={1}
                      precision={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "top_k"]}
                    label={
                      <Space>
                        <Text>Top K sampling</Text>
                        <InfoIconTooltip title="Limits the model to consider only the top k predictions, enhancing relevance and coherence. Example: 0.1 (very restrictive, less diverse) vs 1.0 (more options considered, greater diversity)." />
                      </Space>
                    }
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Top K sampling"
                      precision={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={[
                      "model_detail",
                      "model_parameters",
                      "repeat_penalty",
                    ]}
                    label={
                      <Space>
                        <Text>Repeat penalty</Text>
                        <InfoIconTooltip title="Reduces likelihood of repeating the same words or phrases. Higher values decrease repetitions, making text more diverse." />
                      </Space>
                    }
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Repeat penalty"
                      precision={1}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "min_p"]}
                    label={
                      <Space>
                        <Text>Min P sampling</Text>
                        <InfoIconTooltip title="Minimum probability cutoff to consider a word for selection, filtering out less likely options. Helps balance creativity and relevance." />
                      </Space>
                    }
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Min P sampling"
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "top_p"]}
                    label={
                      <Space>
                        <Text>Top P sampling</Text>
                        <InfoIconTooltip title="Sets the threshold for selecting most likely words. Lower values increase focus, higher values allow more variety. Example: 0.8 (focused) vs 0.95 (varied)." />
                      </Space>
                    }
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Top P sampling"
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "do_sample"]}
                    label="DO sample"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </AdvancedOptionsContainer>
          </Form>
        </WorkflowInfoFormContainer>
      </Col>
    </Row>
  );
};

export default WorkflowInfo;
