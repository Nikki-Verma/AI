import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE } from "@/utils/constants";
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
import { useEffect, useState } from "react";
import EditIcon from "../Icons/EditIcon";
import {
  AdvancedOptionsContainer,
  KnowledgebaseInfoFormContainer,
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
import TextArea from "antd/es/input/TextArea";

const { Text } = Typography;
const fullWidth = { width: "100%" };

type AgentInfoProps = {
  details: UnknownObject | undefined | null;
  formSubmitting : boolean;
  form: FormInstance;
  onFininsh: (values: any) => void;
  setCustAtrr:(values: any) => void;
  isChatLoading : boolean
};

const PipelineInfo = ({ details,formSubmitting, form,setCustAtrr, onFininsh,isChatLoading }: AgentInfoProps) => {
  const router = useRouter();
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const { data , isLoading } = useFetchData(config.workspace.models, {
    modelStatus: "DEPLOYED",
    page: DEFAULT_PAGE,
    size: ALL_DATA_PAGE_SIZE,
  });

  const handleValueChange = (values : UnknownObject,formValues : UnknownObject) => {
    // set custom attribute on runtime to set data in chatbot without saving config
    // setCustAtrr(formValues)
  }
  const { data : knowledgeBaseData, isLoading : knowledgeBaseLoading } = useFetchData(config.knowledgebase.list, {
    page: DEFAULT_PAGE,
    size: ALL_DATA_PAGE_SIZE,
  });
  const toggleAdvanceOptions = () => {
    setAdvancedOptionsOpen((prev: boolean) => !prev);
  };


  useEffect(()=>{
    if(details?.result){
      form.setFieldsValue({
        ...details?.result
      })
      setCustAtrr(details?.result)
    }
  },[details?.result])

  return (
    
    <Form
      preserve={false}
      layout="vertical"
      form={form}
      onFinish={onFininsh}
      onValuesChange={handleValueChange}
      disabled = {isChatLoading}
    >
      <Row justify="end" style={{width : '100%',marginBottom : '20px'}}>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              // onClick={form.submit}
              loading={formSubmitting}
            >
              Test
            </Button>
          </Col>
        </Row>
      <Row gutter={[6, 20]} style={{height : 'calc(100vh - 104px)',overflowY : 'auto',paddingRight: '17px'}}>
      <Col span={24}>
        <PipelineCardContainer>
          <Row gutter={[6, 16]}>
            <Col span={24}>
              <Row justify="space-between">
                <Col>
                  <WorkflowName>{details?.result?.pipeline_name ?? details?.result?.agent_name}</WorkflowName>
                </Col>
                <Col>
                  <EditIcon style={{ cursor: "no-drop" }} />
                </Col>
              </Row>
            </Col>
            <Col>
              <WorkflowDescription>
                {details?.result?.pipeline_description ?? details?.result?.agent_description}
              </WorkflowDescription>
            </Col>
          </Row>
        </PipelineCardContainer>
      </Col>
      <Col span={24}>
        <PipelineFormCardContainer>
          <WorkflowInfoFormTitle>Model</WorkflowInfoFormTitle>
          <WorkflowInfoFormDescription>
            The knowledge base serves as a repository of structured or
            unstructured information that an AI system can access to enhance its
            understanding and generate informed responses.
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
                  console.log(`dropdown options`,option)
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
                    label="Temperature"
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
                    label="Top K sampling"
                  >
                    <InputNumber 
                    style={{...fullWidth}}
                    placeholder="Top K sampling"
                    precision = {0}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "repeat_penalty"]}
                    label="Repeat penalty"
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
                    label="Min P sampling"
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
                    label="Top P sampling"
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
                    <Switch 
                    />
                  </Form.Item>
                </Col>
              </Row>
            </AdvancedOptionsContainer>
        </PipelineFormCardContainer>
      </Col>
      <Col span={24}>
        <PipelineFormCardContainer>
        <WorkflowInfoFormTitle>Base instruction</WorkflowInfoFormTitle>
        <Form.Item
          name={'base_instructions'}
        >
        <TextArea
        style={{resize : 'none'}}
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
            unstructured information that an AI system can access to enhance its
            understanding and generate informed responses.
          </KnowledgebaseInfoFormDescription>
            <Form.Item
              name={["kb", "kb_id"]}
              label="Knowledge base"
            >
              <Select
                placeholder="Select knowledge base"
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
        <WorkflowInfoFormTitle>Additional settings</WorkflowInfoFormTitle>
        <Form.Item
          name={['Welcome message', "message"]}
          label = {'Welcome message'}
        >
        <TextArea
        style={{resize : 'none'}}
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
