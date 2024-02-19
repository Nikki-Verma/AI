import { Card, Divider, Flex } from "antd";
import { useMemo } from "react";
import DescriptionList, { DescriptionItemType } from "../DescriptionList";
import { ModelCardParameterHeading, WorkflowModelContainer } from "./style";

type WorkflowModelCardProps = {
  modelDetails: any;
};

const WorkflowModelCard = ({ modelDetails }: WorkflowModelCardProps) => {
  const hasParameters = useMemo(
    () => Object.keys(modelDetails?.model_parameters || {})?.length > 0,
    [modelDetails],
  );

  const ModelDetailColumns: DescriptionItemType[] = [
    {
      label: "Model name",
      key: "model_name",
      width: 250,
    },
    {
      label: "Model version",
      key: "model_version",
      width: 250,
    },
  ];

  const ModelParameterColumns: DescriptionItemType[] = [
    {
      label: "Chunk size",
      key: "chunk_size",
    },
    {
      label: "Decay rate",
      key: "decay_rate",
    },
    {
      label: "Output style",
      key: "output_style",
    },
    {
      label: "Sample",
      key: "sample",
    },
    {
      label: "Temperature",
      key: "temperature",
    },
    {
      label: "Token length",
      key: "token_length",
    },
  ];

  return (
    <WorkflowModelContainer>
      <Card>
        <DescriptionList columns={ModelDetailColumns} data={modelDetails} />
        {hasParameters && (
          <>
            <Divider />
            <Flex vertical gap={"large"}>
              <ModelCardParameterHeading>
                Model Parameters
              </ModelCardParameterHeading>
              <DescriptionList
                columns={ModelParameterColumns}
                data={modelDetails?.model_parameters || {}}
              />
            </Flex>
          </>
        )}
      </Card>
    </WorkflowModelContainer>
  );
};

export default WorkflowModelCard;
