import { UnknownObject } from "@/utils/types";
import { Flex, Form, FormInstance, Input } from "antd";
import SlackIcon from "../Icons/SlackIcon";
import { IntegrateSlackCardContainer, IntegrateSlackCardTitle } from "./style";

type IntegrateSlackCardProps = {
  form: FormInstance;
  integrateChannelHandler: (values: UnknownObject) => void;
};

const IntegrateSlackCard = ({
  integrateChannelHandler,
  form,
}: IntegrateSlackCardProps) => {
  return (
    <IntegrateSlackCardContainer>
      <Flex align="center" justify="space-between" gap="48px">
        <IntegrateSlackCardTitle>
          We'll create a data table that can be added to any tool or agent.
          Knowledge is used to provide context to the large language model.
        </IntegrateSlackCardTitle>
        <SlackIcon />
      </Flex>
      <Form
        form={form}
        onFinish={integrateChannelHandler}
        layout="vertical"
        preserve={false}
        initialValues={{ chat_channel_name: "slack" }}
      >
        <Form.Item name="chat_channel_name" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          name="bot_name"
          label="App Name"
          rules={[{ required: true, message: "Chane name is required" }]}
        >
          <Input placeholder="Enter app name" />
        </Form.Item>
        <Form.Item
          name="app_id"
          label="App ID"
          rules={[{ required: true, message: "App ID is required" }]}
        >
          <Input placeholder="Enter App ID name" />
        </Form.Item>
        <Form.Item
          name="access_token"
          label="Bot user OAuth token"
          rules={[{ required: true, message: "App name is required" }]}
        >
          <Input placeholder="Enter bot user OAuth token" />
        </Form.Item>
      </Form>
    </IntegrateSlackCardContainer>
  );
};

export default IntegrateSlackCard;
