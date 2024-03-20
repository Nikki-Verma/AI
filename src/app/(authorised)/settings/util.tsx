import { PERMISSION } from "@/utils/permissions";
import { Permissions_Types } from "@/utils/types";
import { Typography } from "antd";
import { cloneDeep } from "lodash";
import Link from "next/link";
const { Text } = Typography;

export const tabItems: any = [
  {
    key: "/settings/manage-users",
    label: (
      <Link prefetch href="/settings/manage-users" style={{ color: "inherit" }}>
        <Text style={{ color: "inherit" }}>Manage Users</Text>
      </Link>
    ),
    url: ["/settings/manage-users"],
  },
  {
    key: "/settings/billing-and-plans/overview",
    url: [
      "/settings/billing-and-plans/overview",
      "/settings/billing-and-plans/payment-methods",
      "/settings/billing-and-plans/pricing-plans",
    ],
    label: (
      <Link
        prefetch
        href="/settings/billing-and-plans/overview"
        style={{ color: "inherit" }}
      >
        <Text style={{ color: "inherit" }}>Billings & Plans</Text>
      </Link>
    ),
    permissions: [PERMISSION.BILLING_VIEW],
  },
];

export const getSettingsItems = (
  isAuthorized: (
    userPermissions: string[] | string | undefined | null,
    permissionType: Permissions_Types,
  ) => boolean,
) => {
  const itemsCopy = cloneDeep(tabItems);
  const newItems = itemsCopy.map((list: any) => {
    if (
      list.permissions &&
      !isAuthorized(list.permissions, list.permissionType)
    ) {
      return null;
    }
    delete list?.permissions;
    delete list?.permissionType;
    return { ...list };
  });
  return newItems || [];
};

export const getSettingsItemByKey = (
  value: string,
  flag: "key" | "url",
  items: any[],
) => {
  for (const item of items) {
    if (flag === "url") {
      const itemUrls = item["url"];
      const currentUrl = value;

      if (itemUrls.includes(currentUrl)) {
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
