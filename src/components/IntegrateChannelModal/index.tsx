import { UnknownObject } from "@/utils/types";
import { Button, Col, FormInstance, Modal, Row, Space } from "antd";
import { useState } from "react";
import ChannelOptions from "../ChannelOptions";
import IntegrateSlackCard from "../IntegrateSlackCard";
import IntegrateTelegramCard from "../IntegrateTelegramCard";
import IntegrateWhatsappCard from "../IntegrateWhatsappCard";
import { ChannelType, CHANNEL_TYPES } from "./constant";
import { Integration_Available_Channels } from "./helper";

type IntegrateChannelModalProps = {
  open: boolean;
  onClose: () => void;
  title: string | undefined;
  loading: boolean;
  form: FormInstance;
  integrateChannelHandler: (values: UnknownObject) => void;
};

const IntegrateChannelModal = ({
  open,
  onClose,
  title,
  loading,
  form,
  integrateChannelHandler,
}: IntegrateChannelModalProps) => {
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelType | undefined
  >(undefined);

  const getChannelStep = () => {
    switch (selectedChannel) {
      case CHANNEL_TYPES.SLACK:
        return (
          <IntegrateSlackCard
            form={form}
            integrateChannelHandler={integrateChannelHandler}
          />
        );

      case CHANNEL_TYPES.TELEGRAM:
        return (
          <IntegrateTelegramCard
            form={form}
            integrateChannelHandler={integrateChannelHandler}
          />
        );

      case CHANNEL_TYPES.KALEYRAWHATSAPP:
        return (
          <IntegrateWhatsappCard
            form={form}
            integrateChannelHandler={integrateChannelHandler}
          />
        );

      default:
        return (
          <ChannelOptions
            availableOptions={Integration_Available_Channels}
            setSelectedChannel={setSelectedChannel}
          />
        );
    }
  };

  return (
    <Modal
      title={title ?? "Integrate Channel"}
      open={open}
      onCancel={() => {
        if (!loading) {
          onClose();
        }
      }}
      maskClosable={false}
      afterClose={() => setSelectedChannel(undefined)}
      centered
      width={"50%"}
      destroyOnClose
      closable
      styles={{
        body: {
          padding: "12px 0",
        },
      }}
      footer={
        <Row justify="space-between">
          <Col>
            <Space>
              <Button block type="default" disabled={loading} onClick={onClose}>
                Cancel
              </Button>

              {!!selectedChannel && (
                <Button
                  type="default"
                  disabled={loading}
                  onClick={() => {
                    setSelectedChannel(undefined);
                    form.resetFields();
                  }}
                >
                  Back
                </Button>
              )}
            </Space>
          </Col>
          <Col>
            <Button
              block
              type="primary"
              disabled={!selectedChannel}
              onClick={form.submit}
              loading={loading}
            >
              Create
            </Button>
          </Col>
        </Row>
      }
    >
      {getChannelStep()}
    </Modal>
  );
};

export default IntegrateChannelModal;
