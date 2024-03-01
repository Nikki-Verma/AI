"use client";

import { Button, Drawer, Form, Input, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import config from "@/utils/apiEndoints";
import { useFetchData } from "@/Hooks/useApi";
import { useState } from "react";

type InviteUserProps = {
  open: boolean;
  onClose: () => void;
  inviteDataUser?: any;
};

const InviteUser = ({ open, onClose, inviteDataUser }: InviteUserProps) => {
  const closeDrawer = () => {
    onClose();
  };
  const [form] = useForm();
  const [formUpdated, setformUpdated] = useState(false);

  const { data, isError, error, isLoading, refetch } = useFetchData(
    config.identity.userPermissionRole,
    { roles: form.getFieldValue("role_id") },
    {},
    !!form.getFieldValue("role_name")
    );

  console.log('data',data)

  console.log(inviteDataUser, "inviteDataUserinviteDataUser");

  const roleDefine = (value: string, label: any) => {
    console.log(value, "value", label);
    console.log(data, "datadata");
    form.setFields([
      {
        name: "role_id",
        value: label?.role_id,
        errors: [],
      },
    ]);
  };

  return (
    <>
      <Drawer
        closable={false}
        title="Invite User"
        width={"60%"}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button
              type="text"
              danger
              onClick={closeDrawer}
              style={{ fontWeight: "bold", color: "#000" }}
            >
              X
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          preserve={false}
          onValuesChange={() => setformUpdated((prev:boolean) => !prev)}
        >
          <Form.Item
            name="user_full_name"
            label="User full name"
            //   rules={[
            //     {
            //       required: true,
            //       message: "Dataset name is required",
            //     },
            //   ]}
          >
            <Input placeholder="Please enter user full name" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input placeholder="Please enter email" />
          </Form.Item>
          <Form.Item name="role_name" label="Select user role">
            <Select
              // key={roleName?.name}
              //   defaultValue={{ value: 'Please select user role', label: 'Lucy (101)' }}
              optionFilterProp="label"
              style={{ width: "100%" }}
              onChange={roleDefine}
              placeholder="Please select user role"
              options={
                inviteDataUser?.result?.map((data: any) => ({
                  label: data?.name,
                  value: data?.name,
                  ...data,
                })) || []
              }
            />
          </Form.Item>
          <Form.Item name="role_id" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default InviteUser;
