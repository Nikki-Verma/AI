import FileIcon from "@/components/Icons/FileIcon";
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
import {
  Form,
  FormInstance,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Typography,
} from "antd";
import { FilterValue, TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";

const { Text } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: ALL_DATA_PAGE_SIZE,
  ...dynamicState,
});

type ImportDatasetFileListProps = {
  datasetDetails: UnknownObject | undefined;
  form: FormInstance;
  addDatasetFilesToKnowledgebaseHandler: (values: UnknownObject) => void;
  selectedRowKeys: any[];
  setSelectedRowKeys: (value: any) => void;
  setSelectedRowDetails: (value: any) => void;
};

const ImportDatasetFileList = ({
  datasetDetails,
  form,
  addDatasetFilesToKnowledgebaseHandler,
  selectedRowKeys,
  setSelectedRowKeys,
  setSelectedRowDetails,
}: ImportDatasetFileListProps) => {
  const [filters, setFilters] = useState(initialFilters());

  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.dataset.files,
    { ...filters, dataset_id: datasetDetails?.id },
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

  const rowSelection: TableRowSelection<any> = {
    type: "checkbox",
    preserveSelectedRowKeys: true,
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any, selectedRows: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
      setSelectedRowDetails(selectedRows);
    },
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "File Name",
      dataIndex: "file_name",
      key: "file_name",
      width: 400,
      render: (val) => (
        <Space size="small">
          <FileIcon />{" "}
          <Text ellipsis style={{ width: 350 }}>
            {val}
          </Text>
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "createdAt",
      width: 250,
      render: (val) => {
        return val ? (
          <SaDate
            date={dayjs(val, dateTimeFormatWithMilliseconds)}
            inline
            time={true}
          />
        ) : (
          "--"
        );
      },
    },
    {
      title: "File Size",
      dataIndex: "size",
      key: "size",
      render: (val) => (val ? <Text>{val} MB</Text> : "--"),
    },
  ];

  return (
    <Form
      preserve={false}
      onFinish={addDatasetFilesToKnowledgebaseHandler}
      form={form}
    >
      <Table
        columns={columns}
        dataSource={data?.result || []}
        rowSelection={rowSelection}
        rowKey={(data: any) => data?.id}
        loading={isLoading}
        scroll={{
          x: "max-content",
          y: data?.result?.length > 0 ? 400 : undefined,
        }}
        pagination={false}
        onChange={tableChangeHandler}
      />
    </Form>
  );
};

export default ImportDatasetFileList;
