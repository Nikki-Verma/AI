import { UnknownObject } from "@/utils/types";
import { Flex, Form, FormInstance, Input } from "antd";
import WhatsappIcon from "../Icons/Whatsapp";
import {
  IntegrateWhatsappCardContainer,
  IntegrateWhatsappCardTitle,
} from "./style";

type IntegrateWhatsappCardProps = {
  form: FormInstance;
  integrateChannelHandler: (values: UnknownObject) => void;
};

const IntegrateWhatsappCard = ({
  integrateChannelHandler,
  form,
}: IntegrateWhatsappCardProps) => {
  return (
    <IntegrateWhatsappCardContainer>
      <Flex align="center" justify="space-between" gap="48px">
        <IntegrateWhatsappCardTitle>
          We'll create a data table that can be added to any tool or agent.
          Knowledge is used to provide context to the large language model.
        </IntegrateWhatsappCardTitle>
        <WhatsappIcon />
      </Flex>
      <Form
        form={form}
        onFinish={integrateChannelHandler}
        layout="vertical"
        preserve={false}
        initialValues={{ chat_channel_name: "kaleyrawhatsapp" }}
      >
        <Form.Item name="chat_channel_name" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="bot_name"
          label="Channel Name"
          rules={[{ required: true, message: "Channel name is required" }]}
        >
          <Input placeholder="Enter channel name" />
        </Form.Item>
        <Form.Item
          name="access_token"
          label="Bot OAuth token"
          rules={[{ required: true, message: "App name is required" }]}
        >
          <Input placeholder="Enter bot OAuth token" />
        </Form.Item>
      </Form>
    </IntegrateWhatsappCardContainer>
  );
};

export default IntegrateWhatsappCard;
