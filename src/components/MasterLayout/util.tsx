import { PERMISSION_TYPE } from "@/utils/constants";
import { Permissions_Types } from "@/utils/types";
import { Typography } from "antd";
import { cloneDeep } from "lodash";
import Link from "next/link";
import PipelineIcon from "../Icons/AgentPipelineIcon";
import AgentsIcon from "../Icons/AgentsIcon";
import BillingIcon from "../Icons/BillingIcon";
import DatasetIcon from "../Icons/DatasetIcon";
import HomeIcon from "../Icons/HomeIcon";
import IntegrationIcon from "../Icons/IntegrationIcon";
import KnowledgeBaseIcon from "../Icons/KnowledgeBaseIcon";
import ModelsIcon from "../Icons/ModelsIcon";
import PlaygroundIcon from "../Icons/PlaygroundIcon";
import SettingsIcon from "../Icons/Settings";
const { Text } = Typography;
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
    (level: string, index: number) => level === currentUrlLevels[index],
  );
};

export const getItemByKey = (
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
    label: (
      <Link prefetch href="/dashboard">
        <Text style={{ color: "inherit" }}>Home</Text>
      </Link>
    ),
    icon: <HomeIcon />,
    key: "dashboard",
    keyPath: ["dashboard"],
    url: "/dashboard",
    permissions: [],
    permissionType: PERMISSION_TYPE.OR,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/playground">
        <Text style={{ color: "inherit" }}>Playground</Text>
      </Link>
    ),
    key: "playground",
    keyPath: ["playground"],
    url: "/playground",
    icon: <PlaygroundIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/workflow">
        <Text style={{ color: "inherit" }}>Workflows</Text>
      </Link>
    ),
    key: "workflow",
    keyPath: ["workflow"],
    url: "/workflow",
    icon: <PipelineIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/workspace">
        <Text style={{ color: "inherit" }}>Workspace</Text>
      </Link>
    ),
    key: "workspace",
    keyPath: ["workspace"],
    url: "/workspace",
    icon: <AgentsIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/models">
        <Text style={{ color: "inherit" }}>Models</Text>
      </Link>
    ),
    key: "models",
    keyPath: ["models"],
    url: "/models",
    icon: <ModelsIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/dataset">
        <Text style={{ color: "inherit" }}>Dataset</Text>
      </Link>
    ),
    key: "dataset",
    keyPath: ["dataset"],
    url: "/dataset",
    icon: <DatasetIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/knowledge-base">
        <Text style={{ color: "inherit" }}>Knowledge base</Text>
      </Link>
    ),
    key: "knowledge-base",
    keyPath: ["knowledge-base"],
    url: "/knowledge-base",
    icon: <KnowledgeBaseIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/integration">
        <Text style={{ color: "inherit" }}>Integration</Text>
      </Link>
    ),
    key: "integration",
    keyPath: ["integration"],
    url: "/Integration",
    icon: <IntegrationIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/billing_usage">
        <Text style={{ color: "inherit" }}>Billing & Usage</Text>
      </Link>
    ),
    key: "billing_usage",
    keyPath: ["billing_usage"],
    url: "/billing_usage",
    icon: <BillingIcon />,
  },
  {
    id: 100,
    label: (
      <Link prefetch href="/settings">
        <Text style={{ color: "inherit" }}>Settings</Text>
      </Link>
    ),
    key: "settings",
    keyPath: ["settings"],
    url: "/settings",
    icon: <SettingsIcon />,
  },
];

export const getMenuItems = (
  isAuthorized: (
    userPermissions: string[] | string | undefined | null,
    permissionType: Permissions_Types,
  ) => boolean,
) => {
  const itemsCopy = cloneDeep(items);
  const newItems = itemsCopy.map((list: any) => {
    if (
      list.permissions &&
      !isAuthorized(list.permissions, list.permissionType)
    ) {
      return null;
    }
    const filteredList =
      list?.children
        ?.filter((route: any) => {
          return isAuthorized(route.permissions, route.permissionType);
        })
        ?.map((route: any) => {
          delete route?.keyPath;
          delete route?.permissionType;
          return route;
        }) || [];
    delete list?.keyPath;
    delete list?.permissionType;
    if (filteredList?.length > 0 && list?.children?.length > 0) {
      return { ...list, children: [...filteredList] };
    } else if (filteredList?.length === 0 && !list?.children?.length) {
      return { ...list };
    } else {
      return null;
    }
  });
  return newItems || [];
};
