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
  const { data, isLoading } = useFetchData(config.models.list, {
    status: "DEPLOYED",
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
                  <WorkflowName>{details?.result?.pipeline_name}</WorkflowName>
                </Col>
                <Col>
                  <EditIcon style={{ cursor: "no-drop" }} />
                </Col>
              </Row>
            </Col>
            <Col>
              <WorkflowDescription>
                {details?.result?.pipeline_description}
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
                    name={["model_detail", "model_parameters", "decay_rate"]}
                    label="Decay Rate"
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Decay Rate"
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "temperature"]}
                    label="Temperature"
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Temperature"
                      min={0}
                      max={1}
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "output_style"]}
                    label="Output Style"
                  >
                    <Input placeholder="Output style" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "chunk_size"]}
                    label="Chunk size"
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Chunk size"
                      precision={0}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "token_length"]}
                    label="Token length"
                  >
                    <InputNumber
                      style={{ ...fullWidth }}
                      placeholder="Token length"
                      precision={2}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={["model_detail", "model_parameters", "sample"]}
                    label="Sample"
                  >
                    <Input placeholder="Sample" />
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
