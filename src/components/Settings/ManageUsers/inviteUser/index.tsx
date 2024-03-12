"use client";

import {
  Button,
  Collapse,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  Typography,
} from "antd";

import { inviteUserApi } from "@/api/userManagement";
import InfoIconTooltip from "@/components/InfoIconTooltip";
import { useFetchData } from "@/Hooks/useApi";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import {
  generateEncryptedPassword,
  getErrorFromApi,
} from "@/utils/helperFunction";
import { passwordPattern } from "@/utils/regex";
import { useForm } from "antd/es/form/Form";
import { useSession } from "next-auth/react";
import { useState } from "react";
const { Text } = Typography;

type InviteUserProps = {
  open: boolean;
  onClose: () => void;
  inviteDataUser?: any;
  refetchUser: () => void;
};

const InviteUser = ({
  open,
  onClose,
  inviteDataUser,
  refetchUser,
}: InviteUserProps) => {
  const { data: session }: any = useSession();
  const { notification } = useNotify();

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
    !!form.getFieldValue("role_name"),
  );

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

  const inviteUserFormHandler = async (values: any) => {
    // console.log(values);
    try {
      const encryptedPass = await generateEncryptedPassword(values.password);

      const payload = {
        //...values,
        tenant_id: session?.user?.details?.tenantId,
        user_type: "CORE_USER",
        parent_id: session?.user?.details?.userId,
        user_group_id: session?.user?.details?.userGroup,
        user_info: {
          first_name: values.user_full_name?.split(" ")[0]
            ? values.user_full_name?.split(" ")[0]
            : values.user_full_name,
          last_name: values.user_full_name?.split(" ")[1]
            ? values.user_full_name?.split(" ")[1]
            : ",",
          country_code: "+91",
          mobile_no: values.phone,
          email: values.email,
        },
        user_creds: {
          password: encryptedPass,
        },
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

      if (datasetResponse?.status === 200 || datasetResponse?.status === 201) {
        notification.success({
          message: "User Invited Successfully",
        });
        refetchUser();
        onClose();
      }
    } catch (error) {
      console.log(getErrorFromApi(error));
      notification.error({
        message: "Error while invited user",
        description: getErrorFromApi(error),
      });
      console.log(error);
    } finally {
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
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <InputNumber
              style={{ width: "100%", appearance: "textfield" }}
              placeholder="Please enter phone number"
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input placeholder="Please enter email" />
          </Form.Item>
          <Form.Item
            name="password"
            label={
              <Space>
                <Text>Password</Text>
                <InfoIconTooltip title="The password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character from !@#$%^&*." />
              </Space>
            }
            rules={[
              { required: true, message: "Please enter password" },
              {
                pattern: passwordPattern,
                message:
                  "The password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character from !@#$%^&*.",
              },
            ]}
          >
            <Input.Password placeholder="Please enter password" />
          </Form.Item>
          <Form.Item
            name="role_name"
            label="Select user role"
            rules={[{ required: true, message: "Please select user role" }]}
          >
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
                      index: any,
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
                    },
                  );
                })}
              </Collapse>
            </Form.Item>
          )}

          <Form.Item
            style={{ display: "flex", justifyContent: "space-between" }}
          >
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
      </Drawer>
    </>
  );
};

export default InviteUser;
