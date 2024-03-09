"use client";

import {
  Button,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Tag,
} from "antd";

import { changeStatusApi } from "@/api/userManagement";
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
import CreateDatasetModal from "@/components/Dataset/CreateDatasetModal";
import { useNotify } from "@/providers/notificationProvider";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  tenant_id: 1,
  ...dynamicState,
});

const ManageUsers = () => {
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [intiveDataUser, intiveSetUser] = useState(false);
  const [filters, setFilters] = usePersistedQueryParams(initialFilters());
  const [createDatasetOpen, setCreateDatasetOpen] = useState(false);
  const [createDatasetLoading, setCreateDatasetLoading] = useState(false);

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
  } = useFetchData(`${config.identity.userRole}`, {
    user_id: session?.user?.details?.userId,
    user_group_id: session?.user?.details?.userGroup,
  });

  console.log("inviteDataUser", inviteDataUser);

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

  const showDatasetModal = () => {
    setCreateDatasetOpen(true);
  };

  const closeDatasetModel = () => {
    setCreateDatasetOpen(false);
  };

  const changeStatusHandler = async (tags: any) => {
    try {
      setCreateDatasetLoading(true);
      const payload = {
        user_id: session?.user?.details?.userId,
        status: tags ? "INACTIVE" : "ACTIVE" || tags ? "ACTIVE" : "INACTIVE",
      };

      const datasetResponse = await changeStatusApi({ payload });

      if (datasetResponse?.status === 200) {
        setCreateDatasetOpen(false);
        notification.success({
          message: "Status Changed",
        });
        refetch();
      }
    } catch (error) {
      notification.error({
        message: "Error while changing status",
        description: getErrorFromApi(error),
      });
      console.log(error);
    } finally {
      setCreateDatasetLoading(false);
    }
  };

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
            <span onClick={changeStatusHandler} style={{cursor: "pointer"}}>
              <Tags tag={tags ? "Active" : "Deactivated"} />
            </span>
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

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: any,
  ) => {
    if (pagination?.current === +filters.page + 1) {
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        ...getFilters(Filters),
        page: DEFAULT_PAGE,
        size: pagination?.pageSize,
      }));
    } else {
      setFilters((state: any) => ({
        ...state,
        ...getFilters(Filters),
        page: (pagination?.current ?? 1) - 1,
        size: pagination?.pageSize,
      }));
    }
  };

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
              hideOnSinglePage: true,
              current: filters?.page + 1,
              pageSize: filters?.size,
              showSizeChanger: false,
            }}
            columns={columns}
            loading={isLoading}
            scroll={{
              x: "max-content",
              y: data?.result?.users?.length > 0 ? 600 : undefined,
            }}
            dataSource={data?.result?.users || []}
            onChange={tableChangeHandler}
          ></Table>
        )}
      </PageContainer>
      {/* {console.log(intiveDataUser, "intiveDataUserintiveDataUser")} */}
      {intiveDataUser && (
        <InviteUser
          open={intiveDataUser}
          inviteDataUser={inviteDataUser}
          onClose={toggleAddFileModal}
          refetchUser={refetch}
        ></InviteUser>
      )}
      <CreateDatasetModal
        open={createDatasetOpen}
        loading={createDatasetLoading}
        onClose={closeDatasetModel}
        createDatasetHandler={changeStatusHandler}
        title="Create your data collection set"
      />
    </>
  );
};

export default ManageUsers;
