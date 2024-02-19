import { Card, Divider, Flex } from "antd";
import { useMemo } from "react";
import DescriptionList, { DescriptionItemType } from "../DescriptionList";
import {
  KnowledgebaseCardParameterHeading,
  WorkflowKnowledgebaseContainer,
} from "./style";

type WorkflowKnowledgebaseCardProps = {
  kbDetails: any;
};

const WorkflowKnowledgebaseCard = ({
  kbDetails,
}: WorkflowKnowledgebaseCardProps) => {
  const hasParameters = useMemo(
    () => Object.keys(kbDetails?.kb_parameters || {})?.length > 0,
    [kbDetails],
  );

  const KnowledgebaseDetailColumns: DescriptionItemType[] = [
    {
      label: "Knowledge base name",
      key: "kb_name",
      width: 300,
    },
    {
      label: "Knowledge base version",
      key: "kb_version",
      width: 300,
    },
  ];

  const KnowledgebaseParameterColumns: DescriptionItemType[] = [];

  return (
    <WorkflowKnowledgebaseContainer>
      <Card>
        <DescriptionList
          columns={KnowledgebaseDetailColumns}
          data={kbDetails}
        />
        {hasParameters && (
          <>
            <Divider />
            <Flex vertical gap={"large"}>
              <KnowledgebaseCardParameterHeading>
                Model Parameters
              </KnowledgebaseCardParameterHeading>
              <DescriptionList
                columns={KnowledgebaseParameterColumns}
                data={kbDetails?.kb_parameters || {}}
              />
            </Flex>
          </>
        )}
      </Card>
    </WorkflowKnowledgebaseContainer>
  );
};

export default WorkflowKnowledgebaseCard;
