import { updateAgentApi } from "@/api/agents";
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
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateAgentModal from "../CreateAgentModal";
import EditIcon from "../Icons/EditIcon";
import InfoIconTooltip from "../InfoIconTooltip";
import {
  AdvancedOptionsContainer,
  KnowledgebaseInfoFormDescription,
  KnowledgebaseInfoFormTitle,
  PipelineCardContainer,
  PipelineFormCardContainer,
  SelectOptionDescription,
  SelectOptionDetail,
  SelectOptionName,
  WorkflowDescription,
  WorkflowInfoFormDescription,
  WorkflowInfoFormTitle,
  WorkflowName,
} from "./style";

const { Text } = Typography;
const fullWidth = { width: "100%" };

type AgentInfoProps = {
  details: UnknownObject | undefined | null;
  formSubmitting: boolean;
  form: FormInstance;
  onFininsh: (values: any) => void;
  setCustAtrr: (values: any) => void;
  isChatLoading: boolean;
  setFormValues?: (values: any) => void;
  refetch: () => void;
  agentId: string | string[];
};

const PipelineInfo = ({
  details,
  formSubmitting,
  form,
  setCustAtrr,
  onFininsh,
  isChatLoading,
  setFormValues,
  agentId,
  refetch,
}: AgentInfoProps) => {
  console.log("🚀 ~ details:", details);
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

  const handleValueChange = (
    values: UnknownObject,
    formValues: UnknownObject,
  ) => {
    // set custom attribute on runtime to set data in chatbot without saving config
    // setCustAtrr(formValues)
    if (setFormValues) {
      setFormValues(formValues);
    }
  };

  const { data: knowledgeBaseData, isLoading: knowledgeBaseLoading } =
    useFetchData(config.knowledgebase.list, {
      page: DEFAULT_PAGE,
      size: ALL_DATA_PAGE_SIZE,
    });

  const { data: toolsData, isLoading: toolsLoading } = useFetchData(
    config.tools.list,
    {
      page: DEFAULT_PAGE,
      size: ALL_DATA_PAGE_SIZE,
    },
  );
  const toggleAdvanceOptions = () => {
    setAdvancedOptionsOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (details?.result) {
      form.setFieldsValue({
        ...details?.result,
      });
      setCustAtrr(details?.result);
    }
  }, [details?.result]);

  const toggleEditDetailsModal = () => {
    setShowEditDetails((prev: boolean) => !prev);
  };

  const updateAgentDetails = async (values: any) => {
    try {
      console.log("🚀 ~ updateAgentDetails ~ values:", values);
      setUpdateDetailsLoading(true);

      const payload = {
        ...(details?.result || {}),
        ...values,
        pipeline_id: agentId,
      };

      console.log("🚀 ~ updateAgentDetails ~ payload:", payload);
      const updateAgentResponse = await updateAgentApi({ payload });
      console.log(
        "🚀 ~ updateAgentDetails ~ updateAgentResponse:",
        updateAgentResponse,
      );

      if (updateAgentResponse?.status === 200) {
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
    <Form
      preserve={false}
      layout="vertical"
      form={form}
      onFinish={onFininsh}
      onValuesChange={handleValueChange}
      disabled={isChatLoading}
    >
      <Row
        justify="end"
        style={{ width: "100%", marginBottom: "20px", paddingRight: "17px" }}
      >
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            // onClick={form.submit}
            loading={formSubmitting}
          >
            Save and test
          </Button>
        </Col>
      </Row>
      <Row
        gutter={[6, 20]}
        style={{
          overflowY: "auto",
          height: "calc(100vh - 155px)",
          paddingRight: "17px",
        }}
      >
        <Col span={24}>
          <PipelineCardContainer>
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
            {showEditDetails && (
              <CreateAgentModal
                loading={updateDetailsLoading}
                onClose={toggleEditDetailsModal}
                open={showEditDetails}
                agentFlowDetails={details?.result || {}}
                mode={PAGE_MODE.EDIT}
                createAgentHandler={updateAgentDetails}
              />
            )}
          </PipelineCardContainer>
        </Col>
        <Col span={24}>
          <PipelineFormCardContainer>
            <WorkflowInfoFormTitle>Model</WorkflowInfoFormTitle>
            <WorkflowInfoFormDescription>
              The knowledge base serves as a repository of structured or
              unstructured information that an AI system can access to enhance
              its understanding and generate informed responses.
            </WorkflowInfoFormDescription>
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
                  console.log(`dropdown options`, option);
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
          </PipelineFormCardContainer>
        </Col>
        <Col span={24}>
          <PipelineFormCardContainer>
            <WorkflowInfoFormTitle>Base instruction</WorkflowInfoFormTitle>
            <Form.Item name={"base_instructions"}>
              <TextArea
                style={{ resize: "none" }}
                autoSize={{ minRows: 4, maxRows: 6 }}
                placeholder="Preamble"
              />
            </Form.Item>
          </PipelineFormCardContainer>
        </Col>
        <Col span={24}>
          <PipelineFormCardContainer>
            <KnowledgebaseInfoFormTitle>
              Knowledge base
            </KnowledgebaseInfoFormTitle>
            <KnowledgebaseInfoFormDescription>
              The knowledge base serves as a repository of structured or
              unstructured information that an AI system can access to enhance
              its understanding and generate informed responses.
            </KnowledgebaseInfoFormDescription>
            <Form.Item name={["kb", "kb_id"]} label="Knowledge base">
              <Select
                placeholder="Select knowledge base"
                loading={knowledgeBaseLoading}
                showSearch
                optionFilterProp="label"
                allowClear
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />

                    <Button
                      block
                      style={{ width: "100%" }}
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => router.push("/knowledge-base")}
                    >
                      Create knowledge base
                    </Button>
                  </>
                )}
                optionRender={(option: any) => (
                  <SelectOptionDetail key={option?.data?.id}>
                    <SelectOptionName>{option?.data?.name}</SelectOptionName>
                    <SelectOptionDescription>
                      {option?.data?.description}
                    </SelectOptionDescription>
                  </SelectOptionDetail>
                )}
                onChange={(val: any, option: any) => {
                  form.setFields([
                    {
                      name: ["kb", "kb_name"],
                      value: option?.label,
                      errors: [],
                    },
                    {
                      name: ["kb", "kb_version"],
                      value: option?.version,
                      errors: [],
                    },
                  ]);
                }}
                options={
                  knowledgeBaseData?.result?.map((data: any) => ({
                    label: data?.name,
                    value: data?.id,
                    id: data?.id,
                    ...data,
                  })) || []
                }
              />
            </Form.Item>
            <Form.Item name={["kb", "kb_name"]} hidden>
              <Input></Input>
            </Form.Item>
            <Form.Item name={["kb", "kb_version"]} hidden>
              <Input></Input>
            </Form.Item>
          </PipelineFormCardContainer>
        </Col>
        <Col span={24}>
          <PipelineFormCardContainer>
            <KnowledgebaseInfoFormTitle>Tools</KnowledgebaseInfoFormTitle>
            <KnowledgebaseInfoFormDescription>
              Tools description TBA
            </KnowledgebaseInfoFormDescription>
            <Form.Item
              name={["tools"]}
              // label="Knowledge base"
            >
              <Select
                placeholder="Select tool"
                mode="multiple"
                loading={toolsLoading}
                showSearch
                allowClear
                optionFilterProp="label"
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    {/* <Divider style={{ margin: "8px 0" }} />

                    <Button
                      block
                      style={{ width: "100%" }}
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => router.push("/knowledge-base")}
                    >
                      Create Tools
                    </Button> */}
                  </>
                )}
                optionRender={(option: any) => (
                  <SelectOptionDetail key={option?.data?.id}>
                    <SelectOptionName>{option?.data?.name}</SelectOptionName>
                    <SelectOptionDescription>
                      {option?.data?.description}
                    </SelectOptionDescription>
                  </SelectOptionDetail>
                )}
                options={
                  toolsData?.result?.map((data: any) => ({
                    label: data?.name,
                    value: data?.id,
                    id: data?.id,
                    ...data,
                  })) || []
                }
              />
            </Form.Item>
          </PipelineFormCardContainer>
        </Col>
        <Col span={24}>
          <PipelineFormCardContainer>
            <WorkflowInfoFormTitle>Additional settings</WorkflowInfoFormTitle>
            <Form.Item
              name={["welcome_message", "message"]}
              label={"Welcome message"}
            >
              <TextArea
                style={{ resize: "none" }}
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder="How do you want you agent to greet the user"
              />
            </Form.Item>
          </PipelineFormCardContainer>
        </Col>
      </Row>
    </Form>
  );
};

export default PipelineInfo;
