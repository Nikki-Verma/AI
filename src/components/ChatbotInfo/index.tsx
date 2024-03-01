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
import { useState } from "react";
import EditIcon from "../Icons/EditIcon";
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
};

const WorkflowInfo = ({ details, form, onFininsh }: WorkflowInfoProps) => {
  const router = useRouter();
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);
  const { data, isLoading } = useFetchData(config.workspace.models, {
    modelStatus: "DEPLOYED",
    page: DEFAULT_PAGE,
    size: ALL_DATA_PAGE_SIZE,
  });

  const toggleAdvanceOptions = () => {
    setAdvancedOptionsOpen((prev: boolean) => !prev);
  };

  return (
    <Row gutter={[6, 20]}>
      <Col span={24}>
        <WorkflowInfoContainer>
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
        </WorkflowInfoContainer>
      </Col>
      <Col>
        <WorkflowInfoFormContainer>
          <WorkflowInfoFormTitle>Model</WorkflowInfoFormTitle>
          <WorkflowInfoFormDescription>
            The knowledge base serves as a repository of structured or
            unstructured information that an AI system can access to enhance its
            understanding and generate informed responses.
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
          </Form>
        </WorkflowInfoFormContainer>
      </Col>
    </Row>
  );
};

export default WorkflowInfo;
