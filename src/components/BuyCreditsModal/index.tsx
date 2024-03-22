import { DollarSymbol } from "@/utils/constants";
import { nonZeroPositiveInteger } from "@/utils/regex";
import { UnknownObject } from "@/utils/types";
import { Col, Divider, Flex, Form, InputNumber, Modal, Row, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
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
  loading: boolean;
};

const suggestedAmounts = [1000, 5000, 10000, 50000, 100000];

const BuyCreditsModal = ({
  open,
  onClose,
  creditsTopupHandler,
  loading,
}: BuyCreditsModalProps) => {
  const [form] = useForm();
  const [creditsBreakup, setCreditsBreakup] = useState<{
    amount: number;
    credits: number;
    tax: number;
  }>({
    amount: 0,
    credits: 0,
    tax: 0,
  });

  useEffect(() => {
    form.setFields([
      {
        name: "total_amount",
        value: +(creditsBreakup?.amount + creditsBreakup?.tax || 0).toFixed(2),
        errors: [],
      },
    ]);
  }, [creditsBreakup]);

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
      <Spin spinning={loading}>
        <Row gutter={[16, 24]}>
          <Col span={24} md={{ span: 18 }}>
            <TopUpCreditDescription>
              {/* Transparent pricing, just for your needs. Use the slider to select
              your monthly creation volume. */}
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
                  onChange={(value) => {
                    setCreditsBreakup({
                      amount: value ? +(value / 1000).toFixed(2) : 0,
                      credits: value || 0,
                      tax: value
                        ? +(
                            (value ? +(value / 1000).toFixed(2) : 0) * 0.18
                          ).toFixed(2)
                        : 0,
                    });
                  }}
                  style={{ width: "100%", padding: "12px" }}
                  placeholder="Please enter credits you want to buy"
                />
              </Form.Item>

              <Form.Item noStyle name={"total_amount"} hidden>
                <InputNumber />
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
                    onClick={() => {
                      form.setFields([
                        {
                          name: "credits",
                          value: amount,
                          errors: [],
                        },
                      ]);
                      setCreditsBreakup({
                        amount: amount ? +(amount / 1000).toFixed(2) : 0,
                        credits: amount || 0,
                        tax: amount
                          ? +(
                              (amount ? +(amount / 1000).toFixed(2) : 0) * 0.18
                            ).toFixed(2)
                          : 0,
                      });
                    }}
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
                <CreditBreakdownTitle>Credits per dollar</CreditBreakdownTitle>
                <CreditBreakdownDescription>1000</CreditBreakdownDescription>
              </Flex>
              <Flex justify="space-between" wrap="wrap">
                <CreditBreakdownTitle>Amount for credits</CreditBreakdownTitle>
                <CreditBreakdownDescription>
                  {creditsBreakup?.amount}
                </CreditBreakdownDescription>
              </Flex>
              <Flex justify="space-between" wrap="wrap">
                <CreditBreakdownTitle>Tax</CreditBreakdownTitle>
                <CreditBreakdownDescription>{`${DollarSymbol}${creditsBreakup?.tax}`}</CreditBreakdownDescription>
              </Flex>
              <Divider style={{ margin: "0" }} />
              <Flex justify="space-between" wrap="wrap">
                <CreditBreakdownTitle style={{ fontWeight: "bold" }}>
                  Subtotal
                </CreditBreakdownTitle>
                <CreditBreakdownDescription
                  style={{ fontWeight: "bold" }}
                >{`${DollarSymbol}${+(creditsBreakup?.amount + creditsBreakup?.tax || 0).toFixed(2)}`}</CreditBreakdownDescription>
              </Flex>
            </CreditsBreakdownContainer>
          </Col>
          <Col span={24}>
            <BuyCreditActionButton block type="primary" onClick={form.submit}>
              Buy Credits
            </BuyCreditActionButton>
          </Col>
        </Row>
      </Spin>
    </Modal>
  );
};

export default BuyCreditsModal;
