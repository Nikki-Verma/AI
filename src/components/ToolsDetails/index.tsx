import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { UnknownObject } from "@/utils/types";
import { Card, Result, Skeleton } from "antd";
import DescriptionList, { DescriptionItemType } from "../DescriptionList";

type ToolsDetailsProps = {
  toolDetails: UnknownObject;
};

const ToolsDetails = ({ toolDetails }: ToolsDetailsProps) => {
  const { data, isLoading, isError, error } = useFetchData(
    `${config.tools.details}/${toolDetails?.[0]}`,
    {},
    {},
    toolDetails?.length > 0,
  );

  const ToolDetailColumns: DescriptionItemType[] = [
    {
      label: "Name",
      key: "name",
      width: 300,
    },
    {
      label: "Description",
      key: "description",
      width: 300,
    },
  ];

  if (!toolDetails) {
    return <Result status="403" title="Tool details not present" />;
  }

  return (
    <Skeleton active paragraph={{ rows: 2 }} loading={isLoading}>
      <Card>
        <DescriptionList columns={ToolDetailColumns} data={data || {}} />
      </Card>
    </Skeleton>
  );
};

export default ToolsDetails;
