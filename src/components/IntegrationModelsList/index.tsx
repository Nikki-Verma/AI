import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { EyeFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Image as AntImage,
  Result,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
  Typography,
  Tooltip,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeployIcon from "../Icons/DeployIcon";

const { Text } = Typography;
const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  modelStatus: "DEPLOYED",
  ...dynamicState,
});

const IntegrationModelsList = () => {
  const [filters, setFilters] = useState(initialFilters());
  const {
    data: deployedModels,
    isLoading,
    isError,
    error,
  } = useFetchData(config.workspace.models, {
    ...filters,
  });
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/workspace`);
    router.prefetch(`/integration/model/[modelId]/[userModelId]`);
  }, []);

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: any,
  ) => {
    if (pagination?.current === filters.page + 1) {
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
      title: "Model Name",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (val, data) => (
        <Tooltip title={val} placement="top">
        <Space size="small" align="center">
          {data?.model_params?.weights_file_s3_url ? (
            <AntImage
              src={data?.model_params?.weights_file_s3_url}
              preview={false}
              alt="Model"
              style={{
                width: "32px",
                height: "32px",
              }}
            />
          ) : (
            <Image
              height={32}
              width={32}
              src={"/assets/Images/dummyModel.png"}
              alt="Model"
            />
          )}{" "}
          <Text ellipsis style={{ width: 200 }}>
            {val}
          </Text>
        </Space>
        </Tooltip>
      ),
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      width: 200,
      render: (val: any) =>
        val ? (
          <Text ellipsis style={{ width: 200 }}>
            {val}
          </Text>
        ) : (
          "--"
        ),
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      width: 400,
      render: (val: any) =>
        val ? (
          <Tooltip title={val} placement="top">
          <Text ellipsis style={{ width: 400 }}>
            {val}
          </Text>
          </Tooltip>
        ) : (
          "--"
        ),
    },
    {
      title: "Integrated Channels",
      dataIndex: "channels",
      key: "channels",
      width: 200,
      render: (val: any) => (val ? <Text>{val} MB</Text> : "--"),
    },
    {
      title: "Actions",
      dataIndex: "",
      align: "left",
      fixed: "right",
      key: "actions",
      width: 160,
      render: (_: any, dataset: UnknownObject) => {
        return (
          // <Space>
          <Row
            gutter={[0, 0]}
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Col span={20}>
              <Link
                href={`/integration/model/${dataset?.model_id}/${dataset?.id}`}
              >
                <Button
                  style={{ width: "100%" }}
                  block
                  type="default"
                  icon={<EyeFilled />}
                >
                  View
                </Button>
              </Link>
            </Col>
          </Row>
          // </Space>
        );
      },
    },
  ];

  if (isError) {
    <Row justify="center">
      <Col>
        <Result
          status="500"
          title={getErrorFromApi(error)}
          subTitle="Please refresh or comeback in sometime"
        />
      </Col>
    </Row>;
  }
  if (!isLoading && !deployedModels?.result?.length) {
    return (
      <Result
        status={403}
        title="No deployed models available"
        extra={
          <Link href={`/workspace`}>
            <Button type="primary" icon={<DeployIcon />}>
              Deploy Models
            </Button>
          </Link>
        }
      />
    );
  }
  if (isLoading || !!deployedModels?.result?.length) {
    return (
      <>
        <Table
          columns={columns}
          dataSource={deployedModels?.result || []}
          rowKey={(data: any) => data?.pipeline_id}
          loading={isLoading}
          scroll={{
            x: "max-content",
            y: deployedModels?.result?.length > 0 ? 600 : undefined,
          }}
          pagination={{
            hideOnSinglePage: true,
            current: filters?.page + 1,
            pageSize: filters?.size,
            total: deployedModels?.totalElements,
            showSizeChanger: false,
          }}
          onChange={tableChangeHandler}
        />
      </>
    );
  }

  return null;
};

export default IntegrationModelsList;
