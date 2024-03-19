import { DollarSymbol } from "@/utils/constants";
import { nonZeroPositiveInteger } from "@/utils/regex";
import { UnknownObject } from "@/utils/types";
import { Col, Divider, Flex, Form, InputNumber, Modal, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { SaCard } from "../UIComponents/UIComponents.style";
import {
  BuyCreditActionButton,
  CreditBreakdownDescription,
  CreditBreakdownTitle,
  CreditsBreakdownContainer,
  TopUpCreditDescription,
  TopUpCreditTitle,
} from "./style";

type BuyCreditsModalProps = {
  open: boolean;
  onClose: () => void;
  creditsTopupHandler: (values: UnknownObject) => void;
};

const suggestedAmounts = [100, 500, 1000, 5000, 10000];

const BuyCreditsModal = ({
  open,
  onClose,
  creditsTopupHandler,
}: BuyCreditsModalProps) => {
  const [form] = useForm();

  return (
    <Modal
      title={<TopUpCreditTitle>Top Up Credits</TopUpCreditTitle>}
      open={open}
      onCancel={() => {
        onClose();
      }}
      width="40vw"
      footer={false}
      destroyOnClose
      centered
    >
      <Row gutter={[16, 24]}>
        <Col span={24} md={{ span: 18 }}>
          <TopUpCreditDescription>
            Transparent pricing, just for your needs. Use the slider to select
            your monthly creation volume.
          </TopUpCreditDescription>
        </Col>
        <Col span={24}>
          <Form form={form} preserve={false} onFinish={creditsTopupHandler}>
            <Form.Item
              noStyle
              name={"credits"}
              rules={[
                {
                  required: true,
                  message: "Please enter no. of credits you want to buy",
                },
                {
                  pattern: nonZeroPositiveInteger,
                  message: "Please enter valid credits",
                },
              ]}
            >
              <InputNumber
                min={0}
                step={50}
                style={{ width: "100%", padding: "12px" }}
                placeholder="Please enter credits you want to buy"
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={24}>
          <Flex wrap="wrap" gap="12px" justify="space-between">
            {suggestedAmounts?.map((amount: any) => {
              return (
                <SaCard
                  style={{
                    width: "80px",
                    cursor: "pointer",
                  }}
                  key={amount}
                  onClick={() =>
                    form.setFields([
                      {
                        name: "credits",
                        value: amount,
                        errors: [],
                      },
                    ])
                  }
                >
                  {amount}
                </SaCard>
              );
            })}
          </Flex>
        </Col>
        <Col span={24}>
          <CreditsBreakdownContainer>
            <Flex justify="space-between" wrap="wrap">
              <CreditBreakdownTitle>Number of Credits</CreditBreakdownTitle>
              <CreditBreakdownDescription>20000</CreditBreakdownDescription>
            </Flex>
            <Flex justify="space-between" wrap="wrap">
              <CreditBreakdownTitle>Price per credit</CreditBreakdownTitle>
              <CreditBreakdownDescription>{`${DollarSymbol}2000`}</CreditBreakdownDescription>
            </Flex>
            <Flex justify="space-between" wrap="wrap">
              <CreditBreakdownTitle>Tax</CreditBreakdownTitle>
              <CreditBreakdownDescription>{`${DollarSymbol}3433`}</CreditBreakdownDescription>
            </Flex>
            <Divider style={{ margin: "0" }} />
            <Flex justify="space-between" wrap="wrap">
              <CreditBreakdownTitle style={{ fontWeight: "bold" }}>
                Subtotal
              </CreditBreakdownTitle>
              <CreditBreakdownDescription
                style={{ fontWeight: "bold" }}
              >{`${DollarSymbol}1000`}</CreditBreakdownDescription>
            </Flex>
          </CreditsBreakdownContainer>
        </Col>
        <Col span={24}>
          <BuyCreditActionButton block type="primary" onClick={form.submit}>
            Buy Credits
          </BuyCreditActionButton>
        </Col>
      </Row>
    </Modal>
  );
};

export default BuyCreditsModal;
