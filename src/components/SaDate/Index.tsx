import {
  dateFormatForFrontend,
  timeFormatForFrontend,
} from "@/utils/constants";
import dayjs from "@/utils/date";
import { Divider, Space, Typography } from "antd";

const { Text } = Typography;

interface EMCustomDateProps {
  date: any;
  isDate?: boolean;
  time?: boolean;
  inline?: boolean;
}

const SaDate = ({
  date,
  isDate = true,
  time = true,
  inline = false,
}: EMCustomDateProps) => (
  <>
    {date ? (
      <Space direction={inline ? "horizontal" : "vertical"} size={0}>
        <Text>{dayjs(date).format(dateFormatForFrontend)}</Text>
        {inline && <Divider type="vertical" />}
        {time && <Text>{dayjs(date).format(timeFormatForFrontend)}</Text>}
      </Space>
    ) : (
      "--"
    )}
  </>
);

export default SaDate;
