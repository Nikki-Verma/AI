import FolderIcon from "@/components/Icons/FolderIcon";
import SaDate from "@/components/SaDate/Index";
import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  ALL_DATA_PAGE_SIZE,
  dateTimeFormatWithMilliseconds,
  DEFAULT_PAGE,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { Button, Space, Table, TablePaginationConfig, TableProps } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { useState } from "react";

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: ALL_DATA_PAGE_SIZE,
  ...dynamicState,
});

type ImportDatasetFolderListProps = {
  selectFolder: (values: UnknownObject) => void;
};

const ImportDatasetFolderList = ({
  selectFolder,
}: ImportDatasetFolderListProps) => {
  const [filters, setFilters] = useState(initialFilters());
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.dataset.list,
    { ...filters },
    {},
  );

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
  ) => {
    if (pagination?.current === +filters.page + 1) {
      // reset page as with new filters there might not be any data at the current page
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        ...getFilters(Filters),
        page: DEFAULT_PAGE,
        size: pagination?.pageSize,
      }));
    } else {
      // set filters along with page change
      setFilters((state: any) => ({
        ...state,
        ...getFilters(Filters),
        page: (pagination?.current ?? 1) - 1,
        size: pagination?.pageSize,
      }));
    }
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "Dataset Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (val) => (
        <Space size="small">
          <FolderIcon /> {val}
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "createdAt",
      width: 250,
      render: (val) => {
        return (
          <SaDate
            date={dayjs(val, dateTimeFormatWithMilliseconds)}
            inline
            time={true}
          />
        );
      },
    },
    {
      title: "File Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Actions",
      dataIndex: "",
      align: "center",
      key: "actions",
      width: 150,
      render: (_: any, dataset: UnknownObject) => {
        return (
          <Button type="primary" onClick={() => selectFolder(dataset)}>
            Select
          </Button>
        );
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.result || []}
      loading={isLoading}
      rowKey={(data: any) => data?.id}
      scroll={{
        x: "max-content",
        y: data?.result?.length > 0 ? 400 : undefined,
      }}
      pagination={false}
      onChange={tableChangeHandler}
    />
  );
};

export default ImportDatasetFolderList;
