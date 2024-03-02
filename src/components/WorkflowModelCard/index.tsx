import { Card, Divider, Flex, Result } from "antd";
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
      label: "Tokens to generate",
      key: "n_predict",
    },
    {
      label: "Temperature",
      key: "temp",
    },
    {
      label: "Top K sampling",
      key: "top_k",
    },
    {
      label: "Repeat penalty",
      key: "repeat_penalty",
    },
    {
      label: "Min P sampling",
      key: "min_p",
    },
    {
      label: "Top P sampling",
      key: "top_p",
    },
    {
      label: "DO sample",
      key: "do_sample",
    },
  ];

  return (
    <WorkflowModelContainer>
      {modelDetails ? (
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
      ) : (
        <Result status="403" title="Model not present" />
      )}
    </WorkflowModelContainer>
  );
};

export default WorkflowModelCard;
