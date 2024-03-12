"use client";

import { AuthHoc } from "@/HOC/AuthHoc";
import useAuthorization from "@/Hooks/useAuthorization";
import { Tabs } from "antd";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SettingsLayoutContainer } from "./style";
import { getSettingsItemByKey, getSettingsItems, tabItems } from "./util";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session }: any = useSession();
  const [selectedTab, setSelectedTab] = useState();
  const [isAuthorized] = useAuthorization();

  const items = useMemo(
    () => getSettingsItems(isAuthorized),
    [isAuthorized, pathname, session],
  );

  useEffect(() => {
    const navSettingsItem = getSettingsItemByKey(pathname, "url", tabItems);
    if (navSettingsItem?.key) {
      setSelectedTab(navSettingsItem?.key);
    }
  }, [pathname]);

  const tabChange = (values: any) => {
    router.push(values);
  };

  return (
    <SettingsLayoutContainer>
      <Tabs
        defaultActiveKey="2"
        items={items}
        onChange={tabChange}
        activeKey={selectedTab}
      />
      {children}
    </SettingsLayoutContainer>
  );
};

export default AuthHoc(AuthLayout);
