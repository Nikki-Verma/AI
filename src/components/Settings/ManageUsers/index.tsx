"use client";

import {
  Button,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
} from "antd";

import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { Key, useState } from "react";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { PageContainer } from "@/components/UIComponents/UIComponents.style";
import PageHeading from "@/components/PageHeading";
import { useSession } from "next-auth/react";
import Tags from "@/components/Tags";
import InviteUser from "./inviteUser";


const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  tenant_id: 1,
  ...dynamicState,
});



const ManageUsers = () => {
  const { data: session }: any = useSession();
  const [intiveDataUser, intiveSetUser] = useState(false);
  const [filters, setFilters] = usePersistedQueryParams(initialFilters());
  

  let { data, isError, error, isLoading, refetch } = useFetchData(
    `${config.identity.getUsers}?`,
    filters
  );
  

  let {
    data: inviteDataUser,
    isError: inviteisErrorUser,
    error: inviteErrorUser,
    isLoading: inviteisLoadingUser,
    refetch: inviterefetchUser,
  } = useFetchData(`${config.identity.userRole}`, {user_id: session?.user?.details?.userId,
    user_group_id: session?.user?.details?.userGroup,});


    console.log('inviteDataUser',inviteDataUser)

  // data = data?.result?.users;

  const toggleAddFileModal = () => {
    intiveSetUser((val: boolean) => !val);
    console.log("sdfsd");
  };

  // data = [
  //   {
  //     id: "f5bdf2af-8ce6-43ba-a34b-47c01479a027",
  //     user_id: 1,
  //     name: "Rohit Dhariwal",
  //     email: "rohit.dhariwal@simplai.ai",
  //     country_code: "+91",
  //     mobile_no: "9873591147",
  //     user_group_id: "71675958-c5de-425c-8590-0c64934ccddd",
  //     user_group_name: "Super Admin",
  //     is_active: true,
  //     deactivation_reason: null,
  //     is_editable: true,
  //     is_email_verified: true,
  //     is_mobile_verified: true,
  //   },
  //   {
  //     id: "f5bdf2af-8ce6-43ba-a34b-47c01479a021",
  //     user_id: 2,
  //     name: "Nikhil Verma",
  //     email: "nikhil.verma@simplai.ai",
  //     country_code: "+91",
  //     mobile_no: "9773241773",
  //     user_group_id: "71675958-c5de-425c-8590-0c64934ccddd",
  //     user_group_name: "Super Admin",
  //     is_active: false,
  //     deactivation_reason: null,
  //     is_editable: false,
  //     is_email_verified: false,
  //     is_mobile_verified: false,
  //   },
  // ];

  // console.log(data, "dataasdasd");

  const columns: TableProps<any>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "user_group_name",
      key: "Role",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "Email",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "Status",
      render: (tags: boolean) => {
        const color = tags ? "geekblue" : "green";
        return (
          <Tags
            tag={tags ? "Active" : "Deactivated"}
            tagProps={{
              color: tags ? "#004C00" : "#EC0B0B",
              background: tags ? "#E4FFE7" : "#FFF0F0",
              border: tags ? "#E4FFE7" : "#E5C7D0",
            }}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "is_active",
      key: "Status",
      render: (tags: boolean) => {
        const actionsItems: MenuProps["items"] = [
          {
            key: "integration",
            label: "Dummy",
          },
        ];
        return (
          <>
            <Tags tag={tags ? "Active" : "Deactivated"} />
            <Dropdown menu={{ items: actionsItems }} placement="bottomLeft">
              <MoreOutlined
                style={{ fontSize: "18px", fontWeight: "bolder" }}
              />
            </Dropdown>
          </>
        );
      },
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  return (
    <>
      <PageContainer>
        <Row>
          <Col flex={1}>
            <PageHeading title="Added Users" />
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleAddFileModal}
              >
              Invite User
            </Button>
          </Col>
        </Row>
        {!isError && (isLoading || !data?.result?.length) && (
          <Table
            pagination={{
              current: filters?.page + 1,
              pageSize: filters?.size,
            }}
            columns={columns}
            loading={isLoading}
            scroll={{
              x: "max-content",
              y: data?.result?.length > 0 ? 600 : undefined,
            }}
            dataSource={data?.result?.users || []}
          ></Table>
        )}
      </PageContainer>
      {console.log(intiveDataUser, "intiveDataUserintiveDataUser")}
      {intiveDataUser && (
        <InviteUser
          open={intiveDataUser}
          inviteDataUser={inviteDataUser}
          onClose={toggleAddFileModal}
        ></InviteUser>
      )}
    </>
  );
};

export default ManageUsers;
