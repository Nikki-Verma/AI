import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import {
  dateTimeFormatWithMillisecondsWithoutTimeZone,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { getErrorFromApi, getFilters } from "@/utils/helperFunction";
import { ApiOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Result,
  Row,
  Table,
  TablePaginationConfig,
  TableProps,
  Typography,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { ChannelTableDetails } from "../IntergrateChannelModal/helper";
import SaDate from "../SaDate/Index";

const { Text } = Typography;

enum ChannelListPageType {
  MODEL = "MODEL",
  WORKFLOW = "WORKFLOW",
}
export const CHANNEL_PAGE_TYPE = {
  MODEL: ChannelListPageType.MODEL,
  WORKFLOW: ChannelListPageType.WORKFLOW,
};

type ChannelsListProps = {
  data?: any;
  userModelId?: string | string[];
  workflowId?: string | string[];
  integrateChannel: () => void;
  isRefetching: boolean;
  pageType: ChannelListPageType;
};

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const ChannelsList = ({
  userModelId,
  workflowId,
  data,
  integrateChannel,
  isRefetching,
  pageType = CHANNEL_PAGE_TYPE.MODEL,
}: ChannelsListProps) => {
  const [filters, setFilters] = useState(initialFilters());

  const {
    data: ChannelData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchData(config.integrate.channels, {
    pipelineIdOrModelId:
      pageType === CHANNEL_PAGE_TYPE.MODEL ? userModelId : workflowId,
  });

  useEffect(() => {
    refetch();
  }, [isRefetching]);

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
      title: "Name",
      dataIndex: "bot_name",
      key: "bot_name",
      width: 250,
      render: (val) => (
        <Text ellipsis style={{ width: 200 }}>
          {val}
        </Text>
      ),
    },
    {
      title: "Channel",
      dataIndex: "chat_channel_name",
      key: "chat_channel_name",
      width: 200,
      render: (val: any) =>
        val ? (
          <Flex align="center" gap="12px">
            {ChannelTableDetails?.[
              val?.toUpperCase() as keyof typeof ChannelTableDetails
            ] &&
              ChannelTableDetails?.[
                val?.toUpperCase() as keyof typeof ChannelTableDetails
              ]?.icon}
            <Text ellipsis style={{ width: 200 }}>
              {ChannelTableDetails?.[
                val?.toUpperCase() as keyof typeof ChannelTableDetails
              ]?.text ?? val}
            </Text>
          </Flex>
        ) : (
          "--"
        ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 400,
      render: (val: any) =>
        val ? (
          <SaDate
            date={dayjs(val, dateTimeFormatWithMillisecondsWithoutTimeZone)}
            inline
            time
          />
        ) : (
          "--"
        ),
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

  if (!isLoading && !ChannelData?.result?.length) {
    return (
      <Result
        status={403}
        title="No integrated channels available"
        extra={
          <Button
            type="primary"
            icon={<ApiOutlined />}
            onClick={integrateChannel}
          >
            Integrate Channels
          </Button>
        }
      />
    );
  }
  if (isLoading || !!ChannelData?.result?.length) {
    return (
      <>
        <Table
          columns={columns}
          dataSource={ChannelData?.result || []}
          rowKey={(data: any) => data?.id || data?.pipeline_id}
          loading={isLoading}
          scroll={{
            x: "max-content",
            y: ChannelData?.result?.length > 0 ? 600 : undefined,
          }}
          pagination={{
            current: filters?.page + 1,
            pageSize: filters?.size,
            total: ChannelData?.totalElements,
            showSizeChanger: false,
          }}
          onChange={tableChangeHandler}
        />
      </>
    );
  }

  return null;
};

export default ChannelsList;
