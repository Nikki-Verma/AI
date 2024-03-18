import { Typography } from "antd";
import Link from "next/link";
const { Text } = Typography;

export const BillingOptions: any = [
  {
    label: (
      <Link
        prefetch
        href="/settings/billing-and-plans/overview"
        style={{ color: "inherit" }}
      >
        <Text style={{ color: "inherit" }}>Overview</Text>
      </Link>
    ),
    value: "/settings/billing-and-plans/overview",
    url: "/settings/billing-and-plans/overview",
  },
  // {
  //   label: (
  //     <Link
  //       prefetch
  //       href="/settings/billing-and-plans/payment-methods"
  //       style={{ color: "inherit" }}
  //     >
  //       <Text style={{ color: "inherit" }}>Payment Methods</Text>
  //     </Link>
  //   ),
  //   value: "/settings/billing-and-plans/payment-methods",
  //   url: "/settings/billing-and-plans/payment-methods",
  // },
  {
    label: (
      <Link
        prefetch
        href="/settings/billing-and-plans/pricing-plans"
        style={{ color: "inherit" }}
      >
        <Text style={{ color: "inherit" }}>Pricing Plans</Text>
      </Link>
    ),
    value: "/settings/billing-and-plans/pricing-plans",
    url: "/settings/billing-and-plans/pricing-plans",
  },
];

export const getBillingItemsByKey = (
  value: string,
  flag: "key" | "url",
  items: any[],
) => {
  for (const item of items) {
    if (flag === "url") {
      const itemUrl = item["url"];
      const currentUrl = value;

      if (currentUrl === itemUrl) {
        return item;
      }
    } else {
      const itemKey = item["key"];
      const currentKey = value;

      if (currentKey === itemKey) {
        return item;
      }
    }
  }

  return null;
};
