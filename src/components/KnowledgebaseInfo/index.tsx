import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE } from "@/utils/constants";
import { UnknownObject } from "@/utils/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import {
  KnowledgebaseInfoFormContainer,
  KnowledgebaseInfoFormDescription,
  KnowledgebaseInfoFormTitle,
  SelectOptionDescription,
  SelectOptionDetail,
  SelectOptionName,
} from "./style";

const { Text } = Typography;
const fullWidth = { width: "100%" };

type KnowledgebaseInfoProps = {
  details: UnknownObject | undefined | null;
  form: FormInstance;
  onFininsh: (values: any) => void;
};

const KnowledgebaseInfo = ({
  details,
  form,
  onFininsh,
}: KnowledgebaseInfoProps) => {
  const router = useRouter();
  const { data, isLoading } = useFetchData(config.knowledgebase.list, {
    page: DEFAULT_PAGE,
    size: ALL_DATA_PAGE_SIZE,
  });

  return (
    <Row gutter={[6, 20]}>
      <Col span={24}>
        <KnowledgebaseInfoFormContainer>
          <KnowledgebaseInfoFormTitle>
            Knowledge base
          </KnowledgebaseInfoFormTitle>
          <KnowledgebaseInfoFormDescription>
            Database of facts and information the AI searches to enrich
            responses with accurate and relevant content.
          </KnowledgebaseInfoFormDescription>
          <Form
            preserve={false}
            layout="vertical"
            form={form}
            onFinish={onFininsh}
          >
            <Form.Item
              name={["kb", "kb_id"]}
              rules={[
                { required: true, message: "Knowledge base is required" },
              ]}
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
                  data?.result?.map((data: any) => ({
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
          </Form>
        </KnowledgebaseInfoFormContainer>
      </Col>
    </Row>
  );
};

export default KnowledgebaseInfo;
