import { useFetchData } from "@/Hooks/useApi";
import config from "@/utils/apiEndoints";
import { ALL_DATA_PAGE_SIZE, DEFAULT_PAGE } from "@/utils/constants";
import { getErrorFromApi } from "@/utils/helperFunction";
import { UnknownObject } from "@/utils/types";
import { Col, Divider, Result, Row } from "antd";
import { useEffect } from "react";
import DescriptionList, { DescriptionItemType } from "../DescriptionList";
import {
  PlaygroundWorkflowConfigurationContainer,
  WorkflowSelect,
} from "./style";

type PlaygroundWorkflowConfigurationProps = {
  setSelectedChatConfigId: (chatConfigId: string | undefined) => void;
  selectedChatConfigId: string | undefined;
  selectedChatConfigDetails: UnknownObject | undefined;
  setSelectedChatConfigDetails: (chatConfig: UnknownObject | undefined) => void;
};

const WorkflowDetailColumns: DescriptionItemType[] = [
  {
    label: "Model Name",
    key: "model_detail",
    width: "100%",
    render: (model_detail: any) => model_detail?.model_name ?? "--",
  },
  {
    label: "Knowledge Base Name",
    key: "kb",
    width: "100%",
    render: (kb: any) => kb?.kb_name ?? "--",
  },
];

const PlaygroundWorkflowConfiguration = ({
  selectedChatConfigId,
  setSelectedChatConfigId,
  selectedChatConfigDetails,
  setSelectedChatConfigDetails,
}: PlaygroundWorkflowConfigurationProps) => {
  console.log("🚀 ~ selectedChatConfigDetails:", selectedChatConfigDetails);
  const { data, isLoading, isError, error, refetch } = useFetchData(
    config.workflow.list,
    { page: DEFAULT_PAGE, size: ALL_DATA_PAGE_SIZE },
    {},
  );

  useEffect(() => {
    if (data && !selectedChatConfigId) {
      const newSelectedWorkflow = data?.result?.[0] ?? undefined;
      if (newSelectedWorkflow) {
        setSelectedChatConfigDetails(newSelectedWorkflow);
        setSelectedChatConfigId(newSelectedWorkflow?.pipeline_id);
      }
    }
  }, [data, selectedChatConfigId]);

  useEffect(() => {
    if (!!selectedChatConfigId && !selectedChatConfigDetails) {
      const selectedWorkflow = data?.result?.find(
        (workflow: any) => workflow?.pipeline_id === selectedChatConfigId,
      );
      if (selectedWorkflow) {
        setSelectedChatConfigDetails(selectedWorkflow);
      } else {
        setSelectedChatConfigDetails(undefined);
        setSelectedChatConfigId(undefined);
      }
    }
  }, [selectedChatConfigId]);

  useEffect(() => {
    if (isError) {
      setSelectedChatConfigDetails(undefined);
      setSelectedChatConfigId(undefined);
    }
  }, [isError]);

  if (isError) {
    return (
      <Row justify="center">
        <Col>
          <Result
            status="500"
            title={getErrorFromApi(error)}
            subTitle="Please refresh or comeback in sometime"
          />
        </Col>
      </Row>
    );
  }

  console.log("🚀 ~ data:", data);
  return (
    <PlaygroundWorkflowConfigurationContainer>
      <WorkflowSelect
        showSearch
        placeholder="Select a workflow"
        optionFilterProp="label"
        loading={isLoading}
        onChange={(value: any, option: any) => {
          setSelectedChatConfigId(value);
          setSelectedChatConfigDetails(option);
        }}
        value={selectedChatConfigId}
        options={
          data?.result?.map((workflow: any) => ({
            ...workflow,
            value: workflow?.pipeline_id,
            label: workflow?.pipeline_name,
            key: workflow?.pipeline_id,
          })) || []
        }
      />

      {selectedChatConfigDetails && (
        <>
          <Divider orientationMargin="0" orientation="left">
            Details
          </Divider>
          <DescriptionList
            columns={WorkflowDetailColumns}
            data={selectedChatConfigDetails || {}}
            gapBetweenItems="large"
            vertical
          />
        </>
      )}
    </PlaygroundWorkflowConfigurationContainer>
  );
};

export default PlaygroundWorkflowConfiguration;
