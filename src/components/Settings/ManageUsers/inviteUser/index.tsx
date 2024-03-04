"use client";

import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Collapse,
  Checkbox,
  GetProp,
  CheckboxProps,
  CollapseProps,
} from "antd";

import React from "react";
import {
  dateTimeFormatWithMilliseconds,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DUMMY_TENANT_ID,
} from "@/utils/constants";
import { inviteUserApi } from "@/api/userManagement";
import { useForm } from "antd/es/form/Form";
import config from "@/utils/apiEndoints";
import { useFetchData } from "@/Hooks/useApi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import CreateDatasetModal from "@/components/Dataset/CreateDatasetModal";
import { useNotify } from "@/providers/notificationProvider";

type InviteUserProps = {
  open: boolean;
  onClose: () => void;
  inviteDataUser?: any;
};

const InviteUser = ({ open, onClose, inviteDataUser }: InviteUserProps) => {
  // const [formUpdated, setformUpdated] = useState<Boolean>(false);
  const { data: session }: any = useSession();
  const { notification } = useNotify();

  const [createDatasetOpen, setCreateDatasetOpen] = useState(false);
  const [createDatasetLoading, setCreateDatasetLoading] = useState(false);

  const { Panel } = Collapse;

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

  console.log("data", data);

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

  const closeDatasetModel = () => {
    setCreateDatasetOpen(false);
  };

  const inviteUserFormHandler = async (values: any) => {
    try {
      setCreateDatasetLoading(true);
      const payload = {
        ...values,
        tenant_id: DUMMY_TENANT_ID,
        user_group_id: session?.user?.details?.userGroup,
        user_profiles: [
          {
            vertical_name: "Warehouse 1",
            vertical_id: 1,
            vertical_type: "WAREHOUSE",
            is_active: true,
          },
          {
            vertical_name: "DEMO SELLER",
            vertical_id: 80,
            vertical_type: "SELLER",
            is_active: true,
          },
        ],
      };

      const datasetResponse = await inviteUserApi({ payload });

      console.log(datasetResponse, "datasetResponse");

      if (datasetResponse?.status === 200) {
        setCreateDatasetOpen(false);
        notification.success({
          message: "User Invited Successfully",
        });
        refetch();
        onClose();
      }
    } catch (error) {
      notification.error({
        message: "Error while invited user",
        //description: getErrorFromApi(error),
      });
      console.log(error);
    } finally {
      setCreateDatasetLoading(false);
    }
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
          onFinish={inviteUserFormHandler}
          onValuesChange={() => setformUpdated((prev: boolean) => !prev)}
        >
          <Form.Item
            name="user_full_name"
            label="User full name"
            rules={[{ required: true, message: "Please enter user full name" }]}
          >
            <Input placeholder="Please enter user full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
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
          {data && Object?.keys(data?.result).length > 0 && (
            <Form.Item
              name="accessible_permissions"
              label="Accessible Permissions"
            >
              <Collapse
                accordion
                style={{ backgroundColor: "transparent", border: "none" }}
                expandIconPosition="end"
                collapsible="icon"
              >
                {Object.keys(data?.result)?.map((roleData: any) => {
                  return data?.result[roleData]?.permission_list?.map(
                    (
                      permissionList: {
                        id: any;
                        name: any;
                        is_active_for_user: boolean;
                      },
                      index: any
                    ) => {
                      return (
                        <Panel
                          style={{
                            border: "1px solid #d5d5d5",
                            borderRadius: "10px",
                            marginBottom: "14px",
                            overflow: "hidden",
                            background: "#fafbfc",
                          }}
                          header={
                            <div
                              style={{
                                maxWidth: "100%",
                                display: "flex",
                                marginRight: "25px",
                                justifyContent: "space-between",
                              }}
                            >
                              {permissionList?.name}{" "}
                              <span>
                                <Switch
                                  checked={permissionList?.is_active_for_user}
                                  // onChange={dataToggle[index]}
                                />
                              </span>
                            </div>
                          }
                          key={permissionList?.id}
                        ></Panel>
                      );
                    }
                  );
                })}
              </Collapse>
            </Form.Item>
          )}
          {/* )} */}

          <Form.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* <Button size="large">Save</Button> */}
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{ width: "140px" }}
            >
              Invite User
            </Button>
          </Form.Item>
        </Form>
        <CreateDatasetModal
          open={createDatasetOpen}
          loading={createDatasetLoading}
          onClose={closeDatasetModel}
          createDatasetHandler={inviteUserFormHandler}
          title="Create your data collection set"
        />
      </Drawer>
    </>
  );
};

export default InviteUser;
