"use client";

import { Button } from "antd";
import { signOut } from "next-auth/react";
import Link from "next/link";

type Props = {};

const Dashboard = (props: Props) => {
  console.log("hello");
  return (
    <div style={{ height: "200vh" }}>
      Dashboard
      <Button onClick={() => signOut({ redirect: false })}>Sign out</Button>
      <Link href={"/"}>Landing page</Link>
    </div>
  );
};

export default Dashboard;
