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
import { inviteUserApi } from "@/api/dataset";
import type { CSSProperties } from "react";
import { useForm } from "antd/es/form/Form";
import config from "@/utils/apiEndoints";
import { useFetchData } from "@/Hooks/useApi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import CreateDatasetModal from "@/components/Dataset/CreateDatasetModal";
import { useNotify } from "@/providers/notificationProvider";

//scss

import styles from "./InviteUser.module.scss";

type InviteUserProps = {
  open: boolean;
  onClose: () => void;
  inviteDataUser?: any;
};

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];

const CheckboxGroup = Checkbox.Group;

const homePermissionData = [
  "sample1",
  "sample2",
  "sample3",
  "sample4",
  "sample5",
  "sample6",
  "sample7",
  "sample8",
  "sample9",
  "sample10",
  "sample11",
];

const InviteUser = ({ open, onClose, inviteDataUser }: InviteUserProps) => {
  // const [formUpdated, setformUpdated] = useState<Boolean>(false);
  const { data: session }: any = useSession();
  const { notification } = useNotify();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
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

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const panelStyle: React.CSSProperties = {
    // marginBottom: 24,
  };

  const [homeCheckedList, setHomeCheckedList] = useState<CheckboxValueType[]>(
    []
  );

  const homeCheckAll = homePermissionData.length === homeCheckedList.length;

  const indeterminate =
    homeCheckedList.length > 0 &&
    homeCheckedList.length < homePermissionData.length;

  const onChangeHomeCheckList = (list: CheckboxValueType[]) => {
    setHomeCheckedList(list);
  };

  const onCheckAllHomePermission: CheckboxProps["onChange"] = (e) => {
    setHomeCheckedList(e.target.checked ? homePermissionData : []);
  };

  const showDatasetModal = () => {
    setCreateDatasetOpen(true);
  };

  const closeDatasetModel = () => {
    setCreateDatasetOpen(false);
  };

  // const homePermissionSwitch = (checked: boolean) => {
  //   // console.log(event.target)
  //   // setHomeCheckedList(event.target.checked ? homePermissionData : []);
  //   if (checked) {
  //   }
  // };

  // const homePermissionHeading = (
  //   <div className={styles.permissionHeading}>
  //     <span>Home</span> <Switch onChange={homePermissionSwitch} />
  //   </div>
  // );

  // const playgroundPermissionSwitch = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };

  // const playgroundPermissionHeading = (
  //   <div className={styles.permissionHeading}>
  //     <span>Playground</span> <Switch onChange={playgroundPermissionSwitch} />
  //   </div>
  // );

  // const modelsPermissionSwitch = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };

  // const modelsPermissionHeading = (
  //   <div className={styles.permissionHeading}>
  //     <span>Models</span> <Switch onChange={modelsPermissionSwitch} />
  //   </div>
  // );

  // const integrationPermissionSwitch = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };

  // const integrationPermissionHeading = (
  //   <div className={styles.permissionHeading}>
  //     <span>Integration</span> <Switch onChange={integrationPermissionSwitch} />
  //   </div>
  // );

  // const settingsPermissionSwitch = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };

  // const settingsPermissionHeading = (
  //   <div className={styles.permissionHeading}>
  //     <span>Settings</span> <Switch onChange={settingsPermissionSwitch} />
  //   </div>
  // );

  // const text = `
  //   A dog is a type of domesticated animal.
  //   Known for its loyalty and faithfulness,
  //   it can be found as a welcome guest in many households across the world.
  // `;

  // const permissionData = data

  // const items: (roleItems: any) => CollapseProps["items"] = (roleItems) => [
  //   {
  //     key: "1",
  //     label: roleItems?.permission_list.name,
  //     children: (
  //       <>
  //         <CheckboxGroup
  //           options={homePermissionData}
  //           value={homeCheckedList}
  //           onChange={onChangeHomeCheckList}
  //         />
  //       </>
  //     ),
  //   },
  // {
  //   key: "2",
  //   label: playgroundPermissionHeading,
  //   children: <p>{text}</p>,
  //   style: panelStyle,
  // },
  // {
  //   key: "3",
  //   label: modelsPermissionHeading,
  //   children: <p>{text}</p>,
  //   style: panelStyle,
  // },
  // {
  //   key: "4",
  //   label: integrationPermissionHeading,
  //   children: <p>{text}</p>,
  //   style: panelStyle,
  // },
  // {
  //   key: "5",
  //   label: settingsPermissionHeading,
  //   children: <p>{text}</p>,
  //   style: panelStyle,
  // },
  //];

  //console.log(roleItems, "roleItems")

  const dataToggle = (checked: boolean, index: any) => {
    console.log(`switch to ${checked}`);
  };

  const inviteUserFormHandler = async () => {
    console.log(fullName, "full name");
    console.log(email, "email name");
    try {
      //setCreateDatasetLoading(true);
      console.log("hello", fullName)
      const payload = {
        email: email,
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

      console.log(datasetResponse, "datasetResponse")

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
        className={styles.inviteUserPanel}
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
            //   rules={[
            //     {
            //       required: true,
            //       message: "Dataset name is required",
            //     },
            //   ]}
          >
            <Input
              placeholder="Please enter user full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            <Input
              placeholder="Please enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
          {/* {data && Object?.keys(data?.result).length > 0 && (
            <Form.Item name="role_name" label="Accessible Permissions">
              {Object.keys(data?.result)?.map((roleData: any) => {
                const roleItems = data?.result[roleData];
                console.log(roleItems, "itemsitems");
                return (
                  // <Collapse items={getItems(roleItems)} defaultActiveKey={['1']} onChange={roleChecked} />

                  <Collapse
                    collapsible="icon"
                    defaultActiveKey={["1"]}
                    onChange={onChange}
                    expandIconPosition="end"
                    items={items(roleItems)}
                    className={styles.accordionWrapper}
                  />
                );
              })}
            </Form.Item> */}
          {data && Object?.keys(data?.result).length > 0 && (
            <Form.Item
              name="accessible_permissions"
              label="Accessible Permissions"
            >
              <Collapse
                accordion
                className={styles.accordionWrapper}
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
                          header={
                            <>
                              {permissionList?.name}{" "}
                              <span>
                                <Switch
                                  checked={permissionList?.is_active_for_user}
                                  // onChange={dataToggle[index]}
                                />
                              </span>
                            </>
                          }
                          key={permissionList?.id}
                        >
                          <CheckboxGroup
                            options={homePermissionData}
                            value={homeCheckedList}
                            disabled={
                              !permissionList?.is_active_for_user && true
                            }
                            onChange={onChangeHomeCheckList}
                          />
                        </Panel>
                      );
                    }
                  );
                })}
              </Collapse>
            </Form.Item>
          )}
          {/* )} */}

          <Form.Item className={styles.btnGroup}>
            {/* <Button size="large">Save</Button> */}
            <Button type="primary" size="large" htmlType="submit">
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
