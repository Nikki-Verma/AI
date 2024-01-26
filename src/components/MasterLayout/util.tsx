import { Permissions_Types, PERMISSION_TYPE } from "@/utils/constants";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
interface NavItem {
  id: number;
  label: React.ReactNode;
  key: string;
  keyPath: string[];
  url: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  permissions?: any[];
  permissionType?: Permissions_Types;
}

const matchUrlLevels = (currentUrl: string, itemUrl: string) => {
  const currentUrlLevels = currentUrl.split("/");
  const itemUrlLevels = itemUrl.split("/");

  return itemUrlLevels.every(
    (level: string, index: number) => level === currentUrlLevels[index]
  );
};

export const getItemByKey = (
  value: string,
  flag: "key" | "url",
  items: any[]
) => {
  for (const item of items) {
    if (flag === "url") {
      const itemUrl = item["url"];
      const currentUrl = value;

      if (currentUrl === itemUrl) {
        return item;
      }

      if (!item.children && matchUrlLevels(currentUrl, itemUrl)) {
        return item;
      }
    } else {
      const itemKey = item["key"];
      const currentKey = value;

      if (currentKey === itemKey) {
        return item;
      }
    }

    if (item?.children?.length > 0) {
      const nestedItem: any = getItemByKey(value, flag, item.children);
      if (nestedItem) {
        return nestedItem;
      }
    }
  }

  return null;
};

export const items: any = [
  {
    id: 0,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
    icon: <PlusOutlined />,
    key: "home",
    keyPath: ["home"],
    url: "/dashboard",
    // icon: ,
    permissions: [],
    permissionType: PERMISSION_TYPE.OR,
  },
  {
    id: 100,
    label: <Link href={"/"}>Home</Link>,
    key: "overview",
    keyPath: ["overview"],
    url: "/overview",
    // icon: <OverviewIcon />,
  },
  {
    id: 200,
    label: "Master",
    key: "master",
    keyPath: ["master"],
    url: "/master",
    // icon: <MasterIcon />,
    children: [
      {
        id: 201,
        label: "Sellers",
        key: "master-seller",
        keyPath: ["master", "master-seller"],
        url: "/master/seller",
        permissions: [],
      },
      {
        id: 202,
        label: "Vendors",
        key: "master-vendor",
        keyPath: ["master", "master-vendor"],
        url: "/master/vendor",
        permissions: [],
      },
      {
        id: 203,
        label: "Warehouse",
        key: "master-warehouse",
        keyPath: ["master", "master-warehouse"],
        url: "/master/warehouse",
      },
      {
        id: 204,
        label: "Layout Templates",
        key: "master-layout",
        keyPath: ["master", "master-layout"],
        url: "/master/layout",
      },
      {
        id: 205,
        label: "Customers",
        key: "master-customer",
        keyPath: ["master", "master-customer"],
        url: "/master/customers",
      },
    ],
  },
  {
    id: 303,
    label: "Gate In",
    key: "gate-in",
    keyPath: ["gate-in"],
    url: "/gate-in",
    // icon: <GateInIcon />,
    permissions: [],
  },
];
