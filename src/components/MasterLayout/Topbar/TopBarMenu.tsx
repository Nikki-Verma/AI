"use client";

import { userCredentialsFromName } from "@/utils/helperFunction";
import { Dropdown, MenuProps, theme, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import { IconContainer, TopBarMenuContainer } from "./style";
const { useToken } = theme;

const { Text } = Typography;

const TopBarMenu = () => {
  const { data: session, status }: any = useSession({ required: true });
  const { token } = useToken();

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "logout",
      style: {
        borderRadius: 0,
      },
      onClick: () => {
        signOut({ redirect: false });
      },
    },
  ];

  return (
    <TopBarMenuContainer>
      <Dropdown
        menu={{ items }}
        placement="bottomLeft"
        trigger={["click"]}
        dropdownRender={(menu) => (
          <div style={contentStyle}>
            <div
              style={{
                padding: "10px",
              }}
            >
              <Text>{session?.user?.details?.name}</Text>
            </div>
            {/* <Divider style={{ margin: 0 }} /> */}
            {menu}
          </div>
        )}
      >
        <IconContainer>
          {userCredentialsFromName(session?.user?.details?.name)}
        </IconContainer>
      </Dropdown>
    </TopBarMenuContainer>
  );
};

export default TopBarMenu;
