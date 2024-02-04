import { Permissions_Types, PERMISSION_TYPE } from "@/utils/constants";
import HomeIcon from "../Icons/HomeIcon";
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
    label: "PlayGround",
    icon: <HomeIcon />,
    key: "playground",
    keyPath: ["playground"],
    url: "/playground",
    permissions: [],
    permissionType: PERMISSION_TYPE.OR,
  },
  {
    id: 100,
    label: "Home",
    key: "overview",
    keyPath: ["overview"],
    url: "/overview",
    icon: <HomeIcon />,
  },
  // {
  //   id: 303,
  //   label: "Gate In",
  //   key: "gate-in",
  //   keyPath: ["gate-in"],
  //   url: "/gate-in",
  //   // icon: <GateInIcon />,
  //   permissions: [],
  // },
];
