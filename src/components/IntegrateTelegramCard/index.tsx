import { UnknownObject } from "@/utils/types";
import { Flex, Form, FormInstance, Input } from "antd";
import TelegramIcon from "../Icons/Telegram";
import {
  IntegrateTelegramCardContainer,
  IntegrateTelegramCardTitle,
} from "./style";

type IntegrateTelegramCardProps = {
  form: FormInstance;
  integrateChannelHandler: (values: UnknownObject) => void;
};

const IntegrateTelegramCard = ({
  integrateChannelHandler,
  form,
}: IntegrateTelegramCardProps) => {
  return (
    <IntegrateTelegramCardContainer>
      <Flex align="center" justify="space-between" gap="48px">
        <IntegrateTelegramCardTitle>
          We'll create a data table that can be added to any tool or agent.
          Knowledge is used to provide context to the large language model.
        </IntegrateTelegramCardTitle>
        <TelegramIcon />
      </Flex>
      <Form
        form={form}
        onFinish={integrateChannelHandler}
        layout="vertical"
        preserve={false}
        initialValues={{ chat_channel_name: "telegram" }}
      >
        {/* Uncomment when image storage is sorted */}
        {/* <Flex
          gap="12px"
          align="center"
          justify="flex-start"
          style={{ marginBottom: "18px" }}
        >
          <Form.Item
            name="channel_logo"
            rules={[{ required: true, message: "Channel logo is required" }]}
            style={{ margin: 0 }}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              accept="image/*"
            >
              <UploadBoxButton type="dashed">
                <PlusOutlined style={{ color: "currentcolor" }} />
              </UploadBoxButton>
            </Upload>
          </Form.Item>
          <Flex vertical gap="6px">
            <div>
              <UploadHintLabel>Maximum Size: </UploadHintLabel>
              <UploadHintValue>1 Mb</UploadHintValue>
            </div>
            <div>
              <UploadHintLabel>Supported formats: </UploadHintLabel>
              <UploadHintValue>.jpg , .png, .jpeg</UploadHintValue>
            </div>
          </Flex>
        </Flex> */}
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
    </IntegrateTelegramCardContainer>
  );
};

export default IntegrateTelegramCard;
