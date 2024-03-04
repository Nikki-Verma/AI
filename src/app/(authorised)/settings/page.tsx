"use client";

import React, { useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import ManageUsers from "@/components/Settings/ManageUsers";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "2",
    label: "Manage Users",
    children: <ManageUsers />,
  },
];

const Settings = () => {
  return (
    <div>
      <Tabs defaultActiveKey="2" items={items} onChange={onChange} />
    </div>
  );
};

export default Settings;
