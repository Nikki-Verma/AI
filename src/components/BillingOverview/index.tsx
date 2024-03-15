import { useFetchData } from "@/Hooks/useApi";
import usePersistedQueryParams from "@/Hooks/usePersistedQueryParams";
import config from "@/utils/apiEndoints";
import {
  dateTimeFormatWithMillisecondsWithoutTimeZone,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DollarSymbol,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { getFilters } from "@/utils/helperFunction";
import {
  Button,
  Col,
  Row,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
  Typography,
} from "antd";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import CurrentBillingCard from "../CurrentBillingCard";
import SaDate from "../SaDate/Index";
import TableEmptyData from "../TableEmptyData";
import Tags from "../Tags";
import { BillingHistoryStatuses, BillingHistoryType } from "./constant";
import { BillingHistoryTitle, BillingOverviewContainer } from "./style";

const { Text } = Typography;

const initialFilters = (dynamicState: { [key: string]: any } = {}) => ({
  page: DEFAULT_PAGE,
  size: DEFAULT_PAGE_SIZE,
  ...dynamicState,
});

const BillingOverview = () => {
  const [filters, setFilters] = usePersistedQueryParams(initialFilters({}));
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useFetchData(config.workflow.listAll, { ...filters }, {});

  const tableChangeHandler = (
    pagination: TablePaginationConfig,
    Filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: any,
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
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      width: 400,
      render: (val: any, data: any) => (
        <Tooltip title={val}>
          <Text ellipsis style={{ width: "400px" }}>
            {val ?? "--"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "pipeline_state",
      key: "pipeline_state",
      width: 200,
      render: (val: BillingHistoryType) =>
        val ? (
          <Tags
            tag={BillingHistoryStatuses?.[val]?.text ?? val}
            tagProps={{
              color: BillingHistoryStatuses?.[val]?.color || "",
              background: BillingHistoryStatuses?.[val]?.background,
              border: BillingHistoryStatuses?.[val]?.border,
            }}
          />
        ) : (
          // <Tags color={WorkflowStatuses?.[val]?.color || ""}>
          //   {WorkflowStatuses?.[val]?.text ?? val}
          // </TTagsag>
          "--"
        ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: 200,
      render: (val: any, data: any) => (
        <Tooltip title={val}>
          <Text ellipsis style={{ width: "200px" }}>
            {val ? `${DollarSymbol}${val}` : "--"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      width: 200,
      render: (val: any, data: any) => (
        <Tooltip title={val}>
          <Text ellipsis style={{ width: "200px" }}>
            {val ?? "--"}
          </Text>
        </Tooltip>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
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
    {
      title: "Actions",
      dataIndex: "",
      align: "center",
      key: "actions",
      fixed: "right",
      width: 160,
      render: () => {
        return (
          <Button type="text" onClick={(e) => e?.stopPropagation()}>
            View Invoice
          </Button>
        );
      },
    },
  ];

  return (
    <BillingOverviewContainer>
      <CurrentBillingCard />
      <BillingHistoryTitle level={3}>Billing History</BillingHistoryTitle>
      <Row>
        <Col span={24}>
          <Table
            locale={{
              emptyText() {
                return (
                  <TableEmptyData
                    message="You do not have any workflows yet"
                    showEmpty={
                      !!(
                        data?.result?.length < 1 &&
                        !isLoading &&
                        !isRefetching
                      )
                    }
                  />
                );
              },
            }}
            columns={columns}
            dataSource={data?.result || []}
            rowKey={(data: any) => data?.pipeline_id}
            loading={isLoading || isRefetching}
            scroll={{
              x: "max-content",
              y: data?.result?.length > 0 ? 300 : undefined,
            }}
            pagination={{
              hideOnSinglePage: true,
              current: +filters?.page + 1,
              pageSize: +filters?.size,
              total: data?.totalElements,
              showSizeChanger: false,
            }}
            onChange={tableChangeHandler}
          />
        </Col>
      </Row>
    </BillingOverviewContainer>
  );
};

export default BillingOverview;
