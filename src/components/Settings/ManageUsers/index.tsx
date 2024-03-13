"use client";

import { Col, Row, Table, TablePaginationConfig, TableProps } from "antd";

import { changeStatusApi } from "@/api/userManagement";
import CreateDatasetModal from "@/components/Dataset/CreateDatasetModal";
import PageHeading from "@/components/PageHeading";
import Tags from "@/components/Tags";
import { PageContainer } from "@/components/UIComponents/UIComponents.style";
import { useFetchData } from "@/Hooks/useApi";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
import { useNotify } from "@/providers/notificationProvider";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useSession } from "next-auth/react";
import { useState } from "react";
import InviteUser from "./inviteUser";

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const ManageUsers = () => {
  const { data: session }: any = useSession();
  const { notification } = useNotify();
  const [intiveDataUser, intiveSetUser] = useState(false);
  const [filters, setFilters] = usePersistedQueryParams(
    initialFilters({ tenant_id: session?.user?.details?.tenantId }),
  );
  const [createDatasetOpen, setCreateDatasetOpen] = useState(false);
  const [createDatasetLoading, setCreateDatasetLoading] = useState(false);

  let { data, isError, error, isLoading, refetch } = useFetchData(
    `${config.identity.getUsers}?`,
    filters,
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
    // {
    //   title: "Action",
    //   dataIndex: "is_active",
    //   key: "Status",
    //   render: (tags: boolean) => {
    //     const actionsItems: MenuProps["items"] = [
    //       {
    //         key: "integration",
    //         label: "Dummy",
    //       },
    //     ];

    //     return (
    //       <>
    //         <span onClick={changeStatusHandler} style={{ cursor: "pointer" }}>
    //           <Tags tag={tags ? "Active" : "Deactivated"} />
    //         </span>
    //         <Dropdown menu={{ items: actionsItems }} placement="bottomLeft">
    //           <MoreOutlined
    //             style={{ fontSize: "18px", fontWeight: "bolder" }}
    //           />
    //         </Dropdown>
    //       </>
    //     );
    //   },
    // },
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
          {/* <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={toggleAddFileModal}
            >
              Invite User
            </Button>
          </Col> */}
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
