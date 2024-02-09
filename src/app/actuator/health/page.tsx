"use client";

import { Button, Result } from "antd";
import Link from "next/link";
import React from "react";

const HealthPage: React.FC = () => {
  return (
    <Result
      status="success"
      title="Health Check"
      subTitle="App is working fine."
      extra={
        <Link prefetch href="/">
          <Button type="primary">Home</Button>
        </Link>
      }
    />
  );
};

export default HealthPage;
