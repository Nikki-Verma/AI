"use client";

import { useAppStore } from "@/store";
import { Button } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { updatePageConfig } = useAppStore();
  useEffect(() => {
    updatePageConfig({
      pageTitle: "Dashboard",
      pageDescription: " Dashboard description",
    });
  }, []);

  return (
    <div style={{ height: "200vh" }}>
      Dashboard
      <Button onClick={() => signOut({ redirect: false })}>Sign out</Button>
      <Link href={"/"}>Landing page</Link>
    </div>
  );
};

export default Dashboard;
