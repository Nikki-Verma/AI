"use client";

import { userCredentialsFromName } from "@/utils/helperFunction";
import { Dropdown, MenuProps, Typography } from "antd";
import { signOut, useSession } from "next-auth/react";
import { IconContainer, TopBarMenuContainer } from "./style";

const { Link } = Typography;

const TopBarMenu = () => {
  const { data: session, status }: any = useSession({ required: true });

  const items: MenuProps["items"] = [
    {
      label: "Logout",
      key: "logout",
      onClick: () => {
        signOut({ redirect: false });
      },
    },
  ];

  return (
    <TopBarMenuContainer>
      {/* <div
        style={{
          display: "flex",
          gap: "10px",
          color: "#121212",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        <WalletIcon />
        500
      </div>
      <IconContainer>
        <NotificationIcon />
      </IconContainer> */}
      <Dropdown menu={{ items }} placement="bottomLeft" trigger={["click"]}>
        <IconContainer>
          {userCredentialsFromName(session?.user?.details?.name)}
        </IconContainer>
      </Dropdown>
    </TopBarMenuContainer>
  );
};

export default TopBarMenu;
