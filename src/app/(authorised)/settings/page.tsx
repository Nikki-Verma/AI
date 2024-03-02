'use client'

import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ManageUsers from '@/components/Settings/ManageUsers';


const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Account Details',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Manage Users',
    children: <ManageUsers/>,
  },
  {
    key: '3',
    label: 'Billing & Plans',
    children: 'Content of Tab Pane 3',
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
