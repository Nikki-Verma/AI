import { createPaymentOrderApi, verifyPaymentStatusApi } from "@/api/payment";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import {
  dateFormatForFrontend,
  DollarSymbol,
  tokenDateFormat,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { UnknownObject } from "@/utils/types";
import { PRIMARY_BRAND_COLOR } from "@/_utils/theme.antd";
import { Flex, FlexProps, Skeleton, Space } from "antd";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  DescriptionItemType,
  LayoutOption,
  LayoutType,
} from "../DescriptionList";
import TickIcon from "../Icons/TickIcon";
import UpgradePlanModal from "../UpgradePlanModal";
import {
  FeatureItem,
  PlanUpgradeButton,
  PlanUpgradeButtonText,
  PricingDetailsCard,
  PricingDetailsDescriptionItemLabel,
  PricingDetailsDescriptionItemValue,
  PricingDetailsDivider,
  PricingPlansContainer,
  PricingPlansTitle,
} from "./style";

type PricingDetailsDescriptionProps = {
  layout?: LayoutType;
  colon?: boolean;
  columns: DescriptionItemType[];
  data: UnknownObject;
  gapBetweenItems?: FlexProps["gap"];
  gapBetweenLabelAndValue?: FlexProps["gap"];
  vertical?: boolean;
};

const PricingDetailsDescription = ({
  layout = LayoutOption.vertical,
  colon = false,
  columns = [],
  data = {},
  gapBetweenItems = "small",
  gapBetweenLabelAndValue = "small",
  vertical = false,
}: PricingDetailsDescriptionProps) => {
  return (
    <Flex gap={gapBetweenItems} wrap="wrap" vertical={vertical}>
      {columns?.map((DescriptionItem: DescriptionItemType) => {
        return (
          <Flex
            vertical={layout === LayoutOption.vertical}
            gap={gapBetweenLabelAndValue}
          >
            <PricingDetailsDescriptionItemLabel width={DescriptionItem?.width}>
              {DescriptionItem?.label}
              {colon && " :"}
            </PricingDetailsDescriptionItemLabel>
            <PricingDetailsDescriptionItemValue width={DescriptionItem?.width}>
              {DescriptionItem?.render
                ? DescriptionItem?.render(data?.[DescriptionItem?.key], data)
                : data?.[DescriptionItem?.key] ?? "--"}
            </PricingDetailsDescriptionItemValue>
          </Flex>
        );
      })}
    </Flex>
  );
};

const PricingPlans = () => {
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [displayUpgradeModal, setDisplayUpgradeModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(config.subscription.currentPlan, {
      tenant_id: session?.user?.details?.tenantId,
      additional_fields: "feature,pricing",
    });

  console.log("🚀 ~ PricingPlans ~ data:", data);

  const toggleUpgradeModal = () => {
    setDisplayUpgradeModal((prev: boolean) => !prev);
  };

  const upgradePlanHandler = async (values: any) => {
    try {
      console.log("values", values);
      setPaymentLoading(true);
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
          amount: values?.credits * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
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
        setPaymentLoading(false);
      }
    } catch (error) {
      setPaymentLoading(false);
    }
  };

  const PricingDetailColumns: DescriptionItemType[] = [
    {
      label: "Plan",
      key: "plan_name",
      width: "100%",
    },
    {
      label: "Payments",
      key: "tenant_plan_price",
      width: "100%",
      render: (payment: any) => `${DollarSymbol}${payment}`,
    },
    {
      label: "Plan Valid Till",
      key: "expiry_at",
      width: "100%",
      render: (expiry_at: any) => {
        return expiry_at
          ? dayjs(data?.result?.expiry_at, tokenDateFormat).format(
              dateFormatForFrontend,
            )
          : "--";
      },
    },
    {
      label: "Users",
      key: "features",
      width: "100%",
      render: (features: any) => {
        return `${
          features?.find(
            (feature: UnknownObject) => feature?.name === "User accounts",
          )?.max_limit ?? 0
        } users`;
      },
    },
  ];

  return (
    <PricingPlansContainer>
      <PricingPlansTitle>Your plan details</PricingPlansTitle>
      <PricingDetailsCard>
        <Skeleton active loading={isLoading} paragraph={{ rows: 4 }}>
          <Flex wrap="wrap" justify="space-between" align="center">
            <PricingDetailsDescription
              columns={PricingDetailColumns}
              data={data?.result || {}}
              gapBetweenItems={62}
            />
            <PlanUpgradeButton type="primary">
              <PlanUpgradeButtonText onClick={toggleUpgradeModal}>
                Upgrade Plan
              </PlanUpgradeButtonText>
            </PlanUpgradeButton>
          </Flex>
          <PricingDetailsDivider />
          <Flex gap="24px" wrap="wrap">
            {data?.result?.features?.map((feature: any) => (
              <Space size={6} align="start" key={feature?.id}>
                <TickIcon /> <FeatureItem>{feature?.name}</FeatureItem>
              </Space>
            ))}
          </Flex>
        </Skeleton>
      </PricingDetailsCard>
      <UpgradePlanModal
        open={displayUpgradeModal}
        onClose={toggleUpgradeModal}
        upgradePlanHandler={upgradePlanHandler}
        loading={paymentLoading}
      />
    </PricingPlansContainer>
  );
};

export default PricingPlans;
