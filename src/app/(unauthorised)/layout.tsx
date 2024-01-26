"use client";

import { AuthHoc } from "@/HOC/AuthHoc";
import { Page_Type } from "@/utils/constants";
import { Typography } from "antd";
import { usePathname } from "next/navigation";

const { Text: AntdLink } = Typography;

type Props = {
  children: React.ReactNode;
};

const UnauthLayout = (props: Props) => {
  const { children } = props;

  const pathname = usePathname();

  return <div>{children}</div>;
};

export default AuthHoc(UnauthLayout, Page_Type.unauth);
