import { createPaymentOrderApi, verifyPaymentStatusApi } from "@/api/payment";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { dateFormatForFrontend, tokenDateFormat } from "@/utils/constants";
import dayjs from "@/utils/date";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Col, Flex, Row, Skeleton, Typography } from "antd";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BuyCreditsModal from "../BuyCreditsModal";
import CalendarIcon from "../Icons/CalendarIcon";
import CustomWalletIcon from "../Icons/CustomWalletIcon";
import UserIcon from "../Icons/UserIcon";
import Statistics from "../Statistics";
import UpgradePlanModal from "../UpgradePlanModal";

import {
  BillingActionHeading,
  BillingDetailsAndActions,
  BillingDetailsLink,
  BillingStats,
  CurrentBillingCardContainer,
  UpgradePlanButton,
} from "./style";

const { Text } = Typography;

const CurrentBillingCard = () => {
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);
  const [displayCreditsModal, setDisplayCreditsModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const { notification } = useNotify();
  const { data: session }: any = useSession();

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(config.subscription.currentPlan, {
      tenant_id: session?.user?.details?.tenantId,
      additional_fields: "feature,pricing",
    });
  console.log("🚀 ~ CurrentBillingCard ~ data:", data);
  console.log("🚀 ~ CurrentBillingCard ~ error:", error);

  const [billingBasicStats, setBillingBasicStats] = useState([
    {
      label: "Credits",
      value: 0,
      icon: <CustomWalletIcon />,
    },
    { label: "Trail Ends", value: "--", icon: <CalendarIcon /> },
    {
      label: "users",
      value: "--",
      icon: <UserIcon />,
    },
  ]);
  const [billingAdvanceStats, setBillingAdvanceStats] = useState([
    { label: "Available Credits", value: "1000", icon: <CustomWalletIcon /> },
  ]);

  useEffect(() => {
    if (data) {
      const planCredits =
        data?.result?.features?.find(
          (feature: UnknownObject) => feature?.name === "Credits Usage Rate",
        )?.max_limit ?? 0;
      const planUserLimit =
        data?.result?.features?.find(
          (feature: UnknownObject) => feature?.name === "User accounts",
        )?.max_limit ?? 0;
      const planEndDate = data?.result?.expiry_at
        ? dayjs(data?.result?.expiry_at, tokenDateFormat).format(
            dateFormatForFrontend,
          )
        : "--";

      setBillingBasicStats([
        {
          label: "Credits",
          value: planCredits,
          icon: <CustomWalletIcon />,
        },
        { label: "Trail Ends", value: planEndDate, icon: <CalendarIcon /> },
        {
          label: "users",
          value: `${planUserLimit} users`,
          icon: <UserIcon />,
        },
      ]);
    }
  }, [data]);

  const toggleCreditsModal = () => {
    setDisplayCreditsModal((prev: boolean) => !prev);
  };

  const toggleUpgradeModal = () => {
    setDisplayUpgradeModal((prev: boolean) => !prev);
  };

  const creditsTopupHandler = async (values: any) => {
    try {
      console.log("values", values);
      setCreditsLoading(true);

      const orderResponse = await createPaymentOrderApi({
        payload: {
          amount: values?.total_amount,
          seller_id: "63ef82566b815b16b65b52cb",
          currency: "INR",
          shop_platform: "SHOPIFY",
          customer: {
            id: "6a289d78-c558-11ec-9d64-0242ac120012",
          },
          payment_platform: "Razorpay",
          source: "wallet",
        },
      });

      console.log("orderResponse", orderResponse);

      if (orderResponse.status === 200) {
        const options = {
          key: "rzp_live_dfHYOIhEO8Ok8v", // Enter the Key ID generated from the Dashboard
          amount: values?.total_amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "SimplAI", //your business name
          description: "Simplifing your AI journey",
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/Logos/simplaiLogo.svg`,
          redirect: false,
          order_id: orderResponse?.data?.data?.gateway_order_id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
          callback_url:
            "https://payment-handler.simplai.ai/payment/callback/razorpay/?pgOrderId",
          // prefill: {
          //   //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          //   name: "Dinesh Kumar", //your customer's name
          //   email: "gaurav.kumar@example.com",
          //   contact: "8800757087", //Provide the customer's phone number for better conversion rates
          // },
          notes: {
            // address: "Razorpay Corporate Office",
          },
          theme: {
            color: PRIMARY_BRAND_COLOR,
          },
          modal: {
            ondismiss: function () {
              console.log("Checkout form closed");
              setCreditsLoading(false);
            },
          },
          handler: async (response: any) => {
            console.log(
              "🚀 ~ creditsTopupHandler ~ options.response:",
              response,
            );

            const verificationResponse = await verifyPaymentStatusApi({
              txn_id: orderResponse?.data?.data?.txn_id,
            });

            console.log("verificationResponse", verificationResponse);

            if (verificationResponse.status === 200) {
              if (verificationResponse?.data?.data?.txn_status === "Success") {
                toggleCreditsModal();
                notification.success({ message: "Credits added successfully" });
              } else {
                notification.error({
                  message: verificationResponse?.data?.data?.failure_reason,
                });
              }
            }
            setCreditsLoading(false);
          },
        };
        if (!!window) {
          //
          var rzp1: any = new (window as any).Razorpay(options);
          rzp1.open();
          rzp1.on("payment.failed", (response: any) => {
            console.log("response", response);
            notification.error({
              message: response.error.reason,
              description: response.error.description,
            });
          });
        }
      } else {
        setCreditsLoading(false);
      }
    } catch (error) {
      setCreditsLoading(false);
      notification.error({
        message: "Error while buying credits",
        description: getErrorFromApi(error),
      });
    }
  };

  const upgradePlanHandler = async (values: any) => {
    try {
      setPaymentLoading(true);
      console.log("values", values);

      const orderResponse = await createPaymentOrderApi({
        payload: {
          amount: values?.amount,
          seller_id: "63ef82566b815b16b65b52cb",
          currency: "INR",
          shop_platform: "SHOPIFY",
          customer: {
            id: "6a289d78-c558-11ec-9d64-0242ac120012",
          },
          payment_platform: "Razorpay",
          source: "wallet",
        },
      });

      console.log("orderResponse", orderResponse);

      if (orderResponse.status === 200) {
        const options = {
          key: "rzp_live_dfHYOIhEO8Ok8v", // Enter the Key ID generated from the Dashboard
          amount: values?.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "SimplAI", //your business name
          description: "Simplifing your AI journey",
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/Logos/simplaiLogo.svg`,
          redirect: false,
          order_id: orderResponse?.data?.data?.gateway_order_id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
          callback_url:
            "https://payment-handler.simplai.ai/payment/callback/razorpay/?pgOrderId",
          // prefill: {
          //   //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          //   name: "Dinesh Kumar", //your customer's name
          //   email: "gaurav.kumar@example.com",
          //   contact: "8800757087", //Provide the customer's phone number for better conversion rates
          // },
          notes: {
            // address: "Razorpay Corporate Office",
          },
          theme: {
            color: PRIMARY_BRAND_COLOR,
          },
          modal: {
            ondismiss: function () {
              console.log("Checkout form closed");
              setPaymentLoading(false);
            },
          },
          handler: async (response: any) => {
            console.log(
              "🚀 ~ creditsTopupHandler ~ options.response:",
              response,
            );

            const verificationResponse = await verifyPaymentStatusApi({
              txn_id: orderResponse?.data?.data?.txn_id,
            });

            console.log("verificationResponse", verificationResponse);

            if (verificationResponse.status === 200) {
              if (verificationResponse?.data?.data?.txn_status === "Success") {
                toggleUpgradeModal();
                notification.success({ message: "Plan upgraded successfully" });
              } else {
                notification.error({
                  message: verificationResponse?.data?.data?.failure_reason,
                });
              }
            }
            setPaymentLoading(false);
          },
        };
        if (!!window) {
          var rzp1: any = new (window as any).Razorpay(options);
          rzp1.open();
          rzp1.on("payment.failed", (response: any) => {
            console.log("response", response);
            notification.error({
              message: response.error.reason,
              description: response.error.description,
            });
          });
        } else {
          notification.error({
            message: "Browser does not support third party payment",
          });
        }
      } else {
        setPaymentLoading(false);
      }
    } catch (error) {
      setPaymentLoading(false);
      notification.error({
        message: "Error while upgrading plans",
        description: getErrorFromApi(error),
      });
    }
  };

  return (
    <Row gutter={[20, 20]}>
      <Col span={24} md={{ span: 16 }}>
        <CurrentBillingCardContainer
          styles={{
            body: {
              padding: "16px 16px 26px",
            },
          }}
          style={{ flex: 1 }}
        >
          <Skeleton paragraph={{ rows: 1 }} active loading={isLoading}>
            <BillingDetailsAndActions>
              <Flex gap="16px" align="baseline" flex={1}>
                <BillingActionHeading>{`Current Plan- ${data?.result?.plan_name}`}</BillingActionHeading>
                <BillingDetailsLink
                  prefetch
                  href="/settings/billing-and-plans/pricing-plans"
                >
                  View details
                </BillingDetailsLink>
              </Flex>
              <Flex justify="space-between">
                <BillingStats>
                  {billingBasicStats?.map((billingStat: any) => {
                    return <Statistics stats={billingStat} />;
                  })}
                </BillingStats>
                <UpgradePlanButton type="primary" onClick={toggleUpgradeModal}>
                  Upgrade Plan
                </UpgradePlanButton>
              </Flex>
            </BillingDetailsAndActions>
          </Skeleton>
        </CurrentBillingCardContainer>
      </Col>
      <Col span={24} md={{ span: 8 }}>
        <CurrentBillingCardContainer
          styles={{
            body: {
              padding: "16px 16px 26px",
            },
          }}
        >
          <Skeleton paragraph={{ rows: 3 }} active loading={false}>
            <BillingDetailsAndActions>
              <BillingActionHeading>Credit Metrics</BillingActionHeading>
              <Flex justify="space-between">
                <BillingStats>
                  {billingAdvanceStats?.map((billingStat: any) => {
                    return <Statistics stats={billingStat} />;
                  })}
                </BillingStats>
                <UpgradePlanButton type="primary" onClick={toggleCreditsModal}>
                  Buy Credits
                </UpgradePlanButton>
              </Flex>
            </BillingDetailsAndActions>
          </Skeleton>
        </CurrentBillingCardContainer>
      </Col>
      <UpgradePlanModal
        open={displayUpgradeModal}
        onClose={toggleUpgradeModal}
        upgradePlanHandler={upgradePlanHandler}
        loading={paymentLoading}
      />
      <BuyCreditsModal
        loading={creditsLoading}
        open={displayCreditsModal}
        onClose={toggleCreditsModal}
        creditsTopupHandler={creditsTopupHandler}
      />
    </Row>
  );
};

export default CurrentBillingCard;
