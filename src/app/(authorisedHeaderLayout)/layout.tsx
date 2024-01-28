"use client";

import HeaderMasterLayout from "@/components/HeaderMasterLayout";
import { AuthHoc } from "@/HOC/AuthHoc";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderMasterLayout>
        {children}
      </HeaderMasterLayout>
    </>
  );
};

export default AuthHoc(AuthLayout);
