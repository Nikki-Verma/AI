"use client";

import MasterLayout from "@/components/MasterLayout";
import { AuthHoc } from "@/HOC/AuthHoc";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <>
      <MasterLayout>
        {children}
      </MasterLayout>
    </>
  );
};

export default AuthHoc(AuthLayout);
