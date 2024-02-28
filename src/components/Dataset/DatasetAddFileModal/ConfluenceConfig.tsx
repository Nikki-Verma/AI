import SlackIcon from "@/components/Icons/SlackIcon";
import { UnknownObject } from "@/utils/types";
import { Alert, Flex, Form, FormInstance, Input } from "antd";
import { UploadDatasetFileContainer, UploadTypeDescription } from "./style";

type ConfluenceConfigProps = {
  form: FormInstance;
  connnectConfluence: (values: UnknownObject) => void;
  loading: boolean;
  confluenceConnectionError: string | undefined;
  confluenceConnectionDetails: UnknownObject;
};

const ConfluenceConfig = ({
  form,
  connnectConfluence,
  loading,
  confluenceConnectionError,
  confluenceConnectionDetails,
}: ConfluenceConfigProps) => {
  return (
    <UploadDatasetFileContainer>
      <Flex align="center" justify="space-between" gap="48px">
        <UploadTypeDescription>
          We'll create a data table that can be added to any tool or agent.
          Knowledge is used to provide context to the large language model.
        </UploadTypeDescription>
        <SlackIcon />
      </Flex>

      <Form
        form={form}
        layout="vertical"
        preserve={false}
        onFinish={connnectConfluence}
        initialValues={{
          ...confluenceConnectionDetails,
          source: "confluence",
          name: "confluence",
        }}
        disabled={loading}
      >
        <Form.Item
          name="source"
          label="Source"
          rules={[
            {
              required: true,
              message: "Source is required",
            },
          ]}
        >
          <Input placeholder="Confluence" disabled />
        </Form.Item>
        <Form.Item name="name" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="user_name"
          label="Email"
          rules={[
            {
              required: true,
              message: "Email is required",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="token"
          label="API Token"
          rules={[
            {
              required: true,
              message: "API token is required",
            },
          ]}
        >
          <Input placeholder="API token" />
        </Form.Item>
        <Form.Item
          name="url"
          label="Domain"
          rules={[
            {
              required: true,
              message: "Domain is required",
            },
          ]}
        >
          <Input placeholder="https://xyz.com" />
        </Form.Item>
        {confluenceConnectionError && (
          <Alert
            message="Configuration check failed"
            description={confluenceConnectionError}
            type="error"
            showIcon
            style={{ padding: "18px" }}
          />
        )}
      </Form>
    </UploadDatasetFileContainer>
  );
};

export default ConfluenceConfig;
